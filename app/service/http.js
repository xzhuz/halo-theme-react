const { api } = require('./axios-config');
const baseUrl = '/api/content';

const httpApi = {
	getSettings() {
		const url = `${baseUrl}/themes/activation/settings`;
		return api
			.get(url, {
				params: {},
			})
			.then(res => {
				return res.data;
			});
	},

	getOptions() {
		const url = `${baseUrl}/options/list_view`;
		return api
			.get(url, {
				params: {},
			})
			.then(res => {
				if (typeof res.data === 'undefined') {
					return new Map();
				}
				const options = res.data.data;
				const map = new Map();
				options.forEach(d => {
					map.set(d.key, d.value);
				});
				return { data: map };
			});
	},

	getUser() {
		const url = `${baseUrl}/users/profile`;
		return api
			.get(url, {
				params: {},
			})
			.then(res => {
				return res.data;
			});
	},
	getMenus() {
		const url = `${baseUrl}/menus/tree_view?sort=priority`;
		return api
			.get(url, {
				params: {},
			})
			.then(res => {
				return res.data;
			});
	},
	getPostList(param) {
		const url = `${baseUrl}/posts?sort=topPriority,desc`;
		return api
			.get(url, {
				params: { sort: 'createTime,desc', ...param },
			})
			.then(res => {
				return res.data;
			});
	},
	getCategoryPostBySlug(param) {
		const { slug } = param;
		const url = `${baseUrl}/categories/${slug}/posts?sort=topPriority,desc`;
		return api
			.get(url, {
				params: { sort: 'createTime,desc', ...param },
			})
			.then(res => {
				return res.data;
			});
	},
	getTagPostBySlug(param) {
		const { slug } = param;
		const url = `${baseUrl}/tags/${slug}/posts?sort=topPriority,desc`;
		return api
			.get(url, {
				params: { sort: 'createTime,desc', ...param },
			})
			.then(res => {
				return res.data;
			});
	},
	getPostDetail(postId) {
		const url = `${baseUrl}/posts/${postId}`;
		return api
			.get(url, {
				params: {
					formatDisabled: false,
					sourceDisabled: false,
				},
			})
			.then(res => {
				return res.data;
			});
	},
	getJournals(param) {
		const url = `${baseUrl}/journals`;
		return api
			.get(url, {
				params: {
					sort: 'createTime,desc',
					...param,
				},
			})
			.then(res => {
				return res.data;
			});
	},

	getArchives() {
		const url = `${baseUrl}/archives/years`;
		return api
			.get(url, {
				params: {},
			})
			.then(res => {
				return res.data;
			});
	},

	getLinks(param) {
		const url = `${baseUrl}/links/team_view`;
		return api
			.get(url, {
				params: { ...param },
			})
			.then(res => {
				return res.data;
			});
	},

	getGallery(param) {
		const url = `${baseUrl}/photos/latest`;
		return api
			.get(url, {
				params: { ...param },
			})
			.then(res => {
				return res.data;
			});
	},

	getSheet(slug) {
		const url = `${baseUrl}/sheets/slug`;
		return api
			.get(url, {
				params: {
					slug: slug,
					formatDisabled: false,
					sourceDisabled: false,
				},
			})
			.then(res => {
				return res.data;
			});
	},
};

exports.http = httpApi;
