import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { http } from '@@/http';
import { isEmpty, getFormatDate, getDateMonth } from '@/utils';
import Spinner from '@/spinner';
import './index.less';

class Archives extends React.PureComponent {
	render() {
		const { archives } = this.props;
		if (isEmpty(archives)) {
			return <Spinner />;
		}
		return (
			<>
				<Helmet>
					<title>归档 | 知行志</title>
				</Helmet>
				<div className="mx-auto px-4 mt-8 max-w-6xl tracking-wider md:leading-relaxed sm:leading-normal mx-800">
					{archives.map(archive => (
						<section className="arch-year" key={Math.random() * archive.year}>
							<h1 className="year-title bg-fff relative">{archive.year}</h1>
							<div className="relative pl-12">{this.getArchivePosts(archive)}</div>
						</section>
					))}
				</div>
			</>
		);
	}

	getArchivePosts(archive) {
		let month = '';
		return (
			<>
				{archive.posts.map(post => {
					let showMonth = true;
					const current = getDateMonth(post.createTime);
					if (month === current) {
						showMonth = false;
					} else {
						month = current;
					}
					return this.getArchivePostItem(showMonth, post);
				})}
			</>
		);
	}

	getArchivePostItem(showMonth, post) {
		return (
			<span key={post.id}>
				{showMonth ? (
					<header className="absolute mh-hd bg-fff af-bg-fff mh-bg "> {getDateMonth(post.createTime)} 月</header>
				) : (
					''
				)}
				<Link key={post.id} to={`/post/${post.id}`} className="ah-hf ah-hv base-color">
					<span className="ah-dt">{getFormatDate(post.createTime)}</span>
					<span className="ah-tt">{post.title}</span>
				</Link>
			</span>
		);
	}
}

Archives.propTypes = {
	archives: PropTypes.array,
};
Archives.getInitialProps = async ctx => {
	const archives = __isBrowser__ ? (await http.getArchives()).data : (await ctx.service.api.getArchives()).archives;
	return Promise.resolve({ archives });
};

export default Archives;
