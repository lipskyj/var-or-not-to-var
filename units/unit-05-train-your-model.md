# יחידה 5 — "אמן את המודל שלך" | Teachable Machine

---

## A. כותרת וכשירויות

**כותרת:** "אמן את המודל שלך"
**כלי מרכזי:** Google Teachable Machine

**כשירויות מחוון (מטה"ח):**
- ✅ **כשירות 1 — המחקר/ת:** מזהה כיצד AI עובד — מה זו "אימון מודל" ומה תפקיד הנתונים
- ✅ **כשירות 2 — המתכנת/ת:** משתמש/ת ב-AI בצורה יעילה — מאמן/ת מודל ומפרש/ת תוצאות
- ✅ **כשירות 4 — הפילוסוף/ת:** חושב/ת על הטיה (bias) — מה קורה כשהנתונים מוטים

---

## B. מטרת למידה

הלומד/ת יאמן/תאמן מודל סיווג תמונות בעצמו/ה ב-Teachable Machine, יתנסה בהשפעה של כמות ומגוון הדוגמאות על דיוק המודל, ויסביר בשפה פשוטה מה משמעות "אימון" ב-AI.

---

## C. LEARN (≈8 דקות)

**מבנה: 4 צ'אנקים קצרים — כל אחד מופיע בנפרד, לחיצה להמשך.**

---

### צ'אנק 1 — ה-Hook

> 🤔 **שאלה:** איך המחשב יודע שזה כלב — ולא חתול?

> הוא לא נולד עם הידע הזה.
> מישהו היה צריך **ללמד** אותו.

*[כפתור: "איך מלמדים מחשב? ←"]*

---

### צ'אנק 2 — הרעיון המרכזי

> **אימון (Training) = להראות למחשב הרבה דוגמאות.**

> לדוגמה:
> - 200 תמונות של כלבים → "זה **כלב**"
> - 200 תמונות של חתולים → "זה **חתול**"

> המחשב מחפש **דפוסים** בתמונות.
> אחרי שראה מספיק — הוא יודע לזהות לבד.

*[כפתור: "מה קורה עם מעט דוגמאות? ←"]*

---

### צ'אנק 3 — הבנת הכשל

> **ככה זה עובד — ככה זה נכשל:**

| 🟢 הרבה דוגמאות | 🔴 מעט דוגמאות |
|---|---|
| מגוון תמונות | רק זווית אחת |
| ← מודל מדויק | ← מודל מתבלבל |

*[כפתור: "בוא נראה את זה ←"]*

---

### צ'אנק 4 — מושג המפתח

> 📌 **מושג המפתח של היחידה:**
> **Supervised Learning — למידה מפוקחת**
> = AI לומד מדוגמאות שאנחנו מתייגים.

*[כפתור: "בוא נראה דוגמה אמיתית ←"]*

---

## D. SEE (≈9 דקות)

**מבנה: 3 תצפיות מודרכות — הלומד/ת שם/ת לב, לא קורא/ת.**

---

### תצפית 1 — מודל מוכן עם דיוק גבוה (3 דקות)

**מה מוצג:**
תמונת מסך / GIF של Teachable Machine עם 3 קטגוריות:
- ✊ אגרוף — 80 דוגמאות
- ✋ יד פתוחה — 80 דוגמאות
- 👍 אגודל למעלה — 80 דוגמאות
- דיוק: ~95% בכל קטגוריה

**שאלת הנחיה:**
> **מה שמת/ת לב?** כמה דוגמאות יש לכל קטגוריה?

**תשובה** *(מופיעה אחרי לחיצת "reveal"):*
> ✅ 80 דוגמאות לכל קטגוריה — **מגוונות**, מזוויות שונות, תאורות שונות.

---

### תצפית 2 — מודל עם אימון לקוי (3 דקות)

**מה מוצג:**
אותו מודל — אבל:
- ✊ אגרוף: 5 דוגמאות (כולן מאותה זווית)
- ✋ יד פתוחה: 3 דוגמאות
- 👍 אגודל: 2 דוגמאות
- תוצאה: אגרוף מזוהה בטעות כ"אגודל" ב-60% מהמקרים

**שאלת הנחיה:**
> **למה המודל מתבלבל?**

**תשובה** *(reveal):*
> 🔴 מעט מדי דוגמאות + אין מגוון. המחשב לא ראה מספיק כדי ללמוד.

---

### תצפית 3 — "הטיה בנתונים" / Bias (3 דקות)

**מה מוצג:**
דיאגרמה פשוטה:

```
[100 תמונות של ילד עם כובע]  →  מודל AI  →  "ילד ✅"
[0   תמונות של ילדה עם כובע] →  מודל AI  →  "ילד ❌"
```

**שאלת הנחיה:**
> **מה הבעיה כאן?**

**תשובה** *(reveal):*
> ⚠️ הנתונים לא מייצגים את המציאות. המודל למד "הטיה" (bias) — לא אמת.
> **כשהנתונים מוטים — המודל מוטה.**

---

## E. PRACTICE (≈15 דקות)

**המשימה: "בנה מזהה הבעות פנים"**

הלומד/ת מאמן/ת מודל לזיהוי 3 הבעות פנים:
**😊 שמח/ה | 😐 ניטרלי/ת | 😮 מופתע/ת**

---

### שלב 1 *(30 שניות)*
> 🌐 פתח/י את האתר: **teachablemachine.withgoogle.com**
> לחץ/י על "Get Started"

*[כפתור: "פתחתי ←"]*

---

### שלב 2 *(30 שניות)*
> בחר/י: **"Image Project"** ← **"Standard Image Model"**

*[כפתור: "בחרתי ←"]*

---

### שלב 3 *(1 דקה)*
> שנה/י את שמות הקטגוריות:
> - Class 1 → `שמח`
> - Class 2 → `ניטרלי`
> - Class 3 → `מופתע`
>
> לחץ/י "Add a class" להוספת הקטגוריה השלישית.

*[כפתור: "שיניתי ←"]*

---

### שלב 4 *(5 דקות)*
> ⬇️ **הוסף/י דוגמאות:**
> לכל קטגוריה: לחץ/י "Webcam" ← עשה/י את ההבעה ← לחץ/י "Hold to Record"
>
> 🎯 **יעד:** לפחות **30 דוגמאות** לכל קטגוריה
> 💡 **טיפ:** הזז/י קצת את הראש בין צילומים — מגוון עוזר!

*[סרגל התקדמות: 0/30 | 0/30 | 0/30 — מתעדכן בזמן אמת]*

*[כפתור "צריך/ה עזרה? 🆘" — מופיע בשלב זה]*

*[כפתור: "סיימתי לצלם ←"]*

---

### שלב 5 *(2 דקות)*
> לחץ/י על **"Train Model"**
> ✋ **חכה/י** — זה לוקח כ-30 שניות. אל תסגור/י את הדף!

*[אנימציה: "המחשב לומד..." עם פס טעינה]*
*[כפתור מופיע רק כשהאימון מסתיים: "המודל מוכן ←"]*

---

### שלב 6 *(3 דקות)*
> 🧪 **בדוק/י את המודל שלך:**
> לחץ/י "Preview" ← הפנה/י את המצלמה ← עשה/י כל אחת מ-3 ההבעות
>
> **שאלה:** האם המודל מזהה נכון?
> רשום/י: מה עבד? מה לא?

*[תיבת טקסט קצרה: "מה שמת/ת לב?" — 2–3 משפטים]*

*[כפתור "צריך/ה עזרה? 🆘" — מופיע בשלב זה]*

---

## F. DOCUMENTATION QUESTION (שאלת התיעוד — שער ההמשך)

**ארטיפקט חובה לפני פתיחת יחידה 6 — שניים מתוך שניים:**

**1. צילום מסך** של מסך ה-Preview עם המודל המאומן.
חובה שיופיעו: שמות 3 הקטגוריות + אחוזי ביטחון בזמן אמת.

**2. תשובה בכתב:**
> 📝 "תאר/י בשתיים–שלוש משפטים: מה שיפר / פגע בדיוק המודל שלך?
> השתמש/י במילים: **דוגמאות**, **קטגוריה**, **מגוון**."

*[הערכה אוטומטית בסיסית: בדיקה שלושת מילות המפתח מופיעות בטקסט לפני קבלת ה-submission]*

---

## G. COMMON FAILURES → SELF-HELP

### כשל 1: "המצלמה לא עובדת / האתר מבקש הרשאה"
*[כפתור "צריך/ה עזרה? 🆘" — מופיע ליד שלב 4]*

> ✅ **מה לעשות:**
> 1. מחפש/ת בדפדפן את הסמל 🔒 ליד כתובת האתר
> 2. לוחץ/ת עליו ← "Camera" ← "Allow"
> 3. מרענן/ת את הדף (F5) ← מנסה שוב
>
> עדיין לא עובד? בחר/י "Upload" במקום "Webcam" וצלם/י תמונות מהטלפון ועלה/י אותן.

---

### כשל 2: "המודל מזהה רק קטגוריה אחת — תמיד אותה תשובה"
*[כפתור "צריך/ה עזרה? 🆘" — מופיע ליד שלב 6]*

> ✅ **מה לעשות:**
> הסיבה: אחת הקטגוריות קיבלה הרבה פחות דוגמאות.
> 1. חזור/י לשלב 4
> 2. בדוק/י: כמה דוגמאות לכל קטגוריה?
> 3. הוסף/י דוגמאות לקטגוריה החלשה עד שכולן ~30
> 4. לחץ/י "Train Model" שוב

---

### כשל 3: "הדיוק נמוך — המודל מתבלבל בין שמח לניטרלי"
*[כפתור "צריך/ה עזרה? 🆘" — מופיע ליד שלב 6]*

> ✅ **מה לעשות:**
> הסיבה: ההבעות דומות מדי בחלק מהתמונות.
> 1. מחק/י דוגמאות לא-ברורות (לחץ/י על הפח 🗑️)
> 2. צלם/י מחדש — **הגזים/י** בהבעות! שמח = חייך גדול. מופתע = פה פתוח רחב.
> 3. אמן/י שוב

---

## H. RESOURCES & EXAMPLES TO GATHER

### כלים

| כלי | שימוש | חשבון? | הערה |
|---|---|---|---|
| teachablemachine.withgoogle.com | הכלי המרכזי | לא נדרש | ✅ חינם, בדפדפן, עובד מישראל |
| מצלמת הדפדפן (Webcam API) | צילום דוגמאות | לא נדרש | דורש הרשאת מצלמה בדפדפן |
| machinelearningforkids.co.uk | אלטרנטיבה | דורש הרשאת מורה | ⚠️ אם Teachable Machine חסומה |

---

### נכסים ויזואליים לקטע SEE

**תמונה 1 — מסך Teachable Machine עם דיוק גבוה:**
> *Prompt לייצור:* "Screenshot mockup of Google Teachable Machine interface showing 3 trained image classes labeled in Hebrew: שמח, ניטרלי, מופתע. Each class shows 80 training samples. The preview panel shows a live webcam feed of a smiling face with 95% confidence on the שמח label. Clean, bright UI, realistic mockup."
> *Search query:* `Teachable Machine image classification trained model preview screenshot`

**תמונה 2 — מסך עם אימון לקוי:**
> *Prompt לייצור:* "Screenshot mockup of Google Teachable Machine showing 3 classes with very few training samples: class 1 has 5 samples, class 2 has 3 samples, class 3 has 2 samples. Preview panel shows confused results — a fist labeled incorrectly as thumb-up with 61% confidence. Red warning state, realistic UI."
> *Search query:* `machine learning few training examples low accuracy screenshot`

**דיאגרמת Bias (תצפית 3) — ליצור בעצמך:**
> *Prompt לייצור (Canva/Figma):* "Simple Hebrew infographic: left side shows 100 photo icons of a boy with a hat, arrow right to brain icon labeled 'מודל AI', arrow right to text 'ילד ✅'. Below: 0 photo icons of a girl with a hat, arrow right to same brain, arrow right to 'ילד ❌'. Clean flat design, child-friendly, red X on wrong output."
> *Search query:* `AI bias training data imbalance diagram infographic simple`

---

### לינקים מתאימים לגיל 13

1. **וידאו:** "How does Teachable Machine work?" — Google Experiments YouTube (≈3 דקות, אנגלית).
   ⚠️ YouTube בדרך כלל זמין בישראל. בדוק זמינות לפני פרסום.
   *Search query (YouTube):* `teachable machine how it works kids explained`

2. **אינטראקטיבי:** experiments.withgoogle.com/teachable-machine — הסבר ויזואלי של צוות הפיתוח.

---

### מה הבוני עוד צריך ליצור

- [ ] צילום / GIF מסך של Teachable Machine בזמן אימון (אנימציית הלמידה, 5–10 שניות)
- [ ] תמונת "לפני ואחרי": מודל עם 5 דוגמאות vs 80 דוגמאות, אותה קלט, תוצאות שונות
- [ ] תרגום עברי של תוויות ממשק Teachable Machine (לסרטון הדרכה קצר לתלמידים)

---

## I. SCREEN LAYOUT

```
┌─────────────────────────────────────────────────────┐
│  ← יחידה 4          יחידה 5: אמן את המודל שלך   🔒6 │
│─────────────────────────────────────────────────────│
│  [LEARN]  [SEE]  [PRACTICE]  [DOCUMENT]             │
│   ●────────○──────○──────────○   ← Progress bar    │
│─────────────────────────────────────────────────────│
│  ┌─────────────────────────────────────────────┐   │
│  │   LEARN — צ'אנק 1 מתוך 4                   │   │
│  │                                             │   │
│  │   🤔 שאלה: איך המחשב יודע שזה כלב?         │   │
│  │   הוא לא נולד עם הידע הזה.                 │   │
│  │   מישהו היה צריך ללמד אותו.                │   │
│  │                                             │   │
│  │            [איך מלמדים מחשב? ←]            │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  גלריית תלמידים: "מה אימנו חברים/ות שלך?" [🖼️🖼️🖼️] │
│─────────────────────────────────────────────────────│
│  PRACTICE — שלב 4/6: צלם/י דוגמאות                 │
│  שמח:    ████░░░░ 12/30  [+ Webcam]  [? עזרה 🆘]   │
│  ניטרלי: ██░░░░░░  8/30  [+ Webcam]  [? עזרה 🆘]   │
│  מופתע:  █░░░░░░░  4/30  [+ Webcam]  [? עזרה 🆘]   │
│─────────────────────────────────────────────────────│
│  DOCUMENT — 🔒 ייפתח אחרי סיום האימון              │
│  [צרף/י צילום מסך]  +  [השב/י לשאלה]               │
│  [שלח/י ← פותח יחידה 6]                            │
└─────────────────────────────────────────────────────┘
```

**כפתור "עזרה 🆘"** — מופיע ליד **כל שלב** ב-PRACTICE בנפרד.
לחיצה פותחת drawer צדדי עם ה-self-help הרלוונטי לאותו שלב בלבד.

**גלריית תלמידים** — מציגה מסכי Preview שתלמידים אחרים שלחו.
מטושטשים-קלות לפרטיות. ללא שמות מלאים.

---

## J. INTERACTIVE MINI-GAME / SIMULATION

**שם:** "כמה דוגמאות הספקת?"
**מיקום:** בתוך SEE — לפני תצפית 1. הלומד/ת חש/ה את ההשפעה לפני שרואה את הכלי האמיתי.
**רעיון מוחשי:** יותר דוגמאות מגוונות = דיוק גבוה יותר. פחות / חד-גוניות = דיוק נמוך.
**לולאה:** לחיצה אחת → הוספת דוגמה → מד הדיוק מתעדכן → פידבק מיידי.
**פידבק:** צבע + אחוז + משפט קצר (3 מצבים: 🔴 מבולבל / 🟡 בסדר / 🟢 מצוין).
**תנאי ניצחון:** acc ≥ 80% → event `trainingSimComplete` נשלח ל-LMS.

---

### קוד — React Component (self-contained)

```jsx
import React, { useState, useEffect } from "react";

const CATEGORIES = ["😊 שמח", "😐 ניטרלי", "😮 מופתע"];
const MAX_PER = 20;

function calcAccuracy(counts) {
  const total = counts.reduce((a, b) => a + b, 0);
  if (total === 0) return 0;
  const minC = Math.min(...counts);
  const avg = total / counts.length;
  const balance = avg > 0 ? minC / avg : 0;
  const rawAcc = Math.min(97, 30 + total * 2.8);
  return Math.round(rawAcc * (0.4 + 0.6 * balance));
}

function FeedbackBar({ pct }) {
  const color = pct >= 80 ? "#4caf50" : pct >= 50 ? "#ff9800" : "#f44336";
  const msg =
    pct >= 80
      ? "🎉 מצוין! המודל שלך מאומן היטב!"
      : pct >= 50
      ? "🤔 לא רע — הוסף/י עוד דוגמאות לקטגוריות החלשות."
      : "😅 המודל מתבלבל. הוסף/י יותר דוגמאות לכל קטגוריה.";
  return (
    <div style={{ marginTop: 16, textAlign: "center" }}>
      <div style={{ height: 18, borderRadius: 9, background: "#e0e0e0", overflow: "hidden", marginBottom: 8 }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, transition: "width 0.5s ease, background 0.5s ease" }} />
      </div>
      <span style={{ fontWeight: "bold", fontSize: 22, color }}>{pct}%</span>{" "}דיוק
      <p style={{ marginTop: 8, fontSize: 14, color: "#555" }}>{msg}</p>
    </div>
  );
}

export default function TrainingSim() {
  const [counts, setCounts] = useState([0, 0, 0]);

  const acc = calcAccuracy(counts);

  useEffect(() => {
    if (acc >= 80) {
      window.dispatchEvent(new CustomEvent("trainingSimComplete"));
    }
  }, [acc]);

  const add = (i) => {
    if (counts[i] >= MAX_PER) return;
    const next = [...counts];
    next[i]++;
    setCounts(next);
  };

  const reset = () => setCounts([0, 0, 0]);
  const total = counts.reduce((a, b) => a + b, 0);

  return (
    <div dir="rtl" style={{ fontFamily: "sans-serif", maxWidth: 420, margin: "0 auto", padding: 20, background: "#fafafa", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}>
      <h2 style={{ marginBottom: 4 }}>🧪 כמה דוגמאות הספקת?</h2>
      <p style={{ color: "#666", fontSize: 14, marginBottom: 16 }}>
        לחץ/י "הוסף דוגמה" ← ראה/י כיצד הדיוק עולה.
      </p>

      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        {CATEGORIES.map((cat, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", border: "1.5px solid #ddd", borderRadius: 10, padding: "10px 6px", background: "#fff" }}>
            <div style={{ fontSize: 20 }}>{cat}</div>
            <div style={{ fontWeight: "bold", margin: "6px 0", fontSize: 18 }}>{counts[i]}</div>
            <div style={{ height: 60, background: "#eee", borderRadius: 6, overflow: "hidden", position: "relative" }}>
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: counts[i] >= 15 ? "#4caf50" : counts[i] >= 8 ? "#ff9800" : "#f44336",
                height: `${(counts[i] / MAX_PER) * 100}%`,
                transition: "height 0.3s ease, background 0.3s ease"
              }} />
            </div>
            <button
              onClick={() => add(i)}
              disabled={counts[i] >= MAX_PER}
              style={{ marginTop: 8, padding: "6px 10px", fontSize: 12, borderRadius: 6, border: "none", background: counts[i] >= MAX_PER ? "#ccc" : "#2196f3", color: "#fff", cursor: counts[i] >= MAX_PER ? "default" : "pointer", width: "100%" }}
            >
              {counts[i] >= MAX_PER ? "✅ מלא" : "+ הוסף דוגמה"}
            </button>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", fontSize: 13, color: "#888", marginBottom: 8 }}>
        סה"כ דוגמאות: <strong>{total}</strong>
      </div>

      <FeedbackBar pct={acc} />

      <button onClick={reset} style={{ marginTop: 16, width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc", background: "#fff", cursor: "pointer", fontSize: 14 }}>
        🔄 התחל/י מחדש
      </button>
    </div>
  );
}
```

**הוראות אינטגרציה ל-LMS:**
- קומפוננטה standalone — ללא תלויות מעבר ל-React 18.
- גובה מינימלי: 480px.
- בסיום (acc ≥ 80): משדרת `window.dispatchEvent(new CustomEvent("trainingSimComplete"))`.
  ה-LMS מאזין ל-event זה לסימון SEE כ"הושלם".
