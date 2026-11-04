import { useState, useEffect, useRef } from 'preact/hooks';
import type { ServiceImageMetadata } from '../../data/serviceImages';

interface Props {
  images: ServiceImageMetadata[];
  serviceName: string;
}

export default function ImageLightbox({ images, serviceName }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  };

  const prevImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  // Keyboard navigation & Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    if (selectedIndex !== null) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex]);

  // Touch handlers for mobile swipe in lightbox
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null || selectedIndex === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextImage();
      else prevImage();
    }
    touchStartX.current = null;
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div>
      {/* Thumbnail Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => openLightbox(idx)}
            aria-label={`View photo ${idx + 1} of ${serviceName}`}
            className="group relative aspect-[3/2] overflow-hidden rounded-card border border-brand-border bg-brand-surface hover:border-brand-red transition-all focus:outline-none focus:ring-2 focus:ring-brand-red"
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-semibold px-2.5 py-1 bg-brand-red rounded shadow">
                🔍 Enlarge
              </span>
            </div>
            {img.caption && (
              <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[11px] text-brand-grey px-2 py-1 truncate">
                {img.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Accessible Fullscreen Modal / Lightbox */}
      {selectedIndex !== null && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo gallery for ${serviceName}`}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          onClick={(e) => {
            if (e.target === modalRef.current) closeLightbox();
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar with Counter & Close */}
          <div className="flex items-center justify-between text-white max-w-6xl mx-auto w-full z-10">
            <div className="text-sm font-medium text-brand-grey">
              {serviceName} · <span className="text-white">{selectedIndex + 1}</span> of {images.length}
            </div>
            <button
              onClick={closeLightbox}
              aria-label="Close photo lightbox (Esc)"
              className="w-10 h-10 rounded-full bg-brand-surface border border-brand-border text-white hover:bg-brand-red hover:border-brand-red flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-brand-red"
            >
              ✕
            </button>
          </div>

          {/* Main Image Stage */}
          <div className="relative flex items-center justify-center flex-1 max-w-5xl mx-auto w-full my-4 overflow-hidden">
            {images.length > 1 && (
              <button
                onClick={prevImage}
                aria-label="Previous photo (Left arrow)"
                className="absolute left-2 sm:left-4 z-20 w-12 h-12 rounded-full bg-brand-charcoal/80 border border-brand-border text-white hover:bg-brand-red hover:border-brand-red flex items-center justify-center text-xl transition focus:outline-none focus:ring-2 focus:ring-brand-red"
              >
                ‹
              </button>
            )}

            <div className="max-h-[75vh] max-w-full flex flex-col items-center justify-center">
              <img
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                className="max-h-[70vh] max-w-full object-contain rounded-card shadow-2xl border border-brand-border/60"
              />
              <p className="mt-3 text-sm text-center text-brand-grey max-w-2xl px-4">
                {images[selectedIndex].caption || images[selectedIndex].alt}
              </p>
            </div>

            {images.length > 1 && (
              <button
                onClick={nextImage}
                aria-label="Next photo (Right arrow)"
                className="absolute right-2 sm:right-4 z-20 w-12 h-12 rounded-full bg-brand-charcoal/80 border border-brand-border text-white hover:bg-brand-red hover:border-brand-red flex items-center justify-center text-xl transition focus:outline-none focus:ring-2 focus:ring-brand-red"
              >
                ›
              </button>
            )}
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="max-w-4xl mx-auto w-full overflow-x-auto py-2 flex items-center justify-center gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                aria-label={`Jump to photo ${idx + 1}`}
                aria-current={selectedIndex === idx ? 'true' : 'false'}
                className={`w-16 h-12 flex-shrink-0 rounded overflow-hidden border-2 transition ${
                  selectedIndex === idx ? 'border-brand-red scale-105' : 'border-brand-border opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img.src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
