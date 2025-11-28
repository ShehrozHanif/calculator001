# Project Structure

```
.
├── .gitignore
├── GEMINI.md
├── history/
│   └── prompts/
│       ├── general/
│       │   └── 017-create-github-repo-and-push-project.general.prompt.md
│       │   └── 018-provide-vercel-deployment-instructions.general.prompt.md
│       └── scientific-calculator/
│           ├── 001-scientific-calculator-app-plan.plan.prompt.md
│           ├── 002-missing-tasks-md-for-implement.misc.prompt.md
│           ├── 003-scientific-calculator-app-tasks.tasks.prompt.md
│           ├── 004-scientific-calculator-app-implemented.green.prompt.md
│           ├── 005-suggest-next-manual-steps-after-implementation.misc.prompt.md
│           ├── 006-fix-nextjs-client-component-error.fix.prompt.md
│           ├── 007-awaiting-user-verification.misc.prompt.md
│           ├── 008-update-calculator-display-behavior.refactor.prompt.md
│           ├── 010-update-scientific-calculator-app-spec.spec.prompt.md
│           ├── 011-update-scientific-calculator-app-plan.plan.prompt.md
│           ├── 012-update-scientific-calculator-app-tasks.tasks.prompt.md
│           ├── 013-awaiting-user-verification-after-spec-plan-tasks-update.misc.prompt.md
│           ├── 014-blocked-awaiting-explicit-user-instruction.misc.prompt.md
│           ├── 015-implement-full-expression-display.refactor.prompt.md
│           └── 016-fix-ecmascript-parsing-error-in-calculator.fix.prompt.md
├── scientific-calculator/
│   ├── .gitignore
│   ├── eslint.config.mjs
│   ├── next.config.ts
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── README.md
│   ├── tsconfig.json
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Button.tsx
│   ├── Calculator.tsx
│   └── Display.tsx
│   ├── lib/
│   └── public/
│       ├── file.svg
│       ├── globe.svg
│       ├── next.svg
│       ├── vercel.svg
│       └── window.svg
└── specs/
    └── 001-scientific-calculator/
        ├── data-model.md
        ├── plan.md
        ├── quickstart.md
        ├── research.md
        ├── spec.md
        ├── tasks.md
        └── contracts/
            └── README.md
```
