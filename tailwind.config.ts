/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bartle: ["'BBH Bartle'", "cursive"],
        caveat: ["Caveat", "cursive"],
        terminator: ["Terminator", "sans-serif"],
        planet: ["Planet", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        glitch: "glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "soft-pulse": "soft-pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "chroma-shift": "chroma-shift 3s ease-in-out infinite",
        "crt-flicker": "crt-flicker 0.15s infinite",
        "matrix-fall": "matrix-fall 8s linear infinite",
        blink: "blink 1s infinite",
        typing: "typing 3.5s steps(40, end)",
        "scale-up": "scale-up 0.3s ease-out",
        "slide-in-left": "slide-in-left 0.4s ease-out",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  safelist: [/^bg-\[#/, /^text-\[/, /^border-\[/, /^animate-/],
  plugins: [],
};
