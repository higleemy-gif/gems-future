# Typography

## Font

- **Poppins** is the single typeface for the entire app. Headings, body copy,
  buttons, inputs and labels all render in Poppins — there is no secondary or
  display face.
- Loaded via `next/font/google` in `app/fonts.ts` (`Poppins`), exposed as the
  CSS variable `--font-poppins` and attached in `app/layout.tsx`.
- Tailwind's `font-sans`, `font-display` and `font-body` families all resolve to
  Poppins (see `tailwind.config.ts`), with the fallback stack ending in a
  system sans-serif:
  `Poppins, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`.

## Weights

Keep text clean and never overly bold — do not use 700+ (bold / extra-bold).

- `400` regular — default body text.
- `500` medium — labels and emphasized body.
- `600` semibold — headings.

When adding components, rely on the inherited Poppins (from `<body>`) rather than
introducing new font families, and prefer `font-medium` / `font-semibold` over
`font-bold`.
