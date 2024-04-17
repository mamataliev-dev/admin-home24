/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        navbar: '#273142',
        black: '#1B2431',
        blue: '#4880FF',
        gray: '#4B5668',
        green: '#38E492',
        textGray: '#979797',
        placeholder: '#323D4E',
      },
      boxShadow: {
        'soft-black':
          '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
}
