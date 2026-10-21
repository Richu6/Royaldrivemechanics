import { businessConfig } from '../config/business';

export interface CalendarEventDetails {
  reference: string;
  service: string;
  slotDate: string; // YYYY-MM-DD
  slotTime: string; // HH:MM
  customerName: string;
  vehicle: string;
}

/**
 * Creates an iCalendar (.ics) formatted string for an RDM appointment
 */
export function generateIcsContent(event: CalendarEventDetails): string {
  const [year, month, day] = event.slotDate.split('-').map(Number);
  const [hour, minute] = event.slotTime.split(':').map(Number);

  // Slot duration is 60 mins
  const start = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const end = new Date(start.getTime() + businessConfig.slots.slotLengthMinutes * 60 * 1000);

  const formatUtc = (d: Date) => {
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const nowStr = formatUtc(new Date());
  const startStr = formatUtc(start);
  const endStr = formatUtc(end);

  const summary = `Auto Service Appointment: ${event.service} - Royal Drive Mechanics`;
  const description = `Your appointment for ${event.service} (${event.vehicle}) at Royal Drive Mechanics is confirmed.\\n` +
    `Booking Reference: ${event.reference}\\n` +
    `Location: ${businessConfig.address.full}\\n` +
    `Phone: ${businessConfig.contact.phone}\\n` +
    `Need to change or cancel? Call ${businessConfig.contact.phone}.`;

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Royal Drive Mechanics//Auto Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:rdm-${event.reference}@royaldrivemechanics.ca`,
    `DTSTAMP:${nowStr}`,
    `DTSTART:${startStr}`,
    `DTEND:${endStr}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${businessConfig.address.full}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Your auto appointment at Royal Drive Mechanics is in 2 hours',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ];

  return icsLines.join('\r\n');
}

/**
 * Generates a data URL for client-side download of the .ics file
 */
export function generateIcsDataUrl(event: CalendarEventDetails): string {
  const content = generateIcsContent(event);
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(content)}`;
}
