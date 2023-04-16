/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        default: '0 4px 0 0 #e5e5e5;',
        primary: '0 4px 0 0 #0f60d2;',
        violet: '0 4px 0 0 #6c5ce7;',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
