import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      fontFamily: {
        urbanist: ['var(--font-urbanist)', 'sans-serif'],
      },
    },
    backgroundImage: {
      'main-gradient': 'linear-gradient(180deg, rgba(231, 249, 253, 0) 0%, #E7F9FD 100%)'
    }
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        /* 100vh is a fallback for Opera, IE and etc. */
        '.h-full-screen': {
          height: ['100vh', '100dvh'],
        },
        '.min-h-full-screen': {
          minHeight: ['100vh', '100dvh'],
        },
      });
    }),
  ],
};

export default config;
