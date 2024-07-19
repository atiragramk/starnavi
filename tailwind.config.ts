import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/img/bg.jpg')",
      },
      fontFamily: {
        mono: ['var(--font-anakin)'],
      },
      colors: {
        red: '#b63d42',
        gray: {
          400: '#b9c4ca',
          700: '#5b5b54',
          900: '#222d2e',
        },
        orange: {
          100: '#fff0dd',
          300: '#edc796',
          500: '#db8b56',
        },
        purple: '#685374',
        blue: {
          300: '#becfd5',
          500: '#5e8898',
          700: '#4b6c79',
        },
      },
    },
  },
  plugins: [],
};
export default config;
