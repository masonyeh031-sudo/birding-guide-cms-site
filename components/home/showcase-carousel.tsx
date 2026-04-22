"use client";

import { useEffect, useMemo, useState } from "react";

import type { ShowcaseImage } from "@/lib/types";

interface ShowcaseCarouselProps {
  images: ShowcaseImage[];
}

export function ShowcaseCarousel({ images }: ShowcaseCarouselProps) {
  const validImages = useMemo(
    () => images.filter((image) => image.image.trim()),
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
    }, 3500);

    return () => window.clearInterval(timer);
  }, [validImages.length]);

  if (!validImages.length) {
    return null;
  }

  const activeImage = validImages[activeIndex];

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_170px]">
      <figure className="site-panel overflow-hidden">
        <div className="relative aspect-[16/10]">
          <img
            src={activeImage.image}
            alt={activeImage.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-carbon-950/76 via-transparent to-transparent" />
        </div>
        <figcaption className="flex items-center justify-between gap-4 px-5 py-4">
          <p className="text-sm leading-7 text-white/64">{activeImage.title}</p>
          {validImages.length > 1 ? (
            <div className="flex items-center gap-2">
              {validImages.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  aria-label={`切換到照片 ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    index === activeIndex ? "bg-signal" : "bg-white/24"
                  }`}
                />
              ))}
            </div>
          ) : null}
        </figcaption>
      </figure>

      {validImages.length > 1 ? (
        <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
          {validImages.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`overflow-hidden rounded-lg border transition ${
                index === activeIndex
                  ? "border-signal shadow-site-soft"
                  : "border-white/12"
              }`}
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={image.image}
                  alt={image.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
