// ─── COURSE CONTENT DATA MODEL ───────────────────────────────────────────────
// Edit THIS FILE to change any text, steps, hints, or questions.
// Components read from this data — never hardcode content in JSX.
//
// Competency tags (מחווני כשירות — מטה"ח):
//   'researcher'    = כשירות 1 — מזהה כיצד AI עובד
//   'programmer'    = כשירות 2 — משתמש/ת ב-AI בצורה יעילה
//   'creator'       = כשירות 3 — יוצר/ת ערך עם AI
//   'philosopher'   = כשירות 4 — פועל/ת בצורה אתית

export const COMPETENCY_LABELS = {
  researcher:  { emoji: '🔬', label: 'חוקר/ת' },
  programmer:  { emoji: '💻', label: 'מתכנת/ת' },
  creator:     { emoji: '🎨', label: 'יוצר/ת' },
  philosopher: { emoji: '🧠', label: 'פילוסוף/ת' },
}

// ── Helper: stub for units not yet fully written ──────────────────────────────
function stub(id, title, emoji, competencies, summary) {
  return {
    id,
    title,
    emoji,
    competencies,
    summary,
    duration: '35 דקות',
    learn: {
      chunks: [
        {
          id: 'stub-1',
          text: `ברוכים הבאים ליחידה "${title}". התוכן המלא של יחידה זו בפיתוח.`,
          type: 'text',
        },
      ],
    },
    see: { observations: [] },
    practice: { steps: [] },
    document: {
      question: 'כתוב/י השתקפות קצרה על מה שלמדת ביחידה זו.',
      artifactType: 'reflection',
      requiredKeywords: [],
      placeholder: 'מה למדת? מה הפתיע אותך?',
    },
    help: [],
    game: null,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// UNITS
// ─────────────────────────────────────────────────────────────────────────────

const unit1 = stub(
  'unit-1',
  'מה זה בכלל AI?',
  '🤖',
  ['researcher'],
  'נגדיר מה זה בינה מלאכותית, נראה דוגמאות אמיתיות ונבין מה AI יכול — ומה הוא לא יכול — לעשות.',
)

const unit2 = stub(
  'unit-2',
  'הרבה סוגי מודלים',
  '🗂️',
  ['researcher', 'programmer'],
  'LLM הוא רק אחד מסוגי ה-AI. נכיר מודלים שמסווגים, מזהים תמונות, ממליצים ועוד.',
)

const unit3 = stub(
  'unit-3',
  'איך מכונות לומדות?',
  '📊',
  ['researcher'],
  'נבין מה זה נתוני אימון, למה צריך הרבה דוגמאות ומה קורה "מאחורי הקלעים".',
)

const unit4 = stub(
  'unit-4',
  'מספרים עם משמעות — Embeddings',
  '🗺️',
  ['researcher', 'programmer'],
  'איך מחשב מבין מילים? נגלה שכל מילה היא נקודה במרחב — ומילים דומות גרות קרוב.',
)

// ── UNIT 5 — FULLY BUILT ─────────────────────────────────────────────────────
const unit5 = {
  id: 'unit-5',
  title: 'אמן את המודל שלך',
  emoji: '🧪',
  competencies: ['researcher', 'programmer', 'philosopher'],
  summary: 'תאמן/י מודל זיהוי הבעות פנים בעצמך ותגלה/י כיצד כמות ומגוון הדוגמאות קובעים את דיוק ה-AI.',
  duration: '35 דקות',

  // ── LEARN ──────────────────────────────────────────────────────────────────
  learn: {
    chunks: [
      {
        id: 'l1',
        type: 'hook',
        text: 'איך המחשב יודע שזה כלב — ולא חתול?',
        subtext: 'הוא לא נולד עם הידע הזה. מישהו היה צריך ללמד אותו.',
        buttonLabel: 'איך מלמדים מחשב? ←',
      },
      {
        id: 'l2',
        type: 'concept',
        heading: 'אימון = הרבה דוגמאות',
        bullets: [
          '200 תמונות של כלבים → "זה כלב"',
          '200 תמונות של חתולים → "זה חתול"',
        ],
        subtext: 'המחשב מחפש דפוסים. אחרי שראה מספיק — הוא יודע לזהות לבד.',
        buttonLabel: 'מה קורה עם מעט דוגמאות? ←',
      },
      {
        id: 'l3',
        type: 'comparison',
        heading: 'ככה זה עובד — ככה זה נכשל',
        rows: [
          { good: 'הרבה דוגמאות מגוונות', bad: 'מעט דוגמאות מאותה זווית' },
          { good: 'מודל מדויק ✅', bad: 'מודל מתבלבל ❌' },
        ],
        buttonLabel: 'בוא נראה דוגמה ←',
      },
      {
        id: 'l4',
        type: 'keyterm',
        term: 'Supervised Learning',
        termHe: 'למידה מפוקחת',
        definition: 'AI לומד מדוגמאות שאנחנו מתייגים.',
        buttonLabel: 'בוא נראה דוגמה אמיתית ←',
      },
    ],
  },

  // ── SEE ────────────────────────────────────────────────────────────────────
  see: {
    gameComponent: 'TrainingSim',  // rendered before observations
    observations: [
      {
        id: 's1',
        title: 'מודל עם אימון טוב',
        visual: {
          type: 'placeholder',
          prompt: 'Screenshot mockup of Google Teachable Machine with 3 trained classes (שמח, ניטרלי, מופתע), 80 samples each, preview showing 95% confidence on שמח.',
          searchQuery: 'Teachable Machine trained model high accuracy screenshot',
          alt: 'מסך Teachable Machine עם מודל מאומן היטב — 95% דיוק',
        },
        question: 'כמה דוגמאות יש לכל קטגוריה?',
        reveal: '80 דוגמאות לכל קטגוריה — מגוונות, מזוויות שונות.',
      },
      {
        id: 's2',
        title: 'מודל עם אימון חלש',
        visual: {
          type: 'placeholder',
          prompt: 'Screenshot mockup of Teachable Machine with 3 classes: class 1 has 5 samples, class 2 has 3, class 3 has 2. Preview shows fist misclassified as thumb-up 61%.',
          searchQuery: 'machine learning few training examples misclassification screenshot',
          alt: 'מסך Teachable Machine עם מודל לא מאומן — 61% טעות',
        },
        question: 'למה המודל מתבלבל?',
        reveal: 'מעט מדי דוגמאות ואין מגוון. המחשב לא ראה מספיק כדי ללמוד.',
      },
      {
        id: 's3',
        title: 'הטיה בנתונים (Bias)',
        visual: {
          type: 'diagram',
          diagramKey: 'bias',
          alt: 'דיאגרמת הטיה: 100 תמונות של ילד עם כובע → מודל → "ילד", 0 תמונות של ילדה עם כובע → מודל → "ילד" ❌',
        },
        question: 'מה הבעיה כאן?',
        reveal: 'הנתונים לא מייצגים את המציאות. כשהנתונים מוטים — המודל מוטה.',
      },
    ],
  },

  // ── PRACTICE ───────────────────────────────────────────────────────────────
  practice: {
    intro: 'בנה/י מזהה הבעות פנים! תאמן/י מודל להבדיל בין: 😊 שמח | 😐 ניטרלי | 😮 מופתע',
    steps: [
      {
        id: 'p1',
        instruction: 'פתח/י את האתר teachablemachine.withgoogle.com ולחץ/י על "Get Started".',
        action: 'confirm',
        confirmLabel: 'פתחתי ✓',
        helpKey: 'site-access',
      },
      {
        id: 'p2',
        instruction: 'בחר/י "Image Project" ← "Standard Image Model".',
        action: 'confirm',
        confirmLabel: 'בחרתי ✓',
        helpKey: null,
      },
      {
        id: 'p3',
        instruction: 'שנה/י את שמות הקטגוריות: Class 1 → שמח, Class 2 → ניטרלי. לחץ/י "Add a class" והוסף/י: מופתע.',
        action: 'confirm',
        confirmLabel: 'שיניתי ✓',
        helpKey: null,
      },
      {
        id: 'p4',
        instruction: 'לכל קטגוריה: לחץ/י "Webcam" ← עשה/י את ההבעה ← לחץ/י "Hold to Record". יעד: לפחות 30 דוגמאות לכל קטגוריה. 💡 הזז/י קצת את הראש בין צילומים!',
        action: 'confirm',
        confirmLabel: 'צילמתי 30+ דוגמאות ✓',
        helpKey: 'camera',
        progressTracked: true,
      },
      {
        id: 'p5',
        instruction: 'לחץ/י על "Train Model" וחכה/י — זה לוקח כ-30 שניות. אל תסגור/י את הדף!',
        action: 'confirm',
        confirmLabel: 'המודל מוכן ✓',
        helpKey: null,
      },
      {
        id: 'p6',
        instruction: 'לחץ/י "Preview" ← הפנה/י את המצלמה ← עשה/י כל אחת מ-3 ההבעות. מה עבד? מה לא?',
        action: 'text',
        placeholder: 'מה שמת/ת לב? (2–3 משפטים)',
        helpKey: 'accuracy',
      },
    ],
  },

  // ── DOCUMENT ───────────────────────────────────────────────────────────────
  document: {
    question: 'תאר/י בשתיים–שלוש משפטים: מה שיפר / פגע בדיוק המודל שלך?',
    hint: 'השתמש/י במילים: דוגמאות, קטגוריה, מגוון',
    artifactType: 'screenshot+reflection',
    requiredKeywords: ['דוגמאות', 'קטגוריה', 'מגוון'],
    placeholder: 'לדוגמה: "הוספתי יותר דוגמאות לקטגוריה של מופתע ואז המודל הפסיק להתבלבל..."',
    screenshotLabel: 'צלם/י מסך של ה-Preview עם שמות הקטגוריות ואחוזי הביטחון',
  },

  // ── HELP ───────────────────────────────────────────────────────────────────
  help: [
    {
      key: 'site-access',
      title: 'האתר לא נפתח?',
      steps: [
        'ודא/י שאתה/ן מחובר/ת לאינטרנט.',
        'נסה/י לפתוח בכרטיסייה חדשה: teachablemachine.withgoogle.com',
        'אם האתר חסום ברשת בית-הספר — שאל/י את המורה לקבל גישה, או נסה/י מהטלפון.',
      ],
    },
    {
      key: 'camera',
      title: 'המצלמה לא עובדת?',
      steps: [
        'חפש/י את הסמל 🔒 ליד כתובת האתר בדפדפן.',
        'לחץ/י עליו ← "Camera" ← "Allow".',
        'רענן/י את הדף (F5) ונסה/י שוב.',
        'עדיין לא עובד? בחר/י "Upload" במקום "Webcam" וצלם/י תמונות מהטלפון ועלה/י אותן.',
      ],
    },
    {
      key: 'accuracy',
      title: 'המודל מתבלבל?',
      steps: [
        'בדוק/י: כמה דוגמאות יש לכל קטגוריה? כולן צריכות להיות בערך שוות.',
        'אם קטגוריה אחת חלשה — הוסף/י לה עוד דוגמאות.',
        'הגזים/י בהבעות! שמח = חייך גדול. מופתע = פה פתוח רחב.',
        'מחק/י דוגמאות לא-ברורות (לחץ/י על הפח 🗑️) ואמן/י שוב.',
      ],
    },
  ],

  game: {
    component: 'TrainingSim',
    location: 'see', // appears before observations in SEE
  },
}

const unit6 = stub(
  'unit-6',
  'הקשר (Context) — הזיכרון של ה-AI',
  '💬',
  ['researcher', 'programmer'],
  'מה זה "חלון ההקשר"? למה AI שוכח? ואיך ההקשר משפיע על התשובות שהוא נותן.',
)

const unit7 = stub(
  'unit-7',
  'לדבר עם AI — יסודות ה-Prompt',
  '✏️',
  ['programmer'],
  'נלמד לנסח בקשות טובות: תפקיד, משימה, פורמט. נשווה prompt חלש ל-prompt חזק.',
)

const unit8 = stub(
  'unit-8',
  'לשפר prompt חלש',
  '🔧',
  ['programmer', 'creator'],
  'ניקח prompt גרוע ונשדרג אותו צעד אחר צעד — עד שהתוצאה תהיה מדויקת.',
)

const unit9 = stub(
  'unit-9',
  'AI שיוצר תמונות ומוזיקה',
  '🖼️',
  ['creator'],
  'נגלה כיצד מודלים גנרטיביים יוצרים מדיה, ונייצר תמונה בעצמנו.',
)

const unit10 = stub(
  'unit-10',
  'הזיות AI — מתי לא לסמוך?',
  '🔍',
  ['researcher', 'philosopher'],
  'AI ממציא עובדות. נלמד לזהות הזיות (hallucinations) ולאמת מידע בעצמנו.',
)

const unit11 = stub(
  'unit-11',
  'הטיה, הוגנות ופרטיות',
  '⚖️',
  ['philosopher'],
  'מה קורה כשהנתונים מוטים? על הטיה, אפליה ואחריות אתית ב-AI.',
)

const unit12 = stub(
  'unit-12',
  'בנה/י ושתף/י פרויקט',
  '🚀',
  ['creator', 'programmer', 'philosopher'],
  'מחברים את הכל יחד: בוחרים רעיון, בונים פרויקט קטן עם AI ומציגים לכיתה.',
)

// ─────────────────────────────────────────────────────────────────────────────
export const COURSE = {
  title: 'AI בשבילי',
  subtitle: 'קורס אוריינות בינה מלאכותית — כיתה ז׳',
  units: [unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8, unit9, unit10, unit11, unit12],
}

export const UNIT_IDS = COURSE.units.map(u => u.id)
