/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#063F95',
        secondary: '#0A6FA0',
        purple: '#84A3FF',
        danger: '#FF0000',
      },
      backgroundImage: {
        'hero-1': 'url("/src/assets/Images/Slider/1.jpg")',
        'hero-2': 'url("/src/assets/Images/Slider/2.jpg")',
        'hero-3': 'url("/src/assets/Images/Slider/3.jpg")',
        'hero-4': 'url("/src/assets/Images/Slider/4.jpg")',
        'hero-5': 'url("/src/assets/Images/Slider/5.jpg")',
      },
      gradientColorStops: {
        oceanBlue: '#042890',
        skyBlue: '#0A6FA0',
      },
    },
  },
  plugins: [],
}
