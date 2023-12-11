/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "node_modules/preline/dist/*.js"],
  darkMode: "class",
  theme: {
    extend: {},
    fontFamily: {
      body: ["Poppins", "sans-serif"],
      sans: ["Poppins", "sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("preline/plugin")],
};
