import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { http } from '@@/http';
import Spinner from '@/spinner';
import List from '@/list';
import { isEmpty } from '@/utils';
import './index.less';

class Index extends React.PureComponent {
	getPostThumbnail(post, card_random_cover_list) {
		const { thumbnail } = post;
		if (!isEmpty(thumbnail)) {
			return thumbnail;
		}
		if (isEmpty(card_random_cover_list)) {
			return '';
		}
		const imageList = card_random_cover_list.split(';');
		if (isEmpty(imageList)) {
			return '';
		}
		const random = Math.floor(Math.random() * (100 - 1 + 1) + 1);
		const index = random % imageList.length;
		return imageList[index];
	}

	render() {
		const { settings, user, posts, isBrowser } = this.props;
		if (isEmpty(posts)) {
			return <Spinner />;
		}
		const homeCover = !isEmpty(settings)
			? settings.home_cover
			: 'https://cdn.jsdelivr.net/gh/xzzai/static@master/uPic/default-bg.jpg';
		const homeTitle = !isEmpty(settings) ? settings.home_title : '';
		const description = !isEmpty(settings) ? settings.home_description : '';
		const avatar = !isEmpty(user) ? user.avatar : '';
		const { card_random_cover_list } = settings;
		const { content } = posts;
		return (
			<>
				<div
					className="bg-cover home-cover filter-dim centerbg"
					style={{
						backgroundImage: `url(${homeCover})`,
						height: '100vh',
						backgroundPosition: 'center center',
					}}>
					<div className="wapper">
						<div className="card-inner">
							<header>
								<img src={avatar} width="80" height="80" alt="avatar" />
								<h1 className="font-normal">{homeTitle}</h1>
								<h2 id="signature" className="font-normal" style={{ margin: '1em auto' }}>
									{description}
								</h2>
							</header>
							<ul>
								<li>
									<Link to="/posts">
										<i className="iconfont icon-write icon" />
										<span>文章</span>
									</Link>
								</li>
								<li>
									<Link to="/journals">
										<i className="iconfont icon-kapian icon" />
										<span>自言</span>
									</Link>
								</li>
								<li>
									<Link to="/s/about">
										<i className="iconfont icon-liebiao  icon" />
										<span>关于</span>
									</Link>
								</li>
								<li>
									<a href="https://github.com/xzhuz" aria-label="Github" target="_blank">
										<i className="iconfont icon-github icon" />
										<span>Github</span>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div>
					<ul className="posts-list hidden">
						{content.map(post => {
							const thumbnail = this.getPostThumbnail(post, card_random_cover_list);
							return <List post={{ ...post, thumbnail }} key={post.id} isBrowser={isBrowser} />;
						})}
					</ul>
				</div>
			</>
		);
	}
}
Index.propTypes = {
	settings: PropTypes.object,
	user: PropTypes.object,
	posts: PropTypes.object,
	isBrowser: PropTypes.bool,
};

Index.getInitialProps = async ctx => {
	// ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
	let settings = {};
	let user = {};
	let posts = {};
	if (__isBrowser__) {
		settings = (await http.getSettings()).data;
		user = (await http.getUser()).data;
		posts = (await http.getPostList({})).data;
	} else {
		settings = (await ctx.service.api.getSettings()).settings;
		user = (await ctx.service.api.getUser()).user;
		const index = await ctx.service.api.index();
		posts = index.posts;
	}
	return Promise.resolve({ settings, user, posts, isBrowser: __isBrowser__ });
};

export default Index;
