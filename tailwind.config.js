const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: {
    content: ["./src/**/*.html", "./src/**/*.tsx", "./src/**/*.js"],
    // options: {
    //   defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
    // },
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        // display: ["Open Sans", "sans-serif"],
        // body: ["Merriweather", "Georgia", "serif"],
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/ui")],
};
