/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Every colour comes from a CSS variable in src/index.css.
      // Change --accent there to re-theme the whole site.
      colors: {
        bg: v('bg'),
        surface: v('surface'),
        raised: v('raised'),
        line: v('line'),
        fg: v('fg'),
        muted: v('muted'),
        accent: v('accent'),
        'accent-fg': v('accent-fg'),
        easy: v('easy'),
        medium: v('medium'),
        hard: v('hard'),
      },
      fontFamily: {
        display: ['Unbounded', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        marquee: { to: { transform: 'translateX(-50%)' } },
        blink: { '50%': { opacity: '0' } },
        rise: { from: { transform: 'translateY(110%)' }, to: { transform: 'translateY(0)' } },
        pulse_ring: { '0%': { transform: 'scale(1)', opacity: '.6' }, '100%': { transform: 'scale(2.4)', opacity: '0' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        blink: 'blink 1s step-end infinite',
        rise: 'rise .9s cubic-bezier(.2,.8,.2,1) both',
        'pulse-ring': 'pulse_ring 1.8s ease-out infinite',
      },
    },
  },
  plugins: [],
}
