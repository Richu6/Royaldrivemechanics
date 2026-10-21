export interface BusinessHours {
  open: string;  // HH:MM 24h
  close: string; // HH:MM 24h
  closed: boolean;
}

export interface PromotionConfig {
  enabled: boolean;
  title: string;
  badge: string;
  description: string;
  termsNote: string;
  termsLink: string;
  endDate?: string; // ISO date string e.g. "2026-12-31"
}

export const businessConfig = {
  name: "Royal Drive Mechanics",
  shortName: "RDM",
  taglines: {
    primary: "Your Car. Our Passion. Your Peace of Mind.",
    secondary: "Trusted Care. Built to Last.",
    tertiary: "Complete Auto Care You Can Count On",
  },
  type: "Mechanical & collision services. Works with all major insurance companies.",
  address: {
    street: "Unit 6, 2630 Royal Windsor Drive",
    city: "Mississauga",
    province: "ON",
    postalCode: "L5J 1K7",
    country: "Canada",
    full: "Unit 6, 2630 Royal Windsor Drive, Mississauga, ON L5J 1K7, Canada",
    coordinates: {
      latitude: 43.5117,
      longitude: -79.6288,
    },
    googleMapsUrl: "https://maps.google.com/?q=Unit+6,+2630+Royal+Windsor+Drive,+Mississauga,+ON+L5J+1K7",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2894.887969315574!2d-79.6312484!3d43.5116766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b437dc95648f5%3A0x7d6f5f3e4e9a3ef0!2s2630%20Royal%20Windsor%20Dr%20%236%2C%20Mississauga%2C%20ON%20L5J%201K7!5e0!3m2!1sen!2sca!4v1700000000000!5m2!1sen!2sca",
  },
  contact: {
    phone: "365-524-2003",
    phoneIntl: "+1 365-524-2003",
    phoneTel: "tel:+13655242003",
    contactPerson: "Mirshad",
    email: "royaldrivemechanics@gmail.com",
    emailMailto: "mailto:royaldrivemechanics@gmail.com",
    instagramHandle: "@Royaldrive_mechanics",
    instagramUrl: "https://instagram.com/Royaldrive_mechanics",
    enableWhatsApp: true, // Default ON - TO CONFIRM WITH OWNER if number is on WhatsApp
    whatsappUrl: "https://wa.me/13655242003?text=Hi%20Royal%20Drive%20Mechanics%2C%20I%27d%20like%20to%20ask%20about...",
    smsUrl: "sms:+13655242003",
  },
  googleReviews: {
    rating: 4.8,
    reviewCount: 24,
    googleReviewUrl: "https://www.google.com/maps/search/?api=1&query=Royal+Drive+Mechanics+Mississauga",
    googleLeaveReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJ9UhWyX1EK4gR8D6eTn5fb30",
  },
  credentials: {
    mtoLicense: "Licensed Motor Vehicle Inspection Station, Ontario Ministry of Transportation",
    certifiedInspectionCentre: "Certified Vehicle Inspection Centre",
    inspectionTagline: "Drive with confidence.",
    insuranceStatus: "Works directly with all major insurance companies",
  },
  // NOTE: Closing time is confirmed at 6:00 pm. Opening time and days are TO CONFIRM WITH OWNER.
  // Placeholder defaults: Mon-Sat 8:00 AM - 6:00 PM, Sunday closed.
  hours: {
    monday:    { open: "08:00", close: "18:00", closed: false },
    tuesday:   { open: "08:00", close: "18:00", closed: false },
    wednesday: { open: "08:00", close: "18:00", closed: false },
    thursday:  { open: "08:00", close: "18:00", closed: false },
    friday:    { open: "08:00", close: "18:00", closed: false },
    saturday:  { open: "08:00", close: "18:00", closed: false },
    sunday:    { open: "00:00", close: "00:00", closed: true },
  } as Record<string, BusinessHours>,
  displayHours: [
    { days: "Monday – Saturday", time: "8:00 AM – 6:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],
  timeZone: "America/Toronto",
  // Slot booking settings
  slots: {
    slotLengthMinutes: 60,
    capacityPerSlot: 2, // 2 vehicles at once (the shop's bays)
    maxAdvanceDays: 60,
    sameDayLeadTimeHours: 2, // minimum 2 hours notice for same-day bookings
  },
  // Ontario statutory holidays and planned blackout dates (YYYY-MM-DD)
  blackoutDates: [
    "2026-01-01", // New Year's Day
    "2026-02-16", // Family Day (Ontario)
    "2026-04-03", // Good Friday
    "2026-05-18", // Victoria Day
    "2026-07-01", // Canada Day
    "2026-08-03", // Civic Holiday
    "2026-09-07", // Labour Day
    "2026-10-12", // Thanksgiving
    "2026-12-25", // Christmas Day
    "2026-12-26", // Boxing Day
    "2027-01-01", // New Year's Day 2027
  ],
  promotion: {
    enabled: true,
    badge: "Limited Time Offer",
    title: "15% OFF on Brakes & Oil Changes",
    description: "Keep your vehicle running safely and smoothly with 15% off brake services and oil changes. Terms and conditions apply.",
    termsNote: "Contact us for details",
    termsLink: "/terms#offer-terms",
    endDate: "2026-12-31",
  } as PromotionConfig,
  // Suggested service areas - TO CONFIRM WITH OWNER
  serviceAreas: [
    "Mississauga",
    "Oakville",
    "Brampton",
    "Etobicoke",
    "Toronto West",
  ],
};
