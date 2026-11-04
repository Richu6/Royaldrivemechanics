import { businessConfig } from '../config/business';
import { formatTime12 } from './slots';

export interface BookingEmailPayload {
  reference: string;
  service: string;
  slot_date: string; // YYYY-MM-DD
  slot_time: string; // HH:MM
  customer_name: string;
  phone: string;
  email: string;
  vehicle: string;
  notes?: string;
  insurance_claim: boolean;
}

/**
 * Sends confirmation emails to both company and customer.
 * Uses Resend API or local mock logging in development.
 */
export async function sendBookingEmails(
  booking: BookingEmailPayload,
  env?: { RESEND_API_KEY?: string; SHOP_NOTIFY_EMAIL?: string; ENVIRONMENT?: string }
): Promise<{ success: boolean; customerSent: boolean; shopSent: boolean; error?: string }> {
  const apiKey = env?.RESEND_API_KEY || (typeof process !== 'undefined' ? process.env.RESEND_API_KEY : '');
  const shopEmail = env?.SHOP_NOTIFY_EMAIL || (typeof process !== 'undefined' ? process.env.SHOP_NOTIFY_EMAIL : '') || businessConfig.contact.email;
  const isDev = (env?.ENVIRONMENT || (typeof process !== 'undefined' ? process.env.ENVIRONMENT : '')) === 'development' || !apiKey;

  const displayTime = formatTime12(booking.slot_time);
  const formattedDate = new Date(`${booking.slot_date}T12:00:00Z`).toLocaleDateString('en-CA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // If no API key or in dev, log nicely to console and return simulated success
  if (isDev || !apiKey) {
    console.log('\n--- [DEV EMAIL DISPATCH MOCK] ---');
    console.log(`[SHOP NOTIFICATION] To: ${shopEmail}`);
    console.log(`Subject: New Booking [${booking.reference}] - ${booking.service} on ${formattedDate} at ${displayTime}`);
    console.log(`Customer: ${booking.customer_name} (${booking.phone}, ${booking.email})`);
    console.log(`Vehicle: ${booking.vehicle}`);
    console.log(`Insurance Claim: ${booking.insurance_claim ? 'YES' : 'No'}`);
    console.log(`Notes: ${booking.notes || 'None'}`);
    console.log('---------------------------------');
    console.log(`[CUSTOMER CONFIRMATION] To: ${booking.email}`);
    console.log(`Subject: Booking Confirmed: ${booking.service} on ${formattedDate} - Royal Drive Mechanics`);
    console.log(`Reference: ${booking.reference}`);
    console.log('--- [END DEV EMAIL MOCK] ---\n');

    return { success: true, customerSent: true, shopSent: true };
  }

  // Shop Email HTML
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
              <a href="tel:${booking.phone.replace(/[^0-9+]/g, '')}" style="color: #D4202B; font-weight: bold; text-decoration: none;">
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
              ${booking.insurance_claim ? '<span style="background-color: #fee2e2; color: #991b1b; padding: 4px 8px; border-radius: 4px; font-weight: bold;">YES - Collision / Insurance Claim</span>' : 'Standard Booking'}
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Problem Notes:</td>
            <td style="padding: 8px 0;">${booking.notes ? booking.notes.replace(/\n/g, '<br/>') : '<em>No additional notes provided.</em>'}</td>
          </tr>
        </table>

        <div style="border-top: 1px solid #ddd; padding-top: 16px; font-size: 13px; color: #777;">
          Location: ${businessConfig.address.full}
        </div>
      </div>
    </div>
  `;

  // Customer Confirmation Email HTML
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
        © ${new Date().getFullYear()} Royal Drive Mechanics. All rights reserved.
      </div>
    </div>
  `;

  let shopSent = false;
  let customerSent = false;
  let lastError = '';

  const sendSingleEmail = async (to: string, subject: string, html: string): Promise<boolean> => {
    // Retry once on failure
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Royal Drive Mechanics <bookings@royaldrivemechanics.ca>',
            to: [to],
            subject,
            html,
          }),
        });

        if (res.ok) {
          return true;
        } else {
          const errData = await res.text();
          lastError = `Resend error HTTP ${res.status}: ${errData}`;
          console.warn(`Resend attempt ${attempt} failed:`, lastError);
        }
      } catch (err: any) {
        lastError = err?.message || String(err);
        console.warn(`Resend attempt ${attempt} exception:`, lastError);
      }
    }
    return false;
  };

  try {
    // Dispatch to shop
    shopSent = await sendSingleEmail(
      shopEmail,
      `New Booking [${booking.reference}] - ${booking.service} on ${booking.slot_date} at ${displayTime}`,
      shopEmailHtml
    );

    // Dispatch to customer
    customerSent = await sendSingleEmail(
      booking.email,
      `Booking Confirmed: ${booking.service} on ${formattedDate} - Royal Drive Mechanics`,
      customerEmailHtml
    );

    return {
      success: shopSent && customerSent,
      customerSent,
      shopSent,
      error: !shopSent || !customerSent ? lastError : undefined
    };
  } catch (err: any) {
    return {
      success: false,
      customerSent,
      shopSent,
      error: err?.message || String(err)
    };
  }
}
