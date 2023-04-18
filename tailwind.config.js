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
        border: '#F1F1F1 0px 0px 0px 3px;',
        'border-orange': '#EFA92A 0px 0px 0px 3px;',
        'border-green': '#0db80d 0px 0px 0px 3px;',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
