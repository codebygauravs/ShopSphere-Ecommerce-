/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f4f6f8',
          100: '#e5e8ec',
          500: '#4f46e5', // Primary indigo
          600: '#4338ca',
          900: '#0f172a', // Slate dark
        }
      }
    },
  },
  plugins: [],
}