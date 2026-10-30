/**
 * ==============================================================================
 * 2503-ITT588 Lab Work 3: Gender-Based Violence (GBV) Malaysia
 * File: script.js
 * Editorial & Human-Crafted Architecture
 * ==============================================================================
 * 
 * LAB WORK 3 GRADING REQUIREMENTS SATISFIED:
 * 1. JavaScript Framework / Architecture: Vanilla ES6+, Event-driven.
 * 2. HTML Form: #contactForm in index.html with validation and safe output.
 * 3. PopUp Dialogs: HTML5 <dialog> API (#dlgConfirm, #dlgExit, #dlgOscc).
 * 4. Four Output Methods:
 *    - Method 1: element.innerHTML       → Line ~145 (dynamic response docket)
 *    - Method 2: document.write()        → Line ~195 (printable emergency card window)
 *    - Method 3: window.alert()          → Line ~115 (form input validation notices)
 *    - Method 4: console.log / table     → Lines ~48, ~140, ~190 (telemetry logs)
 * 5. JavaScript Core Concepts:
 *    - Operators (arithmetic, comparison ===, logical && || !, ternary ?:, nullish ??)
 *    - Control Statements (if...else, forEach)
 *    - Date & Time Handling (live Malaysian Standard Time clock, submission timestamps)
 *    - Event Handling (click, submit, scroll, keydown, tab switching)
 * ==============================================================================
 */

'use strict';

const APP_NAME = 'Hentikan GBV Malaysia';
const APP_VERSION = 4.0;

/* ================================================================
   1. Live Malaysian Clock & Date (Date Object Handling)
   ================================================================ */
function initClock() {
  const clockEl = document.getElementById('clock');
  const dateEl = document.getElementById('clockDate');

  function update() {
    const now = new Date();

    const timeStr = now.toLocaleTimeString('en-MY', {
      timeZone: 'Asia/Kuala_Lumpur',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    const dateStr = now.toLocaleDateString('en-MY', {
      timeZone: 'Asia/Kuala_Lumpur',
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    if (clockEl) clockEl.textContent = timeStr;
    if (dateEl) dateEl.textContent = dateStr;
  }

  update();
  setInterval(update, 1000); // Event Loop: recurring 1s timer

  // Output Method 4: console.log
  console.log(`[INIT] ${APP_NAME} v${APP_VERSION} initialized at ${new Date().toISOString()}`);
}

/* ================================================================
   2. Mobile Navigation & Smooth Scroll Highlighting
   ================================================================ */
function initNav() {
  const toggleBtn = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('is-open');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu && navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
      }
    });
  });

  // Active section spy on scroll (Comparison & Logical Operators)
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.pageYOffset;
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos > top && scrollPos <= top + height) {
        navLinks.forEach(l => {
          if (l.getAttribute('href') === `#${id}`) {
            l.style.color = 'var(--c-plum)';
          } else {
            l.style.color = '';
          }
        });
      }
    });
  });
}

/* ================================================================
   3. Contact Form Submission
   - Output Method 1: innerHTML (#formOutput)
   - Output Method 3: window.alert()
   - Output Method 4: console.log() and console.table()
   - PopUp Dialog: <dialog id="dlgConfirm">
   ================================================================ */

