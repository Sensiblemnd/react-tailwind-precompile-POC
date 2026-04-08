// src/App.tsx
//
// A simple demo that exercises the custom design tokens defined in global.css.
// Because we pre-compile ALL Tailwind utilities, classes used only here (or
// even classes never used anywhere) will still appear in dist/styles.css.

import  { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50 p-8 gap-10">
      {/* Header */}
      <header className="mx-auto max-w-3xl mb-10">
        <h1 className="text-3xl font-bold text-brand-700 font-display">
          Rspack + PostCSS + Tailwind&nbsp;v4
        </h1>
        <p className="mt-2 text-slate-500 text-sm">
          Full precompile POC — every Tailwind utility is in{" "}
          <code className="font-mono text-brand-600 bg-brand-50 px-1 rounded">
            dist/styles.css
          </code>
          , regardless of DOM usage.
        </p>
      </header>

      {/* Cards grid */}
      <main className="mx-auto max-w-3xl grid gap-6 sm:grid-cols-2">
        {/* Counter card */}
        <div className="card flex flex-col gap-4">
          <h2 className="font-semibold text-slate-800">Counter</h2>
          <p className="text-5xl font-bold text-brand-500 tabular-nums">
            {count}
          </p>
          <div className="flex gap-2">
            <button className="btn-primary" onClick={() => setCount((c) => c + 1)}>
              + Increment
            </button>
            <button
              className="btn-primary bg-slate-200 text-slate-700 hover:bg-slate-300"
              onClick={() => setCount(0)}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Badges card */}
        <div className="card flex flex-col gap-4">
          <h2 className="font-semibold text-slate-800">Custom tokens</h2>
          <div className="flex flex-wrap gap-2">
            {[
              ["bg-brand-100 text-brand-800", "brand"],
              ["bg-emerald-100 text-emerald-800", "success"],
              ["bg-amber-100 text-amber-800", "warning"],
              ["bg-rose-100 text-rose-800", "error"],
            ].map(([cls, label]) => (
              <span key={label} className={`badge ${cls}`}>
                {label}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-400">
            shadow-glow, spacing-18/22/128, breakpoint-xs / 3xl, radius-4xl —
            all defined via <code className="font-mono">@theme</code> in CSS.
          </p>
        </div>

        {/* Shadow-glow demo */}
        <div className="card sm:col-span-2">
          <h2 className="font-semibold text-slate-800 mb-3">
            Custom shadow token
          </h2>
          <div className="inline-block rounded-lg bg-brand-500 px-6 py-3 text-white shadow-glow">
            shadow-glow utility
          </div>
        </div>
      </main>
    </div>
  );
}
