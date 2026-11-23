import React, { useState, useRef } from 'react';
import { Sparkles, Heart } from 'lucide-react';

/**
 * SecretMessage Component
 * A luxury digital stationery keepsake revealed upon interaction.
 * Displays Pablo's Turkish personal note with warm paper textures,
 * wax seal motif, and bespoke typography.
 */
export function SecretMessage({ secretData, signatureData }) {
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef(null);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  return (
    <section id="secret-section" className="w-full max-w-xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16 text-center relative z-30">
      {/* Decorative botanical separator */}
      <div className="flex items-center justify-center space-x-3 mb-8">
        <span className="h-[1px] w-12 sm:w-20 bg-garden-muted-sage/40" />
        <span className="text-garden-primary-green text-sm tracking-widest">
          ❦ ✦ ❦
        </span>
        <span className="h-[1px] w-12 sm:w-20 bg-garden-muted-sage/40" />
      </div>

      {/* Button State: Highly visible, alluring invitation */}
      {!isOpen ? (
        <div className="animate-fade-in-up flex flex-col items-center">
          <p className="text-sm sm:text-base text-garden-text-muted mb-4 font-sans italic tracking-wide">
            "{secretData.teaser}"
          </p>

          <button
            onClick={handleOpen}
            className="animate-button-glow group relative inline-flex items-center space-x-3 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-garden-bg-secondary border-2 border-garden-primary-green/40 hover:border-garden-primary-green text-garden-deep-green hover:bg-[#eae6db] transition-all duration-300 text-xs sm:text-sm tracking-wider uppercase font-semibold shadow-md hover:shadow-lg cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-4 h-4 text-garden-flower-yellow animate-pulse" />
            <span>{secretData.buttonPrompt}</span>
            <span className="text-base transition-transform duration-300 group-hover:scale-125">
              💌
            </span>
          </button>
        </div>
      ) : (
        /* Revealed Luxury Stationery Card */
        <div
          ref={cardRef}
          className="transition-all duration-700 ease-out transform translate-y-0 opacity-100 bg-[#FAF8F2] border border-[#DDD5C5] rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden text-left sm:text-center"
          style={{
            animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          {/* Subtle inner decorative hairline border */}
          <div className="pointer-events-none absolute inset-3 sm:inset-4 border border-garden-muted-sage/25 rounded-xl" />

          {/* Botanical Wax Seal Motif (SVG) */}
          <div className="flex justify-center mb-5 sm:mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7E9374] to-[#405440] flex items-center justify-center text-[#FFFDF7] shadow-md border-2 border-[#FAF8F2] relative">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
                <path d="m4.93 4.93 2.83 2.83m8.48 8.48 2.83 2.83M4.93 19.07l2.83-2.83m8.48-8.48 2.83-2.83" />
              </svg>
            </div>
          </div>

          {/* Top Label */}
          <div className="text-center mb-3">
            <span className="inline-block text-[10px] tracking-[0.28em] text-garden-primary-green uppercase font-semibold border-b border-garden-primary-green/25 pb-1">
              {secretData.label}
            </span>
          </div>

          {/* The Turkish Note for Gülmira */}
          <blockquote className="font-editorial-heading text-xl sm:text-2xl md:text-3xl text-garden-deep-green font-normal leading-relaxed tracking-wide italic my-5 text-center">
            “{secretData.turkishMessage}”
          </blockquote>

          {/* Delicate Heart Accent */}
          <div className="mt-6 flex items-center justify-center space-x-2">
            <span className="h-[1px] w-8 bg-garden-muted-sage/40" />
            <Heart className="w-4 h-4 text-garden-primary-green fill-garden-primary-green/20" />
            <span className="h-[1px] w-8 bg-garden-muted-sage/40" />
          </div>

          {/* Signature inside or right with the card */}
          <div className="mt-6 text-center">
            <p className="text-[11px] text-garden-text-muted tracking-widest font-sans italic mb-1">
              {signatureData.note}
            </p>
            <p className="font-editorial-heading text-2xl text-garden-text-main tracking-wider font-normal">
              {signatureData.author}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default SecretMessage;
