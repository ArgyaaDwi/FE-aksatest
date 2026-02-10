/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#024663",
        secondary: "#1B90C2",
        bgColor: "#F7FDFF",
        dark: "#1A202C",
      },
    },
  },
  plugins: [],
}

