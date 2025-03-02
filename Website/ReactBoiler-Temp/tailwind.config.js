import { heroui } from '@heroui/theme';
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/navbar.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        monst: ["Montserrat"]
      },
      colors: {
        primary: "#155c45",
        secondary: "#cdeabd",
        tertiary: "#1d223b",
        quaternary: "#7fa49c",
        quinary: "#7dcd6f",
      }
    }
  },
  daisyui: {
    themes: ["light"]
  },
  plugins: [daisyui, heroui()],
};