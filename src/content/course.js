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

// ─────────────────────────────────────────────────────────────────────────────
// UNIT 1 — מה זה בכלל AI?
// ─────────────────────────────────────────────────────────────────────────────
const unit1 = {
  id: 'unit-1',
  title: 'מה זה בכלל AI?',
  emoji: '🤖',
  competencies: ['researcher'],
  summary: 'נגלה מה זו בינה מלאכותית, נזהה אותה בחיי היומיום ונבין מה AI יכול — ומה הוא לא יכול — לעשות.',
  duration: '35 דקות',

  learn: {
    chunks: [
      {
        id: 'l1', type: 'hook',
        text: 'כש-Waze מנווט אותך — מי מחליט לאן לפנות?',
        subtext: 'לא מתכנת שכתב "בפקק — סע שמאלה". משהו אחר. משהו שלמד.',
        buttonLabel: 'מה הוא למד? ←',
      },
      {
        id: 'l2', type: 'concept',
        heading: 'AI = לא כללים — למידה',
        bullets: [
          'תוכנה רגילה: מתכנת כתב כלל → המחשב פועל לפיו',
          'AI: המחשב רואה הרבה דוגמאות → מגלה כללים בעצמו',
          'Waze ראה מיליוני נסיעות → הבין לבד מה פקק',
        ],
        subtext: 'זו הנקודה המרכזית של הקורס כולו.',
        buttonLabel: 'מה AI לא יכול לעשות? ←',
      },
      {
        id: 'l3', type: 'comparison',
        heading: 'AI כן / AI לא',
        rows: [
          { good: 'לזהות פנים בתמונה ✅', bad: 'לאהוב או לשנוא ❌' },
          { good: 'לנבא מה תרצה לצפות ✅', bad: 'להרגיש שעמום ❌' },
          { good: 'לתרגם טקסט ✅', bad: 'להבין "באמת" את המשמעות ❌' },
        ],
        buttonLabel: 'מה המושג? ←',
      },
      {
        id: 'l4', type: 'keyterm',
        term: 'Artificial Intelligence',
        termHe: 'בינה מלאכותית',
        definition: 'מערכת שלומדת מנתונים ומשתמשת בזה לקבלת החלטות — בלי שאדם כתב כלל לכל מצב.',
        buttonLabel: 'בוא נראה דוגמאות ←',
      },
    ],
  },

  see: {
    gameComponent: null,
    observations: [
      {
        id: 's1', title: 'Waze — מה ה-AI רואה?',
        visual: { type: 'placeholder', prompt: 'Diagram showing Waze collecting data: GPS dots from millions of cars on a road, arrows feeding into a brain icon labeled "AI", output showing "פקק! פנה שמאלה". Hebrew labels. Clean infographic.', searchQuery: 'Waze real-time traffic AI data diagram', alt: 'דיאגרמה: Waze אוסף נתוני GPS ממיליוני נהגים → AI → המלצה על מסלול' },
        question: 'אילו נתונים Waze משתמש בהם כדי לדעת על פקק?',
        reveal: 'מיקום GPS של כל הנהגים + מהירות נסיעה + היסטוריה של נסיעות קודמות. ה-AI "ראה" מיליוני נסיעות ולמד לבד מה פקק ומה לא.',
      },
      {
        id: 's2', title: 'ספוטיפיי — איך הוא ממליץ?',
        visual: { type: 'placeholder', prompt: 'Spotify recommendation diagram in Hebrew: user listens to rock, system finds 1000 similar users, recommends songs they liked. Simple flow chart, clean flat design.', searchQuery: 'Spotify collaborative filtering recommendation system diagram', alt: 'דיאגרמה: ספוטיפיי משווה את ההאזנות שלך עם משתמשים דומים → ממליץ על שירים' },
        question: 'ספוטיפיי לא שמע את כל השירים. אז איך הוא יודע מה תאהב/י?',
        reveal: 'ספוטיפיי מוצא משתמשים שהאזינו לאותם שירים כמוך, ואז ממליץ על מה שהם אהבו. הוא לא מבין מוזיקה — הוא מוצא דפוסים.',
      },
      {
        id: 's3', title: 'Face ID — איך הוא יודע שזה אתה/ת?',
        visual: { type: 'placeholder', prompt: 'iPhone Face ID process diagram in Hebrew: scan face → 30,000 dots map → compare to stored model → unlock. Clean Apple-style diagram.', searchQuery: 'Face ID infrared dot matrix face recognition diagram', alt: 'דיאגרמה: Face ID מסרק 30,000 נקודות בפנים → משווה למודל → פותח' },
        question: 'Face ID עובד גם אם שיניית משקפיים או גדלת זקן. למה?',
        reveal: 'כשהגדרת Face ID הוא למד את *מבנה* הפנים שלך — לא רק תמונה אחת. אחרי כן הוא מתעדכן עם כל פתיחה. זו למידה בזמן אמת.',
      },
    ],
  },

  practice: {
    intro: 'זהה/י AI בחיי היומיום שלך!',
    steps: [
      {
        id: 'p1',
        instruction: 'לכל פריט הבא — החלט/י: האם יש כאן AI? לחץ/י AI או לא AI.',
        action: 'quiz',
        quiz: [
          { label: '🗺️ Waze (ניווט)',       isAI: true,  explanation: 'מנתחת תנועה בזמן אמת ולומדת מכל הנהגים.' },
          { label: '🧮 מחשבון',              isAI: false, explanation: 'עוקב אחר כללים קבועים. אין למידה.' },
          { label: '🎵 ספוטיפיי',            isAI: true,  explanation: 'ממליצה על שירים לפי תבניות האזנה.' },
          { label: '💡 מנורה חשמלית',        isAI: false, explanation: 'פשוט מגיבה למתג. אין החלטות.' },
          { label: '📱 Face ID',              isAI: true,  explanation: 'למד לזהות את הפנים שלך מאלפי מדידות.' },
          { label: '⏰ שעון מעורר',           isAI: false, explanation: 'מודד זמן לפי כלל. לא לומד.' },
        ],
        helpKey: null,
      },
      {
        id: 'p2',
        instruction: 'פתח/י את הטלפון שלך. בחר/י אפליקציה שאתה/ן משתמש/ת בה כל יום. כתוב/י את שמה.',
        action: 'text',
        placeholder: 'שם האפליקציה שבחרת/ת...',
        helpKey: null,
      },
      {
        id: 'p3',
        instruction: 'עכשיו — האם לדעתך יש AI באפליקציה שבחרת/ת? כתוב/י מה הוא עושה שם (ניחוש מותר!).',
        action: 'text',
        placeholder: 'לדעתי ה-AI עושה...',
        helpKey: null,
      },
    ],
  },

  document: {
    question: 'ציין/י שם אפליקציה שבחרת/ת וכתוב/י: מה ה-AI שבה לומד מהנתונים שלך?',
    hint: 'השתמש/י במילים: AI, נתונים, למד',
    artifactType: 'reflection',
    requiredKeywords: ['AI', 'נתונים', 'למד'],
    placeholder: 'לדוגמה: "ב-YouTube ה-AI לומד מהסרטונים שצפיתי בהם ומשתמש בנתונים אלה כדי להמליץ על הבא..."',
  },

  help: [
    {
      key: 'quiz-help',
      title: 'לא בטוח/ה?',
      steps: [
        'שאל/י את עצמך: האם המכשיר/אפליקציה הזה לומד מהשימוש שלי?',
        'אם התשובה היא "כן" — כנראה יש שם AI.',
        'אם הוא תמיד עושה אותו הדבר בלי קשר לי — כנראה לא AI.',
      ],
    },
  ],

  game: null,
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIT 2 — הרבה סוגי מודלים
// ─────────────────────────────────────────────────────────────────────────────
const unit2 = {
  id: 'unit-2',
  title: 'הרבה סוגי מודלים',
  emoji: '🗂️',
  competencies: ['researcher', 'programmer'],
  summary: 'LLM הוא רק אחד מסוגי ה-AI. נכיר מודלים שמסווגים, ממליצים, מנבאים ועוד — ונרגיש כיצד LLM "חושב".',
  duration: '35 דקות',

  learn: {
    chunks: [
      {
        id: 'l1', type: 'hook',
        text: 'ChatGPT הוא AI — אבל גם Waze. גם Spotify. גם Face ID.',
        subtext: 'איך ייתכן? הם כל כך שונים זה מזה!',
        buttonLabel: 'מה ההבדל? ←',
      },
      {
        id: 'l2', type: 'concept',
        heading: 'כל מודל מיומן למשימה אחרת',
        bullets: [
          'מסווג תמונות → "זה חתול / כלב / ציפור"',
          'מנוע המלצות → "אתה/ן תאהב/י גם את..."',
          'LLM (מודל שפה) → "המילה הבאה הסבירה היא..."',
          'מנבא → "מחר: 70% סיכוי לגשם"',
        ],
        subtext: 'כולם AI — אבל כל אחד אומן על נתונים שונים למטרה שונה.',
        buttonLabel: 'איך LLM עובד? ←',
      },
      {
        id: 'l3', type: 'comparison',
        heading: 'LLM לעומת שאר המודלים',
        rows: [
          { good: 'LLM: אומן על טקסט → מנבא מילה', bad: 'מסווג תמונות: אומן על תמונות → מסווג' },
          { good: 'LLM: גמיש — שפה, קוד, שיר...', bad: 'מסווג: מצוין בדבר אחד בלבד' },
        ],
        buttonLabel: 'מה המושג? ←',
      },
      {
        id: 'l4', type: 'keyterm',
        term: 'Language Model (LLM)',
        termHe: 'מודל שפה גדול',
        definition: 'מודל AI שאומן על מיליארדי מילים ולמד לנבא את המילה הבאה הסבירה ביותר בכל הקשר.',
        buttonLabel: 'בוא נרגיש אותו ←',
      },
    ],
  },

  see: {
    gameComponent: 'GuessNextWord',
    observations: [
      {
        id: 's1', title: 'איך רשת נוירונים לומדת? (סרטון קצר)',
        visual: { type: 'youtube', videoId: 'aircAruvnKk', alt: '3Blue1Brown — "אבל מהי רשת נוירונים?" (אנגלית עם כתוביות)' },
        question: 'הסרטון מראה שהרשת מזהה ספרות. איך היא "רואה" תמונה?',
        reveal: 'הרשת מפרקת כל תמונה לפיקסלים — כל פיקסל הוא מספר. אחר כך שכבות של "נוירונים" מחפשות דפוסים: קצוות → צורות → ספרה. לא הבנה — מתמטיקה.',
      },
      {
        id: 's2', title: 'מנוע המלצות YouTube',
        visual: { type: 'placeholder', prompt: 'YouTube recommendation flow in Hebrew: user watches video → system logs → finds similar users → recommends. Simple arrows diagram, Hebrew labels.', searchQuery: 'YouTube recommendation algorithm diagram collaborative filtering', alt: 'דיאגרמה: YouTube עוקב אחר צפייה → מוצא משתמשים דומים → ממליץ' },
        question: 'YouTube ממליץ על סרטון שלא ראית. איך הוא יודע שתאהב/י אותו?',
        reveal: 'הוא מצא אנשים שצפו באותם סרטונים כמוך — ואז הציע מה שהם אהבו. זהו Collaborative Filtering — המלצות מתבססות על דמיון בין משתמשים.',
      },
      {
        id: 's3', title: 'LLM מנבא — לא מבין',
        visual: { type: 'placeholder', prompt: 'LLM next word prediction diagram in Hebrew: input "השמיים היום" → probability bar chart showing: כחולים 45%, מעוננים 30%, יפים 15%, other 10%. Clean, colorful bars.', searchQuery: 'LLM next token prediction probability distribution diagram', alt: 'דיאגרמה: LLM רואה "השמיים היום" → מחשב הסתברויות → בוחר "כחולים"' },
        question: 'LLM אמר "השמיים היום כחולים". האם הוא יודע מה הם שמיים?',
        reveal: 'לא. הוא מנבא הסתברות. "כחולים" הופיעה הכי הרבה אחרי "השמיים היום" בטקסטים שראה. זו עוצמתו — וזו גם מגבלתו.',
      },
    ],
  },

  practice: {
    intro: 'זהה/י סוגי מודלים שונים!',
    steps: [
      {
        id: 'p1',
        instruction: 'עבור/י לאתר quickdraw.withgoogle.com . זהו מסווג ציורים של גוגל. ציר/י משהו.',
        action: 'confirm',
        confirmLabel: 'ניסיתי ✓',
        helpKey: 'quickdraw',
      },
      {
        id: 'p2',
        instruction: 'ה-AI ניחש את הציור שלך? מה הוא חשב? כתוב/י מה ציירת ומה הוא ניחש.',
        action: 'text',
        placeholder: 'ציירתי ___ וה-AI חשב שזה ___',
        helpKey: null,
      },
      {
        id: 'p3',
        instruction: 'עכשיו נסה/י Google Translate: תרגם/י את המשפט "הכלב שלי אוהב לרוץ בפארק". שנה/י "כלב" ל"חתול" ונסה/י שוב.',
        action: 'confirm',
        confirmLabel: 'ניסיתי ✓',
        helpKey: null,
      },
      {
        id: 'p4',
        instruction: 'לפי דעתך — האם Quick Draw ו-Google Translate הם אותו סוג מודל? כתוב/י מה ההבדל.',
        action: 'text',
        placeholder: 'לדעתי ההבדל הוא...',
        helpKey: null,
      },
    ],
  },

  document: {
    question: 'תאר/י שני מודלים שונים שהיית עמם היום. מה כל אחד מסוגל לעשות ומה הוא לא יכול?',
    hint: 'השתמש/י במילים: מודל, סיווג, ניבוי',
    artifactType: 'reflection',
    requiredKeywords: ['מודל', 'סיווג', 'ניבוי'],
    placeholder: 'מודל 1: Quick Draw — מסווג ציורים. הוא יכול לנחש ציור אבל לא יכול לצייר בעצמו...',
  },

  help: [
    {
      key: 'quickdraw',
      title: 'לא נפתח?',
      steps: [
        'נסה/י בכרטיסייה חדשה: quickdraw.withgoogle.com',
        'אם חסום — פנה/י למורה להשיג גישה.',
        'אפשר גם לנסות: teachablemachine.withgoogle.com כחלופה.',
      ],
    },
  ],

  game: null,
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIT 3 — איך מכונות לומדות?
// ─────────────────────────────────────────────────────────────────────────────
const unit3 = {
  id: 'unit-3',
  title: 'איך מכונות לומדות?',
  emoji: '📊',
  competencies: ['researcher'],
  summary: 'נגלה מה זה "אימון" — נתוני אימון, תוויות, דפוסים — ונבין מה קורה כשהנתונים לקויים.',
  duration: '35 דקות',

  learn: {
    chunks: [
      {
        id: 'l1', type: 'hook',
        text: 'איך תלמד/י ילד/ה להכיר כלבים — אם לא יכולת להסביר?',
        subtext: 'היית מראה לו/ה הרבה תמונות ואומר/ת: "כלב. כלב. לא כלב. כלב." ← ככה AI לומד.',
        buttonLabel: 'מה זה אומן? ←',
      },
      {
        id: 'l2', type: 'concept',
        heading: 'שלושה שלבים של למידה',
        bullets: [
          '1. נתוני אימון: אלפי דוגמאות עם תוויות',
          '2. המודל מחפש דפוסים: מה משותף לכל ה"כלבים"?',
          '3. בדיקה: הצג נתון חדש — האם הוא מזהה נכון?',
        ],
        subtext: 'ככל שיש יותר דוגמאות מגוונות — הדפוסים מדויקים יותר.',
        buttonLabel: 'מה קורה עם נתונים גרועים? ←',
      },
      {
        id: 'l3', type: 'comparison',
        heading: 'נתוני אימון טובים מול גרועים',
        rows: [
          { good: '1000 תמונות כלבים מגוונות ✅', bad: '10 תמונות של כלב אחד ❌' },
          { good: 'תוויות מדויקות ✅', bad: 'תוויות שגויות ❌' },
          { good: 'מגוון: כלבים גדולים/קטנים ✅', bad: 'רק גזע אחד ❌' },
        ],
        buttonLabel: 'מה המושג? ←',
      },
      {
        id: 'l4', type: 'keyterm',
        term: 'Training Data',
        termHe: 'נתוני אימון',
        definition: 'הדוגמאות שמהן AI לומד. כמות + מגוון + דיוק התוויות = איכות המודל.',
        buttonLabel: 'בוא נראה דוגמה ←',
      },
    ],
  },

  see: {
    gameComponent: 'GuessNextWord',
    observations: [
      {
        id: 's1', title: 'תהליך האימון — מה קורה בפנים?',
        visual: { type: 'diagram', diagramKey: 'training-process', alt: 'דיאגרמה: נתוני אימון → מודל → בדיקה → שיפור → מודל מוכן' },
        question: 'האם המודל "מבין" מה הוא רואה, או שהוא עושה משהו אחר?',
        reveal: 'המודל לא מבין — הוא מחפש מאפיינים משותפים שמבדילים בין הקטגוריות. למשל: "כלב = שיניים חשופות + פרווה + גוף מסוים".',
      },
      {
        id: 's2', title: 'נתוני אימון לקויים = מודל שגוי',
        visual: { type: 'placeholder', prompt: 'Two side-by-side examples in Hebrew: Left (good) shows 6 diverse dog images with label "כלב ✅". Right (bad) shows 2 identical golden retriever photos with label "כלב ❌ רק גזע אחד". Clean comparison diagram.', searchQuery: 'machine learning training data quality diversity good bad comparison', alt: 'השוואה: נתוני אימון מגוונים (טוב) לעומת נתוני אימון חד-גוניים (גרוע)' },
        question: 'מה יקרה אם כל תמונות הכלבים הן של רטריבר זהב?',
        reveal: 'המודל ילמד ש-"כלב = רטריבר זהב" ולא יזהה פודל או צ\'יוואווה. זו טעות נתונים — לא טעות של ה-AI.',
      },
      {
        id: 's3', title: 'כמה נתונים צריך?',
        visual: { type: 'placeholder', prompt: 'Bar chart in Hebrew showing different AI tasks and typical training data needed: face recognition 10M photos, spam filter 100K emails, weather prediction 50 years data. Hebrew labels, colorful bars.', searchQuery: 'machine learning training data size requirements different tasks', alt: 'גרף: כמה נתוני אימון צריכים מודלים שונים' },
        question: 'למה מודל לזיהוי פנים צריך יותר דוגמאות ממסנן ספאם?',
        reveal: 'פנים מגיעות בגיל, תאורה, זוית, רגש — אינסוף וריאציות. ספאם יש לו מאפיינים ברורים יחסית. מורכבות = דרוש יותר נתונים.',
      },
    ],
  },

  practice: {
    intro: 'מה נתוני אימון טובים?',
    steps: [
      {
        id: 'p1',
        instruction: 'פתח/י Teachable Machine: teachablemachine.withgoogle.com. צור/י מודל "Image Project" עם 2 קטגוריות: ✊ אגרוף ו-✋ יד פתוחה. הוסף/י 5 דוגמאות בלבד לכל קטגוריה.',
        action: 'confirm',
        confirmLabel: 'יצרתי מודל עם 5 דוגמאות ✓',
        helpKey: 'teachable',
      },
      {
        id: 'p2',
        instruction: 'אמן/י את המודל (Train) ← בדוק/י (Preview). כתוב/י: כמה פעמים הוא טעה ב-30 שניות של בדיקה?',
        action: 'text',
        placeholder: 'הוא טעה ___ פעמים מתוך ___',
        helpKey: null,
      },
      {
        id: 'p3',
        instruction: 'עכשיו הוסף/י עוד 25 דוגמאות לכל קטגוריה (סה"כ 30+). אמן/י שוב ← בדוק/י שוב.',
        action: 'confirm',
        confirmLabel: 'הוספתי ואימנתי מחדש ✓',
        helpKey: 'teachable',
      },
      {
        id: 'p4',
        instruction: 'כמה פעמים הוא טעה עכשיו? כתוב/י: מה השתנה ולמה לדעתך?',
        action: 'text',
        placeholder: 'עכשיו הוא טועה פחות כי...',
        helpKey: null,
      },
    ],
  },

  document: {
    question: 'תאר/י במשפטיים: מה גרם למודל להשתפר? כיצד נתוני האימון השפיעו על הדיוק?',
    hint: 'השתמש/י במילים: נתוני אימון, דפוסים, דיוק',
    artifactType: 'reflection',
    requiredKeywords: ['נתוני אימון', 'דפוסים', 'דיוק'],
    placeholder: 'כשהוספתי יותר נתוני אימון, המודל הצליח לזהות דפוסים טובים יותר ולכן הדיוק עלה...',
  },

  help: [
    {
      key: 'teachable',
      title: 'Teachable Machine לא עובד?',
      steps: [
        'פתח/י בכרטיסייה חדשה: teachablemachine.withgoogle.com',
        'המצלמה לא עובדת? לחץ/י על 🔒 ליד הכתובת ← Camera ← Allow.',
        'עדיין לא? בחר/י "Upload" והעלה/י תמונות מהגלריה.',
      ],
    },
  ],

  game: null,
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIT 4 — Embeddings: מספרים עם משמעות
// ─────────────────────────────────────────────────────────────────────────────
const unit4 = {
  id: 'unit-4',
  title: 'מספרים עם משמעות',
  emoji: '🗺️',
  competencies: ['researcher', 'programmer'],
  summary: 'איך מחשב "מבין" מילים? נגלה שכל מילה היא נקודה במרחב — ומילים דומות גרות קרוב אחת לשנייה.',
  duration: '35 דקות',

  learn: {
    chunks: [
      {
        id: 'l1', type: 'hook',
        text: 'האם מחשב יכול לדעת ש"מלך" ו"מלכה" קשורים?',
        subtext: 'הוא לא קורא מילים. הוא לא מבין עברית. אבל יש לו דרך...',
        buttonLabel: 'איזו דרך? ←',
      },
      {
        id: 'l2', type: 'concept',
        heading: 'כל מילה = נקודה במרחב',
        bullets: [
          'המחשב הופך כל מילה למספרים: [0.3, 0.7, -0.2, ...]',
          'מילים דומות → מספרים דומים → נקודות קרובות',
          '"כלב" קרוב ל"חתול" ורחוק מ"שולחן"',
        ],
        subtext: 'זה נקרא Embedding — ייצוג מרחבי של משמעות.',
        buttonLabel: 'משחק מגניב: מלך - גבר + אישה = ? ←',
      },
      {
        id: 'l3', type: 'concept',
        heading: '🤯 מלך − גבר + אישה = מלכה',
        bullets: [
          'מלך = [0.9, 0.8, 0.1] (כוח גבוה, מין גבר)',
          'מלכה = [0.9, 0.8, 0.9] (כוח גבוה, מין אישה)',
          'חיסור והוספה של וקטורים → קסם מתמטי',
        ],
        subtext: 'המחשב לא "יודע" מה מלך. הוא מחשב מרחקים בין נקודות.',
        buttonLabel: 'מה המושג? ←',
      },
      {
        id: 'l4', type: 'keyterm',
        term: 'Embedding',
        termHe: 'ייצוג וקטורי',
        definition: 'הפיכת מילה (או תמונה, או משפט) למספרים — כך שמרחק בין המספרים = מרחק משמעות.',
        buttonLabel: 'בוא נשחק ←',
      },
    ],
  },

  see: {
    gameComponent: 'EmbeddingsMap',
    observations: [
      {
        id: 's1', title: 'word2vec — הניסוי המפורסם',
        visual: { type: 'placeholder', prompt: 'Vector arithmetic diagram in Hebrew: "מלך" vector - "גבר" vector + "אישה" vector = "מלכה" vector. Show as colored arrows in 2D space. Hebrew labels. Clean math visualization.', searchQuery: 'word2vec king queen man woman vector arithmetic diagram', alt: 'דיאגרמה: מלך - גבר + אישה = מלכה (חשבון וקטורים)' },
        question: 'למה "מלכה" יצא מהחישוב הזה?',
        reveal: 'ה-embedding למד שיש ממד של "מין" (גבר/אישה) וממד של "כוח/מלוכה". כשמחסירים את "גבר" ומוסיפים "אישה" — מקבלים את הגרסה הנשית של "מלך".',
      },
      {
        id: 's2', title: 'מפת מילים — קלאסטרים',
        visual: { type: 'placeholder', prompt: 'Word embedding 2D visualization with Hebrew words clustered: animals cluster (כלב, חתול, פרה, ציפור), royalty cluster (מלך, מלכה, נסיך), emotions cluster (שמח, עצוב, כועס), countries cluster (ישראל, ירדן, מצרים). Colorful dots with labels on clean white background.', searchQuery: 'word2vec word embedding 2D visualization tsne clusters', alt: 'מפת מילים: אשכולות של חיות, מלוכה, רגשות, מדינות' },
        question: 'מדוע "שמח" ו"עצוב" נמצאים קרוב זה לזה — הרי הם הפכים?',
        reveal: 'הם שניהם רגשות — ומופיעים יחד בטקסטים דומים ("הרגשתי שמח / עצוב"). ה-embedding למד את ההקשר, לא את ה"משמעות" שלנו.',
      },
      {
        id: 's3', title: 'Embeddings לתמונות',
        visual: { type: 'placeholder', prompt: 'Image embedding diagram: three animal photos (cat, dog, lion) mapped to 2D space, with cat and dog close together and lion slightly further. Hebrew labels showing similarity scores. Clean diagram.', searchQuery: 'image embedding similarity visual search diagram', alt: 'דיאגרמה: תמונות חיות ממופות למרחב — חתול וכלב קרובים, אריה רחוק יותר' },
        question: 'גוגל מוצא תמונות דומות לתמונה שלך. איך הוא יודע מה "דומה"?',
        reveal: 'הוא ממיר כל תמונה ל-embedding (מספרים). אחר כך מחפש תמונות עם מספרים קרובים. "קרוב" = "דומה". אין צורך להבין מה יש בתמונה.',
      },
    ],
  },

  practice: {
    intro: 'גלה/י embeddings בעצמך!',
    steps: [
      {
        id: 'p1',
        instruction: 'פתח/י את projector.tensorflow.org (Google\'s Word Embedding Visualizer). לחץ/י "Load" ← "Word2Vec 10K".',
        action: 'confirm',
        confirmLabel: 'פתחתי ✓',
        helpKey: 'tensorflow',
      },
      {
        id: 'p2',
        instruction: 'בחיפוש הקלד/י "king" ← לחץ/י Enter. ראה/י את המילים הקרובות ביותר. מה 3 המילים הקרובות ביותר?',
        action: 'text',
        placeholder: '3 המילים הקרובות ל-king: ...',
        helpKey: null,
      },
      {
        id: 'p3',
        instruction: 'עכשיו חפש/י מילה שאתה/ן בוחר/ת. מה הפתיע אותך ברשימת המילים הקרובות?',
        action: 'text',
        placeholder: 'חיפשתי ___ והופתעתי שקרוב אליה ___',
        helpKey: 'tensorflow',
      },
    ],
  },

  document: {
    question: 'תאר/י זוג מילים שהפתיע אותך — למה הן קרובות ב-embedding? מה זה אומר על "הבנת" ה-AI?',
    hint: 'השתמש/י במילים: embedding, מרחק, משמעות',
    artifactType: 'reflection',
    requiredKeywords: ['embedding', 'מרחק', 'משמעות'],
    placeholder: 'גיליתי ש-___ ו-___ קרובים ב-embedding. זה מפתיע כי...',
  },

  help: [
    {
      key: 'tensorflow',
      title: 'האתר לא נפתח?',
      steps: [
        'נסה/י: projector.tensorflow.org',
        'אם חסום — נסה/י: word2vec.kr (חלופה בדפדפן)',
        'גם זה חסום? עבוד/י עם הגרסה המובנית של הקורס (המפה שראית).',
      ],
    },
  ],

  game: null,
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIT 5 — אמן את המודל שלך (FULLY BUILT — do not change structure)
// ─────────────────────────────────────────────────────────────────────────────
const unit5 = {
  id: 'unit-5',
  title: 'אמן את המודל שלך',
  emoji: '🧪',
  competencies: ['researcher', 'programmer', 'philosopher'],
  summary: 'תאמן/י מודל זיהוי הבעות פנים בעצמך ותגלה/י כיצד כמות ומגוון הדוגמאות קובעים את דיוק ה-AI.',
  duration: '35 דקות',

  learn: {
    chunks: [
      { id: 'l1', type: 'hook', text: 'איך המחשב יודע שזה כלב — ולא חתול?', subtext: 'הוא לא נולד עם הידע הזה. מישהו היה צריך ללמד אותו.', buttonLabel: 'איך מלמדים מחשב? ←' },
      { id: 'l2', type: 'concept', heading: 'אימון = הרבה דוגמאות', bullets: ['200 תמונות של כלבים → "זה כלב"', '200 תמונות של חתולים → "זה חתול"'], subtext: 'המחשב מחפש דפוסים. אחרי שראה מספיק — הוא יודע לזהות לבד.', buttonLabel: 'מה קורה עם מעט דוגמאות? ←' },
      { id: 'l3', type: 'comparison', heading: 'ככה זה עובד — ככה זה נכשל', rows: [{ good: 'הרבה דוגמאות מגוונות', bad: 'מעט דוגמאות מאותה זווית' }, { good: 'מודל מדויק ✅', bad: 'מודל מתבלבל ❌' }], buttonLabel: 'בוא נראה דוגמה ←' },
      { id: 'l4', type: 'keyterm', term: 'Supervised Learning', termHe: 'למידה מפוקחת', definition: 'AI לומד מדוגמאות שאנחנו מתייגים.', buttonLabel: 'בוא נראה דוגמה אמיתית ←' },
    ],
  },

  see: {
    gameComponent: 'TrainingSim',
    observations: [
      { id: 's1', title: 'מודל עם אימון טוב', visual: { type: 'placeholder', prompt: 'Screenshot mockup of Google Teachable Machine with 3 trained classes (שמח, ניטרלי, מופתע), 80 samples each, preview showing 95% confidence on שמח.', searchQuery: 'Teachable Machine trained model high accuracy screenshot', alt: 'מסך Teachable Machine — 95% דיוק' }, question: 'כמה דוגמאות יש לכל קטגוריה?', reveal: '80 דוגמאות לכל קטגוריה — מגוונות, מזוויות שונות.' },
      { id: 's2', title: 'מודל עם אימון חלש', visual: { type: 'placeholder', prompt: 'Screenshot mockup of Teachable Machine with 3 classes: 5, 3, 2 samples. Preview shows fist misclassified as thumb-up 61%.', searchQuery: 'machine learning few training examples misclassification', alt: 'מסך Teachable Machine — 61% טעות' }, question: 'למה המודל מתבלבל?', reveal: 'מעט מדי דוגמאות ואין מגוון. המחשב לא ראה מספיק.' },
      { id: 's3', title: 'הטיה בנתונים (Bias)', visual: { type: 'diagram', diagramKey: 'bias', alt: 'דיאגרמת הטיה' }, question: 'מה הבעיה כאן?', reveal: 'הנתונים לא מייצגים את המציאות. כשהנתונים מוטים — המודל מוטה.' },
    ],
  },

  practice: {
    intro: 'בנה/י מזהה הבעות פנים: 😊 שמח | 😐 ניטרלי | 😮 מופתע',
    steps: [
      { id: 'p1', instruction: 'פתח/י את teachablemachine.withgoogle.com ולחץ/י "Get Started".', action: 'confirm', confirmLabel: 'פתחתי ✓', helpKey: 'site-access' },
      { id: 'p2', instruction: 'בחר/י "Image Project" ← "Standard Image Model".', action: 'confirm', confirmLabel: 'בחרתי ✓', helpKey: null },
      { id: 'p3', instruction: 'שנה/י שמות: Class 1 → שמח, Class 2 → ניטרלי. לחץ/י "Add a class" ← מופתע.', action: 'confirm', confirmLabel: 'שיניתי ✓', helpKey: null },
      { id: 'p4', instruction: 'לכל קטגוריה: לחץ/י "Webcam" ← עשה/י הבעה ← "Hold to Record". יעד: 30+ דוגמאות לכל קטגוריה. 💡 הזז/י ראש בין צילומים!', action: 'confirm', confirmLabel: 'צילמתי 30+ לכל קטגוריה ✓', helpKey: 'camera' },
      { id: 'p5', instruction: 'לחץ/י "Train Model" וחכה/י ~30 שניות. אל תסגור/י את הדף!', action: 'confirm', confirmLabel: 'המודל מוכן ✓', helpKey: null },
      { id: 'p6', instruction: 'לחץ/י "Preview" ← הפנה/י מצלמה ← עשה/י כל הבעה. מה עבד? מה לא?', action: 'text', placeholder: 'מה שמת/ת לב?', helpKey: 'accuracy' },
    ],
  },

  document: {
    question: 'תאר/י בשתיים–שלוש משפטים: מה שיפר / פגע בדיוק המודל שלך?',
    hint: 'השתמש/י במילים: דוגמאות, קטגוריה, מגוון',
    artifactType: 'screenshot+reflection',
    requiredKeywords: ['דוגמאות', 'קטגוריה', 'מגוון'],
    placeholder: 'הוספתי יותר דוגמאות לקטגוריה של מופתע ואז...',
    screenshotLabel: 'צלם/י מסך של Preview עם שמות הקטגוריות ואחוזי הביטחון',
  },

  help: [
    { key: 'site-access', title: 'האתר לא נפתח?', steps: ['ודא/י חיבור לאינטרנט.', 'נסה/י כרטיסייה חדשה: teachablemachine.withgoogle.com', 'חסום ברשת? שאל/י את המורה.'] },
    { key: 'camera', title: 'המצלמה לא עובדת?', steps: ['לחץ/י 🔒 ליד הכתובת ← Camera ← Allow.', 'רענן/י (F5) ← נסה/י שוב.', 'לא עובד? בחר/י "Upload" והעלה/י תמונות מהטלפון.'] },
    { key: 'accuracy', title: 'המודל מתבלבל?', steps: ['בדוק/י: כמה דוגמאות לכל קטגוריה? (צריך ~30 שוות)', 'הגזים/י בהבעות — שמח = חייך גדול, מופתע = פה פתוח.', 'מחק/י דוגמאות לא-ברורות ← אמן/י שוב.'] },
  ],

  game: { component: 'TrainingSim', location: 'see' },
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIT 6 — הקשר (Context)
// ─────────────────────────────────────────────────────────────────────────────
const unit6 = {
  id: 'unit-6',
  title: 'הקשר — מה ה-AI זוכר?',
  emoji: '💬',
  competencies: ['researcher', 'programmer'],
  summary: 'מה זה "חלון הקשר"? למה AI "שוכח"? ואיך ניתן לנצל את ההקשר כדי לקבל תשובות טובות יותר.',
  duration: '35 דקות',

  learn: {
    chunks: [
      {
        id: 'l1', type: 'hook',
        text: 'שאלת AI שאלה. קיבלת תשובה. שאלת שוב — והוא "שכח" את השיחה!',
        subtext: 'זה לא תקלה. זה חלק מהאופן שבו AI פועל.',
        buttonLabel: 'למה הוא שוכח? ←',
      },
      {
        id: 'l2', type: 'concept',
        heading: 'חלון הקשר = "הזיכרון" של ה-AI',
        bullets: [
          'ה-AI רואה רק את מה שנמצא ב"חלון" — חלק מהשיחה',
          'מה שנמצא בחלון: ה-AI "זוכר". מה שמחוץ לו — "נשכח"',
          'כל מודל יש לו גודל חלון שונה (2000 מילים... 100,000 מילים)',
        ],
        subtext: 'זה כמו לקרוא ספר עם פנס — רואים רק את מה שהפנס מאיר.',
        buttonLabel: 'איך להשתמש בזה? ←',
      },
      {
        id: 'l3', type: 'comparison',
        heading: 'הקשר קצר מול ארוך',
        rows: [
          { good: 'הקשר ארוך + מפורט ✅', bad: 'שאלה בלי הקשר ❌' },
          { good: '"אני תלמיד ז׳. הסבר לי על AI"', bad: '"הסבר לי על AI"' },
          { good: 'תשובה מותאמת לגיל ✅', bad: 'תשובה גנרית ❌' },
        ],
        buttonLabel: 'מה המושג? ←',
      },
      {
        id: 'l4', type: 'keyterm',
        term: 'Context Window',
        termHe: 'חלון הקשר',
        definition: 'הכמות המקסימלית של טקסט שה-AI יכול "לראות" ולהשתמש בה בתשובה אחת.',
        buttonLabel: 'בוא נראה דוגמאות ←',
      },
    ],
  },

  see: {
    gameComponent: 'DragMatchGame',
    gameProps: {
      pairs: [
        { id: 'cw', term: 'חלון הקשר', definition: 'הכמות המקסימלית של טקסט שה-AI יכול לקרוא בבת אחת' },
        { id: 'ctx', term: 'הקשר (Context)', definition: 'כל המידע שה-AI קיבל לפני שהוא כותב את תשובתו' },
        { id: 'sp', term: 'System Prompt', definition: 'הוראות קבועות שמגדירות את אישיות ה-AI לפני תחילת השיחה' },
        { id: 'tok', term: 'Token', definition: 'יחידת הטקסט הקטנה ביותר שה-AI מעבד — בערך ¾ מילה' },
      ],
    },
    observations: [
      {
        id: 's1', title: 'אותה שאלה — שני הקשרים שונים',
        visual: { type: 'placeholder', prompt: 'Side-by-side chat screenshots in Hebrew. Left: user asks "מה דעתך על זה?" with no context, AI responds "על מה?". Right: user first says "אני כותב סיפור מדע בדיוני על מאדים" then asks "מה דעתך על זה?", AI responds with relevant suggestions. Clean chat UI mockup.', searchQuery: 'chatbot context window conversation example comparison', alt: 'השוואה: שאלה ללא הקשר vs. שאלה עם הקשר' },
        question: 'למה ה-AI ענה אחרת לאותה שאלה?',
        reveal: 'ה-AI ראה מידע שונה בחלון ההקשר. עם הקשר — הוא ידע על מה מדובר. בלי הקשר — הוא ניחש. ההקשר שלך = ה"הוראות" שלו.',
      },
      {
        id: 's2', title: 'מה קורה כשהשיחה ארוכה מדי?',
        visual: { type: 'placeholder', prompt: 'Diagram in Hebrew showing a long conversation with a context window slider. First messages are grayed out (forgotten), recent messages are bright (remembered). Arrow shows "מה ה-AI רואה" pointing to recent portion only.', searchQuery: 'LLM context window forgetting long conversation diagram', alt: 'דיאגרמה: שיחה ארוכה — הודעות ישנות נשכחות, חדשות נשמרות' },
        question: 'שוחחת עם AI שעה. פתאום הוא "שכח" מה שאמרת בהתחלה. למה?',
        reveal: 'ההודעות הישנות יצאו מחלון ההקשר. ה-AI לא "שכח" — הוא פשוט לא רואה אותן יותר. פתרון: סכם/י בקצרה את ההתחלה ושלח/י מחדש.',
      },
      {
        id: 's3', title: 'הקשר = הוראות',
        visual: { type: 'placeholder', prompt: 'Three chat examples in Hebrew showing different system prompts and their effects: "אתה מורה לתינוקות" → simple language; "אתה מדען" → technical language; "אתה סטנדאפיסט" → funny language. Same question, different context, different tone.', searchQuery: 'system prompt role context AI response comparison', alt: 'דיאגרמה: שלושה הקשרים שונים → שלוש תשובות שונות לאותה שאלה' },
        question: 'איך שינוי ה"תפקיד" בהתחלת השיחה משפיע על כל השיחה?',
        reveal: 'ה"תפקיד" נמצא בתחילת חלון ההקשר — ה-AI תמיד רואה אותו. זה כמו לתת הוראות בתחילת שיחה שה-AI אף פעם לא שוכח (כל עוד השיחה לא ארוכה מדי).',
      },
    ],
  },

  practice: {
    intro: 'ניסוי ההקשר — אותה שאלה, תוצאות שונות!',
    steps: [
      {
        id: 'p1',
        instruction: 'פתח/י Gemini (gemini.google.com) או Copilot (copilot.microsoft.com). ⚠️ צריך חשבון גוגל/מיקרוסופט.',
        action: 'confirm',
        confirmLabel: 'פתחתי AI ✓',
        helpKey: 'ai-tool',
      },
      {
        id: 'p2',
        instruction: 'שיחה 1 — בלי הקשר: שאל/י "הסבר לי על כוכב הלכת מאדים". העתק/י את התשובה.',
        action: 'text',
        placeholder: 'תשובת ה-AI ללא הקשר: ...',
        helpKey: null,
      },
      {
        id: 'p3',
        instruction: 'פתח/י שיחה חדשה. הפעם כתוב/י קודם: "אני תלמיד כיתה ז׳ בן 13. הסבר לי בצורה פשוטה, קצרה עם דוגמאות." ואז שאל/י שוב "הסבר לי על כוכב הלכת מאדים".',
        action: 'text',
        placeholder: 'תשובת ה-AI עם הקשר: ...',
        helpKey: null,
      },
      {
        id: 'p4',
        instruction: 'השווה/י: מה שונה בין שתי התשובות? מה ההקשר עשה?',
        action: 'text',
        placeholder: 'ההבדל העיקרי היה...',
        helpKey: null,
      },
    ],
  },

  document: {
    question: 'תאר/י בשתי שורות: כיצד הוספת הקשר שינתה את התשובה? מה למדת על "חלון ההקשר"?',
    hint: 'השתמש/י במילים: הקשר, חלון, שיחה',
    artifactType: 'reflection',
    requiredKeywords: ['הקשר', 'חלון', 'שיחה'],
    placeholder: 'כשהוספתי הקשר, ה-AI הבין שאני... ולכן...',
  },

  help: [
    {
      key: 'ai-tool',
      title: 'אין גישה ל-Gemini / Copilot?',
      steps: [
        'Gemini: gemini.google.com — דורש חשבון גוגל.',
        'Copilot: copilot.microsoft.com — לפעמים עובד ללא חשבון.',
        'אין גישה? שאל/י את המורה לגישה מנוהלת, או נסה/י poe.com.',
      ],
    },
  ],

  game: null,
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIT 7 — יסודות ה-Prompt
// ─────────────────────────────────────────────────────────────────────────────
const unit7 = {
  id: 'unit-7',
  title: 'לדבר עם AI — יסודות',
  emoji: '✏️',
  competencies: ['programmer'],
  summary: 'נלמד לנסח בקשות טובות ל-AI: תפקיד + משימה + פורמט. נשווה prompt חלש ל-prompt חזק.',
  duration: '35 דקות',

  learn: {
    chunks: [
      {
        id: 'l1', type: 'hook',
        text: '"כתוב לי משהו על תל אביב."',
        subtext: 'ה-AI כתב 3 עמודים על ההיסטוריה של תל אביב. זה מה שרצית?',
        buttonLabel: 'מה הבעיה? ←',
      },
      {
        id: 'l2', type: 'concept',
        heading: 'Prompt טוב = 3 חלקים',
        bullets: [
          '1. 🎭 תפקיד: "אתה מדריך טיול ילדים"',
          '2. 📋 משימה: "כתוב על תל אביב בשביל תלמידי ז׳"',
          '3. 📐 פורמט: "3 עובדות מגניבות, כל אחת משפט אחד"',
        ],
        subtext: 'ככל שהבקשה מדויקת יותר — התשובה שימושית יותר.',
        buttonLabel: 'נראה השוואה ←',
      },
      {
        id: 'l3', type: 'comparison',
        heading: 'Prompt חלש מול Prompt חזק',
        rows: [
          { good: '"כמדריך ילדים, תאר..."', bad: '"ספר לי על..."' },
          { good: '"ב-3 נקודות קצרות"', bad: '"(אין פורמט)"' },
          { good: 'תשובה מדויקת ✅', bad: 'תשובה גנרית ❌' },
        ],
        buttonLabel: 'מה המושג? ←',
      },
      {
        id: 'l4', type: 'keyterm',
        term: 'Prompt',
        termHe: 'בקשה ל-AI',
        definition: 'הטקסט שאנחנו שולחים ל-AI. Prompt טוב = תפקיד + משימה + פורמט.',
        buttonLabel: 'בוא נרגיש את ההבדל ←',
      },
    ],
  },

  see: {
    gameComponent: 'PromptSandbox',
    observations: [
      {
        id: 's1', title: 'שלושה Prompts לאותה משימה',
        visual: { type: 'placeholder', prompt: 'Three chat examples side by side in Hebrew: 1) weak prompt "ספר על תל אביב" → long boring paragraph 2) medium prompt with role only → better but unformatted 3) strong prompt with role+task+format → perfect 3-bullet answer. Clean comparison.', searchQuery: 'prompt engineering weak strong comparison example chat', alt: 'השוואת שלושה prompts: חלש / בינוני / חזק' },
        question: 'מה ה-prompt החזק עשה שהחלש לא עשה?',
        reveal: 'הגדיר תפקיד (מי ה-AI), משימה (מה לעשות), פורמט (איך להציג). כל אחד מהם לבד עוזר — שלושתם יחד = תשובה מדויקת.',
      },
      {
        id: 's2', title: 'שינוי תפקיד = שינוי טון',
        visual: { type: 'placeholder', prompt: 'Two Hebrew AI responses to same question "מה זה AI?": Left response is from a "מדען" role (technical), Right from a "מורה לגן" role (very simple and playful). Show contrast clearly.', searchQuery: 'AI role persona prompt engineering tone comparison', alt: 'אותה שאלה — שני תפקידים שונים → שני טונים שונים לגמרי' },
        question: 'שינינו רק את התפקיד. מה אחר השתנה?',
        reveal: 'שפה, מורכבות, אורך, ואפילו הדוגמאות שה-AI בחר — כל אלה השתנו. ה-AI "משחק את התפקיד" שנתנו לו.',
      },
      {
        id: 's3', title: 'פורמט = שליטה',
        visual: { type: 'placeholder', prompt: 'Before/after Hebrew: Before: AI responds in one long paragraph. After: same content formatted as numbered list with emojis and bold headers, much easier to read. Show clear visual difference.', searchQuery: 'AI output formatting structured vs unstructured prompt', alt: 'לפני (פסקה ארוכה) ואחרי (רשימה מסודרת) — אותו מידע, פורמט שונה' },
        question: 'הוספנו רק "ב-3 נקודות ממוספרות". מה קרה?',
        reveal: 'ה-AI ביצע בדיוק — פורמט = הוראת תצוגה. ה-AI יכול לכתוב בכל פורמט שתבקש/י: טבלה, רשימה, שיר, JSON. רק תגיד/י לו.',
      },
    ],
  },

  practice: {
    intro: 'בנה/י את ה-Prompt המושלם!',
    steps: [
      {
        id: 'p1',
        instruction: 'בחר/י נושא שמעניין אותך. כתוב/י prompt חלש — כמו שהיית שואל חבר: "ספר לי על ___".',
        action: 'text',
        placeholder: 'ה-prompt החלש שלי: ספר לי על...',
        helpKey: null,
      },
      {
        id: 'p2',
        instruction: 'עכשיו כתוב/י prompt חזק — הוסף/י תפקיד, דייק/י את המשימה, ציין/י פורמט.',
        action: 'text',
        placeholder: 'ה-prompt החזק שלי: "אתה ___ . [משימה] . [פורמט]"',
        helpKey: 'prompt-help',
      },
      {
        id: 'p3',
        instruction: 'פתח/י Gemini / Copilot. שלח/י את ה-prompt החלש. העתק/י תשובה.',
        action: 'text',
        placeholder: 'תשובה ל-prompt חלש: ...',
        helpKey: 'ai-tool',
      },
      {
        id: 'p4',
        instruction: 'שלח/י את ה-prompt החזק. העתק/י תשובה. השווה/י בינהן.',
        action: 'text',
        placeholder: 'תשובה ל-prompt חזק: ...',
        helpKey: null,
      },
    ],
  },

  document: {
    question: 'כתוב/י את ה-prompt החזק שיצרת/ת ותאר/י: מה שיפרת ואיך זה השפיע על התשובה?',
    hint: 'השתמש/י במילים: תפקיד, משימה, פורמט',
    artifactType: 'reflection',
    requiredKeywords: ['תפקיד', 'משימה', 'פורמט'],
    placeholder: 'ה-prompt שלי: "אתה ___ ." שיפרתי ע"י... התוצאה השתנתה כי...',
  },

  help: [
    {
      key: 'prompt-help',
      title: 'לא יודע/ת מה לכתוב?',
      steps: [
        'תפקיד: מי ה-AI? (מדריך, מורה, חבר, מדען...)',
        'משימה: מה בדיוק לעשות? ("הסבר", "כתוב", "השווה"...)',
        'פורמט: "3 נקודות" / "משפט אחד" / "טבלה" / "שיר".',
      ],
    },
    {
      key: 'ai-tool',
      title: 'אין גישה ל-AI?',
      steps: [
        'Gemini: gemini.google.com',
        'Copilot: copilot.microsoft.com',
        'שניהם חסומים? שאל/י את המורה.',
      ],
    },
  ],

  game: null,
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIT 8 — לשפר Prompt חלש
// ─────────────────────────────────────────────────────────────────────────────
const unit8 = {
  id: 'unit-8',
  title: 'שדרג/י Prompt חלש',
  emoji: '🔧',
  competencies: ['programmer', 'creator'],
  summary: 'ניקח prompt גרוע ונשדרג אותו צעד אחר צעד — עד שהתוצאה תהיה מדויקת ושימושית.',
  duration: '35 דקות',

  learn: {
    chunks: [
      {
        id: 'l1', type: 'hook',
        text: 'הראשון לא עבד. מה עכשיו?',
        subtext: 'מתכנתים לא מצפים שהדבר הראשון יעבוד. הם מנסים, רואים, משפרים. ככה גם עם AI.',
        buttonLabel: 'איך משפרים? ←',
      },
      {
        id: 'l2', type: 'concept',
        heading: 'שלושה מהלכי שיפור',
        bullets: [
          '1. הוסף/י פרטים: "על מה בדיוק? לאיזה קהל?"',
          '2. הגבל/י: "לא יותר מ-3 שורות"',
          '3. תן/י דוגמה: "כמו ש-X עשה..."',
        ],
        subtext: 'כל שיפור מקרב אותך לתשובה שרצית.',
        buttonLabel: 'שדרוג צעד אחר צעד ←',
      },
      {
        id: 'l3', type: 'comparison',
        heading: 'דוגמה: Prompt גרוע → טוב → מצוין',
        rows: [
          { good: 'גרוע: "כתוב שיר"', bad: '' },
          { good: 'טוב: "כתוב שיר על ירושלים"', bad: '' },
          { good: 'מצוין: "כתוב שיר ילדים על ירושלים, 4 שורות, חרוז ABAB"', bad: '' },
        ],
        buttonLabel: 'מה המושג? ←',
      },
      {
        id: 'l4', type: 'keyterm',
        term: 'Iteration',
        termHe: 'חזרתיות / שיפור הדרגתי',
        definition: 'לנסות → לראות תוצאה → לשפר → לנסות שוב. זו שיטת העבודה הבסיסית עם AI.',
        buttonLabel: 'בוא נתרגל ←',
      },
    ],
  },

  see: {
    gameComponent: 'PromptSandbox',
    observations: [
      {
        id: 's1', title: 'שדרוג בשלושה סיבובים',
        visual: { type: 'placeholder', prompt: 'Three-step prompt improvement in Hebrew: Round 1 "כתוב על AI" → vague answer. Round 2 "כתוב על AI לתלמידי ז׳" → better. Round 3 "כמורה לטכנולוגיה, כתוב על AI לתלמידי ז׳ ב-3 נקודות עם דוגמאות" → perfect. Show as flowchart with arrows and improvement markers.', searchQuery: 'iterative prompt improvement example diagram', alt: 'שלושה סיבובי שיפור של prompt — מגרוע למצוין' },
        question: 'מה השתנה בכל סיבוב?',
        reveal: 'סיבוב 1: אין מידע. סיבוב 2: הוסף קהל. סיבוב 3: הוסף תפקיד + פורמט + בקשה לדוגמאות. כל תוספת = תשובה ממוקדת יותר.',
      },
      {
        id: 's2', title: 'ספציפי > כללי',
        visual: { type: 'placeholder', prompt: 'Funnel diagram in Hebrew showing: vague question at top → more specific middle → precise bottom. Each level shows example prompt and better AI response. "כתוב" → "כתוב על" → "כתוב 3 טיפים קצרים על [נושא] למי ש[הקשר]"', searchQuery: 'specific vs vague prompt AI comparison', alt: 'משפך: prompt כללי → ספציפי → מצוין' },
        question: 'מדוע ספציפי עדיף על כללי?',
        reveal: 'ה-AI אין לו גבול בנושאים שיכול לכתוב עליהם. בלי הגבלה — הוא בוחר לבד. ספציפיות = אתה/ן בוחר/ת, לא הוא.',
      },
      {
        id: 's3', title: 'לתת דוגמה = כוח',
        visual: { type: 'placeholder', prompt: 'Hebrew chat showing "few-shot prompting": user shows 2 examples of desired format, then asks AI to follow the same pattern. AI output matches the examples exactly. Label it "few-shot" in both Hebrew and English.', searchQuery: 'few-shot prompting example format demonstration AI', alt: 'Few-shot prompting: הראה לי דוגמה ← AI מחקה את הפורמט' },
        question: 'כיצד הצגת דוגמה עוזרת ל-AI?',
        reveal: 'זה נקרא "few-shot prompting". ה-AI מזהה את הפורמט שהראית ומחקה אותו. עדיף מלתאר בעברית את מה שאתה/ן רוצה.',
      },
    ],
  },

  practice: {
    intro: 'קח/י prompt גרוע ושדרג/י אותו!',
    steps: [
      {
        id: 'p1',
        instruction: 'הנה prompt גרוע: "כתוב סיפור". פתח/י AI ושלח/י אותו. כתוב/י מה קיבלת.',
        action: 'text',
        placeholder: 'ה-AI כתב: ...',
        helpKey: 'ai-tool',
      },
      {
        id: 'p2',
        instruction: 'שיפור ראשון: הוסף/י נושא ספציפי. לדוגמה: "כתוב סיפור על ילד שמוצא רובוט". שלח/י ← כתוב/י מה השתנה.',
        action: 'text',
        placeholder: 'אחרי הוספת נושא, הסיפור השתנה כי...',
        helpKey: null,
      },
      {
        id: 'p3',
        instruction: 'שיפור שני: הוסף/י פורמט. "כתוב סיפור על ילד שמוצא רובוט, 3 פסקאות קצרות, עם סוף מפתיע". שלח/י ← מה השתנה?',
        action: 'text',
        placeholder: 'אחרי הוספת פורמט, הסיפור...',
        helpKey: null,
      },
      {
        id: 'p4',
        instruction: 'שיפור שלישי: הוסף/י תפקיד. "כסופר ילדים, כתוב סיפור...". שלח/י ← כתוב/י את ה-prompt הסופי ואת התוצאה.',
        action: 'text',
        placeholder: 'ה-prompt הסופי שלי: ...',
        helpKey: null,
      },
    ],
  },

  document: {
    question: 'הצג/י את ה-prompt הראשון (גרוע) ואת הגרסה הסופית (טובה). מה השתנה ולמה?',
    hint: 'השתמש/י במילים: שיפרתי, prompt, תוצאה',
    artifactType: 'reflection',
    requiredKeywords: ['שיפרתי', 'prompt', 'תוצאה'],
    placeholder: 'הprompt הראשון היה: "___". שיפרתי ע"י... התוצאה הסופית הייתה...',
  },

  help: [
    {
      key: 'ai-tool',
      title: 'אין גישה ל-AI?',
      steps: ['Gemini: gemini.google.com', 'Copilot: copilot.microsoft.com', 'שניהם חסומים? שאל/י את המורה.'],
    },
  ],

  game: null,
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIT 9 — AI שיוצר תמונות ומוזיקה
// ─────────────────────────────────────────────────────────────────────────────
const unit9 = {
  id: 'unit-9',
  title: 'AI שיוצר תמונות',
  emoji: '🖼️',
  competencies: ['creator'],
  summary: 'נגלה כיצד AI יוצר תמונות מטקסט, ניצור תמונה בעצמנו ונדון בשאלה: מה זה אומר "ליצור"?',
  duration: '35 דקות',

  learn: {
    chunks: [
      {
        id: 'l1', type: 'hook',
        text: '"ציר/י לי דרקון כחול יושב על ראש הר עם שקיעה בפסים ורודים."',
        subtext: 'AI יכול לייצר את זה בשנייה אחת. איך?',
        buttonLabel: 'איך AI מצייר? ←',
      },
      {
        id: 'l2', type: 'concept',
        heading: 'Diffusion — מרעש לתמונה',
        bullets: [
          '1. המודל אומן על מיליוני תמונות + תיאורים שלהן',
          '2. הוא למד: "דרקון כחול" → איך זה נראה בסטטיסטיקה',
          '3. מתחיל מ"רעש" (pixels אקראיים) ← מסיר רעש ← תמונה',
        ],
        subtext: 'לא "מדמיין" — מחשב הסתברויות. אבל התוצאה... מדהימה.',
        buttonLabel: 'מה ה-Prompt עושה? ←',
      },
      {
        id: 'l3', type: 'comparison',
        heading: 'Prompt תמונה חלש מול חזק',
        rows: [
          { good: '"כלב" → תמונה גנרית', bad: '' },
          { good: '"labrador צהוב בגן ירוק, צבעי מים, style ג\'יבלי" → ✨', bad: '' },
          { good: 'פירוט + סגנון + תאורה = תוצאה מדויקת', bad: '' },
        ],
        buttonLabel: 'מה המושג? ←',
      },
      {
        id: 'l4', type: 'keyterm',
        term: 'Generative Model',
        termHe: 'מודל גנרטיבי',
        definition: 'מודל AI שיוצר תוכן חדש (תמונה, מוזיקה, טקסט) על סמך מה שלמד מנתוני אימון.',
        buttonLabel: 'בוא נראה תוצאות ←',
      },
    ],
  },

  see: {
    gameComponent: null,
    observations: [
      {
        id: 's1', title: 'אותו prompt — שלושה מודלים',
        visual: { type: 'placeholder', prompt: 'Side-by-side comparison of three AI image generators (DALL-E, Midjourney, Stable Diffusion) all generating "cat sitting on a moon" prompt. Show different styles: realistic, artistic, cartoonish. Hebrew labels with generator names.', searchQuery: 'AI image generator comparison DALL-E Midjourney Stable Diffusion same prompt', alt: 'השוואה: שלושה מודלים, אותו prompt, תוצאות שונות לגמרי' },
        question: 'אותו prompt — תוצאות שונות. למה?',
        reveal: 'כל מודל אומן על נתונים שונים ופותח ע"י חברה אחרת. לכל אחד "סגנון" שנלמד מהתמונות שראה. אין תשובה נכונה — יש גרסאות.',
      },
      {
        id: 's2', title: 'תמונה אמיתית או AI?',
        visual: { type: 'placeholder', prompt: 'Two images side by side in a quiz format: one real photo of a mountain, one AI-generated mountain scene that looks very realistic. Hebrew labels "תמונה אמיתית?" vs "תמונה מ-AI?" with reveal option.', searchQuery: 'real photo vs AI generated comparison realistic', alt: 'תמונה אמיתית לעומת תמונה שנוצרה על ידי AI — האם תוכל/י להבדיל?' },
        question: 'האם אפשר להבדיל בין תמונה אמיתית ל-AI?',
        reveal: 'קשה מאוד! סימנים לחפש: ידיים (AI מתבלבל עם אצבעות), טקסט בתמונה (יוצא מבולגן), הקשר (אם זה נראה "מושלם מדי"). תמיד בדוק/י מקור.',
      },
      {
        id: 's3', title: 'שאלת עומק: מי היוצר?',
        visual: { type: 'placeholder', prompt: 'Thought-provoking infographic in Hebrew: human artist with paintbrush on left, AI with prompt text on right, question mark in middle. "מי היוצר האמיתי?" as headline. Clean philosophical design.', searchQuery: 'AI art creativity human vs AI artist authorship debate', alt: 'אינפוגרפיקה: מי היוצר — האמן שכתב את ה-prompt, ה-AI, או שניהם?' },
        question: 'מי היוצר של תמונה שיצרת עם AI — אתה/ן, ה-AI, או שניכם?',
        reveal: 'שאלה פתוחה ללא תשובה אחת נכונה! אתה/ן כתבת/ת את ה-prompt ובחרת/ת מה לשמור. ה-AI ייצר את הפיקסלים. רוב חוקרי זכויות יוצרים עדיין מתווכחים על זה.',
      },
    ],
  },

  practice: {
    intro: 'צור/י תמונה עם AI!',
    steps: [
      {
        id: 'p1',
        instruction: 'פתח/י Bing Image Creator: bing.com/images/create (דורש חשבון מיקרוסופט). אלטרנטיבה: canva.com ← "AI Image Generator" (ללא חשבון).',
        action: 'confirm',
        confirmLabel: 'פתחתי כלי לתמונות ✓',
        helpKey: 'image-tool',
      },
      {
        id: 'p2',
        instruction: 'נסה/י prompt פשוט: כתוב/י "a cat sitting on the moon, watercolor style" ← לחץ/י "Create". ⚠️ כלים אלה עובדים טוב יותר באנגלית.',
        action: 'confirm',
        confirmLabel: 'יצרתי תמונה ראשונה ✓',
        helpKey: null,
      },
      {
        id: 'p3',
        instruction: 'שדרג/י את ה-prompt: הוסף/י פרטים כמו סגנון, תאורה, צבעים. לדוגמה: "a golden cat sitting on crescent moon, pink sunset sky, Ghibli style, soft lighting". צור/י תמונה חדשה.',
        action: 'confirm',
        confirmLabel: 'יצרתי תמונה משופרת ✓',
        helpKey: null,
      },
      {
        id: 'p4',
        instruction: 'בחר/י את התמונה הכי טובה שיצרת. כתוב/י: מה ה-prompt ששלחת, ומה אהבת בתוצאה?',
        action: 'text',
        placeholder: 'ה-prompt: "___" . אהבתי שה-AI...',
        helpKey: null,
      },
    ],
  },

  document: {
    question: 'צרף/י את התמונה שיצרת (צילום מסך) וכתוב/י: מה ה-prompt? מה הפתיע אותך?',
    hint: 'השתמש/י במילים: תמונה, prompt, תיאור',
    artifactType: 'screenshot+reflection',
    requiredKeywords: ['תמונה', 'prompt', 'תיאור'],
    placeholder: 'יצרתי תמונה של... ה-prompt שלי היה... הופתעתי כשה-AI...',
    screenshotLabel: 'צלם/י מסך של התמונה שיצרת',
  },

  help: [
    {
      key: 'image-tool',
      title: 'הכלי לא עובד?',
      steps: [
        'Bing Image Creator: bing.com/images/create — דורש חשבון Microsoft.',
        'Canva AI: canva.com ← "Magic Media" — חינם, ללא חשבון.',
        'Adobe Firefly: firefly.adobe.com — חינם, דורש הרשמה.',
        'כולם חסומים? שאל/י את המורה.',
      ],
    },
  ],

  game: null,
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIT 10 — הזיות AI: מתי לא לסמוך?
// ─────────────────────────────────────────────────────────────────────────────
const unit10 = {
  id: 'unit-10',
  title: 'הזיות AI — מתי לא לסמוך?',
  emoji: '🔍',
  competencies: ['researcher', 'philosopher'],
  summary: 'AI ממציא עובדות בביטחון מלא. נלמד לזהות "הזיות", להבין למה הן קורות ולאמת מידע בעצמנו.',
  duration: '35 דקות',

  learn: {
    chunks: [
      {
        id: 'l1', type: 'hook',
        text: 'שאלת AI מי כתב שיר מסוים. הוא ענה בביטחון מלא: "שלמה אבן גבירול, 1053". מחיאות כפיים. אבל...',
        subtext: '...השיר הזה לא קיים. ואבן גבירול לא כתב אותו. ה-AI המציא.',
        buttonLabel: 'איך זה קורה? ←',
      },
      {
        id: 'l2', type: 'concept',
        heading: 'הזיה (Hallucination) = ניבוי בלי ידע',
        bullets: [
          'LLM לא "יודע" עובדות — הוא מנבא מילים סבירות',
          '"מי כתב את...?" → המילים הסבירות הן שם + שנה',
          'הוא בחר שם וסוג שנה שנשמעו נכון — אבל המציא',
        ],
        subtext: 'הוא לא שיקר. הוא פשוט מנבא. הבעיה: הוא לא יודע שהוא לא יודע.',
        buttonLabel: 'מתי זה קורה הכי הרבה? ←',
      },
      {
        id: 'l3', type: 'comparison',
        heading: 'מתי AI מהלוצינציה הכי הרבה?',
        rows: [
          { good: 'שאלות כלליות → בדרך כלל בסדר', bad: 'עובדות ספציפיות (תאריכים, שמות) → סכנה' },
          { good: 'מידע נפוץ בנתוני האימון → בדרך כלל נכון', bad: 'מידע נדיר / עדכני / מקומי → סכנה' },
        ],
        buttonLabel: 'מה המושג? ←',
      },
      {
        id: 'l4', type: 'keyterm',
        term: 'Hallucination',
        termHe: 'הזיה',
        definition: 'כאשר AI מייצר מידע שגוי בביטחון מלא — כי הוא מנבא מילים סבירות, לא בודק עובדות.',
        buttonLabel: 'בוא נצוד הזיות ←',
      },
    ],
  },

  see: {
    gameComponent: 'HallucinationSpot',
    observations: [
      {
        id: 's1', title: 'AI בוטח — אבל טועה',
        visual: { type: 'placeholder', prompt: 'Screenshot mockup in Hebrew of an AI chat: User asks "מי המציא את הטלפון?" AI responds confidently "גרהם בל המציא את הטלפון ב-1876 בבוסטון". Then user shows Wikipedia link showing it\'s disputed (Meucci filed earlier). AI was partly wrong but stated it as absolute fact.', searchQuery: 'AI hallucination confident wrong answer example screenshot', alt: 'AI עונה בביטחון מלא — אבל העובדה שנויה במחלוקת' },
        question: 'ה-AI ענה בביטחון. האם זה אומר שהוא צודק?',
        reveal: 'לא. ה-AI לא "מרגיש" בטחון — הוא פשוט לא מוסיף "אולי" למשפטים שלו. ביטחון בטון ≠ ביטחון בעובדה. תמיד צריך לאמת.',
      },
      {
        id: 's2', title: 'כיצד לאמת?',
        visual: { type: 'placeholder', prompt: 'Step-by-step verification flowchart in Hebrew: AI gives fact → Google it → check Wikipedia → check news source → if confirmed: use it ✅ / if contradicted: don\'t trust ❌. Clean infographic with icons.', searchQuery: 'fact checking steps flowchart verify information', alt: 'תרשים זרימה: כיצד לאמת עובדה שAI נתן' },
        question: 'מה הצעד הראשון שתעשה/י כשAI נותן לך עובדה חשובה?',
        reveal: 'גוגל את העובדה ← חפש/י במקור מהימן (ויקיפדיה, עיתונות, אתרים רשמיים). אם שלושה מקורות מסכימים — סביר שנכון. אם אחד סותר — ה-AI טעה.',
      },
      {
        id: 's3', title: 'הזיה במחקר — הסכנה האמיתית',
        visual: { type: 'placeholder', prompt: 'Infographic in Hebrew showing a student asking AI for research sources. AI invents 3 fake paper titles with fake authors and DOI numbers. Student submits them. Teacher finds they don\'t exist. Warning sign design.', searchQuery: 'AI hallucination fake research citations academic danger', alt: 'אינפוגרפיקה: תלמיד מבקש מקורות מ-AI — AI ממציא מאמרים שלא קיימים' },
        question: 'למה הזיות מסוכנות במיוחד במחקרים ועבודות?',
        reveal: 'AI ממציא שמות מחברים, כותרות ומספרי DOI שנשמעים אמיתיים. אם תעתיק/י ללא בדיקה — תגיש/י מקורות שלא קיימים. תמיד בדוק/י כל מקור שAI נותן לך.',
      },
    ],
  },

  practice: {
    intro: 'צוד/י הזיה!',
    steps: [
      {
        id: 'p1',
        instruction: 'פתח/י Gemini / Copilot. שאל/י שאלת עובדה ספציפית שאתה/ן יכול/ה לאמת. לדוגמה: "מתי נוסדה עיר [שם עיר] ומי הקים אותה?"',
        action: 'text',
        placeholder: 'השאלה שאני שואל/ת: ...',
        helpKey: 'ai-tool',
      },
      {
        id: 'p2',
        instruction: 'כתוב/י את תשובת ה-AI המלאה.',
        action: 'text',
        placeholder: 'ה-AI ענה: ...',
        helpKey: null,
      },
      {
        id: 'p3',
        instruction: 'עכשיו אמת/י! חפש/י את העובדות בוויקיפדיה או בגוגל. האם ה-AI צדק? האם היה משהו שגוי?',
        action: 'text',
        placeholder: 'בדיקת עובדות: ה-AI [צדק / טעה ב]... המקור שמצאתי: ...',
        helpKey: null,
      },
    ],
  },

  document: {
    question: 'תאר/י הזיה שמצאת (או שהאי לא טעה — גם זה מידע!). מה השאלה? מה ה-AI ענה? מה המקור אומר?',
    hint: 'השתמש/י במילים: הזיה, בדקתי, מקור',
    artifactType: 'reflection',
    requiredKeywords: ['הזיה', 'בדקתי', 'מקור'],
    placeholder: 'שאלתי את ה-AI: "___". הוא ענה: "___". בדקתי ב-Wikipedia ומצאתי שה-AI [טעה / צדק] כי...',
  },

  help: [
    {
      key: 'ai-tool',
      title: 'אין גישה ל-AI?',
      steps: ['Gemini: gemini.google.com', 'Copilot: copilot.microsoft.com', 'שניהם חסומים? שאל/י את המורה.'],
    },
  ],

  game: null,
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIT 11 — הטיה, הוגנות ופרטיות
// ─────────────────────────────────────────────────────────────────────────────
const unit11 = {
  id: 'unit-11',
  title: 'הטיה, הוגנות ופרטיות',
  emoji: '⚖️',
  competencies: ['philosopher'],
  summary: 'מה קורה כשנתוני האימון מוטים? נחקור הטיה ב-AI, השלכות על הוגנות ומה זה אומר לגבי הפרטיות שלנו.',
  duration: '35 דקות',

  learn: {
    chunks: [
      {
        id: 'l1', type: 'hook',
        text: 'מצלמת אבטחה בחנות מסמנת "חשוד" אדם שלא עשה כלום.',
        subtext: 'הוא שחור. מרוב תמונות האימון היו של אנשים בהירי עור. ה-AI לא "גזען" — אבל הנתונים היו.',
        buttonLabel: 'מה קרה כאן? ←',
      },
      {
        id: 'l2', type: 'concept',
        heading: 'הטיה (Bias) = בעיית נתונים',
        bullets: [
          'אם הנתונים מוטים → המודל מוטה',
          'זה לא "כוונה רעה" — זה תוצאה של נתונים חסרים',
          'הפתרון: נתונים מגוונים + בדיקה + תיקון',
        ],
        subtext: 'AI יכול לחזק הטיות קיימות — גם בלי שאיש רצה בכך.',
        buttonLabel: 'מה עם הפרטיות שלי? ←',
      },
      {
        id: 'l3', type: 'comparison',
        heading: 'פרטיות: מה AI יודע עלינו',
        rows: [
          { good: 'מה ישראל: מיקום GPS, קניות, חיפושים', bad: '' },
          { good: 'נתונים אלה אומנו → AI מכיר אותנו לעיתים יותר מאיתנו', bad: '' },
          { good: 'חשוב לשאול: מי שומר את הנתונים? לאיזה שימוש?', bad: '' },
        ],
        buttonLabel: 'מה המושג? ←',
      },
      {
        id: 'l4', type: 'keyterm',
        term: 'Algorithmic Bias',
        termHe: 'הטיה אלגוריתמית',
        definition: 'כשמערכת AI מייצרת תוצאות לא הוגנות בגלל הטיות שנמצאות בנתוני האימון.',
        buttonLabel: 'בוא נראה דוגמאות ←',
      },
    ],
  },

  see: {
    gameComponent: null,
    observations: [
      {
        id: 's1', title: 'הטיה בזיהוי פנים',
        visual: { type: 'placeholder', prompt: 'Infographic in Hebrew showing facial recognition accuracy rates by demographic: white men 99%, white women 93%, dark-skinned men 88%, dark-skinned women 65%. Bar chart with clear disparities. Source: MIT Media Lab Gender Shades study.', searchQuery: 'facial recognition accuracy bias race gender MIT Gender Shades study', alt: 'גרף: דיוק זיהוי פנים לפי קבוצה — פערים משמעותיים בין קבוצות' },
        question: 'מדוע מערכת זיהוי פנים טועה יותר בנשים בעור כהה?',
        reveal: 'נתוני האימון הכילו בעיקר פנים של גברים בהירי עור. המודל לא ראה מספיק פנים כהות ונשיות — ולכן "לא מכיר" אותן טוב. זו הטיה שנובעת מנתונים.',
      },
      {
        id: 's2', title: 'הטיה בתמונות AI',
        visual: { type: 'placeholder', prompt: 'Screenshot in Hebrew of AI image generator results for "CEO" prompt showing mostly male figures in suits, and "nurse" showing mostly female figures. Compare with actual statistics. Label as "הטיה בייצוג" (representation bias).', searchQuery: 'AI image generator gender bias CEO nurse prompt stereotype', alt: 'תמונות AI ל"מנכ"ל" = רוב גברים; ל"אחות" = רוב נשים — הטיית ייצוג' },
        question: 'מה הבעיה בכך שAI מייצר "מנכ"ל" תמיד כגבר?',
        reveal: 'זה מחזק סטריאוטיפים קיימים. ילדים שרואים זאת עשויים להאמין שרק גברים יכולים להיות מנכ"לים. AI לא יוצר הטיה חדשה — הוא מגביר הטיות שכבר היו בנתוני האימון.',
      },
      {
        id: 's3', title: 'מה AI יודע עלייך?',
        visual: { type: 'placeholder', prompt: 'Privacy data map in Hebrew showing a smartphone in center with arrows pointing outward to: location data (GPS), purchase history, search history, friends network, health data, browsing habits. All feeding into "AI profile". Warning: this data trains AI models.', searchQuery: 'smartphone data collection privacy AI training personal data map', alt: 'מפת נתונים: מה הטלפון שלך אוסף עלייך ואיך זה מגיע לאימון AI' },
        question: 'אילו נתונים הטלפון שלך אוסף עלייך שאתה/ן לא תמיד מודע/ת להם?',
        reveal: 'מיקום GPS תמיד, הרגלי גלישה, קניות, אנשי קשר, שעות שינה (מחשמול), דפוסי הקלדה. כל אלה עלולים לשמש לאימון מודלים — ולעיתים נמכרים לצדדים שלישיים.',
      },
    ],
  },

  practice: {
    intro: 'חשוב/י כפילוסוף/ית AI!',
    steps: [
      {
        id: 'p1',
        instruction: 'בחר/י אחת מהדוגמאות שראית (זיהוי פנים / הטיה בתמונות / פרטיות). כתוב/י: מה הבעיה לדעתך?',
        action: 'text',
        placeholder: 'הבעיה שבחרתי: ...',
        helpKey: null,
      },
      {
        id: 'p2',
        instruction: 'כתוב/י: מי לדעתך אחראי לבעיה זו — המפתחים? החברה? המשתמשים? כולם?',
        action: 'text',
        placeholder: 'לדעתי האחריות היא של...',
        helpKey: null,
      },
      {
        id: 'p3',
        instruction: 'כתוב/י: מה שלוש הצעות לפתרון שלך?',
        action: 'text',
        placeholder: '1. ... 2. ... 3. ...',
        helpKey: null,
      },
    ],
  },

  document: {
    question: 'בחר/י בעיה אתית אחת ב-AI וכתוב/י: מה הבעיה, מי נפגע, ומה הפתרון שלך.',
    hint: 'השתמש/י במילים: הטיה, הוגנות, פרטיות',
    artifactType: 'reflection',
    requiredKeywords: ['הטיה', 'הוגנות', 'פרטיות'],
    placeholder: 'הבעיה שבחרתי: ___. הנפגעים הם: ___. הפתרון שלי: ___',
  },

  help: [
    {
      key: 'ethics-help',
      title: 'לא יודע/ת מה לכתוב?',
      steps: [
        'תחשוב/י: מה היית מרגיש/ה אם AI טעה לגביך בגלל איך שאתה/ן נראה/ית?',
        'מי נפגע מהמצב שתיארת? מה הם לא יכולים לעשות בגלל זה?',
        'מה ניתן לשנות בנתוני האימון כדי לתקן זאת?',
      ],
    },
  ],

  game: null,
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIT 12 — בנה/י ושתף/י פרויקט
// ─────────────────────────────────────────────────────────────────────────────
const unit12 = {
  id: 'unit-12',
  title: 'בנה/י ושתף/י פרויקט',
  emoji: '🚀',
  competencies: ['creator', 'programmer', 'philosopher'],
  summary: 'מחברים הכל — בוחרים רעיון, בונים פרויקט קטן עם AI ומציגים לכיתה.',
  duration: '35 דקות',

  learn: {
    chunks: [
      {
        id: 'l1', type: 'hook',
        text: 'אתה/ן סיימת/ת 11 יחידות. ראית/ת כיצד AI עובד, יצרת/ת מודלים, שיפרת/ת prompts, מצאת/ת הזיות.',
        subtext: 'עכשיו: מה תבנה/י עם כל זה?',
        buttonLabel: 'בוא נתכנן ←',
      },
      {
        id: 'l2', type: 'concept',
        heading: '4 סוגי פרויקטים AI שתוכל/י לבנות',
        bullets: [
          '🧪 מסווג תמונות (Teachable Machine) — ליחידה 5',
          '💬 Prompt מיוחד — כלי לשימוש יומיומי שלך',
          '🖼️ גלריית תמונות AI — על נושא שאוהב/ת',
          '📄 מדריך AI — "הדרכה" שכתבת לחבר שלא מכיר AI',
        ],
        subtext: 'אין פרויקט "נכון" או "גדול מדי". גם פרויקט קטן ומדויק = מצוין.',
        buttonLabel: 'איך בונים פרויקט? ←',
      },
      {
        id: 'l3', type: 'concept',
        heading: 'שלושה שלבים לפרויקט מוצלח',
        bullets: [
          '1. רעיון: מה אתה/ן רוצה לפתור / ליצור?',
          '2. בנייה: השתמש/י בכלי AI מהקורס',
          '3. הצגה: הסבר/י מה בנית/ת ומה למדת/ת',
        ],
        buttonLabel: 'מה המושג? ←',
      },
      {
        id: 'l4', type: 'keyterm',
        term: 'AI Project',
        termHe: 'פרויקט AI',
        definition: 'יצירה שמשתמשת ב-AI ככלי לפתרון בעיה, יצירת תוכן, או הצגת רעיון.',
        buttonLabel: 'בוא נראה דוגמאות ←',
      },
    ],
  },

  see: {
    gameComponent: null,
    observations: [
      {
        id: 's1', title: 'פרויקט לדוגמה: מזהה מצב-רוח',
        visual: { type: 'placeholder', prompt: 'Screenshot of a student project using Teachable Machine: mood detector with 3 categories (happy, sad, confused). Shows the training interface with sample photos, accuracy 87%. Hebrew labels with student name blurred. Looks like a real middle-school project.', searchQuery: 'Teachable Machine student project mood detector middle school', alt: 'פרויקט תלמיד: מזהה מצב-רוח עם Teachable Machine — 87% דיוק' },
        question: 'מה לדעתך הכי קשה בפרויקט הזה? מה הכי מגניב?',
        reveal: 'הכי קשה: לאסוף דוגמאות שמייצגות מגוון אנשים. הכי מגניב: שאחרי כמה דקות, המחשב מזהה מצב-רוח בזמן אמת. זה ה-power של machine learning — מהנה בדקות.',
      },
      {
        id: 's2', title: 'פרויקט לדוגמה: Prompt Tool',
        visual: { type: 'placeholder', prompt: 'Screenshot of a student-created prompt template in Hebrew: a structured form for "homework helper" with fields for subject, difficulty level, and type of help needed. Shows sample output. Looks like a useful practical tool.', searchQuery: 'student prompt template AI homework helper tool example', alt: 'פרויקט תלמיד: תבנית Prompt ל"עוזר שיעורים" עם שדות מותאמים אישית' },
        question: 'איך Prompt Template שונה מסתם לשאול AI שאלה?',
        reveal: 'Template = מבנה קבוע שמבטיח תשובה איכותית בכל פעם. במקום לחשוב מה לכתוב — ממלאים שדות. זהו "מוצר" שאפשר לחלוק עם אחרים.',
      },
      {
        id: 's3', title: 'עקרון: AI ככלי — לא כתשובה',
        visual: { type: 'placeholder', prompt: 'Two-panel comparison in Hebrew: Left panel "AI כתשובה" showing student copying AI output directly. Right panel "AI ככלי" showing student using AI as starting point then adding own ideas and critical thinking. Right panel highlighted as preferred.', searchQuery: 'AI tool vs answer student project critical thinking', alt: 'השוואה: AI כתשובה (לא טוב) לעומת AI ככלי (טוב) — ההבדל בגישה' },
        question: 'מה ההבדל בין "AI כתשובה" ל"AI ככלי"?',
        reveal: '"AI כתשובה" = מעתיק/ת ומגיש/ה. "AI ככלי" = AI עוזר לי לבנות, אני מוסיף/ה שיפוט, יצירתיות ואחריות. פרויקט טוב תמיד כולל את הדעה שלך.',
      },
    ],
  },

  practice: {
    intro: 'בנה/י פרויקט AI משלך!',
    steps: [
      {
        id: 'p1',
        instruction: 'בחר/י סוג פרויקט: מסווג תמונות (Teachable Machine) / Prompt Tool / גלריית תמונות AI / מדריך AI. כתוב/י: מה בחרת/ת ולמה.',
        action: 'text',
        placeholder: 'בחרתי: ___ כי...',
        helpKey: null,
      },
      {
        id: 'p2',
        instruction: 'כתוב/י תכנית: מה הפרויקט יעשה? מי ישתמש בו? איזה כלי AI תשתמש/י?',
        action: 'text',
        placeholder: 'הפרויקט שלי: ___ . הוא יעשה: ___ . אשתמש ב-___',
        helpKey: null,
      },
      {
        id: 'p3',
        instruction: 'בנה/י את הפרויקט! (10 דקות). השתמש/י בכלי שבחרת/ת. כשסיימת/ת — לחץ/י אישור.',
        action: 'confirm',
        confirmLabel: 'הפרויקט מוכן ✓',
        helpKey: 'project-help',
      },
      {
        id: 'p4',
        instruction: 'הכן/י הצגה קצרה: מה בנית/ת? איך עשית/ת את זה? מה למדת/ת? (3 משפטים).',
        action: 'text',
        placeholder: 'בניתי ___. עשיתי את זה ע"י ___. למדתי ש-___.',
        helpKey: null,
      },
    ],
  },

  document: {
    question: 'צרף/י צילום מסך של הפרויקט וכתוב/י: מה בנית/ת, איך, ומה שלקחת/ת מהקורס הזה.',
    hint: 'השתמש/י במילים: פרויקט, AI, יצרתי',
    artifactType: 'screenshot+reflection',
    requiredKeywords: ['פרויקט', 'AI', 'יצרתי'],
    placeholder: 'יצרתי פרויקט AI של: ___. השתמשתי ב-___. הדבר הכי חשוב שלקחתי מהקורס הוא:',
    screenshotLabel: 'צלם/י מסך של הפרויקט שבנית/ת',
  },

  help: [
    {
      key: 'project-help',
      title: 'לא יודע/ת מה לבנות?',
      steps: [
        'מסווג תמונות: Teachable Machine ← אמן/י על 3 קטגוריות שמעניינות אותך.',
        'Prompt Tool: כתוב/י prompt מושלם לנושא שאתה/ן אוהב/ת (ספורט, בישול, מוזיקה).',
        'גלריית תמונות: צור/י 6 תמונות AI על נושא אחד עם Bing/Canva.',
        'מדריך: כתוב/י "10 דברים שצריך לדעת על AI" בשביל חבר/ה שלא למד את הקורס.',
      ],
    },
  ],

  game: null,
}

// ─────────────────────────────────────────────────────────────────────────────
// TRAINING PROCESS DIAGRAM (built-in for Unit 3)
// ─────────────────────────────────────────────────────────────────────────────
// Handled in PlaceholderVisual via diagramKey: 'training-process'

// ─────────────────────────────────────────────────────────────────────────────
export const COURSE = {
  title: 'AI בשבילי',
  subtitle: 'קורס אוריינות בינה מלאכותית — כיתה ז׳',
  units: [unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8, unit9, unit10, unit11, unit12],
}

export const UNIT_IDS = COURSE.units.map(u => u.id)
