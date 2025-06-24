/** @type {import('prettier').Config} */
const config = {
  semi: true,
  trailingComma: "es5",
  singleQuote: false,
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  endOfLine: "lf",
  arrowParens: "avoid",
  bracketSpacing: true,
  bracketSameLine: false,
  jsxSingleQuote: false,
  quoteProps: "as-needed",

  // Tailwind CSS plugin
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindConfig: "./tailwind.config.ts",
  tailwindFunctions: ["clsx", "cn", "cva"],

  // File-specific overrides
  overrides: [
    {
      files: "*.json",
      options: {
        printWidth: 200,
      },
    },
    {
      files: "*.md",
      options: {
        proseWrap: "always",
        printWidth: 80,
      },
    },
    {
      files: ["*.yaml", "*.yml"],
      options: {
        tabWidth: 2,
      },
    },
  ],
};

export default config;
