# SP.Specify for Scientific Calculator App (Updated)
## 1. Purpose
Break down the SP.Constitution into **specific actionable tasks** for implementation.
## 2. Components & Tasks
### 2.1 Display
**File:** `Display.tsx`
* Task 1: Render a div showing `value` prop.
* Task 2: Ensure text is aligned right.
* Task 3: Use `break-words` to handle long expressions.
* Task 4: Apply rounded and shadow styling.
* Task 5 (New): Ensure display shows **numbers only** when typing. Operators should not appear in the display.
### 2.2 Button
**File:** `Button.tsx`
* Task 1: Render a clickable button with `label`.
* Task 2: Handle `onClick` callback.
* Task 3: Apply styles based on `variant` (default, operator, action, scientific).
* Task 4: Ensure visual feedback on click (scale or shadow).
### 2.3 Calculator (Main Component)
**File:** `Calculator.tsx`
* Task 1: Create state `display` initialized to '0'.
* Task 2: Implement `append(value)` to update display.
* Task 3: Implement `clear()` to reset display.
* Task 4: Implement `backspace()` to remove last character.
* Task 5: Implement `calculate()` to evaluate arithmetic safely.
* Task 6: Implement `scientificFunc(func)` for sin, cos, tan, log, sqrt.
* Task 7: Add keyboard support:
  * Number keys → append (shown in display)
  * Operators (+,-,*,/,^) → **functional but hidden from display**
  * Enter → calculate
  * Backspace → delete last character
  * Escape → clear
* Task 8: Render **Display** component with current value.
* Task 9: Render **Button** components for numbers, operators, actions, and scientific functions.
* Task 10: Handle errors gracefully (division by zero, invalid input).
## 3. UI/UX Tasks
* Task 1: Implement iOS-style rounded buttons.
* Task 2: Use distinct colors for default, operator, action, scientific buttons.
* Task 3: Layout buttons in grid format.
* Task 4: Ensure responsiveness on mobile and desktop.
## 4. Deployment Tasks
* Task 1: Initialize Next.js project.
* Task 2: Include all components in `app/page.tsx`.
* Task 3: Deploy project to Vercel.
* Task 4: Test functionality (buttons, scientific features, keyboard support, error handling).
## 5. Future Enhancement Tasks
* Task 1: Add more scientific functions (factorial, constants, etc.).
* Task 2: Add history log for calculations.
* Task 3: Theme switching (light/dark mode).
* Task 4: Improve expression parsing for safer evaluation.
---
**Specify Version:** 1.1 (Updated 2025-11-28)