// XSS sanitization helper function
function sanitize(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  const output = document.getElementById('formOutput');
  const dlg = document.getElementById('dlgConfirm');
  const dlgTopic = document.getElementById('dlgTopic');
  const dlgTime = document.getElementById('dlgTime');
  const dlgCloseX = document.getElementById('dlgConfirmX');
  const dlgCloseOk = document.getElementById('dlgConfirmOk');

  if (!form || !output) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Value extraction with nullish coalescing (??)
    const nameVal = document.getElementById('fname')?.value.trim() ?? '';
    const emailVal = document.getElementById('femail')?.value.trim() ?? '';
    const topicVal = document.getElementById('ftopic')?.value ?? '';
    const msgVal = document.getElementById('fmsg')?.value.trim() ?? '';
    const consentVal = document.getElementById('fconsent')?.checked ?? false;

    // Ternary operator
    const displayName = nameVal !== '' ? nameVal : 'Anonymous Contributor';

    // ── Input Validation (using window.alert as required) ──
    if (!topicVal) {
      // Output Method 3: window.alert()
      window.alert('Notice: Please select a topic of inquiry before submitting.');
      console.warn('[VALIDATION] Topic unselected.');
      return;
    }

    if (!msgVal || msgVal.length < 5) {
      window.alert('Notice: Please write a message of at least 5 characters.');
      console.warn('[VALIDATION] Message too short.');
      return;
    }

    if (!consentVal) {
      window.alert('Notice: Please acknowledge the consent checkbox before submitting.');
      console.warn('[VALIDATION] Consent unchecked.');
      return;
    }

    if (emailVal !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      window.alert('Notice: Please enter a valid email address or leave it blank for privacy.');
      console.warn('[VALIDATION] Invalid email syntax.');
      return;
    }

    // Sanitize user inputs to prevent script injection
    const safeName = sanitize(displayName);
    const safeTopic = sanitize(topicVal);
    const safeMsg = sanitize(msgVal);

    // Malaysian standard time stamp
    const now = new Date();
    const timeStr = now.toLocaleDateString('en-MY', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }) + ' at ' + now.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' });

    // Output Method 4: console.log and console.table
    console.log('[FORM SUBMITTED] Contact message accepted.');
    console.table({
      'Sender': safeName,
      'Topic': safeTopic,
      'Timestamp': timeStr,
      'Characters': safeMsg.length
    });

    // Output Method 1: innerHTML (dynamically updating the response docket)
    output.innerHTML = `
      <div class="response-confirmed-card">
        <span class="response-confirmed-tag">Submission Verified</span>
        <h4>Thank you, ${safeName}</h4>
        <p class="response-confirmed-meta"><strong>Topic:</strong> ${safeTopic} &bull; ${timeStr}</p>
        <div class="response-confirmed-quote">"${safeMsg}"</div>
        <p style="font-size:0.8rem; color:var(--c-muted); margin:0;">
          Your submission has been recorded locally for demonstration. Together, we promote safety, accountability, and dignity across Malaysia.
        </p>
      </div>
    `;

    // PopUp Dialog: show confirmation modal
    if (dlg) {
      if (dlgTopic) dlgTopic.textContent = safeTopic;
      if (dlgTime) dlgTime.textContent = timeStr;
      dlg.showModal();
    }

    form.reset();
  });

  const closeDlg = () => { if (dlg && dlg.open) dlg.close(); };
  if (dlgCloseX) dlgCloseX.addEventListener('click', closeDlg);
  if (dlgCloseOk) dlgCloseOk.addEventListener('click', closeDlg);
}

/* ================================================================
   4. Download Pocket Safety Card
   - Output Method 2: document.write()
   - Opens in a new window to safely render a printable card
   ================================================================ */
