/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'light-gray':'rgba(39, 50, 64, 1)',
        'light-violet':'rgba(90, 106, 207, 1)',
        'gray-bg':'rgba(241, 242, 247, 1)',
        'active-link':'rgba(112, 127, 221, 1)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Define your custom font
      },
    },
  },
  plugins: [],
}