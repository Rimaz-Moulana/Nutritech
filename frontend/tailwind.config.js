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
    theme: {
      screens: {
        'sm': '340px',
        // => @media (min-width: 640px) { ... }
  
        'md': '568px',
        // => @media (min-width: 768px) { ... }
  
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
  
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
  
        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      }
    },
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
