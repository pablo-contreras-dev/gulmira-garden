import React from 'react';
import gardenAudio from '../utils/audio';

/**
 * WelcomeScene Component
 * Scene One — The First Impression
 * High-end editorial presentation with generous whitespace,
 * refined tactile CTA button with subtle ambient glow, and auto-audio start.
 */
export function WelcomeScene({ welcomeData, onDiscover }) {
  const handleDiscoverClick = () => {
    // Start peaceful ambient soundtrack upon user interaction
    try {
      gardenAudio.start();
    } catch (e) {
      console.warn("Audio start:", e);
    }
    onDiscover();
  };

  return (
    <section className="min-h-[calc(100vh-140px)] flex flex-col justify-center items-center text-center px-5 max-w-2xl mx-auto relative z-30 select-none py-4 sm:py-8">
      {/* Eyebrow badge */}
      <div className="mb-4 sm:mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
        <span className="text-[10px] sm:text-xs tracking-[0.28em] text-garden-primary-green uppercase font-medium bg-garden-bg-secondary/90 px-4 py-1.5 rounded-full border border-garden-muted-sage/35 shadow-2xs">
          {welcomeData.eyebrow}
        </span>
      </div>

      {/* Main Heading */}
      <h1
        className="font-editorial-heading text-5xl sm:text-6xl md:text-7xl text-garden-deep-green font-normal tracking-tight mb-3 sm:mb-4 opacity-0 animate-fade-in-up"
        style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
      >
        {welcomeData.heading}
      </h1>

      {/* Supporting Text */}
      <p
        className="text-base sm:text-lg text-garden-text-muted font-sans font-light tracking-wide max-w-md mx-auto mb-8 sm:mb-10 opacity-0 animate-fade-in-up"
        style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
      >
        {welcomeData.supporting}
      </p>

      {/* Prominent Tactile CTA Button */}
      <div
        className="opacity-0 animate-fade-in-up flex flex-col items-center w-full max-w-xs"
        style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
      >
        <button
          onClick={handleDiscoverClick}
          className="animate-button-glow group relative w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 sm:px-10 py-4 rounded-full bg-garden-deep-green hover:bg-[#344634] active:bg-[#2b3a2b] text-garden-daisy-white transition-all duration-300 text-sm sm:text-base tracking-[0.16em] uppercase font-medium shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 border border-garden-primary-green/30 cursor-pointer"
        >
          <span>{welcomeData.cta}</span>
          <span className="w-5 h-5 rounded-full bg-garden-primary-green/40 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-garden-primary-green/60">
            <svg
              className="w-3 h-3 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </span>
        </button>

        {/* Subtle Hint */}
        <p className="mt-4 text-xs text-garden-text-muted/80 tracking-widest font-sans italic">
          {welcomeData.hint}
        </p>
      </div>

      {/* Delicate Botanical Glyph */}
      <div
        className="mt-8 sm:mt-12 opacity-0 animate-fade-in-up"
        style={{ animationDelay: '0.65s', animationFillMode: 'forwards' }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#AAB39A"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-50"
        >
          <path d="M12 2v20" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </div>
    </section>
  );
}

export default WelcomeScene;
