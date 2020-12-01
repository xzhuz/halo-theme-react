import React from 'react';
import PropTypes from 'prop-types';
import Pagination from '@/pagination';
import { Helmet } from 'react-helmet';
import List from '@/list';
import Spinner from '@/spinner';
import { isEmpty, getPostThumbnail } from '@/utils';
import { http } from '@@/http';
import './index.less';

class Tags extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			content: [],
			hasPrevious: false,
			hasNext: false,
			pages: 1,
			pageClick: false,
		};
	}
	async handlePageClick(data) {
		const { slug } = this.props;
		if (isEmpty(slug)) {
			return;
		}
		const res = await http.getTagPostBySlug({ slug, ...data });
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
		});
	}

	render() {
		const { posts, slug, settings, isBrowser } = this.props;
		if (isEmpty(posts)) {
			return <Spinner />;
		}
		const { card_random_cover_list } = settings;
		const { content, hasPrevious, hasNext, pages } = this.state.pageClick ? this.state : posts;
		return (
			<>
				<Helmet>
					<title>{slug} | 知行志</title>
				</Helmet>
				<div className="container mx-auto px-4 content-container postList mx-850">
					<h3 style={{ marginTop: `1rem`, marginBottom: '1rem' }}>{slug}</h3>
					<div className="posts mt-4 pagination-container">
						<ul className="posts-list">
							{content.map(post => {
								const thumbnail = getPostThumbnail(post, card_random_cover_list);
								return <List post={{ ...post, thumbnail }} key={post.id} isBrowser={isBrowser} />;
							})}
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

Tags.propTypes = {
	posts: PropTypes.object,
	slug: PropTypes.string,
	settings: PropTypes.object,
	isBrowser: PropTypes.bool,
};

Tags.getInitialProps = async ctx => {
	const slug = __isBrowser__ ? ctx.match.params.slug : ctx.params.slug;
	// ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
	let posts = {};
	if (__isBrowser__) {
		posts = (await http.getTagPostBySlug({ slug, page: 0, size: 9 })).data;
	} else {
		posts = (await ctx.service.api.getTagPostBySlug({ slug, page: 0, size: 9 })).posts;
	}
	posts = typeof posts === 'undefined' ? {} : posts;
	const settings = __isBrowser__ ? (await http.getSettings()).data : (await ctx.service.api.getSettings()).settings;
	return Promise.resolve({ posts, slug, settings, isBrowser: __isBrowser__ });
};
export default Tags;
