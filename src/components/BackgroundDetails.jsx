import React, { useState, useEffect } from 'react';
import gardenAudio from '../utils/audio';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * BackgroundDetails Component
 * Clean, minimalist editorial framing and ambient sound controller.
 * Note: Impersonal "Edition Nº 01" badges have been removed for an intimate, personal aesthetic.
 */
export function BackgroundDetails({ headerData }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return gardenAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
  }, []);

  const handleToggleAudio = () => {
    gardenAudio.toggle();
  };

  return (
    <>
      {/* Paper grain tactile texture */}
      <div className="paper-grain" aria-hidden="true" />

      {/* Clean Minimalist Editorial Header */}
      <header className="w-full max-w-5xl mx-auto px-5 py-5 sm:py-7 flex justify-between items-center select-none relative z-40">
        {/* Top-Left: Intimate Personal Title */}
        <div className="flex flex-col space-y-0.5">
          <span className="font-editorial-heading text-lg sm:text-xl tracking-[0.22em] uppercase font-medium text-garden-text-main">
            {headerData.brand}
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-[0.26em] text-garden-text-muted uppercase font-sans">
            {headerData.subbrand}
          </span>
        </div>

        {/* Top-Right: Music Controller Pill */}
        <button
          onClick={handleToggleAudio}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border transition-all duration-300 text-[11px] sm:text-xs font-sans tracking-wider shadow-2xs backdrop-blur-md ${
            isPlaying
              ? 'bg-garden-primary-green/10 border-garden-primary-green text-garden-deep-green'
              : 'bg-garden-bg-secondary/70 border-garden-muted-sage/40 text-garden-text-muted hover:text-garden-text-main hover:border-garden-muted-sage'
          }`}
          aria-label={isPlaying ? "Pausar música de fondo" : "Reproducir música de fondo"}
          title={isPlaying ? "Música sonando (clic para pausar)" : "Clic para activar música"}
        >
          {isPlaying ? (
            <>
              {/* Equalizer Wave Animation */}
              <div className="flex items-end space-x-0.5 h-3.5 w-3.5" aria-hidden="true">
                <span className="w-0.5 bg-garden-primary-green rounded-full bar-1" />
                <span className="w-0.5 bg-garden-primary-green rounded-full bar-2" />
                <span className="w-0.5 bg-garden-primary-green rounded-full bar-3" />
              </div>
              <span className="font-medium text-garden-deep-green">Música: ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-garden-text-muted" />
              <span>Música: OFF</span>
            </>
          )}
        </button>
      </header>

      {/* Subtle Botanical Frame Edge Lines (Minimalist Editorial Grid) */}
      <div className="pointer-events-none fixed inset-x-3 inset-y-3 sm:inset-x-6 sm:inset-y-6 border border-garden-muted-sage/15 rounded-sm z-10" />
    </>
  );
}

export default BackgroundDetails;
