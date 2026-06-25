"use client";

import { useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";
import ScrollMarquee from "@/components/ui/ScrollMarquee";
import { SITE, SOCIALS } from "@/lib/data";

type Fields = { name: string; email: string; projectType: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const PROJECT_TYPES = ["אפליקציית מובייל", "אתר / Web", "עיצוב מוצר", "מיתוג דיגיטלי", "אחר"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "שכחת לכתוב את השם";
  if (!f.email.trim()) e.email = "צריך אימייל כדי לחזור אליך";
  else if (!EMAIL_RE.test(f.email.trim())) e.email = "האימייל לא נראה תקין";
  if (!f.message.trim()) e.message = "כתוב/י כמה מילים על הפרויקט";
  else if (f.message.trim().length < 10) e.message = "קצת יותר פירוט יעזור (10+ תווים)";
  return e;
}

export default function Contact() {
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (k: keyof Fields, v: string) => {
    setFields((p) => ({ ...p, [k]: v }));
    if (touched[k]) setErrors(validate({ ...fields, [k]: v }));
  };

  const blur = (k: keyof Fields) => {
    setTouched((p) => ({ ...p, [k]: true }));
    setErrors(validate(fields));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(fields);
    setErrors(errs);
    setTouched({ name: true, email: true, projectType: true, message: true });

    if (Object.keys(errs).length > 0) {
      // מיקוד על השדה הראשון שגוי (חוק נגישות מהסקיל)
      const first = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }

    // ללא שרת: מרכיב מייל מוכן לשליחה (אפשר להחליף בקלות ל-Formspree/Web3Forms/API)
    const subject = `פנייה מהאתר${fields.projectType ? ` · ${fields.projectType}` : ""} — ${fields.name}`;
    const body = `שם: ${fields.name}\nאימייל: ${fields.email}\nסוג פרויקט: ${
      fields.projectType || "—"
    }\n\n${fields.message}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const inputBase =
    "w-full border-2 border-line bg-transparent px-4 py-3.5 text-fg placeholder:text-muted-fg/50 transition-colors duration-150 focus:border-accent";

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t-2 border-line bg-bg pb-20 md:pb-32"
    >
      {/* באנר ענק בראש הסקשן */}
      <div className="overflow-hidden border-b-2 border-line py-6 md:py-8">
        <ScrollMarquee baseVelocity={-7} separator="✶" separatorClassName="text-accent-ink">
          <span className="display text-stroke text-[13vw] leading-[1.05] md:text-[9vw]">
            בוא נדבר
          </span>
          <span className="display text-accent-ink px-[0.25em] text-[13vw] leading-[1.05] md:text-[9vw]">
            LET&apos;S TALK
          </span>
        </ScrollMarquee>
      </div>

      <div className="px-5 pt-16 md:px-10 md:pt-24">
        <Reveal>
          <div className="flex items-end justify-between border-b-2 border-line pb-5">
            <span className="label text-accent-ink">04 / צור קשר</span>
            <span className="label text-muted-fg">{SITE.available}</span>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          {/* מידע */}
          <div className="md:col-span-5">
            <Reveal>
              <h2 className="display text-6xl leading-[0.95] text-fg md:text-7xl">
                בוא ניצור
                <br />
                <span className="text-accent-ink">משהו ביחד.</span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-fg">
                יש לך רעיון, פרויקט או סתם שאלה? מלא/י את הטופס ואחזור אליך תוך
                24 שעות. אפשר גם ישירות:
              </p>

              <MagneticButton
                href={`mailto:${SITE.email}`}
                ariaLabel={`שליחת מייל אל ${SITE.email}`}
                className="mt-6 inline-block border-2 border-line px-5 py-3 text-fg transition-colors duration-150 hover:bg-accent hover:text-accent-fg"
              >
                <span className="display text-xl md:text-2xl">{SITE.email}</span>
              </MagneticButton>

              <div className="mt-8 flex flex-wrap gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label border-2 border-line px-4 py-2.5 text-fg transition-colors duration-150 hover:bg-fg hover:text-bg"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* טופס */}
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              {sent ? (
                <div className="flex h-full min-h-[420px] flex-col items-start justify-center border-2 border-line bg-bg-soft p-8 md:p-12">
                  <span className="flex h-16 w-16 items-center justify-center bg-accent text-accent-fg">
                    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="square" />
                    </svg>
                  </span>
                  <h3 className="display mt-6 text-4xl text-fg md:text-5xl">תודה!</h3>
                  <p className="mt-3 max-w-sm text-muted-fg">
                    פתחתי לך חלון מייל עם ההודעה — רק ללחוץ שליחה. לא נפתח? כתוב/י
                    לי ישירות אל{" "}
                    <a className="font-bold text-fg underline" href={`mailto:${SITE.email}`}>
                      {SITE.email}
                    </a>
                  </p>
                  <button
                    onClick={() => {
                      setSent(false);
                      setFields({ name: "", email: "", projectType: "", message: "" });
                      setTouched({});
                      setErrors({});
                    }}
                    className="label mt-8 border-2 border-line px-5 py-3 text-fg transition-colors duration-150 hover:bg-accent hover:text-accent-fg"
                  >
                    שליחת הודעה נוספת
                  </button>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={onSubmit}
                  noValidate
                  className="flex flex-col gap-6 border-2 border-line bg-bg-soft p-6 md:p-10"
                >
                  {/* שם */}
                  <div>
                    <label htmlFor="name" className="label mb-2 block text-muted-fg">
                      שם מלא <span className="text-accent-ink">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={fields.name}
                      onChange={(e) => set("name", e.target.value)}
                      onBlur={() => blur("name")}
                      placeholder="איך קוראים לך?"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "err-name" : undefined}
                      className={inputBase}
                    />
                    {errors.name && (
                      <p id="err-name" role="alert" className="mt-1.5 text-sm text-destructive">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* אימייל */}
                  <div>
                    <label htmlFor="email" className="label mb-2 block text-muted-fg">
                      אימייל <span className="text-accent-ink">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      inputMode="email"
                      dir="ltr"
                      value={fields.email}
                      onChange={(e) => set("email", e.target.value)}
                      onBlur={() => blur("email")}
                      placeholder="you@email.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "err-email" : undefined}
                      className={`${inputBase} text-right`}
                    />
                    {errors.email && (
                      <p id="err-email" role="alert" className="mt-1.5 text-sm text-destructive">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* סוג פרויקט */}
                  <div>
                    <label htmlFor="projectType" className="label mb-2 block text-muted-fg">
                      סוג הפרויקט
                    </label>
                    <div className="relative">
                      <select
                        id="projectType"
                        value={fields.projectType}
                        onChange={(e) => set("projectType", e.target.value)}
                        className={`${inputBase} cursor-pointer appearance-none pl-10`}
                      >
                        <option value="">בחר/י (לא חובה)</option>
                        {PROJECT_TYPES.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                      <svg
                        viewBox="0 0 24 24"
                        className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-fg"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <path d="M6 9l6 6 6-6" strokeLinecap="square" />
                      </svg>
                    </div>
                  </div>

                  {/* הודעה */}
                  <div>
                    <label htmlFor="message" className="label mb-2 block text-muted-fg">
                      ההודעה <span className="text-accent-ink">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={fields.message}
                      onChange={(e) => set("message", e.target.value)}
                      onBlur={() => blur("message")}
                      placeholder="ספר/י לי על הפרויקט, הלו״ז והתקציב המשוער…"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "err-message" : undefined}
                      className={`${inputBase} resize-none`}
                    />
                    {errors.message && (
                      <p id="err-message" role="alert" className="mt-1.5 text-sm text-destructive">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* שליחה */}
                  <button
                    type="submit"
                    className="group flex w-full cursor-pointer items-center justify-center gap-3 border-2 border-accent bg-accent px-6 py-4 text-accent-fg transition-colors duration-200 hover:bg-bg hover:text-accent-ink"
                  >
                    <span className="display text-2xl">שליחה</span>
                    <span className="transition-transform duration-200 group-hover:-translate-x-1">
                      ←
                    </span>
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
