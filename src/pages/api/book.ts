import type { APIRoute } from 'astro';
import { bookingSchema } from '../../lib/validate';
import { generateReference, formatTime12 } from '../../lib/slots';
import { createBookingAtomic, updateBookingEmailStatus } from '../../lib/db';
import { sendBookingEmails } from '../../lib/email';

export const prerender = false;

// Simple in-memory rate limiting: 5 requests per hour per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 3600 * 1000 });
    return true;
  }
  if (entry.count >= 5) {
    return false;
  }
  entry.count++;
  return true;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const clientIp = request.headers.get('cf-connecting-ip') ||
                     request.headers.get('x-forwarded-for') ||
                     '127.0.0.1';

    if (!checkRateLimit(clientIp)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Too many booking attempts. Please wait a while or call 365-524-2003 directly.'
      }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const contentType = request.headers.get('content-type') || '';
    let rawBody: any = {};
    const isFormPost = contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data');

    if (isFormPost) {
      const formData = await request.formData();
      for (const [key, val] of formData.entries()) {
        rawBody[key] = val;
      }
    } else {
      rawBody = await request.json();
    }

    // Honeypot check
    if (rawBody.website && String(rawBody.website).trim() !== '') {
      // Silently discard bot submission
      return new Response(JSON.stringify({ success: true, booking: { reference: 'RDM-BOT' } }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate with Zod
    const validationResult = bookingSchema.safeParse(rawBody);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0]?.message || 'Invalid booking data.';
      if (isFormPost) {
        return new Response(`Booking error: ${firstError}`, { status: 400 });
      }
      return new Response(JSON.stringify({ success: false, error: firstError }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = validationResult.data;
    const reference = generateReference();
    const slotStartIso = new Date(`${data.slot_date}T${data.slot_time}:00Z`).toISOString();

    const d1 = (locals as any)?.runtime?.env?.DB;

    // Atomically insert into Cloudflare D1
    const createResult = await createBookingAtomic(d1, {
      reference,
      service: data.service,
      slot_start: slotStartIso,
      slot_date: data.slot_date,
      slot_time: data.slot_time,
      customer_name: data.customer_name,
      phone: data.phone,
      email: data.email,
      vehicle: data.vehicle,
      notes: data.notes || '',
      insurance_claim: data.insurance_claim ? 1 : 0,
      status: 'confirmed',
      email_status: 'pending',
    });

    if (!createResult.success || !createResult.booking) {
      const errMsg = createResult.error || 'Slot is no longer available. Please select another slot.';
      if (isFormPost) {
        return new Response(errMsg, { status: 409 });
      }
      return new Response(JSON.stringify({ success: false, error: errMsg }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Asynchronously dispatch confirmation emails via Resend
    const envVars = {
      RESEND_API_KEY: (locals as any)?.runtime?.env?.RESEND_API_KEY,
      SHOP_NOTIFY_EMAIL: (locals as any)?.runtime?.env?.SHOP_NOTIFY_EMAIL,
      ENVIRONMENT: (locals as any)?.runtime?.env?.ENVIRONMENT,
    };

    // Fire email sending (with graceful failure handling)
    sendBookingEmails({
      reference,
      service: data.service,
      slot_date: data.slot_date,
      slot_time: data.slot_time,
      customer_name: data.customer_name,
      phone: data.phone,
      email: data.email,
      vehicle: data.vehicle,
      notes: data.notes,
      insurance_claim: data.insurance_claim,
    }, envVars).then(async (emailRes) => {
      if (!emailRes.success) {
        console.warn('Booking email dispatch reported errors:', emailRes.error);
        await updateBookingEmailStatus(d1, reference, 'failed');
      } else {
        await updateBookingEmailStatus(d1, reference, 'sent');
      }
    }).catch(async (e) => {
      console.error('Unhandled email dispatch failure:', e);
      await updateBookingEmailStatus(d1, reference, 'failed');
    });

    const displayTime = formatTime12(data.slot_time);
    const formattedDate = new Date(`${data.slot_date}T12:00:00Z`).toLocaleDateString('en-CA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // If native form POST fallback, redirect to /booking/confirmed?ref=...
    if (isFormPost) {
      return new Response(null, {
        status: 303,
        headers: {
          'Location': `/booking/confirmed?ref=${reference}&date=${encodeURIComponent(data.slot_date)}&time=${encodeURIComponent(data.slot_time)}&service=${encodeURIComponent(data.service)}`
        }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      booking: createResult.booking,
      displayTime,
      formattedDate,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('API /api/book unhandled exception:', err);
    return new Response(JSON.stringify({
      success: false,
      error: 'An internal error occurred. Please call 365-524-2003 directly.'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
