/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        garden: {
          bg: '#F8F6EF',
          'bg-secondary': '#F0EDE3',
          'primary-green': '#65775B',
          'deep-green': '#405440',
          'muted-sage': '#AAB39A',
          'daisy-white': '#FFFDF7',
          'flower-yellow': '#E8C96E',
          'text-main': '#45463F',
          'text-muted': '#858477',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      letterSpacing: {
        'widest-editorial': '0.22em',
        'loose-editorial': '0.12em',
      }
    },
  },
  plugins: [],
}
