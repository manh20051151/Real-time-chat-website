/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./public/index.html",
],
  
  theme: {
    extend: {
      backgroundColor:{
        overlay: 'rgba(0,0,0,0.7)',
      }
        
    },
  },
  plugins: [require("daisyui"),
  require('@tailwindcss/forms'),
  ],
}