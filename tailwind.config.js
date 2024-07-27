/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pacifico: ['Pacifico', 'cursive'],
      },
      fontWeight: {
        thin: 100,
        light: 300,
        regular: 400,
        bold: 700,
        black: 900,
      },
      fontStyle: {
        normal: 'normal',
        italic: 'italic',
      },
    },
  },
  plugins: [],
}