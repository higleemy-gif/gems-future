# Implementation Plan: Gems Future Setup

## Overview

Scaffold a Next.js 14 (App Router, TypeScript) project directly into the workspace root using `create-next-app`, add Framer Motion, then apply three focused customizations (brand colors + theme baseline, typography, base layout) and a minimal root route. Each task builds on the scaffold produced in step 1. Commands are written for PowerShell and run from the workspace root `d:\Gems Future\website`. This workflow produces planning and implementation tasks only; it does not implement the feature.

## Tasks

- [ ] 1. Scaffold project and install dependencies
  - [ ] 1.1 Generate the base Next.js 14 scaffold into the workspace root
    - Run in PowerShell from the workspace root: `npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm`
    - The `.` target generates files directly in the root with no nested project folder; `@14` pins Next.js to `>=14.0.0 <15.0.0`
    - Confirm the generator produces `tsconfig.json`, `src/app/` (layout.tsx, page.tsx, globals.css), `.eslintrc.json` extending the Next.js ruleset, `tailwind.config.ts`, `postcss.config.mjs`, and `package-lock.json` as the only lockfile, with no `pages/` directory
    - If the root contains a conflicting file, the generator halts, leaves existing files unchanged, and names the conflict — do not force overwrite
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2.1, 2.2, 2.4_

  - [ ] 1.2 Install Framer Motion
    - Run in PowerShell from the workspace root: `npm install framer-motion`
    - Verify `framer-motion` is added to `package.json` dependencies and resolves when imported by application code
    - _Requirements: 2.3_

- [ ] 2. Configure brand color system and theme baseline
  - [ ] 2.1 Customize `src/app/globals.css`
    - Keep the three Tailwind directives: `@tailwind base; @tailwind components; @tailwind utilities;`
    - Define exactly 7 brand CSS variables in `:root` with exact hex values — `--color-deep-blue: #1E4ED8`, `--color-teal-green: #0D9488`, `--color-amber: #F59E0B`, `--color-background: #F8FAFC`, `--color-white: #FFFFFF`, `--color-ink: #0F172A`, `--color-muted: #64748B` — no color omitted and no extra brand variable
    - Set `body` base styles: `background-color: var(--color-background)`, `color: var(--color-ink)`, and `font-family: var(--font-poppins), system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif` as the single default family
    - Write unqualified base rules valid from 320px up; express any wider-viewport adjustments only via `min-width` media queries
    - Define no `prefers-color-scheme` block and no dark-mode rules
    - _Requirements: 2.4, 3.2, 4.1, 4.2, 4.4, 5.1, 5.2, 5.3, 5.4_

  - [ ] 2.2 Customize `tailwind.config.ts`
    - Set `content` globs to cover all source directories (e.g. `./src/app/**/*.{ts,tsx}`, `./src/components/**/*.{ts,tsx}`, `./src/**/*.{ts,tsx}`)
    - Under `theme.extend.colors` define exactly 7 brand tokens, each referencing its CSS variable: `deepBlue: "var(--color-deep-blue)"`, `tealGreen: "var(--color-teal-green)"`, `amber: "var(--color-amber)"`, `background: "var(--color-background)"`, `white: "var(--color-white)"`, `ink: "var(--color-ink)"`, `muted: "var(--color-muted)"` — no color omitted and no extra brand token
    - Leave `darkMode` unset/absent so no dark variants are generated
    - _Requirements: 2.2, 4.1, 4.3, 4.5, 4.6, 5.1_

  - [ ]* 2.3 Write property test for brand color parity
    - **Property 1: Brand color CSS-variable / Tailwind-token parity**
    - For every color in the brand palette, assert the hex resolved from its CSS variable in `globals.css` equals the hex resolved from its corresponding Tailwind token in `tailwind.config.ts` (parse both files, resolve each token through its `var(--color-*)` reference, compare across all 7 colors)
    - **Validates: Requirements 4.4, 4.5, 4.6**

- [ ] 3. Configure typography and base layout
  - [ ] 3.1 Customize `src/app/layout.tsx`
    - Load Poppins via `next/font/google` with `subsets: ["latin"]`, weights `["400","500","600","700"]`, `display: "swap"`, and `variable: "--font-poppins"`
    - Apply the Poppins variable class to `<html>` so all routes inherit it; declare no second font family anywhere
    - Export `metadata` (title/description) and a `viewport` config setting `width: "device-width"` and `initialScale: 1`
    - Import `./globals.css`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 5.3, 5.5_

  - [ ] 3.2 Replace `src/app/page.tsx` with a minimal root route
    - Render a minimal placeholder (e.g. heading using `text-deepBlue` and a line using `text-muted`) confirming the foundation runs; no feature logic
    - Keep exactly one root route file; add no additional routes or feature pages
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 4. Verify the foundation
  - [ ] 4.1 Install, run, lint, and type-check verification
    - Run in PowerShell from the workspace root:
      - `npm install` — completes with exit code 0 and zero unresolved dependencies
      - `npm run dev` — compiles with zero errors and the dev server serves `/` with HTTP 200 (stop the server after confirming; do not leave it running)
      - `npm run lint` — completes with zero errors and zero warnings
      - `npx tsc --noEmit` — reports zero TypeScript type errors
    - Parity check: confirm all 7 brand colors match between the CSS variables in `globals.css` and the Tailwind tokens in `tailwind.config.ts`
    - Structural check: exactly one `layout.tsx` and one `page.tsx` under `src/app`, no `pages/` directory, no extra route files, and only `package-lock.json` as the lockfile
    - Ensure all checks pass; ask the user if questions arise
    - _Requirements: 2.5, 4.6, 7.1, 7.3, 7.4, 7.5_

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP.
- Each task references specific requirement clauses for traceability.
- Task 2.3 turns the design's single correctness property (brand palette parity) into a property-based test.
- Task 4.1 is the verification checkpoint; because each Tailwind token resolves through the same CSS variable that holds the hex, the token and variable are structurally guaranteed to agree.
- All commands target Windows PowerShell and run from the workspace root `d:\Gems Future\website`.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "2.1", "2.2", "3.1", "3.2"] },
    { "id": 2, "tasks": ["2.3"] },
    { "id": 3, "tasks": ["4.1"] }
  ]
}
```
