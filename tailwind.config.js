/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export const content = [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
]

export const theme = {
    screens: {
        ...defaultTheme.screens,
        xs: '320px',
    },
    extend: {}
}
export const plugins = []