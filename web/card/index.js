import React from 'react';
import PropTypes from 'prop-types';
import { formatFullDate, getRandomColor, isEmpty } from '@/utils';
import { markdown } from '@/markdown';
import './index.less';

class Card extends React.PureComponent {
	replaceTag(tag) {
		const arr = tag.split('#');
		arr.shift();
		arr.pop();
		return arr.join();
	}
	render() {
		const {
			content: { sourceContent, likes, createTime, nickname, tag },
		} = this.props;

		return (
			<div className="ziyan" style={{ transformOrigin: 'center top' }}>
				<div className="ziyan-content">
					<div className="ziyan-header">
						<span className="ziyan-username">{nickname}</span>
						<span className="ziyan-text">·</span>
						<span className="ziyan-date">{formatFullDate(createTime)}</span>
						{isEmpty(tag) ? (
							''
						) : (
							<span className="ziyan-label" style={{ backgroundColor: `${getRandomColor(tag)}`, color: 'white' }}>
								{this.replaceTag(tag)}
							</span>
						)}
					</div>
					<div className="ziyan-body markdown-body md-content">
						<div dangerouslySetInnerHTML={{ __html: markdown(sourceContent) }} />
					</div>
					<div className="ziyan-footer hidden">
						<a className="ziyan-icon ziyan-icon-like">
							<div className="ziyan-icon-wrap">
								<span className="iconfont icon-like" />
							</div>
							<span className="is-reaction-count">{likes}</span>
						</a>
						<a className="ziyan-icon ziyan-icon-comment">
							<div className="ziyan-icon-wrap">
								<span className="iconfont icon-comment" />
							</div>
							<span className="is-reaction-count">{likes}</span>
						</a>
					</div>
				</div>
			</div>
		);
	}
}

Card.propTypes = {
	content: PropTypes.object.isRequired,
};

export default Card;
