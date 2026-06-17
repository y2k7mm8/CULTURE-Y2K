import { useState, useCallback, useEffect, useRef } from "react";
import { MatrixRain, BSOD, DialUpSound, YouveGotMail } from "../components/features/EasterEggs";

export interface EasterEggsState {
  matrixRain: boolean;
  bsod: boolean;
  dialup: boolean;
  youveGotMail: boolean;
}

export const useEasterEggs = () => {
  const [activeEggs, setActiveEggs] = useState<EasterEggsState>({
    matrixRain: false,
    bsod: false,
    dialup: false,
    youveGotMail: false,
  });

  const [dialupComplete, setDialupComplete] = useState(false);

  // Track key sequences
  const keyBufferRef = useRef<string[]>([]);
  const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  const matrixCode = ["m", "a", "t", "r", "i", "x"];
  const bsodCode = ["b", "s", "o", "d"];
  const mailCode = ["m", "a", "i", "l"];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      keyBufferRef.current.push(key);

      // Keep buffer manageable
      if (keyBufferRef.current.length > 20) {
        keyBufferRef.current.shift();
      }

      // Check for Matrix Rain (m-a-t-r-i-x)
      if (keyBufferRef.current.slice(-6).join("") === matrixCode.join("")) {
        setActiveEggs((prev) => ({ ...prev, matrixRain: !prev.matrixRain }));
        keyBufferRef.current = [];
      }

      // Check for BSOD (b-s-o-d)
      if (keyBufferRef.current.slice(-4).join("") === bsodCode.join("")) {
        setActiveEggs((prev) => ({ ...prev, bsod: true }));
        keyBufferRef.current = [];
      }

      // Check for You've Got Mail (m-a-i-l)
      if (keyBufferRef.current.slice(-4).join("") === mailCode.join("")) {
        setActiveEggs((prev) => ({ ...prev, youveGotMail: true }));
        keyBufferRef.current = [];
      }

      // Check for Dial-up (d-i-a-l)
      const dialCode = ["d", "i", "a", "l"];
      if (keyBufferRef.current.slice(-4).join("") === dialCode.join("")) {
        setActiveEggs((prev) => ({ ...prev, dialup: true, dialupComplete: false }));
        keyBufferRef.current = [];
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeMatrix = useCallback(() => {
    setActiveEggs((prev) => ({ ...prev, matrixRain: false }));
  }, []);

  const closeBSOD = useCallback(() => {
    setActiveEggs((prev) => ({ ...prev, bsod: false }));
  }, []);

  const closeMail = useCallback(() => {
    setActiveEggs((prev) => ({ ...prev, youveGotMail: false }));
  }, []);

  const completeDialup = useCallback(() => {
    setActiveEggs((prev) => ({ ...prev, dialup: false }));
    setDialupComplete(true);
    setTimeout(() => setDialupComplete(false), 3000);
  }, []);

  return {
    activeEggs,
    dialupComplete,
    closeMatrix,
    closeBSOD,
    closeMail,
    completeDialup,
  };
};