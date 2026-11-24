globalThis.process ??= {}; globalThis.process.env ??= {};
import { b as businessConfig } from './business_CgHEbruk.mjs';

function generateIcsContent(event) {
  const [year, month, day] = event.slotDate.split("-").map(Number);
  const [hour, minute] = event.slotTime.split(":").map(Number);
  const start = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const end = new Date(start.getTime() + businessConfig.slots.slotLengthMinutes * 60 * 1e3);
  const formatUtc = (d) => {
    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };
  const nowStr = formatUtc(/* @__PURE__ */ new Date());
  const startStr = formatUtc(start);
  const endStr = formatUtc(end);
  const summary = `Auto Service Appointment: ${event.service} - Royal Drive Mechanics`;
  const description = `Your appointment for ${event.service} (${event.vehicle}) at Royal Drive Mechanics is confirmed.\\nBooking Reference: ${event.reference}\\nLocation: ${businessConfig.address.full}\\nPhone: ${businessConfig.contact.phone}\\nNeed to change or cancel? Call ${businessConfig.contact.phone}.`;
  const icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Royal Drive Mechanics//Auto Booking//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:rdm-${event.reference}@royaldrivemechanics.ca`,
    `DTSTAMP:${nowStr}`,
    `DTSTART:${startStr}`,
    `DTEND:${endStr}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${businessConfig.address.full}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: Your auto appointment at Royal Drive Mechanics is in 2 hours",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR"
  ];
  return icsLines.join("\r\n");
}
function generateIcsDataUrl(event) {
  const content = generateIcsContent(event);
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(content)}`;
}

export { generateIcsDataUrl as g };
