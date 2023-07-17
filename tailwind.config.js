/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#72865a",
        secoundary: "#395B64",
        medium: "#A5C9CA",
        light: "#E7F6F2",
      },
    },
  },
  plugins: [require("daisyui")],
};
