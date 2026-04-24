import React, { forwardRef, useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  srcSet?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  width?: number;
  height?: number;
  onLoad?: () => void;
}

export const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  (
    {
      src,
      alt,
      srcSet,
      sizes,
      priority = false,
      className = "",
      width,
      height,
      onLoad,
    },
    ref,
  ) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleLoad = () => {
      setIsLoaded(true);
      onLoad?.();
    };

    const webpSrcSet = srcSet || src.replace(/\.(jpg|png)$/, ".webp");

    return (
      <picture>
        <source srcSet={webpSrcSet} type="image/webp" sizes={sizes} />
        <source
          srcSet={srcSet || src}
          type={src.endsWith(".png") ? "image/png" : "image/jpeg"}
          sizes={sizes}
        />
        <img
          ref={ref}
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={`${className} ${!isLoaded ? "blur-sm" : ""} transition-all duration-300`}
          width={width}
          height={height}
          onLoad={handleLoad}
        />
      </picture>
    );
  },
);

OptimizedImage.displayName = "OptimizedImage";
