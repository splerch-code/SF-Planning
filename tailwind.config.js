/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sf: "rgba(242, 200, 0)",
        "sf-dark": "rgba(17, 20, 22)",
        "sf-body": "rgba(23,24,27)"
      }
    },
  },
  plugins: [],
};
