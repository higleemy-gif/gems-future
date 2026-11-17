# Requirements Document

## Introduction

This specification defines the project foundation for the Gems Future website: a scaffolded Next.js 14 application using the App Router and TypeScript, created directly in the workspace root. The scaffold establishes the toolchain (npm, ESLint, Tailwind CSS, Framer Motion), the single application font (Poppins via `next/font/google`), the brand color system (exposed as both CSS variables and Tailwind theme tokens), a light-theme-only visual baseline, and a clean, mobile-first base layout. This spec covers scaffolding and configuration only; it does not define any feature pages or routes beyond the base layout produced by the scaffold.

## Glossary

- **Scaffold**: The generated Next.js 14 project files, configuration, and dependencies created in the workspace root.
- **Workspace_Root**: The directory `d:\Gems Future\website` into which the project is generated, with no intermediate project subfolder.
- **App_Router**: The Next.js routing system in which route and layout files reside under `src/app`.
- **Build_System**: The Next.js tooling responsible for compiling, type-checking, and bundling the application.
- **Dev_Server**: The local development server started via the npm `dev` script.
- **Package_Manager**: npm, used for dependency installation and script execution.
- **Linter**: The ESLint configuration integrated with Next.js.
- **Styling_System**: Tailwind CSS configured for the project.
- **Animation_Library**: Framer Motion installed and available to the application.
- **Font_System**: Poppins loaded through `next/font/google`.
- **Brand_Palette**: The defined set of brand colors: Deep Blue `#1E4ED8`, Teal Green `#0D9488`, Amber `#F59E0B`, Background `#F8FAFC`, White `#FFFFFF`, Ink `#0F172A`, Muted `#64748B`.
- **CSS_Variables**: Custom CSS properties defined in the global stylesheet that expose the Brand_Palette.
- **Tailwind_Theme_Tokens**: Named color tokens in the Tailwind configuration that expose the Brand_Palette.
- **Root_Layout**: The top-level layout file at `src/app/layout.tsx` wrapping all routes.
- **Global_Stylesheet**: The global CSS file imported by the Root_Layout.
- **System**: The Gems Future website foundation as a whole, encompassing the Scaffold and its configured subsystems.
- **CSS_Variable**: A single custom CSS property defined in the Global_Stylesheet that exposes one color of the Brand_Palette.
- **Tailwind_Theme_Token**: A single named color token in the Tailwind configuration that exposes one color of the Brand_Palette.

## Requirements

### Requirement 1: Project scaffold and location

**User Story:** As a developer, I want a Next.js 14 App Router project with TypeScript generated in the workspace root, so that I can build the Gems Future website without an extra nested project folder.

#### Acceptance Criteria

1. WHEN the Scaffold is generated, THE Scaffold SHALL create its `package.json` and configuration files directly in the Workspace_Root, such that no intermediate project subfolder contains the generated project root.
2. THE Scaffold SHALL declare a Next.js dependency resolving to a version greater than or equal to 14.0.0 and less than 15.0.0, and SHALL configure the App_Router.
3. WHEN the Scaffold is generated, THE Scaffold SHALL produce a `tsconfig.json` in the Workspace_Root and SHALL use the `.ts` or `.tsx` extension for all application source files and for configuration files for which a TypeScript variant is supported.
4. THE Scaffold SHALL place all application code under a `src` directory in the Workspace_Root, with all App_Router route files located under `src/app`, and SHALL NOT create a `pages` directory.
5. THE Scaffold SHALL use npm as the Package_Manager and SHALL produce a `package-lock.json` in the Workspace_Root, and SHALL NOT produce a lockfile for any other Package_Manager.
6. IF the Workspace_Root already contains a file or directory that conflicts with a file the Scaffold must create, THEN THE Scaffold SHALL halt generation, leave the existing conflicting files unchanged, and return an error indicating the conflicting path.

### Requirement 2: Tooling and dependencies

**User Story:** As a developer, I want linting, styling, and animation tooling installed and configured, so that the project is ready for consistent development.

#### Acceptance Criteria

1. THE Scaffold SHALL include an ESLint configuration file that extends the Next.js recommended ESLint ruleset.
2. THE Scaffold SHALL install Tailwind CSS as the Styling_System and include its configuration file declaring the content source paths that cover all application source directories.
3. THE Scaffold SHALL install Framer Motion as the Animation_Library such that its exports resolve successfully when imported by application code.
4. THE Global_Stylesheet SHALL include the Tailwind CSS base, components, and utilities directives required for the Styling_System to apply.
5. WHEN the Build_System processes the Scaffold, THE Linter SHALL complete with zero errors and zero warnings.
6. IF the Linter reports one or more errors or warnings when the Build_System processes the Scaffold, THEN THE Build_System SHALL fail the build and return an output indicating which rule and file location triggered each reported issue.

### Requirement 3: Font system

**User Story:** As a developer, I want Poppins configured as the only application font through next/font/google, so that typography is consistent across the site.

#### Acceptance Criteria

