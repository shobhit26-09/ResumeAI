import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Apple-inspired colors with lighter dark mode variants
				blue: {
					light: '#99CCFF',
					DEFAULT: '#0071E3',
					dark: '#60A5FA'
				},
				coral: {
					light: '#FF9F87',
					DEFAULT: '#FF453A',
					dark: '#FF7B70'
				},
				mint: {
					light: '#86E9C9',
					DEFAULT: '#34C759',
					dark: '#4AE583'
				},
				indigo: {
					light: '#A5A3FF',
					DEFAULT: '#5E5CE6',
					dark: '#8281FF'
				},
				orange: {
					light: '#FFBE85',
					DEFAULT: '#FF9500',
					dark: '#FFAD33'
				},
				teal: {
					light: '#8FD7E9',
					DEFAULT: '#5AC8FA',
					dark: '#7DDDFF'
				},
				// New vibrant colors for dark mode
				yellow: {
					light: '#FFF9C4',
					DEFAULT: '#FFEB3B',
					dark: '#FFD60A'
				},
				purple: {
					light: '#E1BEE7',
					DEFAULT: '#9C27B0',
					dark: '#D580FF'
				},
				cyan: {
					light: '#B2EBF2',
					DEFAULT: '#00BCD4',
					dark: '#30F2F2'
				},
				pink: {
					light: '#F8BBD0',
					DEFAULT: '#E91E63',
					dark: '#FF6B9E'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				fadeIn: {
					from: { opacity: '0' },
					to: { opacity: '1' },
				},
				slideIn: {
					from: { transform: 'translateY(20px)', opacity: '0' },
					to: { transform: 'translateY(0)', opacity: '1' },
				},
				pulse: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' },
				},
				glow: {
					'0%, 100%': {
						boxShadow: '0 0 5px rgba(139, 92, 246, 0.3)'
					},
					'50%': {
						boxShadow: '0 0 20px rgba(139, 92, 246, 0.6)'
					}
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				scale: {
					'0%': { transform: 'scale(0.95)' },
					'100%': { transform: 'scale(1)' }
				},
        "logo-glow": {
          "0%": { 
            filter: "grayscale(1)",
            transform: "scale(1)",
            opacity: "0.7"
          },
          "25%": { 
            filter: "grayscale(0)",
            transform: "scale(1.1)",
            opacity: "1"
          },
          "50%": { 
            filter: "grayscale(0)",
            transform: "scale(1.1)",
            opacity: "1"
          },
          "75%": { 
            filter: "grayscale(0.5)",
            transform: "scale(1.05)",
            opacity: "0.9"
          },
          "100%": { 
            filter: "grayscale(1)",
            transform: "scale(1)",
            opacity: "0.7"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in": "slideIn 0.5s ease-in-out",
        "pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "scale": "scale 0.3s ease-in-out",
        "logo-glow": "logo-glow 4s ease-in-out infinite"
      },
    },
  },
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
