tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Rajdhani', 'sans-serif'],
                display: ['Rajdhani', 'sans-serif'],
                mono: ['Share Tech Mono', 'monospace'],
            },
            colors: {
                primary: '#00FF41',
                'primary-dim': '#00cc33',
                dark: '#000000',
                'dark-card': '#0f0f0f',
                'dark-mid': '#0a0a0a',
                'dark-border': '#1a1a1a',
                neon: '#00FF41',
            },
            animation: {
                'float': 'float 5s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'scan': 'scan 3s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                scan: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(100vh)' },
                },
            },
            boxShadow: {
                'neon': '0 0 15px rgba(0, 255, 65, 0.4)',
                'neon-lg': '0 0 30px rgba(0, 255, 65, 0.3), 0 0 60px rgba(0, 255, 65, 0.15)',
            },
        }
    }
}