/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#F4F7F4',
          100: '#E4EBE3',
          200: '#C9D8C8',
          300: '#A6BEA5',
          400: '#819F80',
          500: '#5F7F5E',
          600: '#486247',
          700: '#354834',
          800: '#243324',
          900: '#172317',
        },
        oldpink: {
          50: '#FAF3F3',
          100: '#F5E5E4',
          200: '#E8C9C7',
          300: '#D6A7A4',
          400: '#C0827F',
          500: '#A75F5C',
          600: '#8C4845',
          700: '#6F3533',
          800: '#542523',
        },
        beige: {
          50: '#FCFAF7',
          100: '#F8F3EC',
          200: '#EDE4D5',
          300: '#DDD0BB',
          400: '#C9B69B',
          500: '#B29C7D',
          600: '#968061',
          700: '#746147',
          800: '#554632',
        },
        // Backwards-compatible aliases mapping to the new palette
        blush: {
          50: '#FAF3F3',
          100: '#F5E5E4',
          200: '#E8C9C7',
          300: '#D6A7A4',
          400: '#C0827F',
          500: '#A75F5C',
          600: '#8C4845',
        },
        rosewood: {
          500: '#A75F5C',
          600: '#8C4845',
          700: '#6F3533',
          800: '#542523',
        },
        champagne: {
          100: '#F8F3EC',
          200: '#EDE4D5',
          300: '#DDD0BB',
          400: '#C9B69B',
          500: '#B29C7D',
          600: '#968061',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 14s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
}
