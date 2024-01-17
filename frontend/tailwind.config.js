/** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
  module.exports={

    content: [
          "./index.html",
          "./src/**/*.{js,ts,jsx,tsx}",
        ],
  theme: {
    extend: {
      colors:{
        darkGreen: '#8EA174',
        backgroundGreen: '#E5EBD6',
        sidebarGreen : '#284625'
      },

      margin:{
        '7.5':'75px'
      }
    },
  },

  plugins: [],
}
