import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '@/spinner';
import './index.less';
class More extends React.PureComponent {
	constructor(props) {
		super(props);
		this.handleMore = this.handleMore.bind(this);
	}

	handleMore() {
		this.props.handleMore();
	}

	getContent() {
		const { hasNext, loading } = this.props;
		if (loading) {
			return <Spinner />;
		}
		if (hasNext) {
			return (
				<div className="sbtn diag-btn more-btn see-more" role="button" onClick={() => this.handleMore()}>
					查看更多
				</div>
			);
		}
		return <p style={{ color: '#cccccc' }}>~你已经到底了~</p>;
	}
	render() {
		return <div className="pagination-list flex flex-row ">{this.getContent()}</div>;
	}
}

More.propTypes = {
	hasNext: PropTypes.bool.isRequired,
	handleMore: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
};

export default More;
