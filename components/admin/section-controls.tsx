"use client";

import { useEffect, useRef, useState } from "react";

interface SectionControlsProps {
  heading: string;
  defaultVisible?: boolean;
}

// 每個首頁區塊共用的頂部控制列：顯示 / 隱藏切換、儲存狀態指示、未儲存離開提醒。
// 包在 <form> 內即可使用；依賴所在 form 的 input 變化來偵測「有未儲存變更」。
export function SectionControls({ heading, defaultVisible = true }: SectionControlsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(defaultVisible);
  const [dirty, setDirty] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 綁定到所在 form：任何 input/textarea/select 變動 → 標記 dirty
  useEffect(() => {
    const form = containerRef.current?.closest("form");
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

  // 離開頁面前若有未儲存變更 → 提醒
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
    <div ref={containerRef} className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold text-forest-900">{heading}</h2>
        {dirty ? (
          <span className="rounded-lg bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">
            尚未儲存
          </span>
        ) : null}
        {submitting ? (
          <span className="rounded-lg bg-forest-50 px-2 py-1 text-xs font-semibold text-forest-800">
            儲存中…
          </span>
        ) : null}
      </div>
      <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-forest-800">
        <input
          type="checkbox"
          name="visible"
          value="1"
          checked={visible}
          onChange={(e) => {
            setVisible(e.target.checked);
            setDirty(true);
          }}
          className="h-4 w-4 rounded border-forest-300 accent-forest-700"
        />
        顯示於前台
      </label>
    </div>
  );
}
