import React from 'react';
import PropTypes from 'prop-types';
import DisqusJS from 'disqusjs';
import 'disqusjs/dist/disqusjs.css';

class Comment extends React.PureComponent {
	componentDidMount() {
		const { fullPath, title } = this.props;
		new DisqusJS({
			shortname: '',
			siteName: '',
			identifier: `${fullPath}`,
			url: `${fullPath}`,
			title: `${title}`,
			api: 'https://disqus.skk.moe/disqus/',
			apikey: 'This is api key',
			admin: '',
			adminLabel: '',
		});
	}

	render() {
		return <div id="disqus_thread" />;
	}
}

Comment.propTypes = {
	fullPath: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default Comment;
