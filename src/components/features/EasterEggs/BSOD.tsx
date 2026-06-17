import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface BSODProps {
  isActive: boolean;
  onClose: () => void;
}

export const BSOD: React.FC<BSODProps> = ({ isActive, onClose }) => {
  const { t } = useTranslation();
  const [timer, setTimer] = useState(100);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isActive, onClose]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 bg-blue-600 font-mono text-white p-8 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <p className="text-4xl font-bold mb-4">A problem has been detected and Windows has been shut down to prevent damage to your computer.</p>

        <p className="text-xl mb-4">Y2K_BUG_DETECTED</p>

        <p className="text-lg mb-4">
          If this is the first time you've seen this stop error screen, restart your computer. If this screen appears again, follow these steps:
        </p>

        <p className="text-lg mb-4">
          Check to be sure you have adequate disk space. If a driver is identified in the stop message, disable the driver or check with the manufacturer for driver updates. Try changing video adapters.
        </p>

        <p className="text-lg mb-4">
          Check with your hardware vendor for any BIOS updates. Disable BIOS memory options such as caching or shadowing. If you need to use safe mode to remove or disable components, restart your computer, press F8 to select Advanced Startup Options, and then select safe mode.
        </p>

        <p className="text-lg mb-4">Technical information:</p>

        <p className="text-lg mb-4">*** STOP: 0x000000ED (0x80F12BD0, 0xC000009C, 0x00000000, 0x00000000)</p>

        <p className="text-lg mb-4">*** y2k.sys - Address 80F12BD0 base at 80F00000, DateStamp 3d6dd67c</p>

        <p className="text-lg mb-4">
          Beginning dump of physical memory
          <br />
          Physical memory dump complete.
          <br />
          Contact your system administrator or technical support group for further assistance.
        </p>

        <p className="text-xl mt-8">
          System will reboot in {timer} seconds...
        </p>

        <div className="fixed bottom-4 right-4 text-sm bg-blue-700 p-2 border border-white/30">
          Press ESC to exit
        </div>
      </div>
    </div>
  );
};