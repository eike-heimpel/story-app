/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'dominant-color': '#121010',
				'secondary-color': '#40494cc7',
				'accent-color': '#ecdb6c',
				"white": "#e8e8e8"
			}
		}
	},
	plugins: []
};