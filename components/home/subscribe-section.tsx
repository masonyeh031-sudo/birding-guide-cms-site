import type { HomepageSectionRecord } from "@/lib/types";

interface SubscribeSectionProps {
  section: HomepageSectionRecord;
  success?: boolean;
}

export function SubscribeSection({ section, success = false }: SubscribeSectionProps) {
  const extra = section.extraJson as {
    placeholder?: string;
    buttonLabel?: string;
    successMessage?: string;
  };

  return (
    <section id="register" className="section-space">
      <div className="content-shell">
        <div className="site-panel px-6 py-10 md:px-10 md:py-12">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-signal">訂閱通知</p>
          <h2 className="mt-4 text-balance text-3xl font-bold leading-tight text-mist md:text-4xl">
            {section.title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/68">{section.subtitle}</p>

          <form
            action="/api/subscribe"
            method="post"
            className="mt-8 flex flex-col gap-3 md:flex-row"
          >
            <input
              type="email"
              name="email"
              required
              placeholder={extra.placeholder || "輸入 Email"}
              className="site-input min-h-[52px] flex-1"
            />
            <button type="submit" className="site-button-primary">
              {extra.buttonLabel || "訂閱"}
            </button>
          </form>

          {success ? (
            <p className="mt-4 text-sm text-signal">{extra.successMessage || "訂閱成功"}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
