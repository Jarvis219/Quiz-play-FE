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
        gray: '0px 0px 0px 3px #F1F1F1;',
        orange: '0px 0px 0px 3px #EFA92A;',
        green: '0px 0px 0px 3px #0db80d;',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
