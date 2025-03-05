/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1989fa",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // 禁用默认样式，避免与Vant冲突
  },
};
