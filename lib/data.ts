// ────────────────────────────────────────────────────────────────────────────
// תוכן האתר — כל הטקסטים והנתונים במקום אחד.
// הכול כאן הוא תוכן זמני (placeholder) שקל להחליף בהמשך.
// ────────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: "אוֹהַב",
  nameLatin: "OHAV",
  role: "יוצר אפליקציות ואתרים",
  roleLatin: "PRODUCT · WEB · MOBILE",
  email: "ohav88@gmail.com",
  location: "תל אביב, ישראל",
  available: "פנוי לפרויקטים חדשים",
  tagline: "מעצב ובונה מוצרים דיגיטליים שאי אפשר להפסיק להשתמש בהם.",
} as const;

export const NAV_LINKS = [
  { label: "עבודות", href: "#works", index: "01" },
  { label: "עליי", href: "#about", index: "02" },
  { label: "שירותים", href: "#services", index: "03" },
  { label: "צור קשר", href: "#contact", index: "04" },
] as const;

// מילים שרצות במרקיזות
export const MARQUEE_WORDS = [
  "עיצוב מוצר",
  "פיתוח אתרים",
  "אפליקציות מובייל",
  "חוויית משתמש",
  "אנימציות",
  "מיתוג דיגיטלי",
  "ממשקים",
];

export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  // צבע גוון לכרטיס — מניע את הכיסוי הטיפוגרפי המעוצב (ללא תלות בנכסים חיצוניים)
  color: string;
};

export const PROJECTS: Project[] = [
  {
    id: "aurora",
    index: "01",
    title: "Aurora",
    category: "אפליקציית מובייל",
    year: "2025",
    description:
      "אפליקציית מדיטציה וכושר נפשי עם חוויית סאונד סוחפת ואנימציות נשימה בזמן אמת.",
    tags: ["React Native", "עיצוב מוצר", "Motion"],
    color: "#DFE104",
  },
  {
    id: "nimbus",
    index: "02",
    title: "Nimbus",
    category: "פלטפורמת SaaS",
    year: "2025",
    description:
      "לוח בקרה אנליטי לצוותי מוצר — נתונים מורכבים שהופכים להחלטות בשנייה.",
    tags: ["Next.js", "Data Viz", "UI/UX"],
    color: "#7C5CFF",
  },
  {
    id: "monolith",
    index: "03",
    title: "Monolith",
    category: "אתר תדמית",
    year: "2024",
    description:
      "אתר למותג אופנה עם גלילה אופקית, טיפוגרפיה ענקית וחוויית מוצר קולנועית.",
    tags: ["WebGL", "Brutalism", "מיתוג"],
    color: "#FF5C00",
  },
  {
    id: "pulse",
    index: "04",
    title: "Pulse",
    category: "אפליקציית מובייל",
    year: "2024",
    description:
      "רשת חברתית למוזיקאים — שיתוף לופים, קולבורציות וגלי קול חיים.",
    tags: ["iOS", "Audio", "Community"],
    color: "#00E0B8",
  },
  {
    id: "vertex",
    index: "05",
    title: "Vertex",
    category: "פלטפורמת E-commerce",
    year: "2023",
    description:
      "חנות מקוונת למוצרי עיצוב עם הדמיות תלת־ממד של מוצרים וצ׳קאאוט בלחיצה.",
    tags: ["Three.js", "Shopify", "3D"],
    color: "#FF3D81",
  },
  {
    id: "horizon",
    index: "06",
    title: "Horizon",
    category: "מערכת עיצוב",
    year: "2023",
    description:
      "ספריית קומפוננטות ומערכת עיצוב מקצה לקצה לסטארטאפ פינטק בצמיחה.",
    tags: ["Design System", "Tokens", "React"],
    color: "#4D7CFF",
  },
];

export const SERVICES = [
  {
    index: "01",
    title: "עיצוב מוצר",
    description:
      "מהרעיון ועד למסך — מחקר, זרימות, ופרוטוטייפ אינטראקטיבי שמרגיש אמיתי.",
    items: ["UX Research", "Wireframes", "Prototyping", "Design Systems"],
  },
  {
    index: "02",
    title: "פיתוח Web",
    description:
      "אתרים מהירים, נגישים ומונפשים. קוד נקי שמתורגם לחוויה שזוכרים.",
    items: ["Next.js", "React", "Animations", "WebGL"],
  },
  {
    index: "03",
    title: "אפליקציות מובייל",
    description:
      "אפליקציות נייטיב שמרגישות חלקות בכל מכשיר, מהפיקסל הראשון ועד החנות.",
    items: ["React Native", "iOS", "Android", "Motion"],
  },
  {
    index: "04",
    title: "מיתוג דיגיטלי",
    description:
      "זהות ויזואלית עם אופי — צבע, טיפוגרפיה ותנועה שמספרים את הסיפור שלך.",
    items: ["Identity", "Art Direction", "Typography", "Guidelines"],
  },
];

export const STATS = [
  { value: "50+", label: "פרויקטים שהושקו" },
  { value: "8", label: "שנות ניסיון" },
  { value: "20+", label: "לקוחות מרוצים" },
  { value: "∞", label: "כוסות קפה" },
];

export const ABOUT_PARAGRAPHS = [
  "אני אוהב, יוצר דיגיטלי שחי על קו התפר שבין עיצוב לקוד.",
  "כבר שנים שאני בונה אפליקציות ואתרים שמשלבים אסתטיקה מדויקת עם הנדסה נקייה — מוצרים שנעימים לעין, חלקים לשימוש, ובלתי נשכחים.",
  "אני מאמין שכל פיקסל, כל מעבר וכל מילימטר של תנועה הם החלטה. וכשהכול מתחבר — נוצרת חוויה שאי אפשר להפסיק להשתמש בה.",
];

export const SOCIALS = [
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
];
