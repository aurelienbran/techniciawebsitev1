/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'background-primary': 'var(--background-primary)',
        'background-secondary': 'var(--background-secondary)',
        'accent-primary': 'var(--accent-primary)',
        'accent-secondary': 'var(--accent-secondary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-light': 'var(--text-light)',
        'border-color': 'var(--border-color)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--text-primary)',
            a: {
              color: 'var(--accent-primary)',
              '&:hover': {
                color: 'var(--accent-secondary)',
              },
            },
            strong: {
              color: 'var(--text-primary)',
            },
            h1: {
              color: 'var(--text-primary)',
            },
            h2: {
              color: 'var(--text-primary)',
            },
            h3: {
              color: 'var(--text-primary)',
            },
            h4: {
              color: 'var(--text-primary)',
            },
            code: {
              color: 'var(--accent-primary)',
              backgroundColor: 'var(--background-secondary)',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
      boxShadow: {
        'card': '0 4px 12px rgba(19, 36, 76, 0.05)',
        'card-hover': '0 8px 20px rgba(19, 36, 76, 0.08)',
      },
      fontFamily: {
        sans: ['Futura PT', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};