1. THE Font_System SHALL load the Poppins font through `next/font/google` with the latin character subset and at least one weight configured.
2. THE Scaffold SHALL apply Poppins as the only font family configured for application text, such that no other font family is declared as the default for body or heading text.
3. WHEN any route is rendered, THE Root_Layout SHALL apply the Font_System so that all visible text elements on that route resolve to Poppins as their primary font family.
4. IF the Poppins font fails to load, THEN THE Font_System SHALL render text using a declared system fallback font family without blocking the display of text content.

### Requirement 4: Brand color system

**User Story:** As a developer, I want the brand colors exposed as both CSS variables and Tailwind tokens, so that I can reference them consistently in CSS and in markup utility classes.

#### Acceptance Criteria

1. THE Brand_Palette SHALL consist of exactly 7 named colors: Deep Blue, Teal Green, Amber, Background, White, Ink, and Muted.
2. THE Global_Stylesheet SHALL define exactly one CSS_Variable for each of the 7 colors in the Brand_Palette, with no color omitted and no additional brand CSS_Variable defined.
3. THE Tailwind configuration SHALL define exactly one Tailwind_Theme_Token for each of the 7 colors in the Brand_Palette, with no color omitted and no additional brand Tailwind_Theme_Token defined.
4. THE CSS_Variables SHALL use the exact hex values: Deep Blue `#1E4ED8`, Teal Green `#0D9488`, Amber `#F59E0B`, Background `#F8FAFC`, White `#FFFFFF`, Ink `#0F172A`, Muted `#64748B`.
5. THE Tailwind_Theme_Tokens SHALL use the exact hex values: Deep Blue `#1E4ED8`, Teal Green `#0D9488`, Amber `#F59E0B`, Background `#F8FAFC`, White `#FFFFFF`, Ink `#0F172A`, Muted `#64748B`.
6. THE System SHALL ensure that, for each color in the Brand_Palette, the CSS_Variable value and the corresponding Tailwind_Theme_Token value resolve to the same hex value.

### Requirement 5: Light theme baseline and base layout

**User Story:** As a developer, I want a light-theme-only, mobile-first base layout, so that the site starts from a clean and responsive visual baseline.

#### Acceptance Criteria

1. THE Scaffold SHALL apply a light theme only, with zero dark-mode variants, theme-toggle controls, or dark-mode class hooks configured in the generated output.
2. WHERE the operating system or browser reports a dark-mode color-scheme preference, THE Scaffold SHALL continue to render the light theme without applying any dark-mode styling.
3. THE Root_Layout SHALL set the page background to the Background color `#F8FAFC` and the default text color to the Ink color `#0F172A` on the root document element so that both values are the computed styles inherited by all descendant elements unless explicitly overridden.
4. THE Global_Stylesheet SHALL define base styles as the default (unqualified) rules that apply from a viewport width of 320 pixels upward, with any wider-viewport adjustments expressed only through min-width media queries.
5. THE Root_Layout SHALL include a `viewport` meta configuration that sets `width=device-width` and `initial-scale=1` to enable responsive scaling on mobile devices.

### Requirement 6: Scaffold-only scope

**User Story:** As a developer, I want the work limited to the foundation, so that no feature pages are added prematurely.

#### Acceptance Criteria

1. THE Scaffold SHALL include exactly one Root_Layout file produced by the base scaffold.
2. THE Scaffold SHALL include exactly one root route file produced by the base scaffold.
3. THE Scaffold SHALL contain zero route files other than the single root route file produced by the base scaffold.
4. THE Scaffold SHALL contain zero feature page files beyond the Root_Layout and the single root route file produced by the base scaffold.
5. IF a file defining a feature page or a route other than the single root route is present in the Scaffold, THEN THE Scaffold SHALL be rejected as out of scope and the out-of-scope file SHALL be reported to the developer.

### Requirement 7: Runnable foundation

**User Story:** As a developer, I want the scaffold to build and run locally, so that I can verify the foundation before building features.

#### Acceptance Criteria

1. WHEN the Package_Manager installs dependencies, THE Scaffold SHALL complete installation within 300 seconds with an exit code of 0 and zero unresolved dependency entries.
2. IF the Package_Manager cannot resolve one or more dependencies, THEN THE Scaffold SHALL terminate installation with a non-zero exit code and an error message identifying each unresolved dependency.
3. WHEN the Dev_Server is started via the npm `dev` script, THE Build_System SHALL compile the Scaffold within 60 seconds with zero compilation errors.
4. WHEN the Build_System completes compilation of the Scaffold, THE Dev_Server SHALL begin listening on its configured local port within 10 seconds and serve the application root route with an HTTP 200 response.
5. WHEN the Build_System compiles the Scaffold, THE Build_System SHALL report exactly zero TypeScript type errors.
6. IF the Build_System encounters one or more compilation or TypeScript type errors, THEN THE Build_System SHALL terminate with a non-zero exit code and an error message identifying each failing file and line, and THE Dev_Server SHALL NOT begin listening on its configured local port.
