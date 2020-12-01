import React from 'react';
import PropTypes from 'prop-types';
import './index.less';
import loading from './loading.gif';
import { isEmpty } from '../utils';

class Img extends React.PureComponent {
	constructor(props) {
		super(props);
		this.handleOnLoad = this.handleOnLoad.bind(this);
		this.handleImageClick = this.handleImageClick.bind(this);
		this.state = {
			src: loading,
		};
	}

	handleImageClick(e) {
		const { onClick } = this.props;
		if (isEmpty(onClick) || typeof onClick !== 'function') {
			return;
		}
		this.props.onClick(e);
	}

	handleOnLoad(e) {
		this.setState({ src: e.target.dataset.src });
		const { onLoad } = this.props;
		if (isEmpty(onLoad) || typeof onLoad !== 'function') {
			return;
		}
		this.props.onLoad(e);
	}
	render() {
		const { src } = this.state;
		const { url, clsName, alt, isBrowser, index } = this.props;
		return (
			<img
				src={isBrowser ? src : url}
				data-src={url}
				alt={alt}
				data-key={index}
				className={clsName}
				onLoad={e => this.handleOnLoad(e)}
				onClick={e => this.handleImageClick(e)}
			/>
		);
	}
}

Img.propTypes = {
	url: PropTypes.string.isRequired,
	alt: PropTypes.string,
	clsName: PropTypes.string,
	onLoad: PropTypes.func,
	index: PropTypes.number,
	onClick: PropTypes.func,
	isBrowser: PropTypes.bool,
};

export default Img;
