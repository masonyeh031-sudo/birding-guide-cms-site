"use client";

import { useEffect, useMemo, useState } from "react";

interface ImageRotatorProps {
  images: string[];
  alt: string;
  aspectClassName?: string;
}

export function ImageRotator({
  images,
  alt,
  aspectClassName = "aspect-[16/11]",
}: ImageRotatorProps) {
  const validImages = useMemo(
    () => images.filter((image) => image.trim()),
    [images],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [validImages.length]);

  useEffect(() => {
    if (validImages.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % validImages.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [validImages.length]);

  if (!validImages.length) {
    return null;
  }

  return (
    <div className={`relative overflow-hidden ${aspectClassName}`}>
      <img
        src={validImages[activeIndex]}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {validImages.length > 1 ? (
        <div className="absolute bottom-3 right-3 flex gap-1.5 rounded-lg bg-carbon-950/62 px-2 py-1">
          {validImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              aria-label={`切換到第 ${index + 1} 張照片`}
              onClick={() => setActiveIndex(index)}
              className={`h-2 w-2 rounded-full ${
                index === activeIndex ? "bg-signal" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
