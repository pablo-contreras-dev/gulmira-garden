import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * AmbientAudio Component
 * Optional calm soundscape synthesizer built on the browser's native Web Audio API.
 * Synthesizes warm, peaceful acoustic harmonic chords reminiscent of wind chimes and warm electric piano.
 * Disabled by default; user can toggle freely.
 */
export function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const isPlayingRef = useRef(false);
  const timerRef = useRef(null);

  // Musical notes frequencies (warm E major / C# minor pentatonic scale)
  const chordNotes = [
    [164.81, 246.94, 329.63, 493.88], // E3, B3, E4, B4
    [174.61, 220.00, 329.63, 440.00], // F3, A3, E4, A4
    [146.83, 220.00, 293.66, 440.00], // D3, A3, D4, A4
    [130.81, 196.00, 261.63, 392.00], // C3, G3, C4, G4
  ];

  const playTone = (freq, duration, delay = 0) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    setTimeout(() => {
      if (!isPlayingRef.current) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Soft envelope (gentle attack, soft chime decay)
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    }, delay * 1000);
  };

  const playAmbientLoop = () => {
    if (!isPlayingRef.current) return;
    
    // Choose random warm harmonic arpeggio
    const chordIndex = Math.floor(Math.random() * chordNotes.length);
    const chord = chordNotes[chordIndex];

    chord.forEach((note, i) => {
      playTone(note, 4.5, i * 0.45);
    });

    // Schedule next harmonic phrase
    timerRef.current = setTimeout(playAmbientLoop, 5200);
  };

  const toggleSound = () => {
    if (!isPlaying) {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioContext();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      isPlayingRef.current = true;
      setIsPlaying(true);
      playAmbientLoop();
    } else {
      isPlayingRef.current = false;
      setIsPlaying(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }
  };

  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={toggleSound}
        className="flex items-center space-x-2 px-3.5 py-2 rounded-full border border-garden-muted-sage/50 bg-garden-bg/80 backdrop-blur-md text-garden-text-main hover:text-garden-deep-green hover:border-garden-primary-green transition-all duration-300 text-xs tracking-wider font-sans shadow-sm"
        aria-label={isPlaying ? "Mute ambient sound" : "Play ambient music"}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-garden-primary-green animate-pulse" />
            <span className="hidden sm:inline">Ambient: ON</span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-garden-text-muted" />
            <span className="hidden sm:inline">Ambient: OFF</span>
          </>
        )}
      </button>
    </div>
  );
}

export default AmbientAudio;
