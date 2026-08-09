/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1B3A2B",
        "ink-light": "#2F5241",
        "ink-dark": "#122A1F",
        paper: "#FBF9F4",
        "paper-line": "#E4DFCE",
        "paper-dim": "#F3EFE3",
        brass: "#C9A227",
        "brass-dark": "#A6821C",
        "brass-light": "#E4C765",
        text: "#22281F",
        muted: "#6B7263",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      backgroundImage: {
        ledger:
          "repeating-linear-gradient(to bottom, transparent, transparent 27px, #E4DFCE 28px)",
      },
    },
  },
  plugins: [],
};
