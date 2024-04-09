const colors = require("tailwindcss/colors");

module.exports = {
	mode: "jit",
	darkMode: "class",
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				// Dark Mode Colors
				"dark-bg": "#1a1a1a",
				"dark-text": "#ffffff",
				"dark-primary": colors.blue[500],
				"dark-secondary": colors.green[500],
				"dark-highlight": colors.yellow[500],
				"dark-error": colors.red[500],

				// Light Mode Colors
				"light-bg": "#f3f4f6",
				"light-text": "#1f2937",
				"light-primary": colors.blue[500],
				"light-secondary": colors.green[500],
				"light-highlight": colors.yellow[500],
				"light-error": colors.red[500],
			},
		},
	},
	plugins: [require("tailwindcss-dark-mode")()],
};
