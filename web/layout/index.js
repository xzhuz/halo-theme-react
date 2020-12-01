import React from 'react';
import serialize from 'serialize-javascript';
import '@/assets/fonts.less';
import '@/assets/common.less';
import Header from '@/header';
import Footer from '@/footer';
import { isEmpty } from '@/utils';
import 'highlight.js/styles/atom-one-dark.css';
import './index.less';

const commonNode = props =>
	// 为了同时兼容ssr/csr请保留此判断，如果你的layout没有内容请使用 props.children ?  props.children  : ''
	props.children ? (
		<>
			{props.location === '/' ? (
				<>{props.children}</>
			) : (
				<>
					<Header location={props.location} menus={props.menus} />
					<main className="mx-auto pt-16 container">{props.children}</main>
					<Footer settings={props.settings} />
				</>
			)}
		</>
	) : (
		''
	);

const Layout = props => {
	const { home_title } = props.settings;
	const options = props.options;
	const blogTitle = typeof options === 'undefined' ? '' : options.get('blog_title');
	const keywords = typeof options === 'undefined' ? '' : options.get('seo_keywords');
	const description = typeof options === 'undefined' ? '' : options.get('seo_description');
	const blogFavicon = typeof options === 'undefined' ? '' : options.get('blog_favicon');
	if (__isBrowser__) {
		return commonNode(props);
	} else {
		const { serverData } = props.layoutData;
		const { injectCss, injectScript } = props.layoutData.app.config;
		return (
			<html lang="en">
				<head>
					<meta charSet="utf-8" />
					<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
					<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
					<link rel="shortcut icon" type="images/x-icon" href={blogFavicon} />
					<meta name="keywords" content={keywords} />
					<meta name="description" content={description} />
					<meta name="theme-color" content="#000000" />
					<title>{isEmpty(home_title) ? blogTitle : home_title}</title>
					{injectCss && injectCss.map(item => <link rel="stylesheet" href={item} key={item} />)}
				</head>
				<body>
					<div id="app">{commonNode(props)}</div>
					{serverData && (
						<script
							dangerouslySetInnerHTML={{
								__html: `window.__USE_SSR__=true; window.__INITIAL_DATA__ =${serialize(serverData)}`, // 使用pathname作为组件初始化数据的隔离，防止props污染
							}}
						/>
					)}
					<div
						dangerouslySetInnerHTML={{
							__html: injectScript && injectScript.join(''),
						}}
					/>
				</body>
			</html>
		);
	}
};

export default Layout;
