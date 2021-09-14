module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "action-neutral": {
          "background-2": "#E5E5E5",
          "background-3": "#E7E7E7",
          "data-1": "#F8F0DF",
          "data-2": "#FEFBF3",
          "data-3": "#79B4B7",
          "data-4": "#D86500",
          "data-5": "#9D9D9D",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
