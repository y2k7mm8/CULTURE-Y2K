import { useState } from "react";
import { useTranslation } from "react-i18next";

interface AestheticImage {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

const aestheticImages: AestheticImage[] = [
  {
    id: 1,
    src: "/src/assets/img/aethestic/photo_2_2026-06-20_07-39-35.jpg",
    alt: "Y2K aesthetic image 1",
    caption: "Chrome & Neon Vibes",
  },
  {
    id: 2,
    src: "/src/assets/img/aethestic/photo_3_2026-06-20_07-39-35.jpg",
    alt: "Y2K aesthetic image 2",
    caption: "Glossy Glass Effect",
  },
  {
    id: 3,
    src: "/src/assets/img/aethestic/photo_4_2026-06-20_07-39-35.jpg",
    alt: "Y2K aesthetic image 3",
    caption: "Metallic Dreams",
  },
  {
    id: 4,
    src: "/src/assets/img/aethestic/photo_5_2026-06-20_07-39-35.jpg",
    alt: "Y2K aesthetic image 4",
    caption: "Digital Candy",
  },
  {
    id: 5,
    src: "/src/assets/img/aethestic/photo_6_2026-06-20_07-39-35.jpg",
    alt: "Y2K aesthetic image 5",
    caption: "Cyber Chrome",
  },
  {
    id: 6,
    src: "/src/assets/img/aethestic/photo_7_2026-06-20_07-39-35.jpg",
    alt: "Y2K aesthetic image 6",
    caption: "Future Fashion",
  },
  {
    id: 7,
    src: "/src/assets/img/aethestic/photo_8_2026-06-20_07-39-35.jpg",
    alt: "Y2K aesthetic image 7",
    caption: "Holographic Vibe",
  },
];

export default function AestheticGallery() {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="w-full">
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {aestheticImages.map((image) => (
          <div
            key={image.id}
            className="group relative h-64 md:h-72 cursor-pointer overflow-hidden rounded-lg border-2 border-y2k-cyan/40 hover:border-y2k-cyan shadow-lg hover:shadow-glow-cyan transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
            onClick={() => setSelectedImage(image.id)}
          >
            {/* Image */}
            <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-y2k-cyan/20 to-y2k-pink/20">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-500"
              />
              {/* Fallback gradient for missing images */}
              <div className="absolute inset-0 bg-gradient-to-br from-y2k-cyan via-y2k-purple to-y2k-pink opacity-80"></div>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-y2k-cyan/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <p className="text-white font-bold text-sm md:text-base drop-shadow-lg">
                {image.caption}
              </p>
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-2 left-2 w-2 h-2 bg-y2k-cyan shadow-lg shadow-y2k-cyan rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-y2k-pink shadow-lg shadow-y2k-pink rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 bg-y2k-lime shadow-lg shadow-y2k-lime rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 bg-y2k-purple shadow-lg shadow-y2k-purple rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ))}
      </div>

      {/* Modal Preview */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] border-4 border-y2k-cyan/60 rounded-lg overflow-hidden shadow-2xl shadow-y2k-cyan/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-y2k-cyan to-y2k-pink flex items-center px-4 justify-between z-10">
              <span className="text-white text-xs font-bold">
                {
                  aestheticImages.find((img) => img.id === selectedImage)
                    ?.caption
                }
              </span>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-white hover:text-y2k-lime font-bold text-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="pt-8 pb-4 bg-gradient-to-b from-y2k-cyan/10 to-y2k-pink/10 h-full flex items-center justify-center">
              <img
                src={
                  aestheticImages.find((img) => img.id === selectedImage)?.src
                }
                alt={
                  aestheticImages.find((img) => img.id === selectedImage)?.alt
                }
                className="w-full h-full object-contain p-4"
              />
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() => {
                const currentIndex = aestheticImages.findIndex(
                  (img) => img.id === selectedImage,
                );
                if (currentIndex > 0) {
                  setSelectedImage(aestheticImages[currentIndex - 1].id);
                }
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-y2k-cyan/60 hover:bg-y2k-cyan text-white p-3 rounded transition-colors z-10"
            >
              ❮
            </button>
            <button
              onClick={() => {
                const currentIndex = aestheticImages.findIndex(
                  (img) => img.id === selectedImage,
                );
                if (currentIndex < aestheticImages.length - 1) {
                  setSelectedImage(aestheticImages[currentIndex + 1].id);
                }
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-y2k-cyan/60 hover:bg-y2k-cyan text-white p-3 rounded transition-colors z-10"
            >
              ❯
            </button>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-8 p-6 bg-gradient-to-r from-y2k-cyan/20 via-y2k-purple/20 to-y2k-pink/20 border-2 border-y2k-cyan/40 rounded-lg">
        <h3 className="text-lg md:text-xl font-bold text-y2k-cyan mb-2">
          ✨ Y2K Aesthetic Collection
        </h3>
        <p className="text-white text-sm md:text-base opacity-90">
          {t("fashion.aesthetic") ||
            "Curated visual archive of Y2K aesthetics: chrome, neon, glass effects and futuristic styling that defined an era."}
        </p>
      </div>
    </div>
  );
}
