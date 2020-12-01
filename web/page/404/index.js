import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import './index.less';

class NotFound extends React.PureComponent {
	render() {
		return (
			<>
				<Helmet>
					<title>~你似乎来到了没有知识的荒原~</title>
				</Helmet>
				<div className="min-h-404">
					<div className="body404 bg-white bg-auto">
						<div className="info404 text-center">
							<header id="header404" className="clearfix">
								<div className="site-name404 text-center tracking-widest text-9xl	font-light">404</div>
							</header>
							<section>
								<div className="title404 m-2">
									<p className="text-gray-400 text-2xl">你似乎来到了没有知识的荒原.</p>
								</div>
								<Link
									to="/"
									className="index404 mt-8 inline-block whitespace-nowrap cursor-pointer no-underline tracking-widest text-base leading-9 text-center px-6 border-2 border-solid	 border-gray-600 rounded-3xl font-medium bg-white text-gray-600">
									回到首页
								</Link>
							</section>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default NotFound;
