import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        customBlue: '#040923', // Custom color name and its value
        customPurple: '#352969', // Another custom color
        customHotpink: '#F6013F', // Another custom color
        customWhite: '#FFFFFF', // Another custom color
        customLightPurple: '#6074C6', // Another custom color
        customLightBlue: '#00D0FF', // Another custom color
        lightpink : "#FF6289"
      },
      fontFamily: {
        cutefont: ['"Cute Font"', 'cursive'],
        pressStart: ['"Press Start 2P"', 'cursive'],
      },
    },
  },
  plugins: [],
};
export default config;
