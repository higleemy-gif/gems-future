# Design Document

## Overview

This design establishes the foundation for the Gems Future website as a Next.js 14 (App Router, TypeScript) project scaffolded directly into the workspace root `d:\Gems Future\website`. The scaffold is generated with `create-next-app`, then extended with Framer Motion and a customized typography/color/layout baseline.

The work is scaffold-only: a single Root Layout and a single root route, a one-font typography system (Poppins via `next/font/google`), a seven-color brand palette expressed once as CSS custom properties and mirrored as Tailwind theme tokens, and a light-theme-only, mobile-first visual baseline. No feature pages or additional routes are produced.

Environment note: this is a Windows / PowerShell environment. All commands below are written for PowerShell.

## Architecture

The foundation is built in four layers, each detailed in the sections that follow (Approach, Project Structure, Components and Interfaces).

1. **Scaffold into the workspace root.** `create-next-app@14` generates a Next.js 14 App Router + TypeScript project directly in `d:\Gems Future\website` (no nested folder), with Tailwind, ESLint, the `src/` layout, the `@/*` import alias, and npm as the package manager. See the Approach and Project Structure sections for the exact command and resulting tree.
2. **Add the animation dependency.** `framer-motion` is installed on top of the scaffold so animation is available to later feature work, without introducing any feature pages now.
3. **Confine customization to three files.** All brand customization lives in `src/app/layout.tsx` (Poppins font + base theme), `src/app/globals.css` (Tailwind directives, CSS variables, base styles), and `tailwind.config.ts` (brand tokens). The single root route `src/app/page.tsx` is a minimal placeholder. Everything else is left as generated, keeping the diff small and reviewable.
4. **Single source of truth for brand color.** The seven brand colors are declared once as CSS custom properties in `:root` and mirrored by Tailwind theme tokens that resolve *through* those same variables. Because the Tailwind token references the CSS variable rather than restating a hex, the two representations cannot drift apart.

Cross-cutting baseline: the visual foundation is **light-theme-only and mobile-first**. No `prefers-color-scheme` or dark-mode rules are defined and `darkMode` is left unset, so a dark OS preference has no effect; base styles are valid from 320px up and any wider-viewport rules use `min-width` only.

The Project Structure diagram below and the Components and Interfaces section provide the concrete file tree and per-file design.

## Approach

### Scaffolding strategy

Generate the project in place with the official initializer, selecting the exact options the requirements mandate:

```powershell
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Key choices and the requirement each satisfies:

- `.` as the target directory generates files directly in the workspace root with no nested project folder (Req 1.1).
- `@14` pins the initializer to the Next.js 14 line so the declared dependency resolves to `>=14.0.0 <15.0.0` (Req 1.2).
- `--typescript` produces `tsconfig.json` and `.ts`/`.tsx` sources (Req 1.3).
- `--app` configures the App Router and emits `src/app`; combined with `--src-dir` it places code under `src/` and creates no `pages/` directory (Req 1.4, 6.x).
- `--use-npm` selects npm and emits `package-lock.json` only (Req 1.5).
- `--tailwind` installs and configures Tailwind CSS (Req 2.2) and writes the three Tailwind directives into the global stylesheet (Req 2.4).
- `--eslint` installs the Next.js ESLint config (Req 2.1).

`create-next-app` refuses to overwrite conflicting files in a non-empty target and exits with an error naming the conflict; this is the behavior relied on for Req 1.6. The workspace currently contains only `.kiro/`, which does not conflict with any generated file.

After scaffolding, add the animation library:

```powershell
npm install framer-motion
```

Then apply the three customizations below (font, colors, layout) by editing the generated `layout.tsx`, `globals.css`, and `tailwind.config.ts`.

### Why this approach

Using the official initializer guarantees the generated toolchain (TypeScript, ESLint, Tailwind, npm lockfile, App Router layout) matches current Next.js 14 conventions, minimizing configuration drift and keeping the lint/type baseline clean. Customization is then confined to three well-known files, keeping the diff reviewable and the scope limited to the foundation.

## Project Structure

After scaffolding and customization, the workspace root contains:

```
d:\Gems Future\website\
├── .kiro\                     # spec artifacts (pre-existing)
├── public\                    # static assets (scaffold default)
├── src\
│   └── app\
│       ├── layout.tsx         # Root_Layout — wraps all routes, applies font + base theme
│       ├── page.tsx           # base root route (the single route)
│       └── globals.css        # Global_Stylesheet — Tailwind directives, CSS vars, base styles
├── .eslintrc.json             # ESLint config extending next/core-web-vitals
├── next.config.mjs            # Next.js config (scaffold default)
├── next-env.d.ts              # Next.js TypeScript ambient types
├── package.json               # dependencies and scripts
├── package-lock.json          # npm lockfile (only lockfile present)
├── postcss.config.mjs         # PostCSS config for Tailwind
├── tailwind.config.ts         # Tailwind config — brand tokens referencing CSS vars
└── tsconfig.json              # TypeScript config
```

Files touched by customization: `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`, `tailwind.config.ts`. Everything else is left as generated.

## Components and Interfaces

### Root Layout (`src/app/layout.tsx`)

Responsibilities:

- Load Poppins through `next/font/google` and expose it as a CSS variable.
- Import the Global Stylesheet.
- Apply the Poppins variable to `<html>`/`<body>` so all routes inherit it.
- Export `metadata` and a `viewport` configuration (the Next.js 14 `viewport` export is the idiomatic replacement for a hand-written viewport `<meta>` tag).

```tsx
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Gems Future",
  description: "Gems Future website",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
