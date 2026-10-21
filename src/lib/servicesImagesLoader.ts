import { serviceImageOverrides, getDefaultAlt, type ServiceImageMetadata } from '../data/serviceImages';

export interface ServiceImagesResult {
  hasCover: boolean;
  coverImage?: ServiceImageMetadata;
  galleryImages: ServiceImageMetadata[];
}

// Automatically detect images via Vite's import.meta.glob so dropping any file into
// /public/images/services/<slug>/ works immediately without code changes
const imageGlob = import.meta.glob<{ default: any }>(
  '/public/images/services/**/*.{jpg,jpeg,png,webp,avif}',
  { eager: true }
);

/**
 * Loads service images dynamically from /public/images/services/<slug>
 * Looks for cover.jpg / cover.png / cover.webp and gallery images 01.jpg, 02.jpg, etc.
 */
export function getServiceImages(serviceSlug: string, serviceName: string): ServiceImagesResult {
  const prefix = `/public/images/services/${serviceSlug}/`;
  
  // Find all matched image paths for this specific service slug
  const matchedPaths = Object.keys(imageGlob).filter((p) => p.startsWith(prefix));

  if (matchedPaths.length === 0) {
    return { hasCover: false, galleryImages: [] };
  }

  // Extract filenames
  const fileMap = matchedPaths.map((p) => {
    const filename = p.slice(prefix.length);
    // Public web URL strips '/public'
    const webSrc = p.replace(/^\/public/, '');
    return {
      path: p,
      filename,
      webSrc,
    };
  });

  // Identify cover image (e.g. cover.jpg, cover.png)
  const coverEntry = fileMap.find((item) => item.filename.toLowerCase().startsWith('cover.'));
  let coverImage: ServiceImageMetadata | undefined;

  if (coverEntry) {
    const overrides = serviceImageOverrides[serviceSlug]?.[coverEntry.filename];
    coverImage = {
      src: coverEntry.webSrc,
      alt: overrides?.alt || getDefaultAlt(serviceName, coverEntry.filename),
      caption: overrides?.caption,
      isCover: true,
    };
  }

  // Identify gallery images (e.g. 01.jpg, 02.jpg... or any other image except cover)
  const galleryEntries = fileMap
    .filter((item) => item !== coverEntry)
    .sort((a, b) => a.filename.localeCompare(b.filename, undefined, { numeric: true, sensitivity: 'base' }))
    .slice(0, 8); // Up to 8 per service

  const galleryImages: ServiceImageMetadata[] = galleryEntries.map((item) => {
    const overrides = serviceImageOverrides[serviceSlug]?.[item.filename];
    return {
      src: item.webSrc,
      alt: overrides?.alt || getDefaultAlt(serviceName, item.filename),
      caption: overrides?.caption,
      isCover: false,
    };
  });

  return {
    hasCover: !!coverImage,
    coverImage,
    galleryImages,
  };
}
