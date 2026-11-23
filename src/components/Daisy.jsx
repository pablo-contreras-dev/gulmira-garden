import React, { useMemo, useState } from 'react';
import gardenAudio from '../utils/audio';

/**
 * Daisy Component
 * Programmatically generated botanical daisy illustration using inline SVG.
 * Features:
 * - Nested <g> architecture preventing SVG CSS transform collisions
 * - Autonomous organic breathing & breeze sway (flawless on mobile without cursor)
 * - Tap / Touch interactive blossom pulse with golden sparkle ring
 * - Desktop hover enlargement and soft lighting
 * - Individual organic petals with double-layered depth
 * - Curved growing stem with stroke-dashoffset animation
 * - Textured amber stippled pistil (flower center)
 */
export function Daisy({
  id = 1,
  stemPath,
  stemLength = 600,
  headX = 300,
  headY = 200,
  scale = 1,
  rotation = 0,
  petalCount = 18,
  stemDelay = 0.2,
  bloomDelay = 1.4,
  swayClass = "sway-1",
  leaves = [],
  tilt = 0,
  isBloomActive = true,
  onFlowerClick,
}) {
  const [isTapped, setIsTapped] = useState(false);

  // Autonomous breathing class based on flower ID
  const breatheClass = useMemo(() => {
    const variants = ['breathe-head-1', 'breathe-head-2', 'breathe-head-3'];
    return variants[id % 3];
  }, [id]);

  // Handle tap on mobile or click on laptop
  const handleInteraction = () => {
    setIsTapped(true);
    try {
      const frequencies = [587.33, 659.25, 739.99, 880.00];
      const freq = frequencies[id % frequencies.length];
      gardenAudio.playChime(freq, 1.4, false);
    } catch (e) {
      // Audio not initialized or supported
    }

    if (onFlowerClick) {
      onFlowerClick(id);
    }

    setTimeout(() => {
      setIsTapped(false);
    }, 700);
  };

  // Generate deterministic variations for petals
  const petals = useMemo(() => {
    const list = [];
    const baseAngle = 360 / petalCount;
    
    const pseudoRandom = (seed) => {
      const x = Math.sin(seed * 7777 + id * 43) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < petalCount; i++) {
      const r1 = pseudoRandom(i + 1);
      const r2 = pseudoRandom(i + 13);
      const r3 = pseudoRandom(i + 27);

      const angleJitter = (r1 - 0.5) * 5.2;
      const angle = i * baseAngle + angleJitter;
      const lengthScale = 0.90 + r2 * 0.22;
      const widthScale = 0.88 + r3 * 0.25;
      const layer = i % 2 === 0 ? 'front' : 'back';
      const delayOffset = (i / petalCount) * 0.35 + (r1 * 0.12);

      list.push({
        id: `petal-${id}-${i}`,
        angle,
        lengthScale,
        widthScale,
        layer,
        delayOffset,
      });
    }

    return list.sort((a, b) => (a.layer === 'back' ? -1 : 1));
  }, [petalCount, id]);

  // Center florets stipple dots
  const centerStipples = useMemo(() => {
    const dots = [];
    const count = 18;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (i % 2) * 0.35;
      const radius = 4.2 + (i % 3) * 2.7;
      dots.push({
        cx: Math.cos(angle) * radius,
        cy: Math.sin(angle) * radius,
        r: 0.85 + (i % 3) * 0.35,
        opacity: 0.35 + (i % 4) * 0.15,
      });
    }
    return dots;
  }, []);

  return (
    <g id={`daisy-group-${id}`} className={`daisy-entity ${swayClass}`}>
      <defs>
        {/* Front petal gradient with soft ivory base and luminous white tip */}
        <linearGradient id={`petalGrad-${id}`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#EFECE2" stopOpacity="0.92" />
          <stop offset="28%" stopColor="#FAF7F0" stopOpacity="0.98" />
          <stop offset="75%" stopColor="#FFFDF7" stopOpacity="1" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
        </linearGradient>

        {/* Back petal gradient with soft ambient shadow for 3D depth */}
        <linearGradient id={`petalBackGrad-${id}`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#DFD8C6" stopOpacity="0.88" />
          <stop offset="35%" stopColor="#F2EDE2" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#FAF7F0" stopOpacity="0.98" />
        </linearGradient>

        {/* Warm golden flower pistil gradient */}
        <radialGradient id={`pistilGrad-${id}`} cx="40%" cy="36%" r="62%">
          <stop offset="0%" stopColor="#F9DF8C" />
          <stop offset="38%" stopColor="#E8C96E" />
          <stop offset="78%" stopColor="#D49A28" />
          <stop offset="100%" stopColor="#B0751A" />
        </radialGradient>

        {/* Organic leaf gradient */}
        <linearGradient id={`leafGrad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7E9473" />
          <stop offset="55%" stopColor="#65775B" />
          <stop offset="100%" stopColor="#45573C" />
        </linearGradient>
      </defs>

      {/* 1. STEM */}
      <path
        d={stemPath}
        fill="none"
        stroke="#596D4F"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: stemLength,
          strokeDashoffset: isBloomActive ? 0 : stemLength,
          animation: isBloomActive ? `stemGrow 1.7s cubic-bezier(0.25, 1, 0.5, 1) ${stemDelay}s forwards` : 'none',
        }}
      />

      {/* 2. LEAVES */}
      {leaves.map((leaf, index) => {
        const leafDelay = stemDelay + 0.45 + index * 0.25;
        return (
          <g
            key={`leaf-wrapper-${id}-${index}`}
            transform={`translate(${leaf.x}, ${leaf.y}) rotate(${leaf.angle}) scale(${leaf.scale || 1})`}
          >
            <g
              style={{
                opacity: isBloomActive ? 1 : 0,
                transformOrigin: '0 0',
                animation: isBloomActive
                  ? `leafScale 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) ${leafDelay}s both`
                  : 'none',
              }}
            >
              <path
                d="M 0 0 C 7 -10, 16 -22, 10 -38 C 5 -46, -4 -44, -7 -36 C -12 -24, -6 -10, 0 0 Z"
                fill={`url(#leafGrad-${id})`}
                filter="drop-shadow(0 2px 3px rgba(40, 52, 35, 0.09))"
              />
              <path
                d="M 0 -2 L 1 -33"
                stroke="#AAB39A"
                strokeWidth="0.8"
                strokeLinecap="round"
                opacity="0.65"
              />
            </g>
          </g>
        );
      })}

      {/* 3. FLOWER HEAD: Outer group fixes coordinates, Inner group animates */}
      <g transform={`translate(${headX}, ${headY}) rotate(${rotation + tilt}) scale(${scale})`}>
        <g
          className={`cursor-pointer select-none daisy-head-interactive ${isTapped ? 'tap-active-pulse' : breatheClass}`}
          onClick={handleInteraction}
          onTouchStart={handleInteraction}
          role="button"
          aria-label={`Interactive blooming daisy ${id}`}
        >
          {/* Calyx (receptacle backing under petals) */}
          <circle cx="0" cy="0" r="13" fill="#4B5E43" opacity="0.4" />

          {/* Golden Sparkle Ring on Tap */}
          {isTapped && (
            <circle
              cx="0"
              cy="0"
              r="28"
              fill="none"
              stroke="#E8C96E"
              strokeWidth="2.5"
              strokeDasharray="4 3"
              className="tap-sparkle-ring"
            />
          )}

          {/* Individual White Petals (Double-layered depth) */}
          <g id={`petals-${id}`}>
            {petals.map((petal) => {
              const totalDelay = bloomDelay + petal.delayOffset;
              const isFront = petal.layer === 'front';

              return (
                <g
                  key={petal.id}
                  transform={`rotate(${petal.angle})`}
                >
                  <g
                    style={{
                      opacity: isBloomActive ? 1 : 0,
                      transformOrigin: '0 0',
                      animation: isBloomActive
                        ? `petalScale 1.1s cubic-bezier(0.34, 1.45, 0.64, 1) ${totalDelay}s both`
                        : 'none',
                    }}
                  >
                    <path
                      d="M 0 0 C -4.2 -14, -6.8 -34, -3.2 -48 C -1 -54, 1 -54, 3.2 -48 C 6.8 -34, 4.2 -14, 0 0 Z"
                      fill={isFront ? `url(#petalGrad-${id})` : `url(#petalBackGrad-${id})`}
                      transform={`scale(${petal.widthScale}, ${petal.lengthScale})`}
                      style={{
                        filter: isFront
                          ? 'drop-shadow(0 1px 3px rgba(69, 70, 63, 0.08))'
                          : 'drop-shadow(0 2px 4px rgba(69, 70, 63, 0.12))',
                      }}
                    />
                    <path
                      d="M 0 -8 L 0 -42"
                      stroke={isFront ? '#ECE8DD' : '#DDD7C7'}
                      strokeWidth="0.75"
                      strokeLinecap="round"
                      opacity="0.45"
                      transform={`scale(${petal.widthScale}, ${petal.lengthScale})`}
                    />
                  </g>
                </g>
              );
            })}
          </g>

          {/* Flower Center: Disc Florets */}
          <g
            style={{
              opacity: isBloomActive ? 1 : 0,
              animation: isBloomActive
                ? `centerBloom 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) ${bloomDelay + 0.35}s both`
                : 'none',
            }}
          >
            <circle cx="0" cy="1.2" r="14.2" fill="#2E3C2B" opacity="0.18" />
            <circle cx="0" cy="0" r="13.8" fill={`url(#pistilGrad-${id})`} />
            {centerStipples.map((dot, idx) => (
              <circle
                key={`stipple-${id}-${idx}`}
                cx={dot.cx}
                cy={dot.cy}
                r={dot.r}
                fill="#9C6412"
                opacity={dot.opacity}
              />
            ))}
            <ellipse
              cx="-3.2"
              cy="-4.2"
              rx="5.5"
              ry="3.2"
              fill="#FFF5D6"
              opacity="0.45"
              transform="rotate(-22)"
            />
          </g>
        </g>
      </g>
    </g>
  );
}

export default Daisy;
