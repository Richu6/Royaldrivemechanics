export interface PageSEO {
  title: string;
  description: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  canonicalPath: string;
}

export const seoData: Record<string, PageSEO> = {
  home: {
    title: "Auto Repair in Mississauga | Royal Drive Mechanics | 4.8★",
    description: "Licensed MTO inspection station and collision repair shop in Mississauga. Fast, honest auto care. Rated 4.8 on Google. Book online or call 365-524-2003.",
    primaryKeyword: "auto repair Mississauga",
    secondaryKeywords: ["mechanic Mississauga", "car repair Mississauga Ontario", "auto mechanic Royal Windsor Drive"],
    canonicalPath: "/",
  },
  services: {
    title: "Mechanical & Collision Services Mississauga | RDM",
    description: "Complete auto care in Mississauga: oil changes, brakes, tune-ups, suspension, transmission & collision work. Book online or call 365-524-2003.",
    primaryKeyword: "auto repair services Mississauga",
    secondaryKeywords: ["car maintenance Mississauga", "collision repair Mississauga", "MTO safety inspection Mississauga"],
    canonicalPath: "/services",
  },
  "oil-changes": {
    title: "Fast Oil Change in Mississauga | Synthetic & Blend | RDM",
    description: "Premium synthetic and conventional oil change service in Mississauga. OEM filters & fluid check included. Book online or call 365-524-2003.",
    primaryKeyword: "oil change Mississauga",
    secondaryKeywords: ["synthetic oil change Mississauga", "fast oil change Mississauga", "oil and filter service Mississauga"],
    canonicalPath: "/services/oil-changes",
  },
  "tune-ups": {
    title: "Car Tune-Up & Engine Diagnostic Mississauga | RDM",
    description: "Restore engine performance, smooth idling & fuel economy with a tune-up at Royal Drive Mechanics. Book online or call 365-524-2003.",
    primaryKeyword: "car tune-up Mississauga",
    secondaryKeywords: ["engine tune up Mississauga", "spark plug replacement Mississauga", "ignition diagnostic Mississauga"],
    canonicalPath: "/services/tune-ups",
  },
  suspension: {
    title: "Suspension Repair Mississauga | Shocks, Struts & Steering | RDM",
    description: "Fix clunks, bouncing & uneven tire wear with expert suspension repair in Mississauga. Shocks, struts & control arms. Call 365-524-2003.",
    primaryKeyword: "suspension repair Mississauga",
    secondaryKeywords: ["strut replacement Mississauga", "shocks and struts Mississauga", "steering repair Mississauga"],
    canonicalPath: "/services/suspension",
  },
  "engine-transmissions": {
    title: "Engine & Transmission Repair Mississauga | RDM Auto",
    description: "Expert engine diagnostics, timing chain repairs & transmission servicing in Mississauga. Honest written estimates. Call 365-524-2003.",
    primaryKeyword: "engine and transmission repair Mississauga",
    secondaryKeywords: ["check engine light diagnostic Mississauga", "transmission service Mississauga", "engine repair Mississauga"],
    canonicalPath: "/services/engine-transmissions",
  },
  brakes: {
    title: "Brake Repair Mississauga | Pads, Rotors & Calipers | RDM",
    description: "Stop safely every time with precision brake repair in Mississauga. Premium ceramic pads & rotor service. 15% off promo! Call 365-524-2003.",
    primaryKeyword: "brake repair Mississauga",
    secondaryKeywords: ["brake service Mississauga", "brake pad replacement Mississauga", "brake rotor replacement Mississauga"],
    canonicalPath: "/services/brakes",
  },
  "safety-inspections": {
    title: "MTO Safety Inspection Mississauga | Licensed Station | RDM",
    description: "Licensed MTO Motor Vehicle Inspection Station in Mississauga. Get your Ontario Safety Standards Certificate fast. Call 365-524-2003.",
    primaryKeyword: "safety inspection Mississauga Ontario",
    secondaryKeywords: ["certified vehicle inspection Mississauga", "Ontario safety certificate Mississauga", "used car safety inspection Mississauga"],
    canonicalPath: "/services/safety-inspections",
  },
  "collision-repairs": {
    title: "Collision Repair Mississauga | Insurance Claims Body Shop | RDM",
    description: "Collision repair & insurance claims in Mississauga. We work directly with all major insurance companies. Free estimate. Call 365-524-2003.",
    primaryKeyword: "collision repair Mississauga",
    secondaryKeywords: ["auto body insurance claim Mississauga", "car accident repair Mississauga", "auto body shop Mississauga"],
    canonicalPath: "/services/collision-repairs",
  },
  book: {
    title: "Book Auto Service Online Mississauga | Royal Drive Mechanics",
    description: "Choose your service, pick a date & time slot online with instant confirmation. Royal Drive Mechanics Mississauga. Call 365-524-2003.",
    primaryKeyword: "book mechanic appointment Mississauga",
    secondaryKeywords: ["auto repair booking Mississauga", "schedule oil change Mississauga", "car service appointment Mississauga"],
    canonicalPath: "/book",
  },
  contact: {
    title: "Contact Royal Drive Mechanics Mississauga | 365-524-2003",
    description: "Unit 6, 2630 Royal Windsor Drive, Mississauga. Call, text, WhatsApp or email Mirshad at RDM for auto repairs. Phone: 365-524-2003.",
    primaryKeyword: "mechanic near me Mississauga",
    secondaryKeywords: ["auto shop Royal Windsor Dr", "Mirshad mechanic Mississauga", "Royal Drive Mechanics phone"],
    canonicalPath: "/contact",
  },
  privacy: {
    title: "Privacy Policy | Royal Drive Mechanics Mississauga",
    description: "PIPEDA-compliant privacy policy of Royal Drive Mechanics. Learn how your booking data is stored securely and deleted after 12 months.",
    primaryKeyword: "privacy policy",
    secondaryKeywords: ["PIPEDA compliance", "customer data policy"],
    canonicalPath: "/privacy",
  },
  terms: {
    title: "Terms of Service & Offer Terms | Royal Drive Mechanics",
    description: "Booking terms, promotional offer details, and written estimate policy for Royal Drive Mechanics in Mississauga, Ontario.",
    primaryKeyword: "terms of service",
    secondaryKeywords: ["mechanic estimate policy Ontario", "promotional terms"],
    canonicalPath: "/terms",
  }
};
