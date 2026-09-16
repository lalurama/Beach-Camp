import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
                display: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                brand: {
                    primary: '#E37434',
                    'primary-dark': '#B85723',
                    secondary: '#F6F3C2',
                    bg: '#FFFBF2',
                    text: '#2B2116',
                    'text-muted': '#6B5D4F',
                    teal: '#1F6E63',
                    success: '#4C7A3D',
                    warning: '#C98A1B',
                    error: '#B3402C',
                },
            },
        },
    },

    plugins: [forms],
};
