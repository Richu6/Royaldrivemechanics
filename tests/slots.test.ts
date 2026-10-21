import { describe, it, expect } from 'vitest';
import {
  isDateBookable,
  getSlotsForDate,
  formatTime12,
  generateReference,
  getTorontoDateTime,
  type TorontoTimeParts
} from '../src/lib/slots';
import { businessConfig } from '../src/config/business';

describe('Slot Logic & Timezone Tests', () => {
  // Mock current Toronto time: Tuesday, October 20, 2026 at 10:30 AM
  const mockTorontoNow: TorontoTimeParts = {
    year: 2026,
    month: 10,
    day: 20,
    hour: 10,
    minute: 30,
    dayOfWeek: 'tuesday',
    dateString: '2026-10-20',
    timeString: '10:30',
  };

  it('correctly calculates Toronto date and time parts from a standard Date', () => {
    // 2026-10-20T14:30:00Z is 10:30 EDT (UTC-4)
    const utcDate = new Date('2026-10-20T14:30:00Z');
    const parts = getTorontoDateTime(utcDate);
    expect(parts.dateString).toBe('2026-10-20');
    expect(parts.hour).toBe(10);
    expect(parts.minute).toBe(30);
    expect(parts.dayOfWeek).toBe('tuesday');
  });

  it('formats 24h times into friendly 12h representation', () => {
    expect(formatTime12('08:00')).toBe('8:00 AM');
    expect(formatTime12('12:00')).toBe('12:00 PM');
    expect(formatTime12('13:00')).toBe('1:00 PM');
    expect(formatTime12('17:00')).toBe('5:00 PM');
  });

  it('generates unique booking references prefixed with RDM-', () => {
    const ref1 = generateReference();
    const ref2 = generateReference();
    expect(ref1).toMatch(/^RDM-[A-Z0-9]{6}$/);
    expect(ref2).toMatch(/^RDM-[A-Z0-9]{6}$/);
    expect(ref1).not.toBe(ref2);
  });

  it('rejects dates in the past', () => {
    const result = isDateBookable('2026-10-19', mockTorontoNow);
    expect(result.bookable).toBe(false);
    expect(result.reason).toBe('Date is in the past');
  });

  it('rejects dates more than 60 days in advance', () => {
    const result = isDateBookable('2027-03-01', mockTorontoNow);
    expect(result.bookable).toBe(false);
    expect(result.reason).toContain('Cannot book more than 60 days in advance');
  });

  it('rejects Sundays when shop is closed', () => {
    // 2026-10-25 is a Sunday
    const result = isDateBookable('2026-10-25', mockTorontoNow);
    expect(result.bookable).toBe(false);
    expect(result.reason).toBe('Shop is closed on this day');
  });

  it('rejects Ontario statutory holidays (blackout dates)', () => {
    // Set a date 30 days before Christmas Day 2026-12-25 so it falls within 60 days
    const mockNovDate: TorontoTimeParts = {
      ...mockTorontoNow,
      month: 11,
      day: 15,
      dateString: '2026-11-15'
    };
    const result = isDateBookable('2026-12-25', mockNovDate);
    expect(result.bookable).toBe(false);
    expect(result.reason).toBe('Shop is closed for statutory holiday');
  });

  it('allows open weekdays within 60 days', () => {
    // 2026-10-21 is Wednesday
    const result = isDateBookable('2026-10-21', mockTorontoNow);
    expect(result.bookable).toBe(true);
  });

  it('generates correct slot sequence (8:00 to 17:00, last slot ending at 18:00 close)', () => {
    const result = getSlotsForDate('2026-10-21', [], mockTorontoNow);
    expect(result.error).toBeUndefined();
    expect(result.slots.length).toBe(10); // 8, 9, 10, 11, 12, 13, 14, 15, 16, 17
    expect(result.slots[0].time).toBe('08:00');
    expect(result.slots[result.slots.length - 1].time).toBe('17:00');
  });

  it('enforces same-day cutoff: slots less than 2 hours from current time are past_cutoff', () => {
    // On 2026-10-20 at 10:30 AM, cutoff is 12:30 PM (10:30 + 2h).
    // 08:00, 09:00, 10:00, 11:00, 12:00 should be past_cutoff
    // 13:00, 14:00, 15:00, 16:00, 17:00 should be available
    const result = getSlotsForDate('2026-10-20', [], mockTorontoNow);
    const slots = result.slots;

    const slot11 = slots.find(s => s.time === '11:00');
    const slot12 = slots.find(s => s.time === '12:00');
    const slot13 = slots.find(s => s.time === '13:00');

    expect(slot11?.available).toBe(false);
    expect(slot11?.reason).toBe('past_cutoff');

    expect(slot12?.available).toBe(false);
    expect(slot12?.reason).toBe('past_cutoff');

    expect(slot13?.available).toBe(true);
  });

  it('enforces slot capacity: 2 booked vehicles marks slot booked_full', () => {
    const existingBookings = [
      { slot_time: '14:00' },
      { slot_time: '14:00' },
      { slot_time: '15:00' } // 1 booking only
    ];

    const result = getSlotsForDate('2026-10-21', existingBookings, mockTorontoNow);
    const slot14 = result.slots.find(s => s.time === '14:00');
    const slot15 = result.slots.find(s => s.time === '15:00');

    expect(slot14?.bookedCount).toBe(2);
    expect(slot14?.available).toBe(false);
    expect(slot14?.reason).toBe('booked_full');

    expect(slot15?.bookedCount).toBe(1);
    expect(slot15?.available).toBe(true);
  });
});
