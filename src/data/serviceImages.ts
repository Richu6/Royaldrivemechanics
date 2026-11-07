export interface ServiceImageMetadata {
  src: string;
  alt: string;
  caption?: string;
  isCover?: boolean;
}

export const serviceImageOverrides: Record<string, Record<string, { alt?: string; caption?: string }>> = {
  "oil-changes": {
    "cover.jpg": {
      alt: "Full synthetic oil and filter replacement at Royal Drive Mechanics, Mississauga",
      caption: "High-grade engine oil draining and OEM filter replacement"
    }
  },
  "tune-ups": {
    "cover.jpg": {
      alt: "Comprehensive engine computer diagnostics and tune-up at Royal Drive Mechanics",
      caption: "Advanced live-data computer diagnostics and tune-up"
    }
  },
  "suspension": {
    "cover.jpg": {
      alt: "Suspension inspection, strut, and control arm servicing at Royal Drive Mechanics",
      caption: "Complete suspension, strut, and steering alignment inspection"
    }
  },
  "engine-transmissions": {
    "cover.jpg": {
      alt: "Heavy-duty engine and transmission rebuild and replacement at Royal Drive Mechanics",
      caption: "Complete engine and transmission assembly service on hoist"
    }
  },
  "brakes": {
    "cover.jpg": {
      alt: "Precision brake rotor, caliper, and Bosch brake pad installation at Royal Drive Mechanics",
      caption: "Brake system overhaul with premium Bosch pads and rotor inspection"
    }
  },
  "safety-inspections": {
    "cover.jpg": {
      alt: "Official Ministry of Transportation Ontario DriveON Safety Inspection Station at Royal Drive Mechanics",
      caption: "Licensed MTO Safety Inspection and digital certification"
    }
  },
  "collision-repairs": {
    "cover.jpg": {
      alt: "Professional collision repair, body work, and paint prep at Royal Drive Mechanics",
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
