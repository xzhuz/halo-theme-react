'use strict';

const { http } = require('./http');
const { Service } = require('egg');

class ApiService extends Service {
	async index() {
		const posts = await http.getPostList({});
		return {
			posts: posts.data,
		};
	}

	async getPostList(data) {
		const posts = await http.getPostList(data);
		return {
			posts: posts.data,
		};
	}

	async getUser() {
		const user = await http.getUser();
		return { user: user.data };
	}

	async getOptions() {
		const options = await http.getOptions();
		return { options: options.data };
	}

	async getSettings() {
		const settings = await http.getSettings();
		return { settings: settings.data };
	}

	async menus() {
		const menus = await http.getMenus();
		return { menus: menus.data };
	}

	async getPost(id) {
		const post = await http.getPostDetail(id);
		return {
			post: post.data,
		};
	}

	async getJournals(param) {
		const journals = await http.getJournals(param);
		return {
			journals: journals.data,
		};
	}

	async getArchives() {
		const archives = await http.getArchives();
		return {
			archives: archives.data,
		};
	}

	async getLinks(param) {
		const links = await http.getLinks(param);
		return {
			links: links.data,
		};
	}

	async getGallery(param) {
		const gallery = await http.getGallery(param);
		return {
			gallery: gallery.data,
		};
	}

	async getCategoryPostBySlug(param) {
		const posts = await http.getCategoryPostBySlug(param);
		return {
			posts: posts.data,
		};
	}

	async getTagPostBySlug(param) {
		const posts = await http.getTagPostBySlug(param);
		return {
			posts: posts.data,
		};
	}
	async getSheet(slug) {
		const sheets = await http.getSheet(slug);
		return {
			sheets: sheets.data,
		};
	}
}

module.exports = ApiService;