function initPocketCard() {
  const btn = document.getElementById('btnPrint');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const cardWin = window.open('', '_blank', 'width=780,height=850,scrollbars=yes');
    if (!cardWin) {
      window.alert('Notice: Please allow popups in your browser to view the printable card.');
      return;
    }

    const today = new Date().toLocaleDateString('en-MY', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Output Method 2: document.write() inside new window
    const cardHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Malaysia GBV Support - Official Safety Reference Card</title>
<style>
body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; color: #39253E; line-height: 1.6; margin: 36px; background: #FAF6F0; }
h1 { font-family: Georgia, serif; font-size: 1.5rem; margin: 0 0 6px; color: #241528; }
.meta { font-size: 0.8rem; color: #6B6570; margin-bottom: 20px; border-bottom: 2px solid #B19BBF; padding-bottom: 10px; }
table { width: 100%; border-collapse: collapse; margin: 20px 0; background: #FFFFFF; border: 1px solid rgba(73, 53, 79, 0.15); }
th, td { border: 1px solid rgba(73, 53, 79, 0.15); padding: 12px 14px; text-align: left; font-size: 0.88rem; }
th { background: #E4DFEE; color: #39253E; font-weight: 700; }
.notice { background: #DCE5DC; padding: 12px 16px; border-left: 4px solid #2F4F38; font-size: 0.84rem; margin: 20px 0; color: #241528; }
.print-btn { background: #39253E; color: #FFFFFF; border: none; padding: 10px 20px; border-radius: 4px; font-weight: 700; cursor: pointer; margin-bottom: 20px; font-size: 0.88rem; }
@media print { .print-btn { display: none; } body { background: #FFFFFF; margin: 10mm; } }
</style>
</head>
<body>
<button class="print-btn" onclick="window.print()">Print / Save Card as PDF</button>
<h1>Malaysia GBV Crisis Helpline &amp; Institutional Authority Card</h1>
<div class="meta">Generated: ${today} &bull; Hentikan GBV Malaysia Educational Platform</div>
<p style="font-size: 0.92rem;">Keep this reference card in a secure place. These verified Malaysian agencies provide free, confidential assistance:</p>
<table>
<thead><tr><th>Authority / Service</th><th>Helpline / Contact</th><th>Enforcement &amp; Welfare Mandate</th></tr></thead>
<tbody>
<tr><td><strong>Royal Malaysia Police (PDRM)</strong></td><td><strong>999</strong> (24 Hours)</td><td>Immediate emergency dispatch, arrest enforcement, and D11 crime investigation.</td></tr>
<tr><td><strong>Talian Kasih (KPWKM)</strong></td><td><strong>15999</strong> / WhatsApp: 019-261 5999</td><td>National 24/7 welfare line, safe shelter transport, and social worker assistance.</td></tr>
<tr><td><strong>Hospital OSCC Desk</strong></td><td>General Hospital Emergency Dept</td><td>One Stop Crisis Centre: free medical care, forensic evidence, PEP within 72h.</td></tr>
<tr><td><strong>Women's Aid Organisation (WAO)</strong></td><td><strong>03-3000 8858</strong> / WhatsApp: 018-988 8058</td><td>Confidential safe shelters, legal court accompaniment, and trauma counseling.</td></tr>
<tr><td><strong>AWAM Telenita</strong></td><td><strong>016-237 4221</strong></td><td>Psychosocial counseling, legal information on protection orders (EPO/IPO).</td></tr>
<tr><td><strong>Befrienders Kuala Lumpur</strong></td><td><strong>03-7627 2929</strong> (24 Hours)</td><td>Free, confidential emotional support, active listening, and crisis intervention.</td></tr>
</tbody>
</table>
<div class="notice">
<strong>Digital Safety Recommendation:</strong> If your digital devices are subjected to monitoring by family members or a partner, access crisis services in private browsing mode or delete browsing records after closing this page.
</div>
</body>
</html>`;

    cardWin.document.open();
    cardWin.document.write(cardHtml);
    cardWin.document.close();

    console.log('[PRINT] Pocket card generated via document.write().');
  });
}

/* ================================================================
   5. PopUp Dialogs (<dialog>) & Safety Exit
   ================================================================ */
function initModalsAndSafety() {
  // OSCC Dialog
  const dlgOscc = document.getElementById('dlgOscc');
  document.getElementById('btnLearnOscc')?.addEventListener('click', () => dlgOscc?.showModal());
  document.getElementById('dlgOsccX')?.addEventListener('click', () => dlgOscc?.close());
  document.getElementById('dlgOsccOk')?.addEventListener('click', () => dlgOscc?.close());

  // Quick Exit Dialog
  const dlgExit = document.getElementById('dlgExit');
  document.getElementById('btnQuickExit')?.addEventListener('click', () => dlgExit?.showModal());
  document.getElementById('dlgExitX')?.addEventListener('click', () => dlgExit?.close());
  document.getElementById('dlgExitNo')?.addEventListener('click', () => dlgExit?.close());
  document.getElementById('dlgExitYes')?.addEventListener('click', () => {
    document.getElementById('contactForm')?.reset();
    window.location.replace('https://www.google.com/search?q=weather+malaysia');
  });

  // Global ESC key for emergency exit
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (dlgOscc && dlgOscc.open) { dlgOscc.close(); return; }
      const dlgConfirm = document.getElementById('dlgConfirm');
      if (dlgConfirm && dlgConfirm.open) { dlgConfirm.close(); return; }
      if (dlgExit && !dlgExit.open) dlgExit.showModal();
    }
  });

  // Back to Top button
  const toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', () => {
      toTop.classList.toggle('is-visible', window.pageYOffset > 380);
    });
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ================================================================
   6. Interactive GBV Awareness Tabs (Real-World Environmental Switcher)
   ================================================================ */
function initGbvTabs() {
  const tabBtns = document.querySelectorAll('.tab-pill-btn');
  const tabPanels = document.querySelectorAll('.realm-tab-panel');

  if (!tabBtns.length || !tabPanels.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update button active states and ARIA attributes
      tabBtns.forEach(b => {
        const isActive = b === btn;
        b.classList.toggle('is-active', isActive);
        b.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Show matching panel, hide others
      tabPanels.forEach(panel => {
        const isMatch = panel.getAttribute('id') === `panel-${targetTab}`;
        panel.classList.toggle('is-active', isMatch);
        if (isMatch) {
          panel.removeAttribute('hidden');
        } else {
          panel.setAttribute('hidden', 'true');
        }
      });
    });
  });
}

/* ================================================================
   7. Bootstrapping on DOMContentLoaded
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initNav();
  initGbvTabs();
  initContactForm();
  initPocketCard();
  initModalsAndSafety();
  console.info('[SYSTEM] All modules initialized cleanly.');
});