```

Notes:

- `subsets: ["latin"]` with four weights satisfies Req 3.1.
- `display: "swap"` plus the automatic system fallback stack that `next/font` generates satisfies Req 3.4 (text renders in a fallback without blocking, then swaps to Poppins).
- The `viewport` export emits `width=device-width, initial-scale=1` (Req 5.5).
- No second font family is declared anywhere, so Poppins is the only default (Req 3.2, 3.3).

### Root route (`src/app/page.tsx`)

The single route. Kept minimal; renders a placeholder confirming the foundation runs. No feature logic.

```tsx
export default function Home() {
  return (
    <main className="min-h-screen px-4 py-8">
      <h1 className="text-2xl font-semibold text-deepBlue">Gems Future</h1>
      <p className="mt-2 text-muted">Project foundation is ready.</p>
    </main>
  );
}
```

### Global Stylesheet (`src/app/globals.css`)

Responsibilities:

- Declare the three Tailwind directives (Req 2.4).
- Define exactly the seven brand colors as CSS custom properties in `:root` (Req 4.2, 4.4).
- Set the body font family to the Poppins variable as the single default (Req 3.2).
- Set base background `#F8FAFC` and text `#0F172A` so descendants inherit them (Req 5.3).
- Provide mobile-first base styles (unqualified rules valid from 320px up); any wider-viewport rules use `min-width` only (Req 5.4).

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Brand palette — single source of truth, mirrored in tailwind.config.ts */
  --color-deep-blue: #1e4ed8;
  --color-teal-green: #0d9488;
  --color-amber: #f59e0b;
  --color-background: #f8fafc;
  --color-white: #ffffff;
  --color-ink: #0f172a;
  --color-muted: #64748b;
}

body {
  background-color: var(--color-background);
  color: var(--color-ink);
  font-family: var(--font-poppins), system-ui, -apple-system, Segoe UI, Roboto,
    Helvetica, Arial, sans-serif;
}
```

No `prefers-color-scheme` block and no dark-mode rules are defined, so a dark OS preference has no effect (Req 5.1, 5.2).

### Tailwind configuration (`tailwind.config.ts`)

Mirrors the seven brand colors as theme tokens that reference the CSS variables, keeping a single source of truth and guaranteeing parity (Req 4.3, 4.5, 4.6). `darkMode` is left unset / absent so no dark variants are generated (Req 5.1).

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deepBlue: "var(--color-deep-blue)",
        tealGreen: "var(--color-teal-green)",
        amber: "var(--color-amber)",
        background: "var(--color-background)",
        white: "var(--color-white)",
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
      },
    },
  },
  plugins: [],
};

export default config;
```

Because each token resolves to the same CSS variable that holds the hex value, the Tailwind token and the CSS variable can never diverge (Req 4.6). The `content` globs cover all source directories (Req 2.2).

## Data Models

### Brand palette

The palette is the only structured data in this foundation. It is defined once as CSS variables and referenced by Tailwind tokens.

