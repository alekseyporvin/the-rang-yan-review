/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f9f7f3',
        'paper-dark': '#f0ede6',
        ink: '#1a1916',
        'ink-secondary': '#4a4840',
        'ink-muted': '#8a877f',
        burgundy: '#7c2d3e',
        'burgundy-dark': '#6b2535',
        'burgundy-light': '#9e3d51',
        border: '#e4e0d8',
        'border-light': '#eeebe4',
        surface: '#ffffff',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', '"Times New Roman"', 'serif'],
        'serif-body': ['"Lora"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'headline': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'title': ['1.75rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'article': ['1.125rem', { lineHeight: '1.75' }],
      },
      maxWidth: {
        prose: '68ch',
        'prose-wide': '80ch',
        layout: '1200px',
      },
      spacing: {
        section: '6rem',
        'section-sm': '4rem',
      },
      typography: (theme) => ({
        journal: {
          css: {
            '--tw-prose-body': theme('colors.ink'),
            '--tw-prose-headings': theme('colors.ink'),
            '--tw-prose-links': theme('colors.burgundy'),
            '--tw-prose-bold': theme('colors.ink'),
            '--tw-prose-counters': theme('colors.ink-secondary'),
            '--tw-prose-bullets': theme('colors.ink-secondary'),
            '--tw-prose-hr': theme('colors.border'),
            '--tw-prose-quotes': theme('colors.ink-secondary'),
            '--tw-prose-quote-borders': theme('colors.burgundy'),
            '--tw-prose-captions': theme('colors.ink-muted'),
            '--tw-prose-code': theme('colors.ink'),
            '--tw-prose-pre-code': theme('colors.paper'),
            '--tw-prose-pre-bg': theme('colors.ink'),
            '--tw-prose-th-borders': theme('colors.border'),
            '--tw-prose-td-borders': theme('colors.border-light'),
            fontFamily: theme('fontFamily.serif-body').join(', '),
            fontSize: '1.125rem',
            lineHeight: '1.8',
            'p + p': { marginTop: '1.5em' },
            'h2, h3, h4': { fontFamily: theme('fontFamily.serif').join(', ') },
          },
        },
      }),
    },
  },
  plugins: [],
};
