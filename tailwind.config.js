const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        mono: ['Ubuntu Mono', ...defaultTheme.fontFamily.mono],
      },
      margin: {
        'from-header': '2rem',
        'from-page-heading': '2rem',
        section: '2rem',
      },
      padding: {
        page: '36px',
      },
      width: {
        'auth-form': '340px',
      },
      maxWidth: {
        page: '1360px',
      },
      backgroundColor: {
        ...colors,
        dark: '#090A10',
        light: '#0A0C14',
        gray: colors.slate,
        primary: colors.blue,
        success: colors.green,
        danger: colors.red,
        warning: colors.yellow,
        info: colors.blue,
      },
      colors: {
        ...colors,
        gray: colors.slate,
        primary: colors.blue,
        success: colors.green,
        danger: colors.red,
        warning: colors.yellow,
        info: colors.blue,
        text: {
          primary: '#fff',
          secondary: colors.slate[400],
          tertiary: colors.slate[500],
        },
        bg: {
          dark: '#090A10',
          light: '#0A0C14',
        },
      },
    },
  },
  plugins: [],
};
