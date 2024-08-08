/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppinsThin: ["var(--font-poppins-thin)"],
        poppinsLight: ["var(--font-poppins-light)"],
        poppinsRegular: ["var(--font-poppins-regular)"],
        poppinsSemiBold: ["var(--font-poppins-semibold)"],
        poppinsBold: ["var(--font-poppins-bold)"],
      },
    },
  },
  plugins: [],
};
