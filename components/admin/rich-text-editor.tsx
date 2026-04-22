"use client";

import { useEffect, useRef, useState } from "react";

interface RichTextEditorProps {
  name: string;
  initialValue: string;
}

const tools = [
  { label: "粗體", command: "bold" },
  { label: "斜體", command: "italic" },
  { label: "標題", command: "formatBlock", value: "h3" },
  { label: "段落", command: "formatBlock", value: "p" },
  { label: "清單", command: "insertUnorderedList" },
];

export function RichTextEditor({ name, initialValue }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState(initialValue);

  useEffect(() => {
    setHtml(initialValue);
    if (editorRef.current) {
      editorRef.current.innerHTML = initialValue;
    }
  }, [initialValue]);

  function runCommand(command: string, value?: string) {
    editorRef.current?.focus();
    const documentWithCommand = document as Document & {
      execCommand?: (commandId: string, showUI?: boolean, value?: string) => boolean;
    };
    documentWithCommand.execCommand?.(command, false, value);
    setHtml(editorRef.current?.innerHTML || "");
  }

  return (
    <div className="rounded-lg border border-forest-200 bg-white">
      <div className="flex flex-wrap gap-2 border-b border-forest-200 p-3">
        {tools.map((tool) => (
          <button
            key={`${tool.command}-${tool.label}`}
            type="button"
            onClick={() => runCommand(tool.command, tool.value)}
            className="rounded-lg border border-forest-200 px-3 py-2 text-sm font-medium text-forest-800 transition hover:border-forest-500"
          >
            {tool.label}
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        className="min-h-[240px] px-4 py-4 text-sm leading-7 text-forest-900 outline-none"
        onInput={() => setHtml(editorRef.current?.innerHTML || "")}
        dangerouslySetInnerHTML={{ __html: initialValue }}
      />
      <textarea name={name} value={html} readOnly hidden />
    </div>
  );
}
