export interface ServiceImageMetadata {
  src: string;
  alt: string;
  caption?: string;
  isCover?: boolean;
}

export const serviceImageOverrides: Record<string, Record<string, { alt?: string; caption?: string }>> = {
  "oil-changes": {
    "cover.jpg": {
      alt: "Oil Changes & Maintenance at Royal Drive Mechanics, Mississauga",
      caption: "High-grade engine oil draining and OEM filter replacement"
    }
  },
  "brakes": {
    "cover.jpg": {
      alt: "Brake Repair & Service at Royal Drive Mechanics, Mississauga",
      caption: "Brake system overhaul with premium Bosch pads and rotor inspection"
    }
  },
  "safety-inspections": {
    "cover.jpg": {
      alt: "Vehicle Safety Inspections at Royal Drive Mechanics, Mississauga",
      caption: "Licensed MTO Safety Inspection and digital certification"
    }
  },
  "engine-transmissions": {
    "cover.jpg": {
      alt: "Engine & Transmission Services at Royal Drive Mechanics, Mississauga",
      caption: "Complete engine and transmission assembly service on hoist"
    }
  },
  "suspension": {
    "cover.jpg": {
      alt: "Suspension & Steering inspection and repair at Royal Drive Mechanics, Mississauga",
      caption: "Complete suspension, strut, and steering alignment inspection"
    }
  },
  "tune-ups": {
    "cover.jpg": {
      alt: "Engine Tune-Ups and computer diagnostics at Royal Drive Mechanics, Mississauga",
      caption: "Advanced live-data computer diagnostics and tune-up"
    }
  },
  "collision-repairs": {
    "cover.jpg": {
      alt: "Collision Repair, auto body work, and paint prep at Royal Drive Mechanics, Mississauga",
      caption: "Precision body panel prep, sanding, and insurance restoration"
    }
  }
};

/**
 * Returns default fallback alt text for any service image
 */
export function getDefaultAlt(serviceName: string, filename: string): string {
  const cleanName = filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
  return `${serviceName} - ${cleanName} at Royal Drive Mechanics, Mississauga, Ontario`;
}
