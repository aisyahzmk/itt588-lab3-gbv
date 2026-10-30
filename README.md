# 2503-ITT588 Lab Work 3: Gender-Based Violence (GBV) Awareness Portal (Malaysia)
> **Course:** ITT588 - Web Technology & Development  
> **Lab:** Lab Work 3 (JavaScript Essentials & DOM Manipulation)  
> **Topic:** Gender-Based Violence (GBV) in Malaysia  
> **Architecture:** Vanilla ES6+ Modular JavaScript, Semantic HTML5, Editorial CSS Design System  

---

## 📌 Executive Summary & Project Purpose

This project is an editorial-style digital awareness and crisis-intervention web portal dedicated to **Gender-Based Violence (GBV) in Malaysia**. Designed to communicate dignity, safety, and institutional authority, it aims to:
1. Educate the public on the 8 distinct forms of violence recognized by global and national frameworks.
2. Demystify statutory protections under Malaysian law (Act 521, Act 574, and Act 840).
3. Connect survivors directly with official enforcement agencies (PDRM D11, JKM, OSCC, TAGS) and verified 24/7 hotlines.
4. Demonstrate technical mastery of core JavaScript concepts (HTML forms, `<dialog>` modals, the 4 required output methods, date/time handling, event loops, and control flow).

---

## 🎯 Lab 3 Technical Compliance Matrix

This portal fulfills **100%** of the ITT588 Lab Work 3 rubric requirements. The table below outlines how and where each requirement is implemented:

| Lab Requirement | Implementation Details | Code Location |
| :--- | :--- | :--- |
| **1. JavaScript Framework / Architecture** | Vanilla ES6+ Modular Event-Driven Architecture (framework-free, zero-dependency, clean separation of concerns). | [`script.js`](./script.js) |
| **2. HTML Form** | `#contactForm` with 5 input fields (Name, Email, Topic Dropdown, Message Textarea, Consent Checkbox) and front-end validation. | [`index.html#L607-L646`](./index.html) |
| **3. PopUp Dialog (`<dialog>`)** | 3 Native HTML5 dialogs managed via `.showModal()` & `.close()` (`#dlgConfirm` for form confirmation, `#dlgExit` for ESC emergency exit, `#dlgOscc` for hospital protocol). | [`index.html#L713-L766`](./index.html) & [`script.js#L214`](./script.js) |
| **4. Output Method: `innerHTML`** | Dynamically generates a verified response docket inside `#formOutput` upon successful form submission without reloading the page. | [`script.js#L198`](./script.js) |
| **5. Output Method: `document.write()`** | Opens a separate window to write and render the standalone **Printable Pocket Emergency Card**. | [`script.js#L289`](./script.js) |
| **6. Output Method: `window.alert()`** | Displays browser alert dialogs when required inputs are invalid, blank, or when popup blockers are detected. | [`script.js#L152, L158, L164, L170, L237`](./script.js) |
| **7. Output Method: `console`** | Uses `console.log()` (telemetry), `console.table()` (structured form payload), `console.warn()` (validation alerts), and `console.info()` (init status). | [`script.js#L64, L153, L189, L190, L292`](./script.js) |
| **8. Operators** | Arithmetic (`+`), Comparison (`===`, `!==`, `<`, `>`), Logical (`&&`, `||`, `!`), Ternary (`? :`), and Nullish Coalescing (`??`). | [`script.js#L140-L186`](./script.js) |
| **9. Control Statements** | `if...else` input validation conditionals, `return` execution guards, and `forEach` loops for nav and tab switching. | [`script.js#L150-L173, L346-L361`](./script.js) |
| **10. Event Loop & Timers** | `setInterval(update, 1000)` running a live 1-second clock loop on the JavaScript Event Loop, plus asynchronous event callbacks. | [`script.js#L61`](./script.js) |
| **11. Date & Time Handling** | `new Date()` combined with `toLocaleTimeString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' })` and `toLocaleDateString()` for live Malaysian Standard Time (MST) and submission timestamps. | [`script.js#L38-L57, L181-L186`](./script.js) |

---

## 💻 Deep-Dive: JavaScript Implementation Highlights

### 1. The Four (4) Output Methods
```javascript
// Method 1: innerHTML (Dynamically updates response docket)
output.innerHTML = `
  <div class="response-confirmed-card">
    <h4>Thank you, ${safeName}</h4>
    <p>Topic: ${safeTopic} &bull; ${timeStr}</p>
    <div>"${safeMsg}"</div>
  </div>
