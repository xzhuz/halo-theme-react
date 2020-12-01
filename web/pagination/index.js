import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import './index.less';

class Pagination extends React.PureComponent {
	handlePageClick(data) {
		const { selected } = data;
		this.props.handlePageClick({ size: 9, page: selected });
	}
	render() {
		const { hasPrevious, hasNext, pages } = this.props;
		return (
			<nav className="pagination flex flex-row justify-center mt-8" role="navigation" aria-label="pagination">
				<ReactPaginate
					previousLabel={hasPrevious ? <span className="iconfont icon-left"> </span> : ''}
					nextLabel={hasNext ? <span className="iconfont icon-right"> </span> : ''}
					previousLinkClassName={'pagination-circle'}
					nextLinkClassName={'pagination-circle'}
					onPageChange={data => this.handlePageClick(data)}
					containerClassName={'pagination-list flex flex-row'}
					pageClassName={''}
					breakLabel={'...'}
					breakLinkClassName={'pagination-break'}
					pageLinkClassName={'pagination-circle'}
					activeLinkClassName={'is-current'}
					pageCount={pages}
					// initialPage={1}
					pageRangeDisplayed={3}
					marginPagesDisplayed={2}
				/>
			</nav>
		);
	}
}

Pagination.propTypes = {
	hasPrevious: PropTypes.bool.isRequired,
	hasNext: PropTypes.bool.isRequired,
	pages: PropTypes.number.isRequired,
	handlePageClick: PropTypes.func.isRequired,
};

export default Pagination;
