/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'electric-blue': '#0066FF',
        'circuit-gold': '#FFD700',
        'voltage-purple': '#7B2CBF',
        'current-orange': '#FF6B35',
        'power-green': '#00FF88',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #0066FF, 0 0 10px #0066FF' },
          '100%': { boxShadow: '0 0 10px #0066FF, 0 0 20px #0066FF, 0 0 30px #0066FF' },
        },
      },
    },
  },
  plugins: [],
}

