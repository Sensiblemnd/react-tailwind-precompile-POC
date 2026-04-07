// rspack.config.js
const path = require("path");
const { CssExtractRspackPlugin } = require("@rspack/core");

/** @type {import('@rspack/core').Configuration} */
module.exports = {
  entry: "./src/index.tsx",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },

  module: {
    rules: [
      // ── TypeScript / TSX via Rspack's built-in SWC transformer ──────────────
      {
        test: /\.(tsx?|jsx?)$/,
        exclude: /node_modules/,
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
              tsx: true,
            },
            transform: {
              react: {
                // New JSX transform (React 17+) — no "import React" needed
                runtime: "automatic",
              },
            },
          },
        },
        type: "javascript/auto",
      },

      // ── CSS → PostCSS (Tailwind v4) → extract to dist/styles.css ────────────
      //
      //  Pipeline (right → left):
      //    1. postcss-loader  — runs @tailwindcss/postcss which fully expands
      //                         all utilities defined in src/styles/global.css.
      //                         Because global.css contains "@source not"
      //                         Tailwind emits ALL utilities, not just the ones
      //                         found by scanning JSX/HTML files.
      //    2. css-loader      — resolves @import / url() in the CSS.
      //    3. CssExtractRspackPlugin.loader
      //                       — pulls the CSS out of the JS bundle into
      //                         a standalone dist/styles.css file.
      {
        test: /\.css$/,
        use: [
          // 1. Extract into a separate file (must come first in the use array)
          CssExtractRspackPlugin.loader,

          // 2. Resolve CSS @import / url()
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },

          // 3. PostCSS → Tailwind v4 expansion
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "postcss.config.js"),
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    // Emit all CSS into a single predictable file: dist/styles.css
    new CssExtractRspackPlugin({
      filename: "styles.css",
    }),
  ],

  // ── Source maps for easier debugging ────────────────────────────────────────
  devtool: "source-map",

  // ── Dev server config (rspack serve) ────────────────────────────────────────
  devServer: {
    port: 3000,
    open: false,
    static: {
      directory: path.resolve(__dirname, "public"),
    },
  },
};
