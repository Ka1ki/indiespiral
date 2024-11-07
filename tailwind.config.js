/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-baskerville)", "sans-serif"],
        tangerine: ["var(--font-tangerine)", "cursive"],
        syne: ["var(--font-lato)", "sans-serif"],
      },
      colors: {
        navy: "#0D2159",
      },
    },
  },
  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        corporate: {
          ...require("daisyui/src/theming/themes")["corporate"],
          primary: "#fc662c",
          "primary-content": "#ffffff",
        },
      },
    ],
    darkTheme: false,
  },
};
