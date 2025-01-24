/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ultraLightBlue': 'rgba(61, 165, 214, .05)',
        'lightBlue': '#7FC1E4'
      },
    },
  },
  plugins: [],
}