| Name       | CSS variable          | Tailwind token | Hex       |
| ---------- | --------------------- | -------------- | --------- |
| Deep Blue  | `--color-deep-blue`   | `deepBlue`     | `#1E4ED8` |
| Teal Green | `--color-teal-green`  | `tealGreen`    | `#0D9488` |
| Amber      | `--color-amber`       | `amber`        | `#F59E0B` |
| Background | `--color-background`  | `background`   | `#F8FAFC` |
| White      | `--color-white`       | `white`        | `#FFFFFF` |
| Ink        | `--color-ink`         | `ink`          | `#0F172A` |
| Muted      | `--color-muted`       | `muted`        | `#64748B` |

Exactly seven entries, no more and no fewer (Req 4.1). The Tailwind token resolves through the CSS variable rather than restating the hex, so the two representations are structurally guaranteed to agree.

## Error Handling

This is a scaffold; error handling concerns the generation and build pipeline rather than runtime application logic.

- **Target-directory conflict (Req 1.6):** `create-next-app` detects conflicting files in a non-empty target, halts before writing, leaves existing files untouched, and prints the conflicting path. No custom handling is added.
- **Dependency resolution failure (Req 7.2):** `npm install` exits non-zero and names unresolved packages. Surfaced directly to the developer.
- **Lint failures (Req 2.5, 2.6):** `next lint` / the build reports the rule and file location and exits non-zero. The baseline is expected to lint clean.
- **Compilation / type errors (Req 7.5, 7.6):** The Next.js build and `tsc` exit non-zero, name the failing file and line, and the dev server does not begin listening. The baseline is expected to type-check clean.
- **Font load failure (Req 3.4):** `display: "swap"` with the generated system fallback stack renders text immediately in the fallback font and swaps to Poppins when available; text is never blocked.

## Verification

Run in PowerShell from the workspace root:

1. `npm install` — completes with exit code 0, all dependencies resolved (Req 7.1).
2. `npm run dev` — compiles with zero errors, dev server listens and serves `/` with HTTP 200 (Req 7.3, 7.4).
3. `npm run lint` — completes with zero errors and zero warnings (Req 2.5).
4. `npx tsc --noEmit` — reports zero TypeScript type errors (Req 7.5).

Manual structural checks confirming scope: exactly one `layout.tsx` and one `page.tsx` under `src/app`, no `pages/` directory, no additional route files, and only `package-lock.json` as a lockfile (Req 1.4, 1.5, 6.1–6.4).

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Scaffolding features are dominated by static configuration facts and build-tool invocations rather than input-varying logic, so most acceptance criteria are verified by the structural and build checks described in the Verification section. Exactly one criterion expresses a genuine universal statement with input variation across the palette and is captured as a property below.

### Property 1: Brand color CSS-variable / Tailwind-token parity

*For any* color in the Brand_Palette, the value of its CSS_Variable defined in the Global_Stylesheet and the value of its corresponding Tailwind_Theme_Token SHALL resolve to the same hex value.

**Validates: Requirements 4.6, 4.4, 4.5**

## Testing Strategy

Because this feature is static configuration and build-tool invocation rather than input-varying application logic, the strategy combines one property-based test with a set of build/structural verification steps. Together these cover the acceptance criteria: the one universal, input-varying criterion is checked as a property, and the remaining configuration/build facts are checked by the verification steps.

### Property-based test

**Property 1 — Brand color CSS-variable / Tailwind-token parity** (see the Correctness Properties section). For any color in the brand palette, the value of its CSS variable defined in `globals.css` and the value of its corresponding Tailwind theme token resolve to the same hex. The test iterates over every palette entry (minimum 100 iterations where generation applies) and asserts parity, guarding against the two representations diverging. Tag: **Feature: gems-future-setup, Property 1: Brand color CSS-variable / Tailwind-token parity**. Validates Requirements 4.4, 4.5, 4.6.

### Build and structural verification

Run in PowerShell from the workspace root (these mirror the Verification section):

1. `npm install` — completes with exit code 0, all dependencies resolved (Req 7.1).
2. `npm run dev` — compiles with zero errors; dev server listens and serves `/` with HTTP 200 (Req 7.3, 7.4).
3. `npm run lint` — completes with zero errors and zero warnings (Req 2.5, 2.6).
4. `npx tsc --noEmit` — reports zero TypeScript type errors (Req 7.5, 7.6).

### Structural scope checks

Manual/structural assertions confirming the scaffold-only scope: exactly one `layout.tsx` and one `page.tsx` under `src/app`, no `pages/` directory, no additional route files, and only `package-lock.json` present as a lockfile (Req 1.4, 1.5, 6.1–6.4). The brand palette contains exactly seven entries (Req 4.1).
