// postcss.config.js
//
// Tailwind v4 ships its own PostCSS plugin via the separate
// @tailwindcss/postcss package. It replaces the old tailwindcss plugin.
// There is no longer a tailwind.config.js in v4 — configuration lives
// inside your CSS file with @theme / @config directives.

module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
