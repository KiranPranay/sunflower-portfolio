/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Warm cream canvas
        cream: {
          DEFAULT: '#fff8f2',
          100: '#fffcf9',
          200: '#fff4ec',
          300: '#ffece0',
        },
        // Soft warm-plum ink for text (never pure black)
        plum: {
          400: '#9a8aa6',
          500: '#7c6c88',
          600: '#63536f',
          700: '#4e3f5a',
          800: '#3b2d47',
          900: '#2c2038',
        },
        // Blush rose (primary cute pink)
        rose: {
          100: '#ffe1ec',
          200: '#ffc9dc',
          300: '#ffa9c6',
          400: '#ff87ab',
          500: '#fb6f9e',
          600: '#ee5589',
        },
        // Lavender / lilac
        lilac: {
          100: '#efe9ff',
          200: '#e0d5fc',
          300: '#c9b8f7',
          400: '#b49df0',
          500: '#9d7fe8',
          600: '#8a6ad9',
        },
        // Butter yellow
        butter: {
          100: '#fff3cc',
          200: '#ffe9a8',
          300: '#ffdc7d',
          400: '#ffce54',
          500: '#f7be3f',
          600: '#eaa92a',
        },
        // Sage mint green
        sage: {
          100: '#d8f4e8',
          200: '#bfead6',
          300: '#9fdcbf',
          400: '#78cda3',
          500: '#54bd89',
          600: '#3fa673',
        },
        // Peach / coral
        peach: {
          100: '#ffe7dd',
          200: '#ffd2c0',
          300: '#ffb59b',
          400: '#ff9a78',
          500: '#fb805c',
          600: '#ee6a46',
        },
      },
      fontFamily: {
        display: ['Fredoka', 'ui-rounded', 'system-ui', 'sans-serif'],
        sans: ['Nunito', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'ui-rounded', 'cursive'],
      },
      boxShadow: {
        // soft pastel-tinted lifts
        cute: '0 14px 34px -14px rgba(251,111,158,0.45)',
        'cute-lilac': '0 14px 34px -14px rgba(157,127,232,0.45)',
        'cute-sage': '0 14px 34px -14px rgba(84,189,137,0.4)',
        'cute-butter': '0 14px 34px -14px rgba(247,190,63,0.42)',
        'cute-peach': '0 14px 34px -14px rgba(251,128,92,0.42)',
        soft: '0 22px 50px -24px rgba(74,58,86,0.28)',
        // "sticker" hard-offset shadow for a playful cut-out look
        sticker: '4px 5px 0 0 rgba(44,32,56,0.10)',
        pop: '0 5px 0 0 rgba(238,85,137,0.35)',
      },
      backgroundImage: {
        'mesh-cute':
          'radial-gradient(55% 55% at 12% 8%, rgba(255,169,198,0.45), transparent 60%), radial-gradient(50% 50% at 88% 6%, rgba(201,184,247,0.4), transparent 60%), radial-gradient(45% 45% at 82% 88%, rgba(255,206,84,0.3), transparent 60%), radial-gradient(45% 45% at 12% 92%, rgba(159,220,191,0.34), transparent 60%)',
        'dots-cute':
          'radial-gradient(rgba(157,127,232,0.16) 1.6px, transparent 1.6px)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%,100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-16px) translateX(6px)' },
        },
        bob: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        wave: {
          '0%,100%': { transform: 'rotate(0deg)' },
          '15%': { transform: 'rotate(16deg)' },
          '30%': { transform: 'rotate(-10deg)' },
          '45%': { transform: 'rotate(16deg)' },
          '60%': { transform: 'rotate(-6deg)' },
          '75%': { transform: 'rotate(12deg)' },
        },
        wobble: {
          '0%,100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        jelly: {
          '0%,100%': { transform: 'scale(1,1)' },
          '30%': { transform: 'scale(1.12,0.88)' },
          '50%': { transform: 'scale(0.9,1.1)' },
          '70%': { transform: 'scale(1.05,0.95)' },
        },
        twinkle: {
          '0%,100%': { opacity: '0.25', transform: 'scale(0.7) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1.15) rotate(45deg)' },
        },
        blink: {
          '0%,92%,100%': { transform: 'scaleY(1)' },
          '96%': { transform: 'scaleY(0.1)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.7)', opacity: '0.7' },
          '100%': { transform: 'scale(2.1)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        bob: 'bob 3s ease-in-out infinite',
        wave: 'wave 2.4s ease-in-out infinite',
        wobble: 'wobble 1.4s ease-in-out infinite',
        jelly: 'jelly 0.6s ease-in-out',
        twinkle: 'twinkle 2.6s ease-in-out infinite',
        blink: 'blink 4.5s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s ease-out infinite',
        marquee: 'marquee 26s linear infinite',
      },
    },
  },
  plugins: [],
}
