/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        cmyk: {
          cyan: '#00a8ff',
          magenta: '#e0115f',
          yellow: '#fbc531',
          black: '#1e272e'
        },
        brand: {
          blue: '#0284c7',
          hover: '#0369a1',
          dark: '#0b132b',
          darker: '#060b18',
          card: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        heading: ['Outfit', 'sans-serif']
      }
    }
  },
  safelist: ['hidden']
};
