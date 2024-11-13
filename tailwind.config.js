/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      screens: { "md-lg": "900px" },
      boxShadow: {
        'custom': '0 4px 20px 0 rgba(39, 62, 122, 0.3)',
      },
      // colors: {
      //   'custom-gradient-start': '#3F5CAC',
      //   'custom-gradient-mid': '#2B4383',
      //   'custom-gradient-end': '#253B75',
      // },
      colors:{
        'custom-gradient-start': '#55D8E4',
        'custom-gradient-mid': '#25B7D3',
        'custom-gradient-end': '#1880CA',
      }
    },
    container: {
      center: true
    }
  },
  corePlugins: {
    preflight: false
  },
  plugins: [],
}

