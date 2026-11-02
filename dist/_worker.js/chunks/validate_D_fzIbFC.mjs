globalThis.process ??= {}; globalThis.process.env ??= {};
import { o as objectType, l as stringType, n as unionType, p as booleanType } from './astro/server_BfFI7yxH.mjs';

const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
const bookingSchema = objectType({
  service: stringType().min(1, "Please select a service"),
  slot_date: stringType().regex(/^\d{4}-\d{2}-\d{2}$/, "Please pick a valid date (YYYY-MM-DD)"),
  slot_time: stringType().regex(/^\d{2}:\d{2}$/, "Please pick a valid time slot (HH:MM)"),
  customer_name: stringType().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  phone: stringType().trim().min(10, "Please enter a valid phone number").regex(phoneRegex, "Please enter a valid phone number (e.g. 365-524-2003)"),
  email: stringType().trim().email("Please enter a valid email address").toLowerCase(),
  vehicle: stringType().trim().min(3, "Please provide vehicle year, make, and model (e.g. 2018 Honda Civic)"),
  notes: stringType().trim().max(1e3, "Notes must be under 1000 characters").optional().default(""),
  insurance_claim: unionType([booleanType(), stringType()]).transform((val) => val === true || val === "true" || val === "on" || val === "1"),
  privacy_consent: unionType([booleanType(), stringType()]).refine((val) => val === true || val === "true" || val === "on" || val === "1", {
    message: "You must consent to the privacy policy to submit a booking"
  }),
  turnstile_token: stringType().optional(),
  website: stringType().optional()
  // Honeypot field - must be empty
});
const contactSchema = objectType({
  name: stringType().trim().min(2, "Name must be at least 2 characters"),
  phone: stringType().trim().min(10, "Please enter a valid phone number").regex(phoneRegex, "Please enter a valid phone number"),
  email: stringType().trim().email("Please enter a valid email address").toLowerCase(),
  service: stringType().optional(),
  message: stringType().trim().min(5, "Message must be at least 5 characters").max(1500, "Message is too long"),
  website: stringType().optional()
  // Honeypot field
});

export { bookingSchema as b, contactSchema as c };
