/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#042890',
        secondary: '#0A6FA0',
        danger: '#FF0000',
        purple: '#84A3FF',
      },

      gradientColorStops: {
        oceanBlue: '#042890',
        skyBlue: '#0A6FA0',
      },
    },
  },
  plugins: [],
}
