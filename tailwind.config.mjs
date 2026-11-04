/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0A0A0A',
          charcoal: '#141414',
          surface: '#1C1C1E',
          red: '#D4202B',
          'red-hover': '#EF3340',
          'red-dark': '#9E141C',
          white: '#FFFFFF',
          grey: '#A8ADB5',
          border: '#2A2D33',
          light: '#F4F5F7',
        }
      },
      fontFamily: {
        display: ['Saira', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '8px',
      },
      boxShadow: {
        'glow-red': '0 0 20px -3px rgba(212, 32, 43, 0.4)',
        'glow-red-lg': '0 0 35px -5px rgba(212, 32, 43, 0.6)',
      }
    },
  },
  plugins: [],
};
