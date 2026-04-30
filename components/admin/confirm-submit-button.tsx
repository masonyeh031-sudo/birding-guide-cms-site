"use client";

import type { ReactNode } from "react";

// 需要「確定？」彈窗的 submit 按鈕。維持原 form 行為（method/action/formAction）。
interface Props {
  children: ReactNode;
  message: string;
  className?: string;
  formAction?: string;
  name?: string;
  value?: string;
}

export function ConfirmSubmitButton({ children, message, className, formAction, name, value }: Props) {
  return (
    <button
      type="submit"
      formAction={formAction}
      name={name}
      value={value}
      className={className}
      onClick={(event) => {
        if (!window.confirm(message)) event.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
