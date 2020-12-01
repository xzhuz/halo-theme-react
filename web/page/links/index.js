import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '@/spinner';
import { Helmet } from 'react-helmet';
import { isEmpty } from '@/utils';
import Link from '@/link';
import './index.less';
import { http } from '@@/http';

class Links extends React.PureComponent {
	render() {
		const { links, isBrowser } = this.props;
		if (isEmpty(links)) {
			return <Spinner />;
		}
		return (
			<>
				<Helmet>
					<title>有朋 | 知行志</title>
				</Helmet>
				<div className="mx-auto max-w-6xl tracking-wider mx-850">
					{links.map((item, index) => (
						<div key={index}>
							{isEmpty(item.team) ? '' : <h2 className="w-full m-4 text-3xl">{item.team}</h2>}
							<div className=" flex  flex-wrap">
								{item.links.map((link, index) => (
									<Link link={link} key={link.id + '' + index} isBrowser={isBrowser} />
								))}
							</div>
						</div>
					))}
				</div>
			</>
		);
	}
}
Links.propTypes = {
	links: PropTypes.array,
	isBrowser: PropTypes.bool,
};
Links.getInitialProps = async ctx => {
	const links = __isBrowser__ ? (await http.getLinks()).data : (await ctx.service.api.getLinks()).links;
	return Promise.resolve({ links, isBrowser: __isBrowser__ });
};

export default Links;
