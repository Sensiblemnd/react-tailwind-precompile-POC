module.exports = {
  // Classes that MUST always be in the output (never tree-shaken)
  safelist: [
    "bg-brand-500",
    "text-white",
    "rounded-lg",
  ],

  // Classes that must NEVER appear in the output
  blocklist: [
    "container",
    "prose",
  ],
};