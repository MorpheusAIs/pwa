/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        morLightBlue: "rgba(41, 51, 68, 1)",
        morDarkBlue: "rgba(16, 24, 40, 1)",
        morSideBar: "rgba(29, 41, 57, 1)"
      }
    },
  },
  plugins: [],
}

