import type { CSSProperties } from "react";

interface AmbientBackgroundProps {
  /** 預設顯示鳥類剪影 */
  birds?: boolean;
  /** 預設顯示左右兩顆光暈 blob */
  blobs?: boolean;
  /** 預設顯示淡淡科技網格 */
  grid?: boolean;
  /** 額外 className（例如限定區域） */
  className?: string;
}

/**
 * 全站環境背景層：科技網格 + 森林光暈 + 鳥類剪影。
 * 純 CSS 動畫，不消耗 JS；prefers-reduced-motion 自動關閉。
 */
export function AmbientBackground({
  birds = true,
  blobs = true,
  grid = true,
  className = "",
}: AmbientBackgroundProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {grid ? (
        <div className="absolute inset-0 bg-site-grid [background-size:48px_48px] opacity-[0.18]" />
      ) : null}

      {blobs ? (
        <>
          <div
            className="absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full blur-3xl animate-glow-pulse"
            style={
              {
                background:
                  "radial-gradient(circle, rgba(155, 231, 196, 0.45), transparent 70%)",
              } as CSSProperties
            }
          />
          <div
            className="absolute -bottom-40 -left-24 h-[460px] w-[460px] rounded-full blur-3xl animate-glow-pulse"
            style={
              {
                animationDelay: "-4s",
                background:
                  "radial-gradient(circle, rgba(196, 255, 109, 0.32), transparent 70%)",
              } as CSSProperties
            }
          />
        </>
      ) : null}

      {birds ? <BirdSilhouettes /> : null}
    </div>
  );
}

/** 飛行中的鳥類剪影；緩慢由左飛向右上。 */
function BirdSilhouettes() {
  return (
    <>
      <svg
        className="absolute left-[-12%] top-[18%] h-7 w-12 text-forest-700/40 animate-fly-across hidden md:block"
        viewBox="0 0 64 24"
        fill="none"
      >
        <path
          d="M2 18 C 12 6, 22 6, 32 18 C 42 6, 52 6, 62 18"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="absolute left-[-14%] top-[36%] h-5 w-9 text-forest-700/35 animate-fly-across hidden md:block"
        style={{ animationDelay: "-12s", animationDuration: "44s" }}
        viewBox="0 0 64 24"
        fill="none"
      >
        <path
          d="M2 18 C 12 6, 22 6, 32 18 C 42 6, 52 6, 62 18"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="absolute left-[-12%] top-[62%] h-6 w-11 text-forest-700/30 animate-fly-across hidden md:block"
        style={{ animationDelay: "-22s", animationDuration: "52s" }}
        viewBox="0 0 64 24"
        fill="none"
      >
        <path
          d="M2 18 C 12 6, 22 6, 32 18 C 42 6, 52 6, 62 18"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </>
  );
}
