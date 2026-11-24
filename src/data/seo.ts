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
    description: "Top-rated auto repair & MTO safety inspection in Mississauga. Fast, honest mechanics for all makes & models. Call 365-524-2003.",
    primaryKeyword: "auto repair Mississauga",
    secondaryKeywords: ["mechanic Mississauga", "car repair Mississauga Ontario", "auto mechanic Royal Windsor Drive"],
    canonicalPath: "/",
  },
  services: {
    title: "Auto Repair & Maintenance Services in Mississauga | RDM",
    description: "Complete auto care in Mississauga: oil changes, brakes, safety inspection, engine, suspension & collision. Call 365-524-2003.",
    primaryKeyword: "auto repair services Mississauga",
    secondaryKeywords: ["car maintenance Mississauga", "collision repair Mississauga", "MTO safety inspection Mississauga"],
    canonicalPath: "/services",
  },
  "oil-changes": {
    title: "Oil Changes & Auto Maintenance Mississauga | RDM",
    description: "Fast synthetic & conventional oil changes in Mississauga. Includes OEM filter & multi-point check. Call 365-524-2003.",
    primaryKeyword: "oil change Mississauga",
    secondaryKeywords: ["synthetic oil change Mississauga", "fast oil change Mississauga", "oil and filter service Mississauga"],
    canonicalPath: "/services/oil-changes",
  },
  brakes: {
    title: "Brake Repair & Pad Replacement Mississauga | RDM",
    description: "Precision brake repairs, ceramic pads & rotor service in Mississauga. 15% off promo! Book or call 365-524-2003.",
    primaryKeyword: "brake repair Mississauga",
    secondaryKeywords: ["brake service Mississauga", "brake pad replacement Mississauga", "brake rotor replacement Mississauga"],
    canonicalPath: "/services/brakes",
  },
  "safety-inspections": {
    title: "MTO Vehicle Safety Inspection Mississauga | RDM",
    description: "Licensed Ontario MTO safety inspection station in Mississauga. Fast Safety Standards Certificate (SSC). Call 365-524-2003.",
    primaryKeyword: "safety inspection Mississauga Ontario",
    secondaryKeywords: ["certified vehicle inspection Mississauga", "Ontario safety certificate Mississauga", "used car safety inspection Mississauga"],
    canonicalPath: "/services/safety-inspections",
  },
  "engine-transmissions": {
    title: "Engine & Transmission Repair Mississauga | RDM",
    description: "Expert engine diagnostics & transmission repairs in Mississauga. Clear written estimates. Book or call 365-524-2003.",
    primaryKeyword: "engine and transmission repair Mississauga",
    secondaryKeywords: ["check engine light diagnostic Mississauga", "transmission service Mississauga", "engine repair Mississauga"],
    canonicalPath: "/services/engine-transmissions",
  },
  suspension: {
    title: "Suspension & Steering Repair Mississauga | RDM",
    description: "Fix clunks, struts, shocks & steering wander in Mississauga. Honest suspension inspections. Call 365-524-2003.",
    primaryKeyword: "suspension repair Mississauga",
    secondaryKeywords: ["strut replacement Mississauga", "shocks and struts Mississauga", "steering repair Mississauga"],
    canonicalPath: "/services/suspension",
  },
  "tune-ups": {
    title: "Engine Tune-Up & Computer Diagnostics Mississauga | RDM",
    description: "Restore engine power, smooth idle & gas mileage with a complete tune-up in Mississauga. Call 365-524-2003.",
    primaryKeyword: "car tune-up Mississauga",
    secondaryKeywords: ["engine tune up Mississauga", "spark plug replacement Mississauga", "ignition diagnostic Mississauga"],
    canonicalPath: "/services/tune-ups",
  },
  "collision-repairs": {
    title: "Auto Collision & Body Repair Mississauga | RDM",
    description: "Trusted auto body & collision repair in Mississauga. Direct insurance billing & free estimates. Call 365-524-2003.",
    primaryKeyword: "collision repair Mississauga",
    secondaryKeywords: ["auto body insurance claim Mississauga", "car accident repair Mississauga", "auto body shop Mississauga"],
    canonicalPath: "/services/collision-repairs",
  },
  book: {
    title: "Book Auto Service Online Mississauga | Royal Drive Mechanics",
    description: "Book your auto service slot online with instant confirmation. Royal Drive Mechanics in Mississauga. Call 365-524-2003.",
    primaryKeyword: "book mechanic appointment Mississauga",
    secondaryKeywords: ["auto repair booking Mississauga", "schedule car service Mississauga"],
    canonicalPath: "/book",
  },
  contact: {
    title: "Contact Royal Drive Mechanics | Auto Shop Mississauga",
    description: "Visit Unit 6, 2630 Royal Windsor Dr, Mississauga. Call, text, WhatsApp or book online. Phone: 365-524-2003.",
    primaryKeyword: "mechanic contact Mississauga",
    secondaryKeywords: ["auto shop phone number Mississauga", "mechanic Royal Windsor Drive"],
    canonicalPath: "/contact",
  },
  privacy: {
    title: "Privacy Policy | Royal Drive Mechanics Mississauga",
    description: "Privacy policy of Royal Drive Mechanics. Learn how your customer & booking data is protected under PIPEDA.",
    primaryKeyword: "privacy policy Royal Drive Mechanics",
    secondaryKeywords: ["auto repair privacy policy", "customer data protection Mississauga auto"],
    canonicalPath: "/privacy",
  },
  terms: {
    title: "Terms of Service | Royal Drive Mechanics Mississauga",
    description: "Service terms, estimate policies, and booking details for Royal Drive Mechanics in Mississauga, Ontario.",
    primaryKeyword: "terms of service Royal Drive Mechanics",
    secondaryKeywords: ["auto shop terms Mississauga", "mechanic estimate policy"],
    canonicalPath: "/terms",
  },
};
