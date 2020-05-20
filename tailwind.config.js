module.exports = {
  purge: {
    content: [
      "./src/**/*.html",
      "./src/**/*.vue",
      "./src/**/*.tsx",
      "./src/**/*.jsx",
      "./src/**/*.js",
    ],
    options: {
      defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
    },
  },
  theme: {
    extend: {
      fontFamily: {
        display: ["Open Sans", "sans-serif"],
        body: ["Merriweather", "Georgia", "serif"],
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/ui")],
};
