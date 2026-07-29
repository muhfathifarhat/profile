/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"DM Mono"', "monospace"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
