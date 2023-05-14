/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: { 500: '#4BBEDA', 900: '#2A83A1' },
                secondary: { 500: '#9B6FED', 900: '#974CEE' },
                alt: { 500: '#F58878', 900: '#C35F53' },
                alt2: { 500: '#F59161', 900: '#EA855F' },
                back: {
                    500: '#4B4D6A',
                    600: '#333248',
                    700: '#2F3049',
                    900: '#181B2B',
                },
            },
            screens: {
                '3xl': '1750px',
                '4xl': '2000px',
                '5xl': '2250px',
                '6xl': '2500px',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
}
