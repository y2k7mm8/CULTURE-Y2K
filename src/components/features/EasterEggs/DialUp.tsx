import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface DialUpSoundProps {
  isActive: boolean;
  onComplete: () => void;
}

// Generate dial-up sound using Web Audio API
const generateDialUpSound = (audioContext: AudioContext): void => {
  const createOscillator = (frequency: number, type: OscillatorType = "sine") => {
    const osc = audioContext.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(frequency, audioContext.currentTime);
    return osc;
  };

  const createGain = (initialValue: number = 0.1) => {
    const gain = audioContext.createGain();
    gain.gain.setValueAtTime(initialValue, audioContext.currentTime);
    return gain;
  };

  // Dial tone
  const dialOsc1 = createOscillator(350, "sine");
  const dialOsc2 = createOscillator(440, "sine");
  const dialGain = createGain(0.05);

  dialOsc1.connect(dialGain);
  dialOsc2.connect(dialGain);
  dialGain.connect(audioContext.destination);

  dialOsc1.start();
  dialOsc2.start();

  // Stop dial tone after 2 seconds
  setTimeout(() => {
    dialOsc1.stop();
    dialOsc2.stop();
  }, 2000);

  // Screeching tones
  setTimeout(() => {
    for (let i = 0; i < 8; i++) {
      const osc = createOscillator(2000 + Math.random() * 2000, "sawtooth");
      const gain = createGain(0.03);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start(audioContext.currentTime + i * 0.3);
      osc.stop(audioContext.currentTime + i * 0.3 + 0.2);
    }
  }, 2200);

  // Connection established tone
  setTimeout(() => {
    const osc = createOscillator(2100, "sine");
    const gain = createGain(0.05);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start();
    osc.stop(audioContext.currentTime + 0.5);
  }, 5000);
};

export const DialUpSound: React.FC<DialUpSoundProps> = ({ isActive, onComplete }) => {
  const { t } = useTranslation();
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!isActive) return;

    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      generateDialUpSound(audioContextRef.current);

      // Notify completion after dial-up finishes
      setTimeout(() => {
        onComplete();
      }, 6000);
    } catch (error) {
      console.error("Web Audio API not supported:", error);
      onComplete();
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-pulse">📞</div>
        <p className="text-green-500 font-mono text-xl mb-2">{t("common.dialup")}</p>
        <div className="flex gap-2 justify-center mt-4">
          <div className="w-2 h-8 bg-green-500 animate-pulse" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-8 bg-green-500 animate-pulse" style={{ animationDelay: "100ms" }}></div>
          <div className="w-2 h-8 bg-green-500 animate-pulse" style={{ animationDelay: "200ms" }}></div>
          <div className="w-2 h-8 bg-green-500 animate-pulse" style={{ animationDelay: "300ms" }}></div>
          <div className="w-2 h-8 bg-green-500 animate-pulse" style={{ animationDelay: "400ms" }}></div>
        </div>
        <p className="text-green-500/70 font-mono text-sm mt-4">56K modem handshake in progress...</p>
      </div>
    </div>
  );
};