/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        paletteDark: "#222831",
        paletteDarkGray: "#393E46",
        paletteTeal: "#00ADB5",
        paletteWhite: "#EEEEEE",
        paletteRed: "#F94C66",
      },
      gridTemplateColumns: {
        // Simple 16 column grid
        daysListXl: "repeat(3, 1fr)",
        daysListMd: "repeat(2, 1fr)",
        daysListSm: "repeat(1, 1fr)",
        daysListTiny: "repeat(1, 100%)",
      },
      screens: {
        tiny: "475px",
        // => @media (min-width: 475px) { ... }
      },
    },
    plugins: [],
  },
};
