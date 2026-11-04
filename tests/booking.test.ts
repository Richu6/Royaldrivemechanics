import { describe, it, expect } from 'vitest';
import { bookingSchema, contactSchema } from '../src/lib/validate';
import { createBookingAtomic, cleanupExpiredBookings } from '../src/lib/db';
import { generateIcsContent } from '../src/lib/ics';

describe('Booking & Validation Tests', () => {
  it('validates a correct booking submission', () => {
    const validData = {
      service: 'Brakes',
      slot_date: '2026-10-22',
      slot_time: '10:00',
      customer_name: 'Adithya R.',
      phone: '365-524-2003',
      email: 'adithya@example.ca',
      vehicle: '2019 Honda Civic Sedan',
      notes: 'Front brake grinding noise when stopping',
      insurance_claim: false,
      privacy_consent: true,
      website: '', // honeypot empty
    };

    const res = bookingSchema.safeParse(validData);
    expect(res.success).toBe(true);
  });

  it('rejects invalid phone numbers or missing vehicles', () => {
    const invalidData = {
      service: 'All Oil Changes',
      slot_date: '2026-10-22',
      slot_time: '10:00',
      customer_name: 'John',
      phone: '12345', // invalid phone
      email: 'not-an-email',
      vehicle: '', // missing vehicle
      privacy_consent: false, // not agreed
    };

    const res = bookingSchema.safeParse(invalidData);
    expect(res.success).toBe(false);
    if (!res.success) {
      const fields = res.error.issues.map(i => i.path[0]);
      expect(fields).toContain('phone');
      expect(fields).toContain('email');
      expect(fields).toContain('vehicle');
      expect(fields).toContain('privacy_consent');
    }
  });

  it('prevents double-booking race condition when capacity limit (2) is reached', async () => {
    const slotDate = '2026-11-05';
    const slotTime = '11:00';

    // 1st booking succeeds
    const b1 = await createBookingAtomic(null, {
      reference: 'RDM-TEST01',
      service: 'Tune-Ups',
      slot_start: '2026-11-05T15:00:00Z',
      slot_date: slotDate,
      slot_time: slotTime,
      customer_name: 'Customer One',
      phone: '365-524-2003',
      email: 'cust1@example.com',
      vehicle: '2020 Toyota Corolla',
      insurance_claim: 0,
      status: 'confirmed',
      email_status: 'pending'
    });
    expect(b1.success).toBe(true);

    // 2nd booking succeeds (capacity is 2)
    const b2 = await createBookingAtomic(null, {
      reference: 'RDM-TEST02',
      service: 'Brakes',
      slot_start: '2026-11-05T15:00:00Z',
      slot_date: slotDate,
      slot_time: slotTime,
      customer_name: 'Customer Two',
      phone: '365-524-2003',
      email: 'cust2@example.com',
      vehicle: '2021 Mazda 3',
      insurance_claim: 0,
      status: 'confirmed',
      email_status: 'pending'
    });
    expect(b2.success).toBe(true);

    // 3rd booking attempts to grab the same slot -> must fail with friendly error!
    const b3 = await createBookingAtomic(null, {
      reference: 'RDM-TEST03',
      service: 'Suspension',
      slot_start: '2026-11-05T15:00:00Z',
      slot_date: slotDate,
      slot_time: slotTime,
      customer_name: 'Customer Three',
      phone: '365-524-2003',
      email: 'cust3@example.com',
      vehicle: '2018 Ford F-150',
      insurance_claim: 0,
      status: 'confirmed',
      email_status: 'pending'
    });
    expect(b3.success).toBe(false);
    expect(b3.error).toContain('That slot was just taken, please choose another slot.');
  });

  it('generates a valid iCalendar .ics event string', () => {
    const ics = generateIcsContent({
      reference: 'RDM-99XYZ8',
      service: 'All Oil Changes',
      slotDate: '2026-10-22',
      slotTime: '14:00',
      customerName: 'Abhi S.',
      vehicle: '2019 Subaru Outback',
    });

    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('END:VCALENDAR');
    expect(ics).toContain('SUMMARY:Auto Service Appointment: All Oil Changes - Royal Drive Mechanics');
    expect(ics).toContain('LOCATION:Unit 6, 2630 Royal Windsor Drive, Mississauga, ON L5J 1K7, Canada');
    expect(ics).toContain('UID:rdm-RDM-99XYZ8@royaldrivemechanics.ca');
  });
});
