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
        daysList: "repeat(3, minmax(calc(33% - 4rem) , 1fr))",
      },
    },
    plugins: [],
  },
}
