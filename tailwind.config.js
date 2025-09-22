/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        jarvis: {
          accent: '#9CE5E7',
          bg: '#0A0F1A',
          bg2: '#10131A',
          text: '#E6F7FF',
          secondary: '#A18FFF',
        },
        highlight: '#9CE5E7',
        highlightSecondary: '#7DD3D6',
        body: '#C8D8E4',
        background: '#000000',
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        orbitron: ['Orbitron', 'sans-serif'],
        silkscreen: ['Silkscreen', 'cursive'],
        vt: ['VT323', 'monospace'],
        robotoMono: ['Roboto Mono', 'monospace'],
        sharetech: ['Share Tech Mono', 'monospace'],
        techmono: ['Share Tech Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-in-up': 'fade-in-up 1.2s ease-out forwards',
        'typing': 'typing 2s steps(40, end) forwards',
        'blink': 'blink 1s infinite',
        'flicker': 'flicker 0.5s ease-in-out',
        'power-on': 'power-on 1.5s ease-out forwards',
        'scan-line': 'scan-line 2s ease-in-out',
        'scroll': 'scroll 30s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'typing': {
          '0%': {
            width: '0',
          },
          '100%': {
            width: '100%',
          },
        },
        'blink': {
          '0%, 50%': {
            opacity: '1',
          },
          '51%, 100%': {
            opacity: '0',
          },
        },
        'flicker': {
          '0%, 100%': {
            opacity: '1',
            textShadow: '0 0 5px #9CE5E7, 0 0 10px #9CE5E7, 0 0 15px #9CE5E7',
          },
          '10%, 90%': {
            opacity: '0.8',
            textShadow: '0 0 2px #9CE5E7, 0 0 5px #9CE5E7',
          },
          '20%, 80%': {
            opacity: '0.9',
            textShadow: '0 0 8px #9CE5E7, 0 0 15px #9CE5E7, 0 0 20px #9CE5E7',
          },
          '30%, 70%': {
            opacity: '0.7',
            textShadow: '0 0 3px #9CE5E7, 0 0 7px #9CE5E7',
          },
          '40%, 60%': {
            opacity: '1',
            textShadow: '0 0 10px #9CE5E7, 0 0 20px #9CE5E7, 0 0 30px #9CE5E7',
          },
          '50%': {
            opacity: '0.6',
            textShadow: '0 0 1px #9CE5E7',
          },
        },
        'power-on': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.8) translateY(20px)',
          },
          '50%': {
            opacity: '0.5',
            transform: 'scale(1.1) translateY(-5px)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
        },
        'scan-line': {
          '0%': {
            transform: 'translateY(-100%)',
            opacity: '0',
          },
          '50%': {
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(100%)',
            opacity: '0',
          },
        },
        'scroll': {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(-50%)',
          },
        },
        'glow': {
          '0%, 100%': {
            textShadow: '0 0 5px #9CE5E7, 0 0 10px #9CE5E7, 0 0 15px #9CE5E7',
          },
          '50%': {
            textShadow: '0 0 10px #9CE5E7, 0 0 20px #9CE5E7, 0 0 30px #9CE5E7',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
      },
      textShadow: {
        'neon': '0 0 5px #9CE5E7, 0 0 10px #9CE5E7, 0 0 15px #9CE5E7',
        neon: '0 0 8px #9CE5E7, 0 0 16px #9CE5E7',
      },
      boxShadow: {
        'neon': '0 0 5px #9CE5E7, 0 0 10px #9CE5E7, 0 0 15px #9CE5E7',
        'neon-inset': 'inset 0 0 10px rgba(156, 229, 231, 0.1)',
        'neon': '0 0 8px #9CE5E7, 0 0 16px #9CE5E7',
      },
    },
  },
  plugins: [],
}

