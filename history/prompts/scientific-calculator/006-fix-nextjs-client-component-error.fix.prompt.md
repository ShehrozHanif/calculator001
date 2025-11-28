---
id: 006
title: Fix Next.js Client Component Error
stage: fix
date: 2025-11-29
surface: agent
model: gemini-1.5-pro
feature: scientific-calculator
branch: 001-scientific-calculator
user: (unknown)
command: (implicit after error report)
labels: [fix, nextjs, react, client-component, useEffect]
links:
  spec: specs/001-scientific-calculator/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - scientific-calculator/components/Calculator.tsx
tests:
  null
---

## Prompt

## Error Type
Build Error

## Error Message
Ecmascript file had an error

## Build Output
./components/Calculator.tsx:2:27
Ecmascript file had an error
  1 | // scientific-calculator/components/Calculator.tsx
> 2 | import React, { useState, useEffect } from 'react'; // Added useEffect
    |                           ^^^^^^^^^
  3 | import Display from './Display';
  4 | import Button from './Button';
  5 |

You're importing a component that needs `useEffect`. This React Hook only works in a Client Component. To fix, mark the file (or its parent) with the `"use client"` directive.

 Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client

Import trace:
  Server Component:
    ./components/Calculator.tsx
    ./app/page.tsx

Next.js version: 16.0.5 (Turbopack)

## Response snapshot

The 'use client' directive has been added to scientific-calculator/components/Calculator.tsx. Please try running the application again by navigating to the 'scientific-calculator' directory and running 'npm run dev'.

## Outcome

- ✅ Impact: Resolved build error by adding "use client" directive to Calculator.tsx.
- 🧪 Tests: No tests were run.
- 📁 Files: Modified scientific-calculator/components/Calculator.tsx.
- 🔁 Next prompts: User to retry running the application.
- 🧠 Reflection: The error message was very clear, providing a direct solution. The fix was straightforward.

## Evaluation notes (flywheel)

- Failure modes observed: Next.js server component using client-side hook without "use client" directive.
- Graders run and results (PASS/FAIL): (un-graded)
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): N/A - awaiting user's retry.
