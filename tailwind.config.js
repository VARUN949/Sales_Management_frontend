/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Comic: ["Comic Neue", "cursive"],
      },
    },
  },
  plugins: [],
}