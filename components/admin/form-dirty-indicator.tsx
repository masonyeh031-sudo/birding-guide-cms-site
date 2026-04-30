"use client";

import { useEffect, useRef, useState } from "react";

// 通用「未儲存 / 儲存中 / 離開提醒」小元件。
// 使用方式：放在任一 <form> 內，不需額外 props；會自動尋找所在 form 並掛載事件。
interface Props {
  label?: string;
  className?: string;
}

export function FormDirtyIndicator({ label, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [dirty, setDirty] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const form = ref.current?.closest("form");
    if (!form) return;

    const markDirty = () => setDirty(true);
    const handleSubmit = () => {
      setSubmitting(true);
      setDirty(false);
    };

    form.addEventListener("input", markDirty);
    form.addEventListener("change", markDirty);
    form.addEventListener("submit", handleSubmit);
    return () => {
      form.removeEventListener("input", markDirty);
      form.removeEventListener("change", markDirty);
      form.removeEventListener("submit", handleSubmit);
    };
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const handler = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  return (
    <span ref={ref} className={`inline-flex items-center gap-2 text-xs ${className ?? ""}`}>
      {label ? <span className="font-semibold text-forest-700">{label}</span> : null}
      {dirty ? (
        <span className="rounded-lg bg-amber-100 px-2 py-1 font-semibold text-amber-800">
          尚未儲存
        </span>
      ) : null}
      {submitting ? (
        <span className="rounded-lg bg-forest-50 px-2 py-1 font-semibold text-forest-800">
          儲存中…
        </span>
      ) : null}
      {!dirty && !submitting ? (
        <span className="rounded-lg bg-forest-50/60 px-2 py-1 font-semibold text-forest-700/70">
          已儲存
        </span>
      ) : null}
    </span>
  );
}
