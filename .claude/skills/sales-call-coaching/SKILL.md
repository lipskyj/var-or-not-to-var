---
name: sales-call-coaching
description: End-to-end coaching report on Kala Yoga sales calls (rep נעמה מזרחי). Finds recordings in Google Drive, transcribes them with ivrit-ai Whisper and speaker separation (in a cloud session or on the user's PC), writes a transcript doc with an analysis section for each call, appends rows to the tracking sheet, builds the summary analysis doc and a Google Slides deck, and emails שני. Use when asked to transcribe or analyze sales calls, run the weekly sales-call report, or rebuild the analysis from the beginning.
---

# Sales-call coaching – end-to-end flow

Kala Yoga is a yoga teacher-training school. נעמה מזרחי runs admissions and sales calls. Every two weeks she gets one **focus point** (נקודת עבודה) to practise. This flow checks each call against that point and reports to שני, the school director.

**Language:** everything the user or שני sees (docs, sheet, slides, email) is in Hebrew, right-to-left. These instructions are in English.

## 0. Before starting

1. **Know where you are running.**
   - **Cloud session** (Linux container, this repo checked out): transcription uses `scripts/` in this skill folder (§3–4 "Cloud").
   - **User's Windows PC** (Claude desktop app, paths like `C:\Users\lipsk`): transcription uses the local toolchain (§3–4 "PC").
2. **Read context:**
   - PC only: `C:\Users\lipsk\.claude\projects\C--Users-lipsk-Downloads\memory\sales-call-transcription.md` (toolchain, history, pitfalls) and `C:\Users\lipsk\tools\whisper\analysis-prompt.md` (analysis rules and the current focus point). If they disagree with this file on the focus point, `analysis-prompt.md` wins.
   - Cloud: this file is the source of truth. If `analysis-prompt.md` has a newer focus point, the user must tell you or update §6.
3. **Check connectors.** This flow needs **Google Drive, Google Docs, Google Sheets, Google Slides and Gmail**. If any is missing in this chat, stop and tell the user which one. Connectors added mid-chat only appear in a new chat.
4. **Choose the mode** (ask if the request is unclear):
   - `watch`: the on-demand trigger, run several times a day by a routine. Process every **new** recording in the current and previous month folders (§1, "Month folders"): transcribe, write the doc and analysis, add the sheet row. **No deck, no email.** If nothing is new, end quietly with one line.
   - `weekly`: the weekly report. First run `watch` (to catch anything not yet processed). Then build the deck and email from **every call whose "דווח לשני" cell is empty** (§7). This covers calls from any week that were never reported. This is the default for the scheduled Sunday run.
   - `backfill`: every month folder from the start date the user gives (e.g. "from September"). It covers every recording that has no transcript doc yet.
   - `rebuild`: like `backfill`, but re-run the analysis, sheet rows, analysis doc and deck even for calls that already have a transcript. Never re-transcribe a call that already has a doc unless the user says so.
5. **Sending:** in `weekly` (scheduled) mode, send the email. In `backfill` and `rebuild`, show the user a short summary, create a **Gmail draft**, and send only after the user confirms.

## 1. Fixed locations (Google Drive)

| What | ID |
|---|---|
| Sales-call recordings root "שיחת מכירה" (one subfolder per month) | `1G5Uod0lUKSlNK-otEp9IVym2JjoaH8nK` |
| …/ספטמבר | `1bEOA5xdYylRH5u153Op1T-gEkzsQBAOD` |
| …/אוקטובר | `1DQTJjU2AKXBtmSRVy4mmfEpIyXFdt2Vi` |
| Management folder "ניהול מכירות 2026" (shared with שני) | `1V1EMp3hcdz5LjmikvBj3XNNOPPx_j0OK` |
| Tracking sheet "מעקב שיחות מכירה – ניתוח" (tab `Untitled`) | `1t0Jq4KsVMD778I792bWwbKfSo4f3Xl1rABULaSe1xFA` |
| Summary analysis doc "שיחות מכירה – ניתוח ספטמבר–אוקטובר 2026" | `1Og38ExcW9kAOsqqEfop5m6f5q38aeu0ufeeOj_YEP7k` |
| Deck "שיחות מכירה – למה דווקא קורס מורים?" | `1tnlSTj4BnoEs4EfC4pFTvqob4hzcf3G-rnTB7IV-PsY` |

- **Month folders.** Each month is a subfolder of the root, named with the Hebrew month name: ינואר, פברואר, מרץ, אפריל, מאי, יוני, יולי, אוגוסט, ספטמבר, אוקטובר, נובמבר, דצמבר.
  1. List the root's subfolders (`search_files`, `parentId = '1G5Uod0lUKSlNK-otEp9IVym2JjoaH8nK'`, `mimeType = 'application/vnd.google-apps.folder'`).
  2. Pick the folders for the **current** month and the **previous** month, using Israel time (Asia/Jerusalem).
  3. When the office opens a new month folder (e.g. נובמבר), it is picked up automatically on the next run. If the current month's folder doesn't exist yet, just use the previous month.
  4. Loose files at the root (e.g. "4.5 רעות פילרסדורף") are old and out of scope.
- **Out of scope:** the sibling folder "שיחה ראשונה" (`1Lgrddg8f7t1GG8as94v23keKqaf2p5Ne`) holds first-contact calls. Don't touch it unless asked.
- **Recipient:** שני, `shani@kalayoga.co.il`, and nobody else.

## 2. Inventory: what needs doing

For each month folder in scope:

1. List all files with `search_files` (`parentId = '<month id>'`, `pageSize` 100, paginate until empty).
2. A recording is an audio or video file (`video/mp4`, `audio/*`). Its transcript is a Google Doc in the same folder with the same title (without the extension).
3. **Duplicates:** if two recordings have the **same `fileSize`**, they are the same recording uploaded twice under different names. Known case: "10.9 הדר ברגשטיין" and "10.9 ליאל טיסקר" are the same file, and the call is **ליאל טיסקר**. For any new duplicate, transcribe it once. Use the name the customer is called by in the recording, mention the duplicate in the doc header note, and tell the user.
   - If a call exists both as mp4 and as an audio copy (same title), it is one call. In the cloud, use the audio copy.
4. If the customer's name in the recording differs from the file name, flag it in the doc and in the email. Don't silently rename.
5. **Cloud only:** recordings over **10 MB** can't be downloaded here (connector limit, and the Drive web hosts are blocked). Never skip them silently.
   - Add a **pending row** for them in the sheet (§7).
   - Continue with the rest.
   - The same goes for every recording when the ivrit-ai model can't be loaded (setup exit code 2).
6. **New** means: a recording with no transcript doc of the same title **and** no row in the sheet (a pending row counts as "known"). A pending row is retried on every run. When it finally succeeds, replace the pending row with the full row.
7. Show the user the list (to transcribe / already done / duplicates / too big for the cloud) before starting long work in `backfill` or `rebuild` mode.

## 3. Download

### Cloud

1. Call the Drive connector's `download_file_content` with the file ID. The result is too large to show, so it is saved to a tool-results file; the error message gives the path.
2. Decode it, checking the size against Drive's `fileSize`:
   `python3 .claude/skills/sales-call-coaching/scripts/drive_to_file.py <tool-result path> /tmp/calls/<month>/<title>.<ext> --expect-size <fileSize>`
3. If the connector refuses (over 10 MB), don't look for a workaround. Report it per §2.5.

### PC (built-in browser – avoids the 10 MB connector limit)

The Drive connector can't download files over 10 MB, and recordings are 10–18 MB. Use the built-in browser pane, which is signed in to Google:

1. Navigate to `https://drive.google.com/uc?export=download&id=<fileId>`. The navigate call usually reports "denied or failed", but the file still lands in `C:\Users\lipsk\Downloads`, often with a garbled or `.tmp` name.
2. Match each downloaded file to its Drive file **by exact byte size**.
3. Move and rename it to `C:\Users\lipsk\Downloads\recordings\<month>\<Drive title>.mp4`.
4. Download one or two files at a time and verify each one before the next.

## 4. Transcribe (ivrit-ai Whisper + speaker separation)

**Don't swap the model.** If the ivrit-ai model can't be loaded, stop and tell the user. A generic Whisper model is too weak for verbatim Hebrew quotes (tested: it drops letters and produces junk segments).

### Cloud

1. Once per session: `bash .claude/skills/sales-call-coaching/scripts/setup.sh`.
   - It installs faster-whisper and sherpa-onnx, downloads the speaker-separation models from GitHub, and downloads `ivrit-ai/whisper-large-v3-turbo-ct2` from Hugging Face.
   - Exit code 2 means huggingface.co is blocked. Tell the user to add `huggingface.co` under Allowed domains in the environment's Network access settings, then start a new session. Stop there.
2. For each call, run in the background (a 30-minute call takes very roughly 20–40 minutes on CPU):
   `python3 .claude/skills/sales-call-coaching/scripts/transcribe.py /tmp/calls/<month>/<file> /tmp/calls/<month>/out`
3. Output: `<name>.speakers.txt` (`[mm:ss] SPEAKER_00: text` per turn) and `<name>.srt`. Decide which speaker is נעמה by content (she introduces the school and asks the questions).
4. Work through calls one at a time: transcribe → doc → sheet row. Finished calls are then saved even if the session ends midway.

### PC

```bash
bash /c/Users/lipsk/tools/whisper/batch.sh /c/Users/lipsk/Downloads/recordings/<month> /c/Users/lipsk/Downloads/transcripts/<month>
```

- Run it in the background. It takes about 20–25 minutes per call, and skips calls that already have a `.speakers.txt`.
- Output per call: `<name>.speakers.txt` (speaker_00/speaker_01 with timestamps) and `<name>.srt`.
- If speaker separation found very few turns, assign speakers from the `.srt` by content.

## 5. Transcript doc (one per call)

Create it with the Drive connector's `create_file`, `contentMimeType: text/html`, `parentId` = the month folder, title = recording title, and `dir="rtl"` on every element. It converts to a Google Doc.

**Structure:**

1. `<h1>תמלול שיחת מכירה – <title></h1>`
2. **הקלטה:** <title> (שיחת מכירה / <month>) · **אורך:** mm:ss · **משתתפות:** נעמה מזרחי (נציגת מכירות), <customer full name> (מתעניינת)
3. An italic note:
   - "התמלול נעשה אוטומטית (Whisper ivrit-ai + הפרדת דוברים). ייתכנו טעויות זיהוי מילים, ובעיקר בתגובות קצרות כמו "כן" או "אוקיי" שיוך הדוברת עשוי להיות לא מדויק. הזמנים בסוגריים הם מתחילת ההקלטה. קטעים שלא נשמעו בבירור מסומנים [לא ברור]."
   - Add a sentence for anything redacted, a name mismatch, a duplicate upload, or a recording that starts mid-call.
4. A horizontal rule (`<hr>`), then the dialogue:
   - One paragraph per turn: **[mm:ss] נעמה:** text / **[mm:ss] <customer first name>:** text. Timestamps are needed only on substantive turns.
   - Clean filler lightly, split merged short replies, and fix only obvious mis-hearings.
   - Never invent words. Mark unclear audio [לא ברור], and a guess as [כנראה: …].
   - **Redact:** ID numbers, home addresses, bank or card details, and personal medical details. Replace them with [… הושמט].
5. `<hr>`, then the **analysis section** (format in §6).

## 6. Analysis section (per call)

Follow `analysis-prompt.md`. Current focus point (as of 2026-10-11): **"לשאול 'למה דווקא קורס מורים?'"**

```
<h2>ניתוח – נקודת עבודה: לשאול "למה דווקא קורס מורים?"</h2>
<p><i>הרגע: המתעניינת אמרה שהיא לא מתכוונת ללמד, או שהיא לא בטוחה שתרצה ללמד (כולל מי שמדברת רק על העמקה בתרגול שלה ולא על הוראה). הניתוח מבוסס רק על התמלול.</i></p>
<p><b>שאלה 1 – האם הרגע קרה?</b> כן / לא / לא בטוח. <one or two sentences why></p>
<p>ציטוט: <b>מתעניינת [mm:ss]:</b> "…" <b>נעמה [mm:ss]:</b> "…"</p>
```

- If Q1 is **לא**: add one or two quotes showing that she does want to teach, then a final bold line **לא רלוונטית.** and stop.
- If Q1 is **כן** or **לא בטוח**, also answer:
  - **שאלה 2 – האם נעמה שאלה למה דווקא קורס מורים? ובאיזה טון?** Did she ask, when (before or after the moment), and with what wording? Was it open and curious, or closed with a suggested answer or a yes/no question, or did it sound judgmental? Give quotes.
  - **שאלה 3 – האם נעמה נתנה למתעניינת לענות עד הסוף?** כן / חלקית / לא. Split the answer into "כן: …", "לא – השלמה במקומה: …" and "לא – מעבר לנושא אחר: …", each with quotes.
- **Rules:**
  - Quotes are verbatim, with timestamps, showing both what the customer said and what נעמה answered.
  - Write **לא בטוח** plus the reason whenever unsure, including uncertain speaker attribution.
  - No summary, no score, nothing about whether she enrolled, and no advice inside the per-call analysis.
- **Adding an analysis to an existing doc** (`rebuild`, or a transcript that has none):
  1. Call `read_doc`. The result is large and is saved to a file, so parse it with python and take `body.content[-1].endIndex`.
  2. Call `update_doc` with `insertText` at `endIndex-1`, starting with `\n`.
  3. Then `updateParagraphStyle` the inserted range to `NORMAL_TEXT` and `RIGHT_TO_LEFT`, the heading paragraph to `HEADING_2`, and the intro to italic. Set bold on the labels.
  4. Compute indices in UTF-16 code units.

## 7. Tracking sheet

Append one row per call to `Untitled!A1` with `append_values`. Formulas are evaluated.

| חודש | שם הקובץ | תמלול | הקלטה | נקודת עבודה | הרגע קרה? | שאלה 1 | שאלה 2 | שאלה 3 | חזרה נקודה קודמת? |
|---|---|---|---|---|---|---|---|---|---|
| ספטמבר | 17.9 פלורה פאראן | `=HYPERLINK("https://docs.google.com/document/d/<docId>/edit","תמלול")` | `=HYPERLINK("https://drive.google.com/file/d/<mp4Id>/view","הקלטה")` | למה דווקא קורס מורים? | כן / לא / לא בטוח | short answer + (mm:ss) | short answer or – | short answer or – | לא בטוח – הנקודה הקודמת לא הוגדרה (until a previous point exists) |

- **Column K "דווח לשני":** the date (dd.mm.yyyy) the call was included in an email to שני. Leave it empty when adding a row. The weekly report fills it (§11). An empty K means the call goes into the next report.
- **Pending rows** (call known but not yet transcribed): fill A–E as usual and D = recording link, C = "–", F = "ממתין לתמלול", G = the reason (e.g. "הקובץ גדול מ-10MB – צריך את המחשב או עותק אודיו", or "אין גישה למודל התמלול (huggingface.co חסום)"), H–J = "–", K empty.
- Rows are ordered newest first. Append at the bottom unless the user asks to re-sort.
- Before appending, read the sheet and **skip calls that already have a row**. In `rebuild`, update the existing row in place with `update_values`.
- PC only: also append any rows waiting in `C:\Users\lipsk\tools\whisper\pending-sheet-rows.csv`, then empty that file.

## 7a. Which calls go into a report

- `weekly`: **all rows with K empty and F ≠ "ממתין לתמלול"**, from any month. That includes calls from earlier weeks that were missed. This is the "not shown yet → next week" rule.
- Pending rows are not analysed. Mention them in the email as a short list: "שיחות שממתינות לתמלול: …". Leave their K empty so they're picked up once transcribed.
- If no rows qualify and none are pending, send the one-line "no new calls" note.

## 8. Summary analysis doc

Update the existing summary doc (or, if the period changed, create a new one in "ניהול מכירות 2026" with the same structure). It covers **all calls analysed for the current focus point**:

1. Title and subtitle (period); the focus point; an italic note (number of calls, automatic transcript, timestamps, link to the sheet).
2. **בקצרה:** calls analysed (by month), how many had the moment (name them; borderline cases separately), and how many times נעמה asked "למה" after the moment.
3. **2–4 insights:** one recurring pattern each, with 2 quoted exchanges (who, date, timestamp) and an italic "impact" line.
4. **מה כבר עובד:** 2–3 examples where נעמה asked an open "why" and got a full answer.
5. **שיחה אחר שיחה:** a table with columns שיחה | הרגע קרה? | שאלה "למה"? | נתנה לענות עד הסוף?, plus footnotes (partial recording, duplicate files, name mismatch).
6. **לשבועיים הקרובים – הצעה לתרגול:** 2–3 steps, labelled as a recommendation, not analysis.

The easiest way to write it is to rebuild the whole doc from HTML with `create_file`, then trash the old version only after the user confirms. Or edit it in place with `replaceAllText` for small fixes.

## 9. Deck (Google Slides)

- **Weekly mode:** create a new deck titled "שיחות מכירה – דוח שבועי <dd.mm.yyyy>" in "ניהול מכירות 2026".
- **Backfill/rebuild:** update or recreate "שיחות מכירה – למה דווקא קורס מורים?".

**Slides:**
1. Title (terracotta full-bleed): title, period, focus point, footnote.
2. Key numbers: 3 cards (calls / had the moment / asked "why" after the moment), plus one line on the rest.
3–5. One insight per slide: a headline, a one-line lead, two quote boxes side by side (right box = first example), and an italic impact line.
6. What's working: 3 cards.
7. Call-by-call table, with the rows that had the moment highlighted.
8. Practice suggestions: 3 numbered steps and a footer note ("ההצעות הן המלצה, לא חלק מהניתוח").

**Style:** 720×405 pt; Rubik font.
- Background `#FBF7F2`
- Accent (terracotta) `#B5543C`
- Text `#2B2B2B`
- Muted `#6B6661`
- Card `#F4EAE2`
- A 20pt terracotta strip on the right edge of content slides.

**How to build it (lessons learned):**
1. Create the presentation with Drive `create_file`, `contentMimeType: application/vnd.google-apps.presentation`, and the folder as parent. Then fill it with Slides `update_presentation`.
2. Generate the batchUpdate JSON with a local python script, then send **one slide per call** (about 10–30 KB each). Delete the default slide `p` in the last call.
3. Object IDs must be **5–50 characters**. Prefix them, e.g. `kala_s1`, `kala_t12`.
4. For RTL text, use `updateParagraphStyle` with `direction: RIGHT_TO_LEFT` and `alignment: START`. START means right-aligned in RTL; END would put the text on the left.
5. Tables: create them with `createTable`, then for each cell `insertText`, `updateTextStyle` and `updateParagraphStyle` (RTL, START). Put the first logical column in the **last** `columnIndex` so it shows on the right.
6. Text ranges use `FIXED_RANGE` in UTF-16 units.
7. Don't try to upload a .pptx as base64. It's too large and easily corrupted.
8. Check the slide list afterwards with `read_presentation` (`fields: ["slides.objectId"]`).

## 10. Email to שני

Gmail, to `shani@kalayoga.co.il` only, HTML body with `dir="rtl"`, plus a plain-text `body` fallback.

- **Weekly subject:** "דוח שיחות מכירה שבועי – <dd.mm.yyyy>". **Backfill subject:** "שיחות מכירה – <focus point> (ניתוח <period>)".
- **Body:**
  - A greeting.
  - What was analysed (number of calls, period).
  - A deck link (bold).
  - **בקצרה:** 3–4 bullets.
  - A mention of the practice slide.
  - Links to the summary doc and the sheet.
  - Links to each new transcript (weekly).
  - Corrections to anything sent earlier (e.g. "תיקון: השיחה של 10.9 היא עם ליאל טיסקר ולא עם הדר").
  - A grey line noting that transcripts are automatic and timestamped.
- **If there are no new calls this week:** send a one-line note saying so.
- Check that שני already has access through the folder (`get_file_permissions`). Share with her as `writer` only if she's missing.

## 11. Finish

1. Record progress. **The tracking sheet is the source of truth** for which calls are done, pending and reported, so routine runs don't need to write anything else. On the PC, also update the memory file. Record there:
   - Calls done (date + name).
   - Duplicates and name fixes.
   - Links to the deck and summary doc.
   - Anything pending (e.g. a connector that was missing).
2. If the user set a new focus point in `analysis-prompt.md`:
   - Move the old point to "Previous points".
   - From then on, fill "חזרה נקודה קודמת?" by checking the previous point too.
   - Start a new summary doc and deck for the new point.
3. **After the email was sent** (weekly): write today's date (dd.mm.yyyy) into column K of every row included in it. Do this only after `send_message` succeeds, so a failed send doesn't hide calls from the next report.
4. Report in a few lines: what was transcribed, what is pending and why, and the links. In a routine run, put this in the final message so it shows in the notification.

## Known history (as of 2026-10-13)

- **Reported to שני on 11.10** (K = 11.10.2026):
  - October: 5.10 ליטל, 5.10 עמית, 6.10 יוליה, 6.10 אביגיל.
  - September: 10.9 ליאל (file also named "10.9 הדר ברגשטיין"), 17.9 פלורה, 27.9 עינאל, 28.9 יסמין, 30.9 אגם (start of the call not recorded).
- **New in October, not yet transcribed (as of 13.10):** 12.10 גפן צהר (17.5 MB), 12.10 שיר אבנעים (14.1 MB), 13.10 גילי גיל (12.3 MB).
- **Not yet transcribed (שיחת מכירה › ספטמבר):** 2.9 עדי רודן, 3.9 מעיין נחמני, 7.9 ניר ישראל, 7.9 שיר שמש, 9.9 הדר ברגשטיין (probably הדר's real call), 10.9 איילת שחר, 14.9 אורית מירזאי, 17.9 אלה סיפלינגר, 17.9 אביגיל כותב אמת, 23.9 שיר יעקב, 24.9 מוריה גרינפלד, 24.9 רותם בדיחי.
  - September is the previous month only until 31.10, so `watch` stops seeing it in November. Process it with `backfill` before then.
- All the recordings above are mp4s of 10–18 MB, so they can't be downloaded in the cloud. Transcribe them on the PC, or ask the office to upload audio copies under 10 MB.
- The 11.10 email named "הדר" among the good examples. The next email should say it was ליאל.
- **Scheduled task (PC):** `weekly-sales-call-coaching-report` (Sundays 07:00) duplicates the cloud weekly routine. Keep only one of them, or שני gets two emails.
- **Cloud status:** speaker separation and the Drive download were tested in a cloud session on 12.10. The ivrit-ai model was not, because huggingface.co was still blocked. The first cloud run that can transcribe should do one call and have the user spot-check it.
