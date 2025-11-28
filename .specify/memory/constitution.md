<!-- Sync Impact Report:
Version change: template -> 1.0.0
Modified principles: All principles were placeholders, now filled.
Added sections: Purpose, Components, State & Logic, UI/UX, Deployment, Notes & Future Enhancements.
Removed sections: None (template sections were filled).
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ updated
  - .specify/templates/spec-template.md ✅ updated
  - .specify/templates/tasks-template.md ✅ updated
  - .specify/commands/sp.adr.toml ✅ updated
  - .specify/commands/sp.analyze.toml ✅ updated
  - .specify/commands/sp.checklist.toml ✅ updated
  - .specify/commands/sp.clarify.toml ✅ updated
  - .specify/commands/sp.constitution.toml ✅ updated
  - .specify/commands/sp.git.commit_pr.toml ✅ updated
  - .specify/commands/sp.implement.toml ✅ updated
  - .specify/commands/sp.phr.toml ✅ updated
  - .specify/commands/sp.plan.toml ✅ updated
  - .specify/commands/sp.specify.toml ✅ updated
  - .specify/commands/sp.tasks.toml ✅ updated
Follow-up TODOs: None.
-->
# SP.Constitution for Scientific Calculator App

## 1. Purpose

The purpose of this application is to provide a fully functional **calculator** with **basic arithmetic operations**, **scientific functions**, **keyboard support**, and a **modern iOS-style rounded UI**. The app will be deployable on **Vercel**.

## 2. Components

### 2.1 Display

* **File:** `Display.tsx`
* **Type:** Functional Component
* **Responsibilities:**

  * Show current input and calculation results.
  * Handle dynamic display updates.
  * Prevent UI overflow with `break-words`.
* **Props:**

  * `value: string` → current input/result.

### 2.2 Button

* **File:** `Button.tsx`
* **Type:** Functional Component
* **Responsibilities:**

  * Render clickable buttons.
  * Handle four types: `default` (numbers), `operator` (+, -, *, /, ^), `action` (C, backspace), `scientific` (sin, cos, tan, log, sqrt).
* **Props:**

  * `label: string` → button text.
  * `onClick: () => void` → click handler.
  * `variant?: 'default' | 'operator' | 'action' | 'scientific'` → button style.

### 2.3 Calculator (Main Component)

* **File:** `Calculator.tsx`
* **Type:** Functional Component
* **Responsibilities:**

  * Hold application state: `display`.
  * Handle input appending, clearing, backspace.
  * Evaluate expressions using safe arithmetic methods.
  * Execute scientific functions.
  * Handle keyboard input for numbers, operators, Enter (calculate), Backspace, Escape (clear).
  * Render **Display** and **Button** components.
  * Handle error states (division by zero, invalid inputs).

## 3. State & Logic

* **State Variables:**

  * `display: string` → current input/result.
* **Functions:**

  * `append(value: string)` → append number/operator.
  * `clear()` → reset display.
  * `backspace()` → delete last character.
  * `calculate()` → evaluate expression safely.
  * `scientificFunc(func: string)` → perform sin, cos, tan, log, sqrt.
* **Keyboard Support:**

  * Number keys: 0–9
  * Operators: +, -, *, /, ^
  * Enter → calculate
  * Backspace → delete last input
  * Escape → clear

## 4. UI/UX

* **Style:** iOS-style rounded buttons and display.
* **Colors:**

  * Numbers: gray
  * Operators: indigo
  * Scientific: green
  * Actions (clear/backspace): red
* **Layout:**

  * Grid-based button layout.
  * Display on top, buttons below.
* **Responsiveness:**

  * Works on desktop and mobile.
  * Keyboard support for desktop users.

## 5. Deployment

* **Platform:** Vercel
* **Steps:**

  1. Initialize Next.js project.
  2. Add component files (`Display.tsx`, `Button.tsx`, `Calculator.tsx`).
  3. Set up `app/page.tsx` to render `<Calculator />`.
  4. Deploy to Vercel.
  5. Test responsiveness and keyboard functionality.

## 6. Notes & Future Enhancements

* Add additional scientific functions (e.g., factorial, pi, e).
* Improve calculation parser for more robust safety.
* Add history log for previous calculations.
* Allow theme switching (light/dark mode).

---

**Constitution Version:** 1.0.0
**Ratified**: 2025-11-28
**Last Amended**: 2025-11-29