`;

// Method 2: document.write() (Generates emergency pocket card)
const cardWin = window.open('', '_blank', 'width=780,height=850');
cardWin.document.open();
cardWin.document.write(cardHtml);
cardWin.document.close();

// Method 3: window.alert() (Validation dialog alerts)
if (!topicVal) {
  window.alert('Notice: Please select a topic of inquiry before submitting.');
  return;
}

// Method 4: console methods (Telemetry & Structured Data)
console.log('[FORM SUBMITTED] Contact message accepted.');
console.table({ 'Sender': safeName, 'Topic': safeTopic, 'Timestamp': timeStr });
```

### 2. Operators & Control Flow
```javascript
// Nullish coalescing (??) & Optional chaining (?.)
const nameVal = document.getElementById('fname')?.value.trim() ?? '';

// Ternary operator (? :)
const displayName = nameVal !== '' ? nameVal : 'Anonymous Contributor';

// Multi-condition validation using logical AND/OR/NOT (&&, ||, !)
if (!msgVal || msgVal.length < 5) {
  window.alert('Notice: Please write a message of at least 5 characters.');
  console.warn('[VALIDATION] Message too short.');
  return;
}
```

### 3. Date, Time & Event Loop
```javascript
// Live Malaysian Standard Time (MST / UTC+8)
function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-MY', {
    timeZone: 'Asia/Kuala_Lumpur',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
  });
  clockEl.textContent = timeStr;
}

// Event Loop: Recurring 1-second Macrotask
setInterval(updateClock, 1000);
```

---

## 🎨 UI/UX & Editorial Pastel Aesthetics

Unlike stereotypical AI-generated templates with generic cards and saturated colors, this portal features a bespoke editorial design system:

* **Warm Ivory Backgrounds:** `#FAF6F0` and `#FFFDF9` to ensure soft, glare-free readability.
* **Soft Lavender Accents:** `#E4DFEE` and `#F0EDF6` for calm, trustworthy navigation.
* **Dusty Blush Tints:** `#F4DFE7` and `#FAF0F4` for empathetic callouts.
* **Deep Plum Headings:** `#39253E` and `#241528` for dignified visual contrast.
* **Typography Pairing:**
  * **Headings:** `Playfair Display` (Expressive, formal serif)
  * **Body:** `DM Sans` (Clean, highly legible modern sans-serif)
* **Interactive Environments:** A tabbed situational switcher (*Behind Closed Doors*, *Workplace & Campus*, *Phone & Social Media*, *Finances & Family Pressures*) avoiding cluttered walls of text and fitting desktop screen heights seamlessly.

---

## 📂 Project Directory Structure

```text
itt588-lab3-gbv-malaysia/
├── index.html        # Semantic HTML5 document (Nav, Sections, Form, Dialogs)
├── style.css         # Complete editorial CSS design system & responsive queries
├── script.js         # Modular JavaScript engine (100% vanilla ES6+)
└── README.md         # Full documentation & Lab 3 grading article
```

---

## 🚀 How to Run Locally

1. Clone or download this repository.
2. Open `index.html` in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari).
3. Press **F12** (or Right-Click → *Inspect*) to open the **Console tab** and observe:
   * System initialization timestamps.
   * Structured `console.table()` outputs upon submitting the inquiry form.
   * Validation warnings (`console.warn()`).
4. Test the **Pocket Reference Card** by clicking **"Download & Print Card"** in the hotlines section to see `document.write()` in action.
5. Test the **Quick Exit** feature by clicking the red button in the top bar or pressing the **ESC** key.

---

## 🌐 Publishing to GitHub Pages (Live Demonstration)

To host this website for free and share the live link with your lecturer:
1. Initialize git and push to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "feat: complete ITT588 Lab 3 GBV Malaysia awareness portal"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```
2. In your GitHub repository, navigate to **Settings** → **Pages**.
3. Under **Build and deployment** → **Branch**, select `main` and `/ (root)`, then click **Save**.
4. In 1–2 minutes, your website will be live at:  
   `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`

---

## ⚖️ Disclaimer & Educational Notice

This platform is created solely for **academic demonstration in course ITT588**. All legal summaries regarding Malaysian statutes (Act 521, Act 574, Act 840) and crisis hotlines (PDRM 999, Talian Kasih 15999, OSCC, WAO, AWAM, Befrienders) reflect public institutional information.
