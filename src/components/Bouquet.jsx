import React, { useState } from 'react';
import Daisy from './Daisy';

/**
 * Bouquet Component
 * An intentional, handcrafted editorial botanical arrangement of 9 daisies.
 * Formed with varying heights, perspectives, organic overlaps, and gentle swaying.
 */
export function Bouquet({ isBloomActive = true }) {
  const [activeFlower, setActiveFlower] = useState(null);

  // 9 distinct botanical daisies with realistic curves, heights, and leaf distributions
  const daisyConfigs = [
    // 1. Back Left (depth layer)
    {
      id: 7,
      stemPath: "M 346 715 C 330 550, 292 350, 280 178",
      stemLength: 570,
      headX: 280,
      headY: 178,
      scale: 0.84,
      rotation: -10,
      petalCount: 16,
      stemDelay: 0.1,
      bloomDelay: 1.25,
      swayClass: "sway-2",
      leaves: [
        { x: 312, y: 470, angle: -48, scale: 0.85 },
      ]
    },
    // 2. Back Right (depth layer)
    {
      id: 8,
      stemPath: "M 354 715 C 370 550, 408 350, 420 180",
      stemLength: 565,
      headX: 420,
      headY: 180,
      scale: 0.85,
      rotation: 11,
      petalCount: 17,
      stemDelay: 0.15,
      bloomDelay: 1.3,
      swayClass: "sway-3",
      leaves: [
        { x: 388, y: 470, angle: 48, scale: 0.85 },
      ]
    },
    // 3. Center High (Tallest focal bloom)
    {
      id: 1,
      stemPath: "M 350 715 C 347 540, 353 360, 350 190",
      stemLength: 550,
      headX: 350,
      headY: 190,
      scale: 1.06,
      rotation: 1,
      petalCount: 20,
      stemDelay: 0.25,
      bloomDelay: 1.4,
      swayClass: "sway-1",
      leaves: [
        { x: 348, y: 490, angle: -32, scale: 0.95 },
        { x: 352, y: 360, angle: 30, scale: 0.9 }
      ]
    },
    // 4. Mid Upper Left
    {
      id: 2,
      stemPath: "M 344 715 C 322 560, 260 410, 235 245",
      stemLength: 520,
      headX: 235,
      headY: 245,
      scale: 0.97,
      rotation: -16,
      petalCount: 18,
      stemDelay: 0.35,
      bloomDelay: 1.5,
      swayClass: "sway-2",
      leaves: [
        { x: 298, y: 520, angle: -50, scale: 0.95 },
        { x: 250, y: 375, angle: -42, scale: 0.9 }
      ]
    },
    // 5. Mid Upper Right
    {
      id: 3,
      stemPath: "M 356 715 C 378 560, 440 410, 465 245",
      stemLength: 525,
      headX: 465,
      headY: 245,
      scale: 0.98,
      rotation: 16,
      petalCount: 18,
      stemDelay: 0.4,
      bloomDelay: 1.55,
      swayClass: "sway-3",
      leaves: [
        { x: 402, y: 520, angle: 50, scale: 0.95 },
        { x: 450, y: 375, angle: 42, scale: 0.9 }
      ]
    },
    // 6. Mid Center (nested bloom)
    {
      id: 4,
      stemPath: "M 350 715 C 356 590, 344 470, 350 325",
      stemLength: 420,
      headX: 350,
      headY: 325,
      scale: 0.92,
      rotation: -4,
      petalCount: 17,
      stemDelay: 0.5,
      bloomDelay: 1.7,
      swayClass: "sway-1",
      leaves: [
        { x: 352, y: 455, angle: 26, scale: 0.88 },
      ]
    },
    // 7. Far Left (sweeping out naturally)
    {
      id: 5,
      stemPath: "M 340 715 C 305 590, 195 470, 155 350",
      stemLength: 470,
      headX: 155,
      headY: 350,
      scale: 0.88,
      rotation: -26,
      petalCount: 16,
      stemDelay: 0.6,
      bloomDelay: 1.8,
      swayClass: "sway-2",
      leaves: [
        { x: 265, y: 570, angle: -65, scale: 0.92 },
        { x: 182, y: 435, angle: -58, scale: 0.85 }
      ]
    },
    // 8. Far Right (sweeping out naturally)
    {
      id: 6,
      stemPath: "M 360 715 C 395 590, 505 470, 545 350",
      stemLength: 475,
      headX: 545,
      headY: 350,
      scale: 0.89,
      rotation: 26,
      petalCount: 17,
      stemDelay: 0.65,
      bloomDelay: 1.85,
      swayClass: "sway-3",
      leaves: [
        { x: 435, y: 570, angle: 65, scale: 0.92 },
        { x: 518, y: 435, angle: 58, scale: 0.85 }
      ]
    },
    // 9. Foreground Center Low (intimate focal flower)
    {
      id: 9,
      stemPath: "M 350 715 C 347 630, 353 530, 350 425",
      stemLength: 320,
      headX: 350,
      headY: 425,
      scale: 0.95,
      rotation: 5,
      petalCount: 19,
      stemDelay: 0.7,
      bloomDelay: 2.05,
      swayClass: "sway-1",
      leaves: [
        { x: 348, y: 545, angle: -32, scale: 0.88 },
        { x: 352, y: 485, angle: 32, scale: 0.84 }
      ]
    }
  ];

  return (
    <div className="relative w-full max-w-[580px] mx-auto aspect-[700/780] select-none flex items-center justify-center">
      <svg
        viewBox="0 0 700 780"
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Handcrafted botanical bouquet of blooming daisies for Gülmira"
        role="img"
      >
        <defs>
          {/* Subtle grounding shadow beneath stems */}
          <radialGradient id="baseShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#405440" stopOpacity="0.14" />
            <stop offset="60%" stopColor="#405440" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#405440" stopOpacity="0" />
          </radialGradient>

          {/* Botanical twine ribbon gradient */}
          <linearGradient id="twineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D5CBB8" />
            <stop offset="45%" stopColor="#BEB29D" />
            <stop offset="85%" stopColor="#9E917C" />
            <stop offset="100%" stopColor="#827663" />
          </linearGradient>
        </defs>

        {/* Floor shadow */}
        <ellipse
          cx="350"
          cy="730"
          rx="135"
          ry="16"
          fill="url(#baseShadow)"
        />

        {/* The 9 Botanical Daisies */}
        {daisyConfigs.map((daisy) => (
          <Daisy
            key={daisy.id}
            {...daisy}
            isBloomActive={isBloomActive}
            onFlowerClick={(id) => setActiveFlower(id)}
          />
        ))}

        {/* Botanical Raffia / Ribbon Twine Binding at Stem Junction */}
        <g
          id="bouquet-tie"
          style={{
            opacity: isBloomActive ? 1 : 0,
            transformOrigin: "350px 690px",
            animation: isBloomActive ? "scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.5s both" : "none"
          }}
        >
          {/* Wrap loop 1 */}
          <path
            d="M 330 682 C 342 678, 358 678, 370 682 C 372 686, 370 690, 368 693 C 356 690, 344 690, 332 693 Z"
            fill="url(#twineGrad)"
          />
          {/* Wrap loop 2 */}
          <path
            d="M 328 688 C 342 684, 358 684, 372 688 C 374 693, 372 697, 369 700 C 355 696, 343 696, 330 700 Z"
            fill="url(#twineGrad)"
            opacity="0.9"
          />
          {/* Twine knot */}
          <ellipse cx="350" cy="691" rx="5" ry="4" fill="#9E917C" />
          {/* Hanging twine ends */}
          <path
            d="M 348 693 C 344 706, 338 718, 335 726"
            stroke="#9E917C"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 352 693 C 356 708, 361 720, 359 730"
            stroke="#9E917C"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}

export default Bouquet;
