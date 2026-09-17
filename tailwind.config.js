/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#f0c77a',
        foreground: '#f8f3e6',
      },
      fontFamily: {
        khtitle: ['KHTitle', 'serif'],
        khmenu: ['KHMenu', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
