"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealVariant = "up" | "fade" | "scale" | "left" | "right";

interface RevealProps {
  children: ReactNode;
  /** 進場樣式 */
  variant?: RevealVariant;
  /** 延遲（毫秒），用來做 stagger */
  delay?: number;
  /** 自訂 className */
  className?: string;
  /** 自訂 inline style */
  style?: CSSProperties;
  /** 是否只觸發一次（預設 true） */
  once?: boolean;
  /** 內層元素標籤 */
  as?: keyof React.JSX.IntrinsicElements;
}

const VARIANT_CLASS: Record<RevealVariant, string> = {
  up: "reveal",
  fade: "reveal-fade",
  scale: "reveal-scale",
  left: "reveal-left",
  right: "reveal-right",
};

/**
 * 滾動進場動畫包裝元件。
 * 純 CSS transition + IntersectionObserver，不依賴外部套件。
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
  style,
  once = true,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      node.classList.add("is-in");
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      node.classList.add("is-in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add("is-in");
            if (once) observer.unobserve(node);
          } else if (!once) {
            node.classList.remove("is-in");
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const Tag = as as "div";

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      className={`${VARIANT_CLASS[variant]} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
