/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      spacing: {
        'navbar' : '60px'
      }
    },
  },
  plugins: [require('prettier-plugin-tailwindcss')],
}

