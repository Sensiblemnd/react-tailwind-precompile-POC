# Rspack + PostCSS + React 18 + Tailwind v4 — Full CSS Precompile POC

A minimal proof-of-concept that wires together:

| Tool | Version | Role |
|------|---------|------|
| **Rspack** | ^1.7 | Rust-based bundler (webpack-compatible API) |
| **React** | 18 | UI framework |
| **Tailwind CSS** | v4 | Utility-first CSS framework |
| **@tailwindcss/postcss** | v4 | Official PostCSS plugin for Tailwind v4 |
| **PostCSS** | ^8 | CSS transformation pipeline |
| **CssExtractRspackPlugin** | built-in | Emits CSS to a standalone file |
| **css-loader** | ^7 | Resolves `@import` / `url()` in CSS |
| **SWC** (built-in) | — | TypeScript / TSX transpilation |

---

## Key design decision — Full precompile (no DOM scanning)

By default Tailwind v4 scans your source files and **only emits** the utility
classes it finds (tree-shaking). This is great for production, but for:

- Design-system / component-library builds
- SSR apps where classes may be injected at runtime
- Storybook or sandbox builds that need every utility available

…you want **all** utilities in the output file unconditionally.

### How it works

In `src/styles/global.css` add the `@source not` directive **after** the
main import:

```css
@import "tailwindcss";

/* Tell Tailwind: do NOT scan any source files.
   Emit all utilities regardless of DOM/JSX usage. */
@source not "../**";
```

This single line disables the content-scanning step. Every utility class will
be present in `dist/styles.css` at build time — no runtime compilation, no
dynamic class detection.

---

## Project structure

```
rspack-tailwind4-poc/
├── public/
│   └── index.html            # HTML shell — links to dist/styles.css
├── src/
│   ├── styles/
│   │   └── global.css        # @import "tailwindcss" + @source not + @theme
│   ├── App.tsx               # Demo React component
│   └── index.tsx             # createRoot entry point
├── rspack.config.js          # Rspack config (SWC + PostCSS + CssExtract)
├── postcss.config.js         # PostCSS config (@tailwindcss/postcss)
├── tsconfig.json             # TypeScript config (noEmit, bundler resolution)
└── package.json
```

---

## Tailwind configuration in v4

Tailwind v4 has **no `tailwind.config.js`**. All configuration lives in your
CSS file via CSS-native directives:

```css
/* src/styles/global.css */

@import "tailwindcss";
@source not "../**";   /* disable DOM scanning → full precompile */

@theme {
  /* Extend/override the design token system */
  --color-brand-500: #0ea5e9;
  --font-display: "Geist", ui-sans-serif, system-ui, sans-serif;
  --spacing-18: 4.5rem;
  --shadow-glow: 0 0 15px 2px var(--color-brand-400);
}

@layer components {
  .btn-primary {
    @apply rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white;
  }
}
```

Custom tokens defined in `@theme` are immediately available as Tailwind
utility classes (e.g. `text-brand-500`, `shadow-glow`, `spacing-18`).

---

## Rspack config highlights

```js
// rspack.config.js
const { CssExtractRspackPlugin } = require("@rspack/core");
//      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//  Use Rspack's NATIVE plugin — NOT webpack's mini-css-extract-plugin
//  (the webpack plugin is incompatible with Rspack's internal API)

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          CssExtractRspackPlugin.loader,   // 3. extract to file
          { loader: "css-loader", options: { importLoaders: 1 } }, // 2. resolve imports
          { loader: "postcss-loader", ... }, // 1. Tailwind expansion
        ],
      },
    ],
  },
  plugins: [new CssExtractRspackPlugin({ filename: "styles.css" })],
};
```

---

## Getting started

```bash
npm install
npm run build      # → dist/bundle.js + dist/styles.css
npm run dev        # → dev server on http://localhost:3000
npm run typecheck  # → tsc type-check only (no emit)
```

Open `public/index.html` in a browser (or let `rspack serve` handle it) —
point it at `dist/styles.css` and `dist/bundle.js`.

---

## Output

```
dist/
├── bundle.js       # React app (JS)
├── bundle.js.map
├── styles.css      # ALL Tailwind utilities + your @theme tokens (~17 KB minified)
└── styles.css.map
```
