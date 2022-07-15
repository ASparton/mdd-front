/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        signika: ['Signika']
      },
      fontSize: {
        mamouth: '6rem',
      }
    },
  },
  plugins: [],
}
