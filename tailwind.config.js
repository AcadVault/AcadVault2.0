/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

export const content = [
  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
]
export const theme = {
  colors: {
    ...colors,
    primary: '#020617',
    secondary: '#FFD990',
  },
  screens: {
    ...defaultTheme.screens,
    xs: '320px',
  },
  extend: {}
}
export const plugins = []