# Tasks: Scientific Calculator App

**Input**: Design documents from `/specs/001-scientific-calculator/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

## Format: `- [ ] [ID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Project Initialization)

**Purpose**: Initialize the Next.js project and configure basic dependencies.

- [X] T001 Initialize Next.js project: `npx create-next-app@latest scientific-calculator`
- [X] T002 Set up project folder structure (`src/app`, `src/components`, `src/lib`) per plan.md in `scientific-calculator/`.
- [X] T003 Install dependencies (React, Tailwind CSS, other Next.js defaults) in `scientific-calculator/`: `npm install`
- [X] T004 Configure Tailwind CSS (`tailwind.config.js`, `globals.css`) in `scientific-calculator/`.

## Phase 2: Core Components

**Purpose**: Implement the fundamental UI components: Display and Button.

- [X] T005 [P] Implement Display rendering in `scientific-calculator/src/components/Display.tsx`.
- [X] T006 [P] Align text to right in `scientific-calculator/src/components/Display.tsx`.
- [X] T007 [P] Handle long expressions with `break-words` CSS in `scientific-calculator/src/components/Display.tsx`.
- [X] T008 [P] Apply rounded and shadow styling to Display in `scientific-calculator/src/components/Display.tsx`.
- [X] T009 [P] Ensure display shows **numbers only** when typing. Operators should not appear in the display in `scientific-calculator/src/components/Calculator.tsx`.
- [X] T010 [P] Render clickable Button with label and onClick handler in `scientific-calculator/src/components/Button.tsx`.
- [X] T011 [P] Implement variant styles (default, operator, action, scientific) for Button in `scientific-calculator/src/components/Button.tsx`.
- [X] T012 [P] Add click feedback to Button in `scientific-calculator/src/components/Button.tsx`.

## Phase 3: Calculator Logic

**Purpose**: Implement the core calculation and state management logic within the Calculator component.

- [X] T013 Initialize display state (`useState('0')`) in `scientific-calculator/src/components/Calculator.tsx`.
- [X] T014 Implement `append(value)` function to update display in `scientific-calculator/src/components/Calculator.tsx`.
- [X] T015 Implement `clear()` function to reset display in `scientific-calculator/src/components/Calculator.tsx`.
- [X] T016 Implement `backspace()` function to delete last input in `scientific-calculator/src/components/Calculator.tsx`.
- [X] T017 Implement `calculate()` function for safe arithmetic evaluation in `scientific-calculator/src/components/Calculator.tsx`.
- [X] T018 Implement `scientificFunc(func)` for sin, cos, tan, log, sqrt in `scientific-calculator/src/components/Calculator.tsx`.
- [X] T019 Render `Display` component with current value in `scientific-calculator/src/components/Calculator.tsx`.
- [X] T020 Render `Button` components for numbers, operators, actions, and scientific functions in `scientific-calculator/src/components/Calculator.tsx`.
- [X] T021 Handle error states (division by zero, invalid input) in `scientific-calculator/src/components/Calculator.tsx`.

## Phase 4: UI/UX and Layout

**Purpose**: Refine the visual appearance and ensure responsiveness.

- [X] T022 [P] Implement iOS-style rounded buttons across the application (global/Tailwind config) in `scientific-calculator/tailwind.config.js` and CSS.
- [X] T023 [P] Apply distinct color schemes for button variants (default, operator, action, scientific) in `scientific-calculator/src/components/Button.tsx`.
- [X] T024 [P] Implement grid layout for buttons in `scientific-calculator/src/components/Calculator.tsx`.
- [X] T025 Ensure responsiveness on mobile and desktop for `scientific-calculator/src/components/Calculator.tsx` and global CSS.

## Phase 5: Keyboard Support

**Purpose**: Add keyboard input functionality.

- [X] T026 Implement keyboard event listeners for numbers, operators (functional but hidden from display), Enter, Backspace, Escape in `scientific-calculator/src/components/Calculator.tsx`.

## Phase 6: Integration & Testing

**Purpose**: Integrate components and perform initial functional testing.

- [X] T027 Integrate `Calculator` component into `scientific-calculator/src/app/page.tsx`.
- [X] T028 Verify functionality of all buttons, scientific features, keyboard support, and error handling for the integrated application.

## Phase 7: Deployment

**Purpose**: Prepare for and deploy the application.

- [X] T029 Push `scientific-calculator/` project to GitHub and deploy to Vercel.

## Phase 8: Future Enhancements (Optional, Post MVP)

**Purpose**: Outline potential future improvements.

- [X] T030 Add more scientific functions (e.g., factorial, constants) to `scientific-calculator/src/components/Calculator.tsx`.
- [X] T031 Implement a history log for previous calculations in `scientific-calculator/src/components/Calculator.tsx`.
- [X] T032 Implement theme switching (light/dark mode) for the application.
- [X] T033 Improve expression parsing for safer evaluation in `scientific-calculator/src/components/Calculator.tsx`.

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Core Components (Phase 2)**: Depends on Setup completion
- **Calculator Logic (Phase 3)**: Depends on Core Components completion
- **UI/UX and Layout (Phase 4)**: Depends on Calculator Logic completion
- **Keyboard Support (Phase 5)**: Depends on Calculator Logic completion
- **Integration & Testing (Phase 6)**: Depends on UI/UX and Keyboard Support completion
- **Deployment (Phase 7)**: Depends on Integration & Testing completion
- **Future Enhancements (Phase 8)**: Depends on Deployment completion (Post-MVP)

### Within Each Phase

- Sequential tasks must be completed in order.
- Parallel tasks (`[P]`) can be worked on concurrently.

### Parallel Opportunities

- Tasks marked with `[P]` within a phase can be executed in parallel.
- Different components (Display, Button) can be developed in parallel within the Core Components phase.

## Implementation Strategy

### MVP First

1. Complete Phase 1: Setup
2. Complete Phase 2: Core Components
3. Complete Phase 3: Calculator Logic
4. Complete Phase 4: UI/UX and Layout
5. Complete Phase 5: Keyboard Support
6. Complete Phase 6: Integration & Testing (Focus on core functionality)
7. **STOP and VALIDATE**: Test core calculator functionality independently.
8. Deploy MVP if ready.

### Incremental Delivery

1. Complete Phases 1-6 for core calculator functionality.
2. Deploy/Demo initial working version.
3. Iteratively add features from "Future Enhancements" phase, testing and deploying after each increment.

---

## Notes

- `[P]` tasks = different files, no dependencies
- Each phase should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate independently