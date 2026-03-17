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
      animation: {
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
      },
      keyframes: {
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },         
    },
  },
  plugins: [require('@tailwindcss/typography'),
            require('@tailwindcss/aspect-ratio'),

            // Add this function below:
            function({ addBase }) {
              addBase({
                'html': { 
                  'zoom': '0.8', // Or '80%'
                  '-moz-transform': 'scale(0.8)', // Fallback for older Firefox versions
                  '-moz-transform-origin': 'top left',
                },
              })
            },
           ],
};
