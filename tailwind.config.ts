import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        lightTheme: {
          primary: "#709ed3",
          secondary: "#27ad58",
          accent: "#85e559",
          neutral: "#352037",
          "base-100": "#382d39",
          info: "#4968c5",
          success: "#70dba9",
          warning: "#fcd75f",
          error: "#e45d4e",
          body: {
            "background-color": "#e3e6e6"
          }
        },
      },
    ],
  },
}
export default config
