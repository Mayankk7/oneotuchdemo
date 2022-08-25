module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-blue": "#106EB6",
        "main-red": "#C93C5F",
        "main-box": "#FF0000",
      },
      fontFamily: {
        "noto-sans": ["Noto Sans", "sans-serif"],
      },
      boxShadow: {
        main: "0px 16px 36px rgba(0, 0, 0, 0.05);",
        "delivery-shadow": "0px 4px 38px rgba(0, 0, 0, 0.08);",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
