interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center";
  inverted?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = "left",
  inverted = false,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  const subtitleColor = inverted ? "text-white/76" : "text-white/68";
  const titleColor = "text-mist";
  const eyebrowColor = inverted ? "text-signal" : "text-signal";

  return (
    <div className={alignment}>
      {eyebrow ? (
        <p className={`mb-3 text-sm font-semibold uppercase tracking-[0.16em] ${eyebrowColor}`}>
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`text-balance text-3xl font-bold leading-tight md:text-4xl ${titleColor}`}>
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 max-w-3xl text-base leading-8 md:text-lg ${subtitleColor}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
