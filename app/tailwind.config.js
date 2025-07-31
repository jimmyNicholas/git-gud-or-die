/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Dark Souls inspired color palette
        'primary': '#0a0a0a', // Dark background
        'primary-dark': '#1a1a1a', // Darker background
        'secondary': '#ff0000', // Red
        'secondary-light': '#ff6b35', // Orange
        'accent': '#ffd700', // Gold
        'text': '#e0e0e0',
        'text-dim': '#888888'
      },
      fontFamily: {
        'terminal': ['Courier New', 'monospace'],
        'gaming': ['Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
} 