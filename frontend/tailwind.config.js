/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'quicksand' : ['Quicksand', 'sans-serif'],
        'roboto' : ['Roboto', 'sans-serif'],
        'mono' : ['Major Mono Display', 'monospace'],
        'stint' : ['Stint Ultra Condensed', 'serif'],
        'poiret' : ['Poiret One', 'cursive'],
        'noto' : ['Noto Sans', 'sans-serif'],
    },
    colors: {
      'bvNavy': '#041A28',
      'bvNavyDark': '#021018',
      'bvOcean': '#022C40',
      'bvBlue': '#21647B',
      'bvEmerald': '#48ABA5',
      'bvPink': '#B2838D',
      'bvDkPink': '#9F6572',
      'bvRed': '#8E3534',
      'bvMaroon': '#5C2B36',
      'bvBrown': '#39242B',
      'bvOrange': '#CB7A2C',
      'ivyPurple': '#160323',
    }
  },
  plugins: [require('daisyui')],
}}
