globalThis.process ??= {}; globalThis.process.env ??= {};
import { b as bookingSchema } from '../../chunks/validate_D_fzIbFC.mjs';
import { f as formatTime12, b as generateReference } from '../../chunks/slots_BLF7u6nG.mjs';
import { c as createBookingAtomic, u as updateBookingEmailStatus } from '../../chunks/db_BMHl4N3w.mjs';
import { b as businessConfig } from '../../chunks/business_C17_wgfw.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_CfQf9S2F.mjs';

async function sendBookingEmails(booking, env) {
  const apiKey = env?.RESEND_API_KEY || (typeof process !== "undefined" ? process.env.RESEND_API_KEY : "");
  const shopEmail = env?.SHOP_NOTIFY_EMAIL || (typeof process !== "undefined" ? process.env.SHOP_NOTIFY_EMAIL : "") || businessConfig.contact.email;
  const isDev = (env?.ENVIRONMENT || (typeof process !== "undefined" ? process.env.ENVIRONMENT : "")) === "development" || !apiKey;
  const displayTime = formatTime12(booking.slot_time);
  const formattedDate = (/* @__PURE__ */ new Date(`${booking.slot_date}T12:00:00Z`)).toLocaleDateString("en-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  if (isDev || !apiKey) {
    console.log("\n--- [DEV EMAIL DISPATCH MOCK] ---");
    console.log(`[SHOP NOTIFICATION] To: ${shopEmail}`);
    console.log(`Subject: New Booking [${booking.reference}] - ${booking.service} on ${formattedDate} at ${displayTime}`);
    console.log(`Customer: ${booking.customer_name} (${booking.phone}, ${booking.email})`);
    console.log(`Vehicle: ${booking.vehicle}`);
    console.log(`Insurance Claim: ${booking.insurance_claim ? "YES" : "No"}`);
    console.log(`Notes: ${booking.notes || "None"}`);
    console.log("---------------------------------");
    console.log(`[CUSTOMER CONFIRMATION] To: ${booking.email}`);
    console.log(`Subject: Booking Confirmed: ${booking.service} on ${formattedDate} - Royal Drive Mechanics`);
    console.log(`Reference: ${booking.reference}`);
    console.log("--- [END DEV EMAIL MOCK] ---\n");
    return { success: true, customerSent: true, shopSent: true };
  }
  const shopEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
      <div style="background-color: #0A0A0A; padding: 20px; border-bottom: 4px solid #D4202B; text-align: center;">
        <h2 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 1px;">ROYAL DRIVE MECHANICS</h2>
        <p style="color: #D4202B; margin: 5px 0 0 0; font-size: 13px; font-weight: bold;">NEW APPOINTMENT NOTIFICATION</p>
      </div>
      <div style="padding: 24px; background-color: #f9f9f9; border: 1px solid #e0e0e0;">
        <div style="background-color: #ffffff; padding: 16px; border-left: 4px solid #D4202B; margin-bottom: 20px;">
          <p style="margin: 0; font-size: 14px; color: #666;">Booking Reference</p>
          <p style="margin: 4px 0 0 0; font-size: 24px; font-weight: bold; color: #0A0A0A;">${booking.reference}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 140px;">Service:</td>
            <td style="padding: 8px 0;">${booking.service}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Date & Time:</td>
            <td style="padding: 8px 0; color: #D4202B; font-weight: bold;">${formattedDate} at ${displayTime}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Customer Name:</td>
            <td style="padding: 8px 0;">${booking.customer_name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
            <td style="padding: 8px 0;">
              <a href="tel:${booking.phone.replace(/[^0-9+]/g, "")}" style="color: #D4202B; font-weight: bold; text-decoration: none;">
                📞 ${booking.phone} (Tap to Call)
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${booking.email}">${booking.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Vehicle:</td>
            <td style="padding: 8px 0; font-weight: bold;">${booking.vehicle}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold;">Insurance Claim:</td>
            <td style="padding: 8px 0;">
              ${booking.insurance_claim ? '<span style="background-color: #fee2e2; color: #991b1b; padding: 4px 8px; border-radius: 4px; font-weight: bold;">YES - Collision / Insurance Claim</span>' : "Standard Booking"}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Problem Notes:</td>
            <td style="padding: 8px 0;">${booking.notes ? booking.notes.replace(/\n/g, "<br/>") : "<em>No additional notes provided.</em>"}</td>
          </tr>
        </table>

        <div style="border-top: 1px solid #ddd; padding-top: 16px; font-size: 13px; color: #777;">
          Location: ${businessConfig.address.full}
        </div>
      </div>
    </div>
  `;
  const customerEmailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
      <div style="background-color: #0A0A0A; padding: 24px; border-bottom: 4px solid #D4202B; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">ROYAL DRIVE MECHANICS</h1>
        <p style="color: #A8ADB5; margin: 6px 0 0 0; font-size: 14px;">Your Car. Our Passion. Your Peace of Mind.</p>
      </div>

      <div style="padding: 24px; background-color: #ffffff; border: 1px solid #e0e0e0;">
        <p style="font-size: 16px; margin-top: 0;">Hi <strong>${booking.customer_name}</strong>,</p>
        <p style="font-size: 15px; line-height: 1.5;">
          Thank you for choosing Royal Drive Mechanics! Your service slot has been confirmed.
        </p>

        <div style="background-color: #fdf2f2; border: 1px solid #fecaca; border-left: 4px solid #D4202B; padding: 16px; border-radius: 6px; margin: 20px 0;">
          <p style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #991b1b; font-weight: bold;">Booking Confirmation</p>
          <p style="margin: 0; font-size: 22px; font-weight: bold; color: #0A0A0A;">${booking.reference}</p>
          <div style="margin-top: 12px; font-size: 15px; color: #333;">
            <p style="margin: 4px 0;"><strong>Service:</strong> ${booking.service}</p>
            <p style="margin: 4px 0;"><strong>Date:</strong> ${formattedDate}</p>
            <p style="margin: 4px 0;"><strong>Time Slot:</strong> ${displayTime}</p>
            <p style="margin: 4px 0;"><strong>Vehicle:</strong> ${booking.vehicle}</p>
          </div>
        </div>

        <div style="background-color: #f4f5f7; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
          <h3 style="margin-top: 0; margin-bottom: 10px; font-size: 16px; color: #141414;">Workshop Location & Contact</h3>
          <p style="margin: 4px 0; font-size: 14px;"><strong>Address:</strong> ${businessConfig.address.full}</p>
          <p style="margin: 6px 0;">
            <a href="${businessConfig.address.googleMapsUrl}" target="_blank" style="color: #D4202B; font-weight: bold; text-decoration: underline;">
              📍 Open in Google Maps
            </a>
          </p>
          <p style="margin: 8px 0 4px 0; font-size: 14px;"><strong>Phone:</strong> ${businessConfig.contact.phone} (${businessConfig.contact.contactPerson})</p>
        </div>

        <div style="border-left: 3px solid #2A2D33; padding-left: 14px; margin: 20px 0; font-size: 14px; color: #555;">
          <p style="margin: 0;"><strong>Need to change or cancel?</strong></p>
          <p style="margin: 4px 0 0 0;">Please call us directly at <a href="tel:+13655242003" style="color: #D4202B; font-weight: bold;">365-524-2003</a> as soon as possible so we can adjust our workshop schedule.</p>
        </div>

        <p style="font-size: 13px; color: #777; margin-top: 24px;">
          *Please note: Final pricing is based on a written estimate after vehicle inspection in accordance with Ontario consumer protection guidelines.
        </p>
      </div>

      <div style="background-color: #141414; padding: 16px; text-align: center; color: #888; font-size: 12px;">
        © ${(/* @__PURE__ */ new Date()).getFullYear()} Royal Drive Mechanics. All rights reserved.
      </div>
    </div>
  `;
  let shopSent = false;
  let customerSent = false;
  let lastError = "";
  const sendSingleEmail = async (to, subject, html) => {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: "Royal Drive Mechanics <bookings@royaldrivemechanics.ca>",
            to: [to],
            subject,
            html
          })
        });
        if (res.ok) {
          return true;
        } else {
          const errData = await res.text();
          lastError = `Resend error HTTP ${res.status}: ${errData}`;
          console.warn(`Resend attempt ${attempt} failed:`, lastError);
        }
      } catch (err) {
        lastError = err?.message || String(err);
        console.warn(`Resend attempt ${attempt} exception:`, lastError);
      }
    }
    return false;
  };
  try {
    shopSent = await sendSingleEmail(
      shopEmail,
      `New Booking [${booking.reference}] - ${booking.service} on ${booking.slot_date} at ${displayTime}`,
      shopEmailHtml
    );
    customerSent = await sendSingleEmail(
      booking.email,
      `Booking Confirmed: ${booking.service} on ${formattedDate} - Royal Drive Mechanics`,
      customerEmailHtml
    );
    return {
      success: shopSent && customerSent,
      customerSent,
      shopSent,
      error: !shopSent || !customerSent ? lastError : void 0
    };
  } catch (err) {
    return {
      success: false,
      customerSent,
      shopSent,
      error: err?.message || String(err)
    };
  }
}

