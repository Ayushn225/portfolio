/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Every colour is a CSS variable defined in src/index.css,
      // with one set for light mode and one for dark mode.
      colors: {
        bg: v('bg'),
        surface: v('surface'),
        raised: v('raised'),
        line: v('line'),
        fg: v('fg'),
        muted: v('muted'),
        accent: v('accent'),
        'accent-fg': v('accent-fg'),
        accent2: v('accent2'),
        easy: v('easy'),
        medium: v('medium'),
        hard: v('hard'),
      },
      fontFamily: {
        display: ['Anton', 'Impact', '"Arial Narrow"', 'sans-serif'],
        cond: ['"Roboto Condensed"', '"Arial Narrow"', 'sans-serif'],
        sans: ['"Open Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        marquee: { to: { transform: 'translateX(-50%)' } },
        blink: { '50%': { opacity: '0' } },
        rise: { from: { transform: 'translateY(110%)' }, to: { transform: 'translateY(0)' } },
        pulse_ring: { '0%': { transform: 'scale(1)', opacity: '.6' }, '100%': { transform: 'scale(2.4)', opacity: '0' } },
        wipe: { from: { transform: 'scaleX(0)' }, to: { transform: 'scaleX(1)' } },
        slidein: { from: { transform: 'translateX(100%)' }, to: { transform: 'translateX(0)' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        blink: 'blink 1s step-end infinite',
        rise: 'rise .9s cubic-bezier(.2,.8,.2,1) both',
        'pulse-ring': 'pulse_ring 1.8s ease-out infinite',
        wipe: 'wipe .8s cubic-bezier(.7,0,.2,1) both',
        slidein: 'slidein .5s cubic-bezier(.2,.8,.2,1) both',
      },
    },
  },
  plugins: [],
}
