import { z } from 'zod';

export const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

export const bookingSchema = z.object({
  service: z.string().min(1, 'Please select a service'),
  slot_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please pick a valid date (YYYY-MM-DD)'),
  slot_time: z.string().regex(/^\d{2}:\d{2}$/, 'Please pick a valid time slot (HH:MM)'),
  customer_name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  phone: z.string().trim().min(10, 'Please enter a valid phone number').regex(phoneRegex, 'Please enter a valid phone number (e.g. 365-524-2003)'),
  email: z.string().trim().email('Please enter a valid email address').toLowerCase(),
  vehicle: z.string().trim().min(3, 'Please provide vehicle year, make, and model (e.g. 2018 Honda Civic)'),
  notes: z.string().trim().max(1000, 'Notes must be under 1000 characters').optional().default(''),
  insurance_claim: z.union([z.boolean(), z.string()]).transform(val => val === true || val === 'true' || val === 'on' || val === '1'),
  privacy_consent: z.union([z.boolean(), z.string()]).refine(val => val === true || val === 'true' || val === 'on' || val === '1', {
    message: 'You must consent to the privacy policy to submit a booking'
  }),
  turnstile_token: z.string().optional(),
  website: z.string().optional(), // Honeypot field - must be empty
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  phone: z.string().trim().min(10, 'Please enter a valid phone number').regex(phoneRegex, 'Please enter a valid phone number'),
  email: z.string().trim().email('Please enter a valid email address').toLowerCase(),
  service: z.string().optional(),
  message: z.string().trim().min(5, 'Message must be at least 5 characters').max(1500, 'Message is too long'),
  website: z.string().optional(), // Honeypot field
});

export type ContactInput = z.infer<typeof contactSchema>;
