import type { APIRoute } from 'astro';
import { contactSchema } from '../../lib/validate';
import { businessConfig } from '../../config/business';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
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
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const val = contactSchema.safeParse(rawBody);
    if (!val.success) {
      const err = val.error.errors[0]?.message || 'Invalid form input.';
      if (isFormPost) return new Response(`Error: ${err}`, { status: 400 });
      return new Response(JSON.stringify({ success: false, error: err }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { name, phone, email, service, message } = val.data;
    const apiKey = (locals as any)?.runtime?.env?.RESEND_API_KEY || (typeof process !== 'undefined' ? process.env.RESEND_API_KEY : '');
    const shopEmail = (locals as any)?.runtime?.env?.SHOP_NOTIFY_EMAIL || businessConfig.contact.email;

    if (apiKey) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Royal Drive Mechanics <bookings@royaldrivemechanics.ca>',
            to: [shopEmail],
            subject: `Website Message from ${name} - Royal Drive Mechanics`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #D4202B;">New Website Contact Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Phone:</strong> <a href="tel:${phone.replace(/[^0-9+]/g, '')}">${phone}</a></p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Service of interest:</strong> ${service || 'General inquiry'}</p>
                <p><strong>Message:</strong></p>
                <div style="background: #f4f4f4; padding: 12px; border-radius: 4px;">${message.replace(/\n/g, '<br/>')}</div>
              </div>
            `,
          }),
        });
      } catch (e) {
        console.warn('Failed to send contact email via Resend:', e);
      }
    } else {
      console.log('\n--- [DEV CONTACT MESSAGE LOG] ---');
      console.log(`From: ${name} (${phone}, ${email})`);
      console.log(`Service: ${service || 'General'}`);
      console.log(`Message: ${message}`);
      console.log('---------------------------------\n');
    }

    if (isFormPost) {
      return new Response(null, {
        status: 303,
        headers: { 'Location': '/contact?sent=true' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('API /api/contact error:', err);
    return new Response(JSON.stringify({ success: false, error: 'Internal server error.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
