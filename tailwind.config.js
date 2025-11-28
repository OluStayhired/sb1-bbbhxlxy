/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            p: {
              marginTop: '0',
              marginBottom: '0',
            },
          },
        },
      },
    
    },
  },
  plugins: [require('@tailwindcss/typography'),
            require('@tailwindcss/aspect-ratio'),
           ],
};
