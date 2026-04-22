interface MessageBannerProps {
  message?: string;
  tone?: "success" | "error";
}

export function MessageBanner({
  message,
  tone = "success",
}: MessageBannerProps) {
  if (!message) {
    return null;
  }

  const styles =
    tone === "error"
      ? "border-red-200 bg-red-50 text-red-700"
      : "border-forest-200 bg-forest-50 text-forest-800";

  return <div className={`rounded-lg border px-4 py-3 text-sm font-medium ${styles}`}>{message}</div>;
}
