/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        128: "32rem",
      },
      keyframes: {
        slider: {
          "0%": {
            transform: "translateX(-15px)",
          },
          "100%": {
            transform: "translateX(0px)",
          },
        },
      },
      animation: {
        slider: "slider 1s linear",
      },
    },
  },
  plugins: [],
};
