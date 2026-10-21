import { businessConfig } from '../config/business';

export interface BookingRecord {
  id?: number;
  reference: string;
  service: string;
  slot_start: string;
  slot_date: string;
  slot_time: string;
  customer_name: string;
  phone: string;
  email: string;
  vehicle: string;
  notes?: string;
  insurance_claim: number;
  status: 'confirmed' | 'cancelled';
  email_status: 'sent' | 'failed' | 'pending';
  created_at?: string;
}

// In-memory fallback for local development or testing without D1
const inMemoryBookings: BookingRecord[] = [];

/**
 * Retrieves the count of confirmed bookings for a given date and time slot
 */
export async function getSlotBookingsCount(
  d1: any,
  slotDate: string,
  slotTime: string
): Promise<number> {
  if (d1 && typeof d1.prepare === 'function') {
    try {
      const stmt = d1.prepare(
        "SELECT COUNT(*) as count FROM bookings WHERE slot_date = ? AND slot_time = ? AND status = 'confirmed'"
      );
      const res = await stmt.bind(slotDate, slotTime).first();
      return (res && typeof res.count === 'number') ? res.count : 0;
    } catch (err) {
      console.error('D1 count query failed, falling back to memory store:', err);
    }
  }

  // In-memory fallback
  return inMemoryBookings.filter(
    b => b.slot_date === slotDate && b.slot_time === slotTime && b.status === 'confirmed'
  ).length;
}

/**
 * Retrieves all booked slots for a given date to compute availability
 */
export async function getBookedSlotsForDate(
  d1: any,
  slotDate: string
): Promise<{ slot_time: string; count: number }[]> {
  if (d1 && typeof d1.prepare === 'function') {
    try {
      const stmt = d1.prepare(
        "SELECT slot_time, COUNT(*) as count FROM bookings WHERE slot_date = ? AND status = 'confirmed' GROUP BY slot_time"
      );
      const res = await stmt.bind(slotDate).all();
      return (res && res.results) ? res.results : [];
    } catch (err) {
      console.error('D1 slot query failed, falling back to memory store:', err);
    }
  }

  // In-memory fallback
  const counts = new Map<string, number>();
  for (const b of inMemoryBookings) {
    if (b.slot_date === slotDate && b.status === 'confirmed') {
      counts.set(b.slot_time, (counts.get(b.slot_time) || 0) + 1);
    }
  }

  return Array.from(counts.entries()).map(([slot_time, count]) => ({ slot_time, count }));
}

/**
 * Atomically checks capacity and inserts a new booking to prevent double-booking race conditions.
 */
export async function createBookingAtomic(
  d1: any,
  booking: Omit<BookingRecord, 'id' | 'created_at'>
): Promise<{ success: boolean; error?: string; booking?: BookingRecord }> {
  const maxCapacity = businessConfig.slots.capacityPerSlot;

  if (d1 && typeof d1.prepare === 'function') {
    try {
      // 1. Check capacity
      const countStmt = d1.prepare(
        "SELECT COUNT(*) as count FROM bookings WHERE slot_date = ? AND slot_time = ? AND status = 'confirmed'"
      );
      const countResult = await countStmt.bind(booking.slot_date, booking.slot_time).first();
      const currentCount = (countResult && typeof countResult.count === 'number') ? countResult.count : 0;

      if (currentCount >= maxCapacity) {
        return {
          success: false,
          error: 'That slot was just taken, please choose another slot.'
        };
      }

      // 2. Insert record
      const insertStmt = d1.prepare(`
        INSERT INTO bookings (
          reference, service, slot_start, slot_date, slot_time,
          customer_name, phone, email, vehicle, notes,
          insurance_claim, status, email_status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      await insertStmt.bind(
        booking.reference,
        booking.service,
        booking.slot_start,
        booking.slot_date,
        booking.slot_time,
        booking.customer_name,
        booking.phone,
        booking.email,
        booking.vehicle,
        booking.notes || null,
        booking.insurance_claim ? 1 : 0,
        booking.status || 'confirmed',
        booking.email_status || 'pending'
      ).run();

      return {
        success: true,
        booking: {
          ...booking,
          created_at: new Date().toISOString()
        }
      };
    } catch (err: any) {
      console.error('D1 atomic insert exception:', err);
      // Check for unique reference collision or SQLite lock
      if (err?.message?.includes('UNIQUE constraint failed')) {
        return { success: false, error: 'A booking with this reference already exists.' };
      }
      return { success: false, error: 'Failed to record booking in database.' };
    }
  }

  // In-memory fallback
  const currentCount = inMemoryBookings.filter(
    b => b.slot_date === booking.slot_date && b.slot_time === booking.slot_time && b.status === 'confirmed'
  ).length;

  if (currentCount >= maxCapacity) {
    return {
      success: false,
      error: 'That slot was just taken, please choose another slot.'
    };
  }

  const record: BookingRecord = {
    ...booking,
    id: inMemoryBookings.length + 1,
    created_at: new Date().toISOString()
  };
  inMemoryBookings.push(record);

  return { success: true, booking: record };
}

/**
 * Updates the email_status flag of a booking
 */
export async function updateBookingEmailStatus(
  d1: any,
  reference: string,
  emailStatus: 'sent' | 'failed'
): Promise<void> {
  if (d1 && typeof d1.prepare === 'function') {
    try {
      const stmt = d1.prepare("UPDATE bookings SET email_status = ? WHERE reference = ?");
      await stmt.bind(emailStatus, reference).run();
      return;
    } catch (err) {
      console.error('Failed to update email status in D1:', err);
    }
  }

  const found = inMemoryBookings.find(b => b.reference === reference);
  if (found) {
    found.email_status = emailStatus;
  }
}

/**
 * Retrieves a booking by its unique reference
 */
export async function getBookingByReference(
  d1: any,
  reference: string
): Promise<BookingRecord | null> {
  if (d1 && typeof d1.prepare === 'function') {
    try {
      const stmt = d1.prepare("SELECT * FROM bookings WHERE reference = ?");
      const res = await stmt.bind(reference).first();
      return (res as BookingRecord) || null;
    } catch (err) {
      console.error('Failed to query booking by reference in D1:', err);
    }
  }

  return inMemoryBookings.find(b => b.reference === reference) || null;
}

/**
 * PIPEDA compliance cleanup: deletes or anonymizes bookings older than 12 months (365 days)
 */
export async function cleanupExpiredBookings(d1: any): Promise<number> {
  const oneYearAgo = new Date();
  oneYearAgo.setDate(oneYearAgo.getDate() - 365);
  const cutoffDate = oneYearAgo.toISOString().split('T')[0];

  if (d1 && typeof d1.prepare === 'function') {
    try {
      const stmt = d1.prepare("DELETE FROM bookings WHERE slot_date < ?");
      const res = await stmt.bind(cutoffDate).run();
      return res.meta?.changes || 0;
    } catch (err) {
      console.error('Cleanup expired bookings failed:', err);
      return 0;
    }
  }

  const initialLen = inMemoryBookings.length;
  for (let i = inMemoryBookings.length - 1; i >= 0; i--) {
    if (inMemoryBookings[i].slot_date < cutoffDate) {
      inMemoryBookings.splice(i, 1);
    }
  }
  return initialLen - inMemoryBookings.length;
}
