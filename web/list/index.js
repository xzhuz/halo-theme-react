import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate2CHN, getDateDay, getFormatDateCHN, isEmpty } from '@/utils';
import Img from '@/image';
import './index.less';

class List extends React.PureComponent {
	render() {
		const {
			post: { id, createTime, title, summary, thumbnail, tags, topPriority },
			isBrowser,
		} = this.props;
		return (
			<li className="post relative list-none w-full pt-4 mt-0 inline-block">
				<div className="post-time-img mr-2 h-40 w-40 relative flex-shrink-0 overflow-hidden float-left">
					<div className="post-date color-gray-300 mt-2 font-bold text-center w-full h-full flex flex-col items-center justify-center">
						<b className="text-7xl">{getDateDay(createTime)}</b>
						<span className="block font-normal text-base pt-1">{getFormatDateCHN(createTime)}</span>
					</div>
					<div className="post-preview absolute w-full h-full top-0 left-0">
						<Link to={`/post/${id}`}>
							<Img clsName="lazyload w-full h-full" url={thumbnail} alt={title} isBrowser={isBrowser} />
						</Link>
					</div>
				</div>
				<div className="post-content pl-2 pt-0 float-left">
					<p className="post-mobile-date min-h-52 overflow-hidden m-0 ">
						<Link to={`/post/${id}`} rel="bookmark">
							{formatDate2CHN(createTime)}
						</Link>
					</p>
					<h2 className="text-2xl font-bold relative mb-3 pb-4 mt-0">
						<Link to={`/post/${id}`} className="block" rel="bookmark">
							{topPriority > 0 ? <i className="iconfont icon-zhiding zhiding" /> : ''}
							{title}
						</Link>
					</h2>
					<p className="text-lg break-all text-gray-400 leading-relaxed tracking-wider min-h-52 overflow-hidden leading-4 m-0 box">
						<Link to={`/post/${id}`} rel="bookmark">
							{summary}
						</Link>
					</p>
					<div className="post-meta flex flex-wrap items-center	mt-2">
						{isEmpty(tags)
							? ''
							: tags.map(tag => (
									<Link className="post-categories color-gray-500 mr-1 text-sm" to={`/tags/${tag.slug}`} key={tag.id}>
										<i className="iconfont icon-tag" style={{ fontSize: '12px' }} />
										{tag.name} ·
									</Link>
							  ))}
						<Link className="post-more-link color-gray-600 inline-block text-base" to={`/post/${id}`}>
							<span className="text opacity-0 m-0 text-sm font-bold max-w-0 overflow-hidden inline-block align-text-bottom break-normal">
								查看全文
							</span>
						</Link>
					</div>
				</div>
			</li>
		);
	}
}
List.propTypes = {
	post: PropTypes.object.isRequired,
	isBrowser: PropTypes.bool,
};

export default List;