const prerender = false;
const rateLimitMap = /* @__PURE__ */ new Map();
function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 3600 * 1e3 });
    return true;
  }
  if (entry.count >= 5) {
    return false;
  }
  entry.count++;
  return true;
}
const POST = async ({ request, locals }) => {
  try {
    const clientIp = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || "127.0.0.1";
    if (!checkRateLimit(clientIp)) {
      return new Response(JSON.stringify({
        success: false,
        error: "Too many booking attempts. Please wait a while or call 365-524-2003 directly."
      }), {
        status: 429,
        headers: { "Content-Type": "application/json" }
      });
    }
    const contentType = request.headers.get("content-type") || "";
    let rawBody = {};
    const isFormPost = contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data");
    if (isFormPost) {
      const formData = await request.formData();
      for (const [key, val] of formData.entries()) {
        rawBody[key] = val;
      }
    } else {
      rawBody = await request.json();
    }
    if (rawBody.website && String(rawBody.website).trim() !== "") {
      return new Response(JSON.stringify({ success: true, booking: { reference: "RDM-BOT" } }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    const validationResult = bookingSchema.safeParse(rawBody);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0]?.message || "Invalid booking data.";
      if (isFormPost) {
        return new Response(`Booking error: ${firstError}`, { status: 400 });
      }
      return new Response(JSON.stringify({ success: false, error: firstError }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const data = validationResult.data;
    const reference = generateReference();
    const slotStartIso = (/* @__PURE__ */ new Date(`${data.slot_date}T${data.slot_time}:00Z`)).toISOString();
    const d1 = locals?.runtime?.env?.DB;
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
      notes: data.notes || "",
      insurance_claim: data.insurance_claim ? 1 : 0,
      status: "confirmed",
      email_status: "pending"
    });
    if (!createResult.success || !createResult.booking) {
      const errMsg = createResult.error || "Slot is no longer available. Please select another slot.";
      if (isFormPost) {
        return new Response(errMsg, { status: 409 });
      }
      return new Response(JSON.stringify({ success: false, error: errMsg }), {
        status: 409,
        headers: { "Content-Type": "application/json" }
      });
    }
    const envVars = {
      RESEND_API_KEY: locals?.runtime?.env?.RESEND_API_KEY,
      SHOP_NOTIFY_EMAIL: locals?.runtime?.env?.SHOP_NOTIFY_EMAIL,
      ENVIRONMENT: locals?.runtime?.env?.ENVIRONMENT
    };
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
      insurance_claim: data.insurance_claim
    }, envVars).then(async (emailRes) => {
      if (!emailRes.success) {
        console.warn("Booking email dispatch reported errors:", emailRes.error);
        await updateBookingEmailStatus(d1, reference, "failed");
      } else {
        await updateBookingEmailStatus(d1, reference, "sent");
      }
    }).catch(async (e) => {
      console.error("Unhandled email dispatch failure:", e);
      await updateBookingEmailStatus(d1, reference, "failed");
    });
    const displayTime = formatTime12(data.slot_time);
    const formattedDate = (/* @__PURE__ */ new Date(`${data.slot_date}T12:00:00Z`)).toLocaleDateString("en-CA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    if (isFormPost) {
      return new Response(null, {
        status: 303,
        headers: {
          "Location": `/booking/confirmed?ref=${reference}&date=${encodeURIComponent(data.slot_date)}&time=${encodeURIComponent(data.slot_time)}&service=${encodeURIComponent(data.service)}`
        }
      });
    }
    return new Response(JSON.stringify({
      success: true,
      booking: createResult.booking,
      displayTime,
      formattedDate
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("API /api/book unhandled exception:", err);
    return new Response(JSON.stringify({
      success: false,
      error: "An internal error occurred. Please call 365-524-2003 directly."
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
