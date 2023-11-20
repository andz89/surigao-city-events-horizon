/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(0.0deg)" },
          "20%": { transform: "rotate(0.0deg)" },
          "30%": { transform: "rotate(0.0deg)" },
          "40%": { transform: "rotate(0.0deg)" },
          "50%": { transform: "rotate(2deg)" },

          "60%": { transform: "rotate(0.0deg)" },
          "750%": { transform: "rotate(0.0deg)" },
          "80%": { transform: "rotate(0.0deg)" },
          "90%": { transform: "rotate(0.0deg)" },

          "100%": { transform: "rotate(0.0deg)" },
        },
        flip: {
          to: {
            transform: "rotate(360deg)",
          },
        },
        rotate: {
          to: {
            transform: "rotate(90deg)",
          },
        },
      },
      animation: {
        "waving-hand": "wave 5s linear infinite",
        flip: "flip 6s infinite steps(2, end)",
        rotate: "rotate 3s linear infinite both",
      },
    },
  },
  plugins: [],
};
