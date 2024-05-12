/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        default: "1px",
      },
      translate: {
        0.5: "0.15rem",
      },
      width: {
        "1/2-screen": "50vw",
        "3/4-screen": "75vw",
        "60vw": "60vw",
        "8/12-screen": "67vw",
      },
      height: {
        "25vh": "25vh",
        "30vh": "30vh",
        "35vh": "35vh",
        "40vh": "40vh",
        "45vh": "45vh",
        "1/2-screen": "50vh",
        "3/4-screen": "75vh",
        "55vh": "55vh",
        "70vh": "70vh",
        "60%": "60%",
        "70%": "70%",
      },
      maxHeight: {
        "3/4-screen": "75vh",
      },
      screens: {
        phones: "375px",
        tablets: "640px",
        laptops: "1024px",
        desktops: "1280px",
      },
    },
  },
  plugins: [],
};
