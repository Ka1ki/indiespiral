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
        sans: ["var(--font-poppins)", "sans-serif"],
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
          primary: "#E8B828",
        },
      },
    ],
    darkTheme: false,
  },
};
