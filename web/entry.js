import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, StaticRouter, Route, Switch } from 'react-router-dom';
import defaultLayout from '@/layout';
import { isEmpty } from '@/utils';
import { http } from '@@/http';
import { getWrappedComponent, getComponent } from 'ykfe-utils';
import { routes as Routes } from '../config/config.ssr';
const clientRender = async () => {
	const menu = (await http.getMenus()).data;
	const settings = (await http.getSettings()).data;
	const options = (await http.getOptions()).data;
	const blogTitle = typeof options === 'undefined' ? '' : options.get('blog_title');
	const { home_title } = settings;
	// 客户端渲染||hydrate
	ReactDOM[window.__USE_SSR__ ? 'hydrate' : 'render'](
		<BrowserRouter>
			<Switch>
				{
					// 使用高阶组件getWrappedComponent使得csr首次进入页面以及csr/ssr切换路由时调用getInitialProps
					Routes.map(({ path, exact, Component }) => {
						const ActiveComponent = Component();
						const Layout = ActiveComponent.Layout || defaultLayout;
						const WrappedComponent = getWrappedComponent(ActiveComponent);
						return (
							<Route
								exact={exact}
								key={path}
								path={path}
								render={() => (
									<Layout
										key={window.location.pathname}
										location={window.location.pathname}
										menus={menu}
										options={options}
										settings={{ ...settings, home_title: isEmpty(home_title) ? blogTitle : home_title }}>
										<WrappedComponent />
									</Layout>
								)}
							/>
						);
					})
				}
			</Switch>
		</BrowserRouter>,
		document.getElementById('app')
	);

	if (process.env.NODE_ENV === 'development' && module.hot) {
		module.hot.accept();
	}
};

const serverRender = async ctx => {
	// 服务端渲染 根据ctx.path获取请求的具体组件，调用getInitialProps并渲染
	const ActiveComponent = getComponent(Routes, ctx.path)();
	const Layout = ActiveComponent.Layout || defaultLayout;
	const serverData = ActiveComponent.getInitialProps ? await ActiveComponent.getInitialProps(ctx) : {};
	ctx.serverData = serverData;
	const menus = (await ctx.service.api.menus()).menus;
	const settings = (await ctx.service.api.getSettings()).settings;
	const options = (await ctx.service.api.getOptions()).options;
	const blogTitle = typeof options === 'undefined' ? '' : options.get('blog_title');
	const { home_title } = settings;
	return (
		<StaticRouter location={ctx.req.url} context={serverData}>
			<Layout
				layoutData={ctx}
				location={ctx.req.url}
				menus={menus}
				settings={{ ...settings, home_title: isEmpty(home_title) ? blogTitle : home_title }}
				options={options}>
				<ActiveComponent {...serverData} />
			</Layout>
		</StaticRouter>
	);
};

export default __isBrowser__ ? clientRender() : serverRender;
