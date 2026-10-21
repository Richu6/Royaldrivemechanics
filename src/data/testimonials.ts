export interface CustomerTestimonial {
  id: string;
  quote: string;
  name: string;
  source: string;
  serviceTag?: string;
}

export const testimonialsData: CustomerTestimonial[] = [
  {
    id: "test-1",
    quote: "I truly appreciate the honest work and would definitely recommend them to anyone looking for reliable auto repairs. Hats off to Mirshad for all the help.",
    name: "Adithya R.",
    source: "Google review",
    serviceTag: "Auto Repairs"
  },
  {
    id: "test-2",
    quote: "Great place to give your car. Trusted guys. Vishnu, Hathim, Mirshad. Good team to go ahead with your auto maintenance. Affordable service.",
    name: "Abhijith D.",
    source: "Google review (Local Guide)",
    serviceTag: "Maintenance"
  },
  {
    id: "test-3",
    quote: "Fast, friendly, and expert service! Fixed my car quickly and the price was reasonable. 10/10 would recommend!",
    name: "Abhi S.",
    source: "Google review",
    serviceTag: "Fast Repairs"
  },
  {
    id: "test-4",
    quote: "Mirshad provided great service at the best price.",
    name: "Google reviewer",
    source: "Google review",
    serviceTag: "Brakes & Maintenance"
  },
  {
    id: "test-5",
    quote: "Excellent service and reasonable rate!",
    name: "Google reviewer",
    source: "Google review",
    serviceTag: "Oil & Inspection"
  }
];
