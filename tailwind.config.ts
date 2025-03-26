import containerQueries, { config } from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import tailwindcssAnimate from 'tailwindcss-animate';
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: ['dark'], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
		darktheme: 'dark', // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyui colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: '', // prefix for daisyui classnames (components, modifiers and responsive class names. not colors)
		logs: true, // shows info about daisyui version and used config in the console when building your css
		themeroot: ':root' // The element that receives theme color CSS variables
	},
	plugins: [typography, tailwindcssAnimate, forms, containerQueries, daisyui]
} satisfies Config;
