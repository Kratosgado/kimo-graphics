import containerQueries, { config } from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import tailwindcssAnimate from 'tailwindcss-animate';
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';
import themes from 'daisyui/src/theming/themes'

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {

		},

		colors: {
			pcon: "#fff"
		}
	},
	daisyui: {
		themes: [
			{
				light: {
					...themes['light'],
					primary: 'green', // Override DaisyUI primary color
					// secondary: '#EC4899', // Override DaisyUI secondary color
					// accent: '#FBBF24', // Override DaisyUI accent color
					// neutral: '#374151', // Override DaisyUI neutral color
					// 'base-100': '#FFFFFF', // Override DaisyUI base background color
					// 'base-200': '#F3F4F6', // Override DaisyUI secondary background color
					// 'base-300': '#E5E7EB', // Override DaisyUI tertiary background color
					// success: '#10B981', // Override DaisyUI success color
					// warning: '#F59E0B', // Override DaisyUI warning color
					// error: '#EF4444' // Override DaisyUI error color
				},
			},
		],
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyui colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: '', // prefix for daisyui classnames (components, modifiers and responsive class names. not colors)
		logs: true, // shows info about daisyui version and used config in the console when building your css
		themeroot: ':root' // The element that receives theme color CSS variables
	},
	plugins: [typography, tailwindcssAnimate, forms, containerQueries, daisyui]
} satisfies Config;
