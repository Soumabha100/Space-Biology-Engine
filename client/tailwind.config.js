/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          background: "#1a1a1a",
          surface: "#2a2a2a",
          text: "#f5f5f5",
          primary: "#7c3aed",
        },
        light: {
          background: "#f8f9fa",
          surface: "#ffffff",
          text: "#212529",
          primary: "#6d28d9",
        },
      },
    },
  },
  plugins: [],
};
