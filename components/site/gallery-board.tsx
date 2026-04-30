"use client";

import { useEffect, useMemo, useState } from "react";

import { Reveal } from "@/components/site/reveal";
import type { GalleryItemRecord } from "@/lib/types";

interface GalleryBoardProps {
  items: GalleryItemRecord[];
}

const CATEGORY_KEYWORDS: { label: string; match: RegExp }[] = [
  { label: "鳥類", match: /鳥|bird|species|羽/i },
  { label: "活動紀錄", match: /活動|導覽|event|tour|報名/i },
  { label: "生態環境", match: /生態|環境|公園|溼地|森林|wetland|park|nature/i },
  { label: "教學現場", match: /教學|教育|親子|學|workshop|class|kid/i },
];

function categorize(caption: string): string {
  for (const cat of CATEGORY_KEYWORDS) {
    if (cat.match.test(caption)) return cat.label;
  }
  return "其他";
}

export function GalleryBoard({ items }: GalleryBoardProps) {
  const [active, setActive] = useState<string>("全部");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const enriched = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        category: categorize(item.caption || ""),
      })),
    [items],
  );

  const categories = useMemo(() => {
    const set = new Set<string>();
    enriched.forEach((item) => set.add(item.category));
    return ["全部", ...Array.from(set)];
  }, [enriched]);

  const filtered = useMemo(
    () => (active === "全部" ? enriched : enriched.filter((i) => i.category === active)),
    [enriched, active],
  );

  // 鍵盤左右切換 / ESC 關閉
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowLeft")
        setOpenIndex((idx) =>
          idx === null ? null : (idx - 1 + filtered.length) % filtered.length,
        );
      if (e.key === "ArrowRight")
        setOpenIndex((idx) => (idx === null ? null : (idx + 1) % filtered.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, filtered.length]);

  if (items.length === 0) {
    return (
      <div className="glass p-10 text-center">
        <p className="text-base text-forest-700">相簿正在整理中，敬請期待。</p>
      </div>
    );
  }

  const current = openIndex !== null ? filtered[openIndex] : null;

  return (
    <div>
      {/* 分類 chip filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              active === cat
                ? "border-transparent bg-forest-800 text-white shadow-glow-soft"
                : "border-forest-200 bg-white/70 text-forest-800 backdrop-blur hover:border-forest-400 hover:text-forest-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry 圖片 */}
      <div className="gallery-masonry mt-8">
        {filtered.map((item, idx) => (
          <Reveal key={item.id} variant="up" delay={(idx % 6) * 60}>
            <figure
              className="lift mb-4 overflow-hidden rounded-2xl bg-white shadow-soft"
              role="button"
              tabIndex={0}
              onClick={() => setOpenIndex(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpenIndex(idx);
                }
              }}
            >
              <div className="zoom-img cursor-zoom-in">
                <img
                  src={item.image}
                  alt={item.caption || ""}
                  className="h-auto w-full object-cover"
                />
              </div>
              {item.caption ? (
                <figcaption className="border-t border-forest-100/60 px-4 py-3 text-sm leading-6 text-forest-700">
                  {item.caption}
                </figcaption>
              ) : null}
            </figure>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      {current ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-forest-900/85 backdrop-blur-md"
          onClick={() => setOpenIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex(null);
            }}
            className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
            aria-label="關閉"
          >
            ✕
          </button>
          {filtered.length > 1 ? (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex(
                    (i) => (i === null ? 0 : (i - 1 + filtered.length) % filtered.length),
                  );
                }}
                className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25 md:left-6"
                aria-label="上一張"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenIndex((i) => (i === null ? 0 : (i + 1) % filtered.length));
                }}
                className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25 md:right-6"
                aria-label="下一張"
              >
                ›
              </button>
            </>
          ) : null}
          <div
            className="max-h-[90vh] max-w-[92vw] overflow-hidden rounded-2xl bg-black/30 shadow-card"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.image}
              alt={current.caption || ""}
              className="max-h-[78vh] w-auto object-contain"
            />
            {current.caption ? (
              <p className="bg-forest-900/80 px-5 py-3 text-center text-sm text-white">
                {current.caption}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
