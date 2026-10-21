export interface ServiceImageMetadata {
  src: string;
  alt: string;
  caption?: string;
  isCover?: boolean;
}

export const serviceImageOverrides: Record<string, Record<string, { alt?: string; caption?: string }>> = {
  "brakes": {
    "cover.jpg": {
      alt: "Brake service and ceramic pad installation at Royal Drive Mechanics, Mississauga",
      caption: "Precision brake rotor and caliper servicing"
    },
    "01.jpg": {
      alt: "Rotor resurfacing and measurement at Royal Drive Mechanics",
      caption: "Digital micrometer rotor inspection"
    }
  },
  "oil-changes": {
    "cover.jpg": {
      alt: "Full synthetic oil and filter change at Royal Drive Mechanics, Mississauga",
      caption: "OEM-grade synthetic oil replacement"
    }
  },
  "collision-repairs": {
    "cover.jpg": {
      alt: "Collision repair and auto body panel restoration in Mississauga",
      caption: "Insurance claim collision repair and paint blending"
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
