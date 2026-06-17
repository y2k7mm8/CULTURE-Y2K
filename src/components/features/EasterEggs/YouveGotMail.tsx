import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface YouveGotMailProps {
  isActive: boolean;
  onClose: () => void;
}

export const YouveGotMail: React.FC<YouveGotMailProps> = ({ isActive, onClose }) => {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setShowPopup(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isActive]);

  useEffect(() => {
    if (!isActive) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showPopup) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isActive, showPopup, onClose]);

  if (!isActive) return null;

  return (
    <>
      {showPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <div className="bg-gradient-to-b from-yellow-300 to-yellow-500 border-4 border-yellow-600 rounded-lg shadow-2xl p-6 min-w-[400px]">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl animate-bounce">📧</div>
              <div>
                <p className="text-2xl font-bold text-gray-800">AOL</p>
                <p className="text-sm text-gray-600">America Online</p>
              </div>
            </div>

            <div className="bg-white border-2 border-gray-300 rounded p-4 mb-4">
              <p className="text-2xl font-bold text-blue-600 text-center mb-2">
                {t("common.youveGotMail")}
              </p>
              <p className="text-gray-700 text-center">
                You have <span className="font-bold text-blue-600">1</span> new message!
              </p>
            </div>

            <div className="flex gap-2 justify-center">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-blue-500 text-white rounded font-bold hover:bg-blue-600"
              >
                Read Mail
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-400 text-white rounded font-bold hover:bg-gray-500"
              >
                Later
              </button>
            </div>

            <p className="text-center text-gray-600 text-xs mt-4">
              Press ESC to close
            </p>
          </div>
        </div>
      )}
    </>
  );
};