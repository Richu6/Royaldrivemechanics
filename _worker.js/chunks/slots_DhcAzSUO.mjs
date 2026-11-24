globalThis.process ??= {}; globalThis.process.env ??= {};
import { b as businessConfig } from './business_CgHEbruk.mjs';

function getTorontoDateTime(date = /* @__PURE__ */ new Date()) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: businessConfig.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    weekday: "long"
  });
  const parts = formatter.formatToParts(date);
  const partMap = {};
  for (const p of parts) {
    partMap[p.type] = p.value;
  }
  const year = parseInt(partMap.year, 10);
  const month = parseInt(partMap.month, 10);
  const day = parseInt(partMap.day, 10);
  const hour = parseInt(partMap.hour === "24" ? "0" : partMap.hour, 10);
  const minute = parseInt(partMap.minute, 10);
  const dayOfWeek = (partMap.weekday || "").toLowerCase();
  const pad = (n) => n.toString().padStart(2, "0");
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
    timeString
  };
}
function formatTime12(time24) {
  const [hStr, mStr] = time24.split(":");
  const hour = parseInt(hStr, 10);
  const m = mStr || "00";
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${m} ${period}`;
}
function generateReference() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `RDM-${code}`;
}
function isDateBookable(dateStr, currentToronto) {
  const toronto = currentToronto || getTorontoDateTime();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return { bookable: false, reason: "Invalid date format" };
  }
  if (dateStr < toronto.dateString) {
    return { bookable: false, reason: "Date is in the past" };
  }
  const [y, m, d] = dateStr.split("-").map(Number);
  const targetDate = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const todayDate = new Date(Date.UTC(toronto.year, toronto.month - 1, toronto.day, 12, 0, 0));
  const diffDays = Math.round((targetDate.getTime() - todayDate.getTime()) / (1e3 * 60 * 60 * 24));
  if (diffDays > businessConfig.slots.maxAdvanceDays) {
    return { bookable: false, reason: `Cannot book more than ${businessConfig.slots.maxAdvanceDays} days in advance` };
  }
  if (businessConfig.blackoutDates.includes(dateStr)) {
    return { bookable: false, reason: "Shop is closed for statutory holiday" };
  }
  const dayIndex = targetDate.getUTCDay();
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const dayName = days[dayIndex];
  const hoursConfig = businessConfig.hours[dayName];
  if (!hoursConfig || hoursConfig.closed) {
    return { bookable: false, reason: "Shop is closed on this day" };
  }
  return { bookable: true };
}
function getSlotsForDate(dateStr, existingBookings = [], currentToronto) {
  const toronto = currentToronto || getTorontoDateTime();
  const dateCheck = isDateBookable(dateStr, toronto);
  if (!dateCheck.bookable) {
    return { date: dateStr, slots: [], error: dateCheck.reason };
  }
  const [y, m, d] = dateStr.split("-").map(Number);
  const targetDate = new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const dayName = days[targetDate.getUTCDay()];
  const hoursConfig = businessConfig.hours[dayName];
  if (!hoursConfig || hoursConfig.closed) {
    return { date: dateStr, slots: [], error: "Shop is closed" };
  }
  const countsMap = /* @__PURE__ */ new Map();
  for (const b of existingBookings) {
    const key = b.slot_time.substring(0, 5);
    const existing = countsMap.get(key) || 0;
    countsMap.set(key, existing + (b.count !== void 0 ? b.count : 1));
  }
  const [openH, openM] = hoursConfig.open.split(":").map(Number);
  const [closeH, closeM] = hoursConfig.close.split(":").map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;
  const slotLength = businessConfig.slots.slotLengthMinutes;
  const maxCapacity = businessConfig.slots.capacityPerSlot;
  const leadHours = businessConfig.slots.sameDayLeadTimeHours;
  const slots = [];
  const isToday = dateStr === toronto.dateString;
  const currentMinutesInDay = toronto.hour * 60 + toronto.minute;
  const cutoffMinutes = currentMinutesInDay + leadHours * 60;
  for (let current = openMinutes; current + slotLength <= closeMinutes; current += slotLength) {
    const h = Math.floor(current / 60);
    const min = current % 60;
    const timeKey = `${h.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
    const bookedCount = countsMap.get(timeKey) || 0;
    let available = true;
    let reason = void 0;
    if (bookedCount >= maxCapacity) {
      available = false;
      reason = "booked_full";
    } else if (isToday && current < cutoffMinutes) {
      available = false;
      reason = "past_cutoff";
    }
    slots.push({
      time: timeKey,
      displayTime: formatTime12(timeKey),
      available,
      capacity: maxCapacity,
      bookedCount,
      reason
    });
  }
  return { date: dateStr, slots };
}

export { getSlotsForDate as a, generateReference as b, formatTime12 as f, getTorontoDateTime as g };
