/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tk-primary': '#219C90',
        'tk-danger': '#ef4444',
        'tk-green': '#13ce66',
        'tk-yellow': '#ffc82c',
        'tk-secondary': '#273444',
        'tk-gray': '#8492a6',
        'tk-gray-light': '#d3dce6',
      },
      fontFamily: {
        sans: ['Comfortaa', 'sans-serif'],
        serif: ['Comfortaa', 'serif'],
      },
    }
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/typography'),
    // eslint-disable-next-line no-undef
    require('@tailwindcss/forms'),
    // eslint-disable-next-line no-undef
    require('@tailwindcss/aspect-ratio'),
    // eslint-disable-next-line no-undef
    require('@tailwindcss/container-queries'),
  ],
}

