/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0a0a0c',
          yellow: '#ffd646',
          red: '#ED2A2C',
          navy: '#081856',
          blue: '#085bb9',
          cream: '#fff6f1',
        },
      },
      fontFamily: {
        geologica: ['Geologica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
