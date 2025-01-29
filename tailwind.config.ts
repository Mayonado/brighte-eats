import type { Config } from "tailwindcss";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { heroui } = require("@heroui/react");

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("@tailwindcss/typography"),
    heroui({
      themes: {
        "custom-theme": {
          extend: "light", // <- inherit default values from light theme
          colors: {
            background: "#0D001A",
            foreground: "#ffffff",
            primary: {
              50: "#E6F1FE",
              100: "#CCE3FD",
              200: "#99C7FB",
              300: "#66AAF9",
              400: "#338EF7",
              500: "#006FEE",
              600: "#005BC4",
              700: "#004493",
              800: "#002E62",
              900: "#001731",
              DEFAULT: "#0059C9",
              foreground: "#595A66",
            },
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "2px",
              medium: "5px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "1px",
              large: "3px",
            },
          },
        },
      },
    }),
  ],
} satisfies Config;
