/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {
        colors: {
            custom: {
                /** red */
                100: '#300219',
                200: '#AF053F',
                300: '#BB2E57',
                /** black */
                400: '#0B0E16',
                /** gray */
                500: '#696C74',
                600: '#91949D',
                700: '#B1B4BD',
                /** white */
                800: '#F4F6FF',
            }
        }
    },
  },
  plugins: [],
}
