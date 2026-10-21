import { businessConfig } from '../config/business';

export interface TimeSlot {
  time: string;           // "09:00" (24h)
  displayTime: string;    // "9:00 AM"
  available: boolean;
  capacity: number;
  bookedCount: number;
  reason?: 'booked_full' | 'past_cutoff' | 'shop_closed';
}

export interface TorontoTimeParts {
  year: number;
  month: number;   // 1-12
  day: number;     // 1-31
  hour: number;    // 0-23
  minute: number;  // 0-59
  dayOfWeek: string; // 'monday', 'tuesday', etc.
  dateString: string; // YYYY-MM-DD
  timeString: string; // HH:MM
}

/**
 * Gets the current date/time broken down in America/Toronto time zone
 */
export function getTorontoDateTime(date: Date = new Date()): TorontoTimeParts {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: businessConfig.timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    weekday: 'long',
  });

  const parts = formatter.formatToParts(date);
  const partMap: Record<string, string> = {};
  for (const p of parts) {
    partMap[p.type] = p.value;
  }

  const year = parseInt(partMap.year, 10);
  const month = parseInt(partMap.month, 10);
  const day = parseInt(partMap.day, 10);
  const hour = parseInt(partMap.hour === '24' ? '0' : partMap.hour, 10);
  const minute = parseInt(partMap.minute, 10);
  const dayOfWeek = (partMap.weekday || '').toLowerCase();

  const pad = (n: number) => n.toString().padStart(2, '0');
  const dateString = `${year}-${pad(month)}-${pad(day)}`;
  const timeString = `${pad(hour)}:${pad(minute)}`;

  return {
    year,
    month,
    day,
    hour,
    minute,
    dayOfWeek,
    dateString,
    timeString,
  };
}

/**
 * Formats a "HH:MM" 24h string into friendly 12h display like "9:00 AM" or "2:00 PM"
 */
export function formatTime12(time24: string): string {
  const [hStr, mStr] = time24.split(':');
  const hour = parseInt(hStr, 10);
  const m = mStr || '00';
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${m} ${period}`;
}

/**
 * Generates an uppercase unique booking reference e.g. RDM-8F3K2A
 */
export function generateReference(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // omit ambiguous 0/O, 1/I
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `RDM-${code}`;
}

/**
 * Checks if a given date string (YYYY-MM-DD) is within the allowed booking window:
 * - Not in the past
 * - Within maxAdvanceDays (default 60)
 * - Not a closed day of the week
 * - Not in blackoutDates list
 */
export function isDateBookable(dateStr: string, currentToronto?: TorontoTimeParts): { bookable: boolean; reason?: string } {
  const toronto = currentToronto || getTorontoDateTime();
  
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return { bookable: false, reason: 'Invalid date format' };
  }

  if (dateStr < toronto.dateString) {
    return { bookable: false, reason: 'Date is in the past' };
  }

  // Calculate days ahead
  const [y, m, d] = dateStr.split('-').map(Number);
  const targetDate = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const todayDate = new Date(Date.UTC(toronto.year, toronto.month - 1, toronto.day, 12, 0, 0));
  const diffDays = Math.round((targetDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays > businessConfig.slots.maxAdvanceDays) {
    return { bookable: false, reason: `Cannot book more than ${businessConfig.slots.maxAdvanceDays} days in advance` };
  }

  // Check blackout dates (e.g. Ontario statutory holidays)
  if (businessConfig.blackoutDates.includes(dateStr)) {
    return { bookable: false, reason: 'Shop is closed for statutory holiday' };
  }

  // Check day of week
  const dayIndex = targetDate.getUTCDay(); // 0 is Sunday
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayName = days[dayIndex];
  const hoursConfig = businessConfig.hours[dayName];

  if (!hoursConfig || hoursConfig.closed) {
    return { bookable: false, reason: 'Shop is closed on this day' };
  }

  return { bookable: true };
}

/**
 * Calculates slot availability for a given date taking into account:
 * - Shop open/close hours
 * - 60-minute duration per slot
 * - Last slot ending at closing time (starts 1 hr prior)
 * - Existing bookings count vs capacityPerSlot (default 2)
 * - Same-day cutoff: slot must start >= sameDayLeadTimeHours from now
 */
export function getSlotsForDate(
  dateStr: string,
  existingBookings: { slot_time: string; count?: number }[] = [],
  currentToronto?: TorontoTimeParts
): { date: string; slots: TimeSlot[]; error?: string } {
  const toronto = currentToronto || getTorontoDateTime();
  const dateCheck = isDateBookable(dateStr, toronto);

  if (!dateCheck.bookable) {
    return { date: dateStr, slots: [], error: dateCheck.reason };
  }

  // Find day of week for this date
  const [y, m, d] = dateStr.split('-').map(Number);
  const targetDate = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayName = days[targetDate.getUTCDay()];
  const hoursConfig = businessConfig.hours[dayName];

  if (!hoursConfig || hoursConfig.closed) {
    return { date: dateStr, slots: [], error: 'Shop is closed' };
  }

  // Build booking counts map
  const countsMap = new Map<string, number>();
  for (const b of existingBookings) {
    const key = b.slot_time.substring(0, 5);
    const existing = countsMap.get(key) || 0;
    countsMap.set(key, existing + (b.count !== undefined ? b.count : 1));
  }

  const [openH, openM] = hoursConfig.open.split(':').map(Number);
  const [closeH, closeM] = hoursConfig.close.split(':').map(Number);

  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;
  const slotLength = businessConfig.slots.slotLengthMinutes;
  const maxCapacity = businessConfig.slots.capacityPerSlot;
  const leadHours = businessConfig.slots.sameDayLeadTimeHours;

  const slots: TimeSlot[] = [];
  const isToday = dateStr === toronto.dateString;
  const currentMinutesInDay = toronto.hour * 60 + toronto.minute;
  const cutoffMinutes = currentMinutesInDay + leadHours * 60;

  for (let current = openMinutes; current + slotLength <= closeMinutes; current += slotLength) {
    const h = Math.floor(current / 60);
    const min = current % 60;
    const timeKey = `${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
    const bookedCount = countsMap.get(timeKey) || 0;

    let available = true;
    let reason: TimeSlot['reason'] = undefined;

    if (bookedCount >= maxCapacity) {
      available = false;
      reason = 'booked_full';
    } else if (isToday && current < cutoffMinutes) {
      available = false;
      reason = 'past_cutoff';
    }

    slots.push({
      time: timeKey,
      displayTime: formatTime12(timeKey),
      available,
      capacity: maxCapacity,
      bookedCount,
      reason,
    });
  }

  return { date: dateStr, slots };
}
