/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bartle: ["'BBH Bartle'", "cursive"],
        caveat: ["Caveat", "cursive"],
        terminator: ["Terminator", "sans-serif"],
      },
    },
  },
  plugins: [],
};
// ...existing code...
module.exports = {
  // ...existing code...
  theme: {
    extend: {
      fontFamily: {
        planet: ["Planet", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  // ...existing code...
};
// ...existing code...
