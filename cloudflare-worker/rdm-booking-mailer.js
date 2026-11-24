/**
 * Cloudflare Worker: rdm-booking-mailer
 * Dispatches instant confirmation emails to both the shop owner (royaldrivemechanics@gmail.com)
 * and the customer using Resend API.
 */
export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders });
    }

    try {
      const data = await request.json();
      const resendApiKey = env?.RESEND_API_KEY || "YOUR_RESEND_API_KEY";
      const shopEmail = env?.SHOP_NOTIFY_EMAIL || "royaldrivemechanics@gmail.com";

      // 1. Clean HTML Notification for the Shop Owner (Insurance option removed)
      const shopHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <div style="background-color: #0A0A0A; padding: 20px; border-bottom: 4px solid #D4202B; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; font-size: 22px; letter-spacing: 1px;">ROYAL DRIVE MECHANICS</h2>
            <p style="color: #D4202B; margin: 5px 0 0 0; font-size: 13px; font-weight: bold;">NEW APPOINTMENT BOOKED</p>
          </div>
          <div style="padding: 24px; background-color: #f9f9f9; border: 1px solid #e0e0e0;">
            <div style="background-color: #ffffff; padding: 16px; border-left: 4px solid #D4202B; margin-bottom: 20px;">
              <p style="margin: 0; font-size: 14px; color: #666;">Booking Reference</p>
              <p style="margin: 4px 0 0 0; font-size: 24px; font-weight: bold; color: #0A0A0A;">${data.reference}</p>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 15px;">
              <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Service:</td><td style="padding: 8px 0;">${data.service}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Date & Time:</td><td style="padding: 8px 0; color: #D4202B; font-weight: bold;">${data.formattedDate} at ${data.displayTime}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Customer:</td><td style="padding: 8px 0;">${data.customer_name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${data.phone}" style="color: #D4202B; font-weight: bold;">📞 ${data.phone} (Tap to Call)</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Vehicle:</td><td style="padding: 8px 0; font-weight: bold;">${data.vehicle}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold; vertical-align: top;">Notes:</td><td style="padding: 8px 0;">${data.notes || 'None'}</td></tr>
            </table>
          </div>
        </div>
      `;

      // 2. Beautiful HTML Confirmation for the Customer
      const customerHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <div style="background-color: #0A0A0A; padding: 24px; border-bottom: 4px solid #D4202B; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">ROYAL DRIVE MECHANICS</h1>
            <p style="color: #A8ADB5; margin: 6px 0 0 0; font-size: 14px;">Your Car. Our Passion. Your Peace of Mind.</p>
          </div>
          <div style="padding: 24px; background-color: #ffffff; border: 1px solid #e0e0e0;">
            <p style="font-size: 16px; margin-top: 0;">Hi <strong>${data.customer_name}</strong>,</p>
            <p style="font-size: 15px; line-height: 1.5;">Thank you for choosing Royal Drive Mechanics! Your service slot has been confirmed.</p>
            <div style="background-color: #fdf2f2; border: 1px solid #fecaca; border-left: 4px solid #D4202B; padding: 16px; border-radius: 6px; margin: 20px 0;">
              <p style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #991b1b; font-weight: bold;">Booking Confirmation</p>
              <p style="margin: 0; font-size: 22px; font-weight: bold; color: #0A0A0A;">${data.reference}</p>
              <div style="margin-top: 12px; font-size: 15px; color: #333;">
                <p style="margin: 4px 0;"><strong>Service:</strong> ${data.service}</p>
                <p style="margin: 4px 0;"><strong>Date:</strong> ${data.formattedDate}</p>
                <p style="margin: 4px 0;"><strong>Time Slot:</strong> ${data.displayTime}</p>
                <p style="margin: 4px 0;"><strong>Vehicle:</strong> ${data.vehicle}</p>
              </div>
            </div>
            <div style="background-color: #f4f5f7; padding: 16px; border-radius: 6px; margin-bottom: 20px;">
              <h3 style="margin-top: 0; margin-bottom: 8px; font-size: 15px; color: #141414;">Workshop Location & Contact</h3>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Address:</strong> Unit 6, 2630 Royal Windsor Dr, Mississauga, ON</p>
              <p style="margin: 4px 0; font-size: 14px;"><strong>Phone:</strong> 365-524-2003 (Mirshad)</p>
            </div>
            <div style="border-left: 3px solid #2A2D33; padding-left: 14px; margin: 20px 0; font-size: 13px; color: #555;">
              <p style="margin: 0;"><strong>Need to change or cancel?</strong> Please call us at <a href="tel:+13655242003" style="color: #D4202B; font-weight: bold;">365-524-2003</a> as early as possible.</p>
            </div>
          </div>
          <div style="background-color: #141414; padding: 14px; text-align: center; color: #888; font-size: 12px;">
            © ${new Date().getFullYear()} Royal Drive Mechanics. All rights reserved.
          </div>
        </div>
      `;

      // Dispatch to Shop
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Royal Drive Mechanics <bookings@royaldrivemechanics.ca>",
          to: [shopEmail],
          subject: `New Booking [${data.reference}] - ${data.service} on ${data.formattedDate} at ${data.displayTime}`,
          html: shopHtml,
        }),
      });

      // Dispatch to Customer
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Royal Drive Mechanics <bookings@royaldrivemechanics.ca>",
          to: [data.email],
          subject: `Booking Confirmed: ${data.service} on ${data.formattedDate} - Royal Drive Mechanics`,
          html: customerHtml,
        }),
      });

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: err.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }
};
