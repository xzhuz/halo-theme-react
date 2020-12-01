module.exports = {
	purge: {
		layers: ['components', 'utilities'],
		content: ['./web/**/*.js', './web/page/**/*.js'],
	},
	theme: {
		screens: {
			laptop: '800px',
		},
		extend: {},
	},
	variants: {},
	plugins: [],
};
