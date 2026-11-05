globalThis.process ??= {}; globalThis.process.env ??= {};
import { b as businessConfig } from './business_CgHEbruk.mjs';

const inMemoryBookings = [];
async function getBookedSlotsForDate(d1, slotDate) {
  if (d1 && typeof d1.prepare === "function") {
    try {
      const stmt = d1.prepare(
        "SELECT slot_time, COUNT(*) as count FROM bookings WHERE slot_date = ? AND status = 'confirmed' GROUP BY slot_time"
      );
      const res = await stmt.bind(slotDate).all();
      return res && res.results ? res.results : [];
    } catch (err) {
      console.error("D1 slot query failed, falling back to memory store:", err);
    }
  }
  const counts = /* @__PURE__ */ new Map();
  for (const b of inMemoryBookings) {
    if (b.slot_date === slotDate && b.status === "confirmed") {
      counts.set(b.slot_time, (counts.get(b.slot_time) || 0) + 1);
    }
  }
  return Array.from(counts.entries()).map(([slot_time, count]) => ({ slot_time, count }));
}
async function createBookingAtomic(d1, booking) {
  const maxCapacity = businessConfig.slots.capacityPerSlot;
  if (d1 && typeof d1.prepare === "function") {
    try {
      const countStmt = d1.prepare(
        "SELECT COUNT(*) as count FROM bookings WHERE slot_date = ? AND slot_time = ? AND status = 'confirmed'"
      );
      const countResult = await countStmt.bind(booking.slot_date, booking.slot_time).first();
      const currentCount2 = countResult && typeof countResult.count === "number" ? countResult.count : 0;
      if (currentCount2 >= maxCapacity) {
        return {
          success: false,
          error: "That slot was just taken, please choose another slot."
        };
      }
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
        booking.status || "confirmed",
        booking.email_status || "pending"
      ).run();
      return {
        success: true,
        booking: {
          ...booking,
          created_at: (/* @__PURE__ */ new Date()).toISOString()
        }
      };
    } catch (err) {
      console.error("D1 atomic insert exception:", err);
      if (err?.message?.includes("UNIQUE constraint failed")) {
        return { success: false, error: "A booking with this reference already exists." };
      }
      return { success: false, error: "Failed to record booking in database." };
    }
  }
  const currentCount = inMemoryBookings.filter(
    (b) => b.slot_date === booking.slot_date && b.slot_time === booking.slot_time && b.status === "confirmed"
  ).length;
  if (currentCount >= maxCapacity) {
    return {
      success: false,
      error: "That slot was just taken, please choose another slot."
    };
  }
  const record = {
    ...booking,
    id: inMemoryBookings.length + 1,
    created_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  inMemoryBookings.push(record);
  return { success: true, booking: record };
}
async function updateBookingEmailStatus(d1, reference, emailStatus) {
  if (d1 && typeof d1.prepare === "function") {
    try {
      const stmt = d1.prepare("UPDATE bookings SET email_status = ? WHERE reference = ?");
      await stmt.bind(emailStatus, reference).run();
      return;
    } catch (err) {
      console.error("Failed to update email status in D1:", err);
    }
  }
  const found = inMemoryBookings.find((b) => b.reference === reference);
  if (found) {
    found.email_status = emailStatus;
  }
}

export { createBookingAtomic as c, getBookedSlotsForDate as g, updateBookingEmailStatus as u };
