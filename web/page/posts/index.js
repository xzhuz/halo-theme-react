import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@/pagination';
import { Helmet } from 'react-helmet';
import List from '@/list';
import Spinner from '@/spinner';
import { isEmpty, getPostThumbnail } from '@/utils';
import { http } from '@@/http';
import './index.less';

class Page extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			content: [],
			hasPrevious: false,
			hasNext: false,
			pages: 1,
			pageClick: false,
			loading: false,
		};
	}

	async handlePageClick(data) {
		this.setState({ loading: true });
		const res = await http.getPostList(data);
		if (res.status !== 200) {
			return;
		}
		const { content, hasPrevious, hasNext, pages } = res.data;

		this.setState({
			content: content,
			hasPrevious: hasPrevious,
			hasNext: hasNext,
			pages: pages,
			pageClick: true,
			loading: false,
		});
	}

	render() {
		const { posts, isBrowser, settings } = this.props;
		if (isEmpty(posts)) {
			return <Spinner />;
		}
		const { loading, pageClick } = this.state;
		const { card_random_cover_list } = settings;
		const { content, hasPrevious, hasNext, pages } = pageClick ? this.state : posts;
		return (
			<>
				<Helmet>
					<title>文章 | 知行志</title>
				</Helmet>
				<div className={`mx-auto postList mx-850 ${loading ? 'min-h-main' : ''}`}>
					<div className="posts mt-4 pagination-container">
						{/*<h3>*/}
						{/*	<i className="iconfont icon-new list-brands" />*/}
						{/*	最新文章*/}
						{/*</h3>*/}
						<ul className="posts-list pl-0 ">
							{loading ? (
								<Spinner />
							) : (
								content.map(post => {
									const thumbnail = getPostThumbnail(post, card_random_cover_list);
									return <List post={{ ...post, thumbnail }} key={post.id} isBrowser={isBrowser} />;
								})
							)}
						</ul>
					</div>
				</div>
				<Pagination
					handlePageClick={data => this.handlePageClick(data)}
					hasNext={hasNext}
					hasPrevious={hasPrevious}
					pages={pages}
				/>
			</>
		);
	}
}

Page.propTypes = {
	posts: PropTypes.object,
	settings: PropTypes.object,
	isBrowser: PropTypes.bool,
};

Page.getInitialProps = async ctx => {
	// ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
	let posts = {};
	const data = { page: 0, size: 9 };
	if (__isBrowser__) {
		posts = (await http.getPostList(data)).data;
	} else {
		posts = (await ctx.service.api.getPostList(data)).posts;
	}
	posts = typeof posts === 'undefined' ? {} : posts;
	const settings = __isBrowser__ ? (await http.getSettings()).data : (await ctx.service.api.getSettings()).settings;
	const options = __isBrowser__ ? (await http.getOptions()).data : (await ctx.service.api.getOptions()).options;
	return Promise.resolve({ posts, isBrowser: __isBrowser__, settings, options });
};

export default Page;
