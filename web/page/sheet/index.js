import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { http } from '@@/http';
import { isEmpty } from '@/utils';
import Comment from '@/comment';
import Spinner from '@/spinner';
import './index.less';

class Sheet extends React.PureComponent {
	render() {
		const { sheets } = this.props;
		if (isEmpty(sheets)) {
			return <Spinner />;
		}
		const { formatContent } = this.props.sheets;
		return (
			<>
				<Helmet>
					<title>{sheets.title} | 知行志</title>
				</Helmet>
				<div className=" mx-auto md-content px-4 max-w-6xl tracking-wider md:leading-relaxed sm:leading-normal ct-container cn-pd mx-800">
					<div dangerouslySetInnerHTML={{ __html: formatContent }} />
				</div>
				<div className="mx-auto px-4 mt-16 max-w-6xl tracking-wider md:leading-relaxed sm:leading-normal mx-800">
					<Comment fullPath={sheets.fullPath} title={sheets.title} />
				</div>
			</>
		);
	}
}

Sheet.propTypes = {
	sheets: PropTypes.object,
};
Sheet.getInitialProps = async ctx => {
	const slug = __isBrowser__ ? ctx.match.params.id : ctx.params.id;
	const sheets = __isBrowser__ ? (await http.getSheet(slug)).data : (await ctx.service.api.getSheet(slug)).sheets;
	return Promise.resolve({ sheets });
};

export default Sheet;
