import React, { useState, useEffect } from 'react';
import Bouquet from './Bouquet';
import SecretMessage from './SecretMessage';
import FloatingPetals from './FloatingPetals';
import { RotateCcw, ChevronDown } from 'lucide-react';

/**
 * BouquetScene Component
 * Scene Two & Three — The Blooming Experience, Dedication & Secret Message.
 * Optimized for both mobile devices and laptops, with Turkish scroll-down guidance.
 */
export function BouquetScene({ bouquetData, secretData, signatureData }) {
  const [bloomKey, setBloomKey] = useState(0);
  const [showDedication, setShowDedication] = useState(false);

  // Time dedication text appearance after the bouquet has blossomed (~2.5s)
  useEffect(() => {
    setShowDedication(false);
    const timer = setTimeout(() => {
      setShowDedication(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, [bloomKey]);

  const handleRebloom = () => {
    setBloomKey((prev) => prev + 1);
  };

  const handleScrollToSecret = () => {
    const el = document.getElementById('secret-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="w-full relative z-30 pb-28 sm:pb-36 select-none">
      {/* Floating Petals gentle ambient breeze */}
      <FloatingPetals count={14} />

      {/* Main Botanical Bouquet Showcase */}
      <section className="w-full max-w-4xl mx-auto px-4 pt-1 sm:pt-4 flex flex-col items-center">
        {/* The Handcrafted SVG Daisy Bouquet - Mobile-First Proportion */}
        <div className="w-full max-w-[390px] sm:max-w-[480px] md:max-w-[540px] mx-auto">
          <Bouquet key={bloomKey} isBloomActive={true} />
        </div>

        {/* Dedication Heading & Subtitle (reveals smoothly after blooming) */}
        <div
          className={`text-center mt-3 sm:mt-5 transition-all duration-1000 ease-out transform ${
            showDedication ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs tracking-[0.24em] text-garden-primary-green uppercase font-semibold mb-1.5">
            <span>BOTANICAL DEDICATION</span>
          </div>

          <h2 className="font-editorial-heading text-4xl sm:text-5xl md:text-6xl text-garden-deep-green font-normal tracking-tight mb-2">
            {bouquetData.dedication}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-garden-text-muted font-sans font-light tracking-wide max-w-sm mx-auto px-4">
            {bouquetData.supporting}
          </p>

          {/* Interactive touch hint */}
          <p className="text-[10px] sm:text-[11px] tracking-wider text-garden-text-muted/65 italic font-sans mt-2">
            ✿ Çiçeklere dokunabilirsin · Dokundukça parıldarlar ✿
          </p>

          {/* Re-bloom subtle button */}
          <div className="mt-3 flex justify-center">
            <button
              onClick={handleRebloom}
              className="group inline-flex items-center space-x-1.5 text-xs text-garden-text-muted hover:text-garden-primary-green transition-colors duration-300 tracking-wider font-sans border-b border-transparent hover:border-garden-primary-green/40 pb-0.5 cursor-pointer"
              title="Watch the daisies bloom again"
            >
              <RotateCcw className="w-3.5 h-3.5 transition-transform duration-500 group-hover:-rotate-90" />
              <span>{bouquetData.rebloomText || "Watch them bloom again"}</span>
            </button>
          </div>

          {/* Turkish Scroll Down Indication ("Aşağı kaydır · Senin için bir sır var ↓") */}
          <div className="mt-7 flex flex-col items-center">
            <button
              onClick={handleScrollToSecret}
              className="group inline-flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-105 focus:outline-none"
            >
              <span className="text-[11px] sm:text-xs tracking-[0.2em] text-garden-primary-green font-semibold uppercase mb-2 group-hover:text-garden-deep-green transition-colors">
                {bouquetData.scrollIndication || "Aşağı kaydır · Senin için bir sır var ↓"}
              </span>
              <div className="w-9 h-9 rounded-full border-2 border-garden-primary-green/40 bg-garden-bg-secondary/90 flex items-center justify-center shadow-xs animate-bounce-subtle group-hover:border-garden-primary-green group-hover:bg-garden-bg-secondary">
                <ChevronDown className="w-5 h-5 text-garden-deep-green" />
              </div>
            </button>
          </div>
        </div>

        {/* Scene Three: The Secret Message Section */}
        {showDedication && (
          <div className="w-full animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <SecretMessage secretData={secretData} signatureData={signatureData} />
          </div>
        )}
      </section>
    </div>
  );
}

export default BouquetScene;
