# אוהב · אתר תדמית

אתר תדמית אישי ל**אוֹהַב** — יוצר אפליקציות ואתרים.
עיצוב בסגנון **Kinetic Brutalism**: טיפוגרפיה ענקית, צבע אקצנט חומצתי, מרקיזות
אינסופיות, Hero תלת־ממדי וחוויית גלילה ייחודית. עברית מלאה, RTL, ורספונסיבי לכל מסך.

> מערכת העיצוב (סגנון, צבעים, טיפוגרפיה וחוקי UX) נגזרה באמצעות הסקיל
> [`ui-ux-pro-max`](.claude/skills/ui-ux-pro-max) שמותקן בריפו תחת `.claude/skills/`.

## הרצה מקומית

```bash
npm install
npm run dev      # פיתוח → http://localhost:3000
npm run build    # בנייה לפרודקשן
npm run start    # הרצת הבנייה
```

דרישות: Node.js 18+.

## הסטאק

| תחום | טכנולוגיה |
|------|-----------|
| Framework | **Next.js 15** (App Router) + React 19 + TypeScript |
| עיצוב | **Tailwind CSS v4** (טוקנים ב-`app/globals.css`) |
| אנימציות | **Framer Motion** (reveal, parallax, מעברים) |
| גלילה | **Lenis** (גלילה חלקה) + **GSAP ScrollTrigger** (pin / horizontal) |
| תלת־ממד | **Three.js** (סצנת ה-Hero, וניל — `components/three/HeroScene.tsx`) |
| פונטים | **Heebo** (עברי, עד משקל 900) + **Space Grotesk** (לטיני) דרך `next/font` |

## מבנה

```
app/
  layout.tsx        # RTL, פונטים, מטא־דאטה, provider של גלילה
  globals.css       # מערכת העיצוב: טוקנים, מרקיזה, grain, reduced-motion
  page.tsx          # הרכבת כל הסקשנים
components/
  Preloader.tsx     # אינטרו קולנועי (מונה + וילון)
  providers/SmoothScroll.tsx   # Lenis + GSAP
  three/HeroScene.tsx          # רקע תלת־ממדי
  ui/               # Marquee, MagneticButton, Reveal/RevealWords
  sections/         # Nav, Hero, MarqueeStrip, Works, About, Services, Contact, Footer
lib/data.ts         # כל התוכן (טקסטים, פרויקטים, שירותים, קישורים)
```

## עריכת תוכן

כל התוכן מרוכז בקובץ אחד — [`lib/data.ts`](lib/data.ts):

- `SITE` — שם, תפקיד, מייל, מיקום, סלוגן.
- `PROJECTS` — הפרויקטים בגלריית העבודות (כותרת, קטגוריה, שנה, תיאור, תגיות, גוון צבע).
- `SERVICES` — השירותים.
- `STATS`, `ABOUT_PARAGRAPHS`, `SOCIALS`, `MARQUEE_WORDS`.

> כרגע התוכן הוא **placeholder מעוצב**. החלפת טקסטים/פרויקטים = עריכה של `lib/data.ts` בלבד.
> כיסויי הפרויקטים הם טיפוגרפיים (ללא צורך בתמונות). להוספת תמונות אמיתיות בעתיד —
> אפשר להחזיר רכיב `next/image` ל-`components/sections/Works.tsx`.

## נגישות

- כיבוד `prefers-reduced-motion` בכל האנימציות (Lenis, GSAP, Framer, המרקיזות והסצנה התלת־ממדית).
- מצב מקלדת עם `focus-visible` בולט, קישור "דלג לתוכן", וניגודיות בהתאם ל-WCAG AA.

## עיצוב — מערכת הטוקנים

מוגדרת ב-`app/globals.css` תחת `@theme`:

| טוקן | ערך |
|------|-----|
| רקע | `#09090B` |
| טקסט | `#FAFAFA` |
| אקצנט | `#DFE104` (טקסט עליו: `#000`) |
| גבול | `#3F3F46` · רוחב 2px · radius 0 |
