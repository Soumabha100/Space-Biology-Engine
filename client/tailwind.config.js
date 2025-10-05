import { fontFamily } from 'tailwindcss/defaultTheme'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  // 🌙 Enable manual dark mode via class (used in ThemeContext)
  darkMode: 'class',

  theme: {
    extend: {
      // 🧩 Custom font family
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },

      // 🎨 Define your CSS variable-based colors
      colors: {
        text: 'var(--color-text)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        primary: 'var(--color-primary)',
      },
    },
  },
  plugins: [
    typography,
  ],
}

