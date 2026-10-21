import { useState, useEffect, useRef } from 'preact/hooks';
import type { CustomerTestimonial } from '../../data/testimonials';

interface Props {
  testimonials: CustomerTestimonial[];
  googleReviewUrl: string;
  googleLeaveReviewUrl: string;
}

export default function TestimonialsCarousel({ testimonials, googleReviewUrl, googleLeaveReviewUrl }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const timerRef = useRef<any>(null);
  const animFrameRef = useRef<any>(null);
  const total = testimonials.length;

  useEffect(() => {
    // Check reduced motion
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    setProgress(0);
  };

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
    setProgress(0);
  };

  // Autoplay timer with smooth 6-second progress bar
  useEffect(() => {
    if (prefersReducedMotion || !isPlaying || isHovered) {
      return;
    }

    const duration = 6000;
    const interval = 50;
    let elapsed = 0;

    const tick = () => {
      elapsed += interval;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);

      if (elapsed >= duration) {
        nextSlide();
      }
    };

    const timer = setInterval(tick, interval);
    return () => clearInterval(timer);
  }, [currentIndex, isPlaying, isHovered, prefersReducedMotion]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  // Keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  };

  // If user prefers reduced motion, render clean accessible static grid
  if (prefersReducedMotion) {
    return (
      <section className="py-20 bg-brand-charcoal border-y border-brand-border" aria-label="Customer Testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-surface border border-brand-border rounded-full text-xs text-brand-grey uppercase tracking-wider mb-3">
              <span className="text-brand-red font-bold">★ 4.8</span> · 24 Google reviews
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tight">
              What Our Customers Say
            </h2>
            <div className="w-16 h-1 bg-brand-red mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-brand-surface p-6 rounded-card border border-brand-border flex flex-col justify-between">
                <div>
                  <div className="text-brand-red text-3xl font-serif leading-none mb-3">“</div>
                  <p className="text-brand-white text-sm md:text-base leading-relaxed italic mb-4">
                    {t.quote}
                  </p>
                </div>
                <div className="border-t border-brand-border/60 pt-4 flex items-center justify-between text-xs text-brand-grey">
                  <span className="font-semibold text-white">{t.name}</span>
                  <span className="bg-black/40 px-2 py-0.5 rounded text-[11px]">{t.source}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm">
            <a href={googleReviewUrl} target="_blank" rel="noopener noreferrer" className="text-brand-grey hover:text-white underline transition">
              Read all reviews on Google →
            </a>
            <a href={googleLeaveReviewUrl} target="_blank" rel="noopener noreferrer" className="text-brand-red hover:text-brand-red-hover font-semibold underline transition">
              Leave a review ★
            </a>
          </div>
        </div>
      </section>
    );
  }

  // Helper to get 3 items for desktop display (prev, center, next)
  const getPrevIndex = (idx: number) => (idx - 1 + total) % total;
  const getNextIndex = (idx: number) => (idx + 1) % total;

  return (
    <section
      className="py-20 bg-brand-charcoal border-y border-brand-border overflow-hidden relative"
      aria-label="Customer Testimonials"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsHovered(true)}
      onBlurCapture={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-surface border border-brand-border rounded-full text-xs text-brand-grey uppercase tracking-wider mb-3">
            <span className="text-brand-red font-bold">★ 4.8</span> · 24 Google reviews
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tight">
            What Our Customers Say
          </h2>
          <div className="w-16 h-1 bg-brand-red mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative min-h-[300px] flex items-center justify-center my-6"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Desktop 3-Card Layout */}
          <div className="hidden lg:grid grid-cols-3 gap-6 w-full items-center">
            {/* Left Card (Dimmed) */}
            <div
              className="bg-brand-surface/60 border border-brand-border/40 p-6 rounded-card transition-all duration-500 opacity-50 scale-95 cursor-pointer hover:opacity-75"
              onClick={prevSlide}
              aria-hidden="true"
            >
              <div className="text-brand-red/50 text-3xl font-serif mb-2">“</div>
              <p className="text-brand-grey text-sm italic line-clamp-4 mb-4">
                {testimonials[getPrevIndex(currentIndex)].quote}
              </p>
              <div className="text-xs text-brand-grey/80 font-medium">
                {testimonials[getPrevIndex(currentIndex)].name}
              </div>
            </div>

            {/* Center Active Card (Magnified with Red Accent Glow) */}
            <div
              className="bg-brand-surface border-2 border-brand-red p-8 rounded-card shadow-glow-red transition-all duration-500 scale-105 z-10 flex flex-col justify-between min-h-[260px]"
              role="group"
              aria-roledescription="slide"
              aria-label={`Review ${currentIndex + 1} of ${total}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-brand-red text-4xl font-serif leading-none">“</div>
                  {testimonials[currentIndex].serviceTag && (
                    <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 bg-brand-red/20 text-brand-red rounded border border-brand-red/30">
                      {testimonials[currentIndex].serviceTag}
                    </span>
                  )}
                </div>
                <blockquote className="text-white text-base md:text-lg font-normal italic leading-relaxed mb-6">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
              </div>
              <div className="border-t border-brand-border pt-4 flex items-center justify-between text-xs">
                <span className="font-bold text-white text-sm">{testimonials[currentIndex].name}</span>
                <span className="bg-black/60 px-2.5 py-1 rounded text-brand-grey border border-brand-border/50">
                  {testimonials[currentIndex].source}
                </span>
              </div>
            </div>

            {/* Right Card (Dimmed) */}
            <div
              className="bg-brand-surface/60 border border-brand-border/40 p-6 rounded-card transition-all duration-500 opacity-50 scale-95 cursor-pointer hover:opacity-75"
              onClick={nextSlide}
              aria-hidden="true"
            >
              <div className="text-brand-red/50 text-3xl font-serif mb-2">“</div>
              <p className="text-brand-grey text-sm italic line-clamp-4 mb-4">
                {testimonials[getNextIndex(currentIndex)].quote}
              </p>
              <div className="text-xs text-brand-grey/80 font-medium">
                {testimonials[getNextIndex(currentIndex)].name}
              </div>
            </div>
          </div>

          {/* Mobile Single Card Layout */}
          <div className="lg:hidden w-full max-w-lg mx-auto">
            <div
              className="bg-brand-surface border border-brand-red p-6 sm:p-8 rounded-card shadow-glow-red flex flex-col justify-between min-h-[250px]"
              role="group"
              aria-roledescription="slide"
              aria-label={`Review ${currentIndex + 1} of ${total}`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-brand-red text-4xl font-serif leading-none">“</div>
                  {testimonials[currentIndex].serviceTag && (
                    <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 bg-brand-red/20 text-brand-red rounded border border-brand-red/30">
                      {testimonials[currentIndex].serviceTag}
                    </span>
                  )}
                </div>
                <blockquote className="text-white text-base italic leading-relaxed mb-6">
                  "{testimonials[currentIndex].quote}"
                </blockquote>
              </div>
              <div className="border-t border-brand-border pt-4 flex items-center justify-between text-xs">
                <span className="font-bold text-white">{testimonials[currentIndex].name}</span>
                <span className="bg-black/60 px-2 py-0.5 rounded text-brand-grey border border-brand-border/50">
                  {testimonials[currentIndex].source}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Thin Red Progress Bar */}
        <div className="max-w-md mx-auto my-4">
          <div className="h-1 w-full bg-brand-surface rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-red transition-all duration-75"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Time remaining for current testimonial"
            ></div>
          </div>
        </div>

        {/* Controls: Arrows, Dots, Play/Pause Button */}
        <div className="flex items-center justify-center gap-4 mt-6">
          {/* Previous Arrow */}
          <button
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full border border-brand-border bg-brand-surface text-brand-grey hover:text-white hover:border-brand-red flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-brand-red"
          >
            ←
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to testimonial ${idx + 1}`}
                aria-current={currentIndex === idx ? 'true' : 'false'}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-red ${
                  currentIndex === idx ? 'w-8 bg-brand-red' : 'w-2.5 bg-brand-border hover:bg-brand-grey'
                }`}
              ></button>
            ))}
          </div>

          {/* Next Arrow */}
          <button
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full border border-brand-border bg-brand-surface text-brand-grey hover:text-white hover:border-brand-red flex items-center justify-center transition focus:outline-none focus:ring-2 focus:ring-brand-red"
          >
            →
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause testimonial auto-rotation' : 'Play testimonial auto-rotation'}
            className="w-10 h-10 rounded-full border border-brand-border bg-brand-surface text-brand-grey hover:text-white hover:border-brand-red flex items-center justify-center text-xs transition focus:outline-none focus:ring-2 focus:ring-brand-red ml-2"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
        </div>

        {/* Links to Google Reviews */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm">
          <a
            href={googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-grey hover:text-white underline underline-offset-4 transition"
          >
            Read all reviews on Google →
          </a>
          <span className="text-brand-border" aria-hidden="true">•</span>
          <a
            href={googleLeaveReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-red hover:text-brand-red-hover font-semibold underline underline-offset-4 transition"
          >
            Leave a review on Google ★
          </a>
        </div>
      </div>
    </section>
  );
}
