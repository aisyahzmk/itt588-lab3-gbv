# ITT588 Lab Work 3: Gender-Based Violence (GBV) Awareness Website

Subject: ITT588  
Topic: Gender-Based Violence in Malaysia  
Student: SITI AISYAH BINTI ZAMAKSYARI
ID STUDENT: 2026128783

---

## 1. Project Overview

This website is built for Lab 3 to raise awareness about Gender-Based Violence (GBV) in Malaysia. It explains the forms of violence, Malaysian laws, support hotlines, and authorized agencies.

The website uses HTML, CSS, and vanilla JavaScript without any external libraries.

---

## 2. Lab Requirements Checklist

All lab requirements are fulfilled:

| Requirement | Implementation | File |
| :--- | :--- | :--- |
| **1. JavaScript Framework / Vanilla** | Vanilla JavaScript (ES6+) with modular functions | `script.js` |
| **2. HTML Form** | Contact form with 5 inputs (name, email, topic, message, consent) | `index.html` (Line 607) |
| **3. PopUp Dialog** | HTML5 `<dialog>` for submission confirmation, quick exit, and OSCC info | `index.html` (Line 713) |
| **4. Output Method: `innerHTML`** | Displays submission results in the response box | `script.js` (Line 198) |
| **5. Output Method: `document.write()`** | Opens and prints the emergency pocket card | `script.js` (Line 289) |
| **6. Output Method: `window.alert()`** | Shows validation warnings when form fields are empty | `script.js` (Line 152) |
| **7. Output Method: `console`** | Logs data using `console.log()` and `console.table()` | `script.js` (Line 189) |
| **8. Operators** | Arithmetic, comparison, logical, ternary, nullish coalescing | `script.js` |
| **9. Control Statements** | `if...else` statements and `forEach` loops | `script.js` |
| **10. Event Loop** | `setInterval()` runs a live clock every second | `script.js` (Line 61) |
| **11. Date and Time** | Live Malaysian Standard Time (MST) clock and submit timestamps | `script.js` (Line 38) |

---

## 3. JavaScript Code Examples

### Four Output Methods

```javascript
// 1. innerHTML
output.innerHTML = `
  <div class="response-confirmed-card">
    <h4>Thank you, ${safeName}</h4>
    <p>Topic: ${safeTopic} • ${timeStr}</p>
    <div>"${safeMsg}"</div>
  </div>
`;

// 2. document.write()
const cardWin = window.open('', '_blank', 'width=780,height=850');
cardWin.document.open();
cardWin.document.write(cardHtml);
cardWin.document.close();

// 3. window.alert()
if (!topicVal) {
  window.alert('Notice: Please select a topic of inquiry before submitting.');
  return;
}

// 4. console.log and console.table
console.log('[FORM SUBMITTED] Contact message accepted.');
console.table({
  'Sender': safeName,
  'Topic': safeTopic,
  'Timestamp': timeStr
});
```

### Date, Time & Event Loop

```javascript
// Live Clock updating every second
function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-MY', {
    timeZone: 'Asia/Kuala_Lumpur',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
  });
  clockEl.textContent = timeStr;
}

// Event Loop: runs updateClock every 1000ms
setInterval(updateClock, 1000);
```

---

## 4. Lab 3 Implementation Screenshots

### 4.1 Output Method 1: innerHTML (Response Docket)
Output is displayed dynamically inside `#formOutput` without page reload.
![innerHTML Output](./screenshots/output-innerhtml.png)

### 4.2 Output Method 2: document.write() (Printable Pocket Card)
Opens a new window and uses `document.write()` to generate the printable crisis support card.
![document.write Output](./screenshots/output-document-write.png)

### 4.3 Output Method 3: window.alert() (Input Validation)
Pop-up alerts warn users when required fields are empty or invalid.
![window.alert Output](./screenshots/output-window-alert.png)

### 4.4 Output Method 4: Console (console.log & console.table)
Telemetry and structured form submissions logged in Developer Tools console.
![Console Output](./screenshots/output-console.png)

### 4.5 Date, Time & Event Loop (Live MST Clock)
Live Malaysian Standard Time (UTC+8) clock running via `setInterval()` and `Date` object.
![Live Clock and Event Loop](./screenshots/date-event-loop.png)

### 4.6 HTML Form & PopUp Dialog (<dialog>)
The contact inquiry form and the native HTML5 `<dialog>` confirmation modal.
![Form and Dialog](./screenshots/form-dialog.png)

---

## 5. Conclusion

This project successfully fulfills all the requirements for Lab Work 3. Through this lab, I learned how to:
- Structure a clean, responsive web page using semantic HTML5 and custom CSS.
- Handle user input using an HTML form and validate fields using JavaScript control statements.
- Use native pop-up dialogs with the HTML5 `<dialog>` API.
- Apply all four output methods (`innerHTML`, `document.write()`, `window.alert()`, and `console`).
- Work with dates, times, and the asynchronous event loop using `setInterval()`.

The website is fully functional, easy to navigate, and raises awareness on an important social issue in Malaysia.
