// Tailwind v4 JS config — loaded via @config directive in global.css.
// Supports: blocklist, safelist, darkMode, plugins.
// Must use module.exports (CJS) — no "type": "module" in package.json.
//remove  flex and grid classes from so you can see them compiled back in
module.exports = {
  blocklist: [
    "container",
    "flex", // prevent flex from being compiled into the output
    "flex-col", // prevent flex-col from being compiled into the output
    "grid", // prevent grid from being compiled into the output
  ],
};
