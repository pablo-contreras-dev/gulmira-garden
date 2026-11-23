import React, { useMemo } from 'react';

/**
 * FloatingPetals Component
 * Renders delicate, organic white daisy petals drifting gently across the viewport.
 * Designed to feel like petals caught in a gentle spring breeze.
 */
export function FloatingPetals({ count = 12 }) {
  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Deterministic spread
      const left = 5 + ((i * 19) % 90); // 5% to 95% width
      const size = 12 + ((i * 7) % 12);  // 12px to 24px
      const duration = 12 + ((i * 5) % 10); // 12s to 22s
      const delay = (i * 1.8) % 12; // staggered delays
      const rotation = (i * 47) % 360;
      const opacity = 0.45 + ((i * 3) % 4) * 0.12; // 0.45 to 0.81

      return {
        id: `drift-petal-${i}`,
        left: `${left}%`,
        size,
        duration: `${duration}s`,
        delay: `${delay}s`,
        rotation,
        opacity,
      };
    });
  }, [count]);

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden z-20"
      aria-hidden="true"
    >
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute top-[-40px] animate-drift"
          style={{
            left: p.left,
            '--drift-duration': p.duration,
            '--drift-delay': p.delay,
            opacity: p.opacity,
          }}
        >
          <svg
            width={p.size}
            height={p.size * 1.8}
            viewBox="0 0 20 36"
            fill="none"
            style={{
              transform: `rotate(${p.rotation}deg)`,
            }}
          >
            {/* Petal silhouette with soft highlight */}
            <path
              d="M 10 35 C 4 24, 0 14, 4 4 C 8 -2, 12 -2, 16 4 C 20 14, 16 24, 10 35 Z"
              fill="#FFFDF7"
            />
            {/* Soft inner contour */}
            <path
              d="M 10 32 C 6 22, 3 13, 6 6"
              stroke="#E8E4D5"
              strokeWidth="0.8"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

export default FloatingPetals;
