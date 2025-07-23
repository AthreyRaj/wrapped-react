/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        scrollUp: "scrollUp 20s linear infinite",
        scrollDown: "scrollDown 20s linear infinite",
        fadeInUp: "fadeInUp 0.6s ease-out forwards",
        bgPulse: "bgPulse 10s ease-in-out infinite",
        squiggle1: "wiggle 8s ease-in-out infinite",
        squiggle2: "wiggle 6s ease-in-out infinite",
        squiggle3: "wiggle 10s ease-in-out infinite",
      },
      keyframes: {
        scrollUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(-100%)" },
        },
        scrollDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        bgPulse: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        wiggle: {
          "0%, 100%": { transform: "translate(0px, 0px)" },
          "25%": { transform: "translate(5px, -5px)" },
          "50%": { transform: "translate(10px, -10px)" },
          "75%": { transform: "translate(5px, 5px)" },
        },
      },
    },
  },
  plugins: [],
}
