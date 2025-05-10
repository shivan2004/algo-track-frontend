/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f1ff',
          100: '#cce3ff',
          200: '#99c7ff',
          300: '#66abff',
          400: '#338fff',
          500: '#0073ff',
          600: '#005ccc',
          700: '#004599',
          800: '#002e66',
          900: '#001733',
        },
        secondary: {
          50: '#edf8ff',
          100: '#daf1ff',
          200: '#b6e3ff',
          300: '#91d5ff',
          400: '#6dc8ff',
          500: '#48baff',
          600: '#3a95cc',
          700: '#2b7099',
          800: '#1d4b66',
          900: '#0e2533',
        },
        dark: {
          50: '#f3f4f6',
          100: '#e7e9ec',
          200: '#c2c5ca',
          300: '#9ca0a8',
          400: '#767c87',
          500: '#505865',
          600: '#404652',
          700: '#30353d',
          800: '#202329',
          900: '#101114',
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};