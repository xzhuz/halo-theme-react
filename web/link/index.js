import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '@/spinner';
import Img from '@/image';
import { isEmpty } from '@/utils';
import './index.less';

class Link extends React.PureComponent {
	render() {
		const { link, isBrowser } = this.props;
		if (isEmpty(link)) {
			return <Spinner />;
		}
		const { url, logo, name, description } = link;
		return (
			<a className="lk-card-im card-item-vel block" href={url} target="_blank">
				<div className="media">
					<div className="media-left">
						<figure className="image is-64x64">
							<Img clsName="lazyload w-full h-full" url={logo} alt={name} isBrowser={isBrowser} />
						</figure>
					</div>
					<div className="media-content">
						<p className="lk-title">{name}</p>
						<p className="lk-desc">{description}</p>
					</div>
				</div>
			</a>
		);
	}
}

Link.propTypes = {
	link: PropTypes.object.isRequired,
	isBrowser: PropTypes.bool.isRequired,
};

export default Link;
