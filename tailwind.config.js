/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    colors: {
      blue: {
        g: '#0000FF',
        5: '#006BDD',
        4: '#0093E9',
        3: '#00AEEF',
        2: '#66CEF5',
        1: '#CCEFFC',
      },
      red: {
        5: '#FF0000',
        1: '#FFE2E2',
      },
      black: {
        g: '#000000',
        5: '#4C4C4C',
        4: '#747474',
        3: '#A0A0A0',
        2: '#BABABA',
        1: '#fbfafaff',
        0: '#FFFFFF',
      },
    },
    extend: {
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      },
      boxShadow: {
        elevation:
          '0 2px 8px 0 rgba(0, 0, 0, 0.1), 0 1px 3px 0 rgba(0, 0, 0, 0.09)',
      },
    },
  },
  plugins: [],
};
