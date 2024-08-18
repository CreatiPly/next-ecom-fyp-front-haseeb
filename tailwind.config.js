/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': '#0d1415',
        'background': '#f6fbfb',
        'primary': '#48b6c4',
        'secondary': '#91dfe8',
        'accent': '#e8fafc',
        // text: "#14011d",
        // background: "#faf0ff",
        // primary: "#b619f8",
        // secondary: "#fb7c99",
        // accent: "#ffe9e5",
      },
    },
  },
  plugins: [],
};
