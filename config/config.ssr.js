const resolvePath = path => require('path').resolve(__dirname, path);

module.exports = {
	type: 'ssr', // 指定运行类型可设置为csr切换为客户端渲染
	routes: [
		{
			path: '/',
			exact: true,
			Component: () => require('@/page/index').default, // 这里使用一个function包裹为了让它延迟require
			controller: 'page',
			handler: 'index',
		},
		{
			path: '/posts',
			exact: true,
			Component: () => require('@/page/posts').default, // 这里使用一个function包裹为了让它延迟require
			controller: 'page',
			handler: 'index',
		},
		{
			path: '/post/:id',
			exact: true,
			Component: () => require('@/page/post').default,
			controller: 'page',
			handler: 'index',
		},
		{
			path: '/journals',
			exact: true,
			Component: () => require('@/page/journals').default,
			controller: 'page',
			handler: 'index',
		},
		{
			path: '/archives',
			exact: true,
			Component: () => require('@/page/archives').default,
			controller: 'page',
			handler: 'index',
		},
		{
			path: '/categories/:slug',
			exact: true,
			Component: () => require('@/page/categories').default,
			controller: 'page',
			handler: 'index',
		},
		{
			path: '/tags/:slug',
			exact: true,
			Component: () => require('@/page/tags').default,
			controller: 'page',
			handler: 'index',
		},
		{
			path: '/links',
			exact: true,
			Component: () => require('@/page/links').default,
			controller: 'page',
			handler: 'index',
		},
		{
			path: '/photos',
			exact: true,
			Component: () => require('@/page/photos').default,
			controller: 'page',
			handler: 'index',
		},
		{
			path: '/s/:id',
			exact: true,
			Component: () => require('@/page/sheet').default,
			controller: 'page',
			handler: 'index',
		},
		{
			path: '/**',
			exact: true,
			Component: () => require('@/page/404').default,
			controller: 'page',
			handler: 'index',
		},
	],
	baseDir: resolvePath('../'),
	injectCss: [`/static/css/Page.chunk.css`], // 客户端需要加载的静态样式表
	injectScript: [
		`<script src='/static/js/runtime~Page.js'></script>`,
		`<script src='/static/js/vendor.chunk.js'></script>`,
		`<script src='/static/js/Page.chunk.js'></script>`,
	], // 客户端需要加载的静态资源文件表
	serverJs: resolvePath(`../dist/Page.server.js`),
	layout: resolvePath(`../dist/Layout.server.js`),
	useCDN: false,
};
