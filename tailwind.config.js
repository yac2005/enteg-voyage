/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: "#C9A96E",
        sienna: "#B85C2A",
        parchment: "#F0E6D3",
        night: "#1A1208",
        sage: "#4A6741",
      },
    },
  },
  plugins: [],
}