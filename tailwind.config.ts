import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "992px",
      xl: "1140px",
      "2xl": "1471px",
    },
    extend: {
      colors: {
        primary: {
          900: "#000000",
          800: "#0a071a",
          700: "#140f35",
          600: "#1e184f",
          500: "#28206a", // Base color
          400: "#3d309f",
          300: "#4738ba",
          200: "#5140d4",
          100: "#5b48ef",
          50: "#6650ff",
        },
        secondary: {
          900: "#000000",
          800: "#290b0b",
          700: "#531716",
          600: "#7e2221",
          500: "#a82e2c", // Base color
          400: "#fc4543",
          300: "#ff514e",
          200: "#ff5c59",
          100: "#ff6864",
          50: "#ff7470",
        },
      },
    },
  },
  plugins: [],
};
export default config;
