/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
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
        daysListXl:
          "repeat(auto-fit, minmax(calc(50% - 4rem), calc(50% - 4rem)))",
        daysListMd: "repeat(1, calc(86% - 4rem))",
        daysListSm: "repeat(1, calc(100% - 4rem))",
        daysListTiny: "repeat(1, calc(100% ))",
      },
      screens: {
        tiny: "475px",
        // => @media (min-width: 475px) { ... }
      },
    },
    plugins: [],
  },
}
