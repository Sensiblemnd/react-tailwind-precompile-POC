// Approach 2 — Use Tailwind v4's @config directive (simplest)
// Tailwind v4 supports an @config directive that points to a JS file. It's limited to a subset of options, but safelist is supported:

export default {
 blocklist: ["container"], // blocklist is an optional companion to safelist, for classes that should never be included
};
