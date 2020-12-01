import React from 'react';
import PropTypes from 'prop-types';
import { http } from '@@/http';
import { Helmet } from 'react-helmet';
import { isEmpty } from '@/utils';
import Spinner from '@/spinner';
import Card from '@/card';
import More from '@/more';
import './index.less';

class Journals extends React.PureComponent {
	constructor(props) {
		super(props);
		this.handleMore = this.handleMore.bind(this);
		this.state = {
			page: 0,
			content: [],
			hasNext: false,
			clickMore: false,
			loading: false,
		};
	}

	async handleMore() {
		this.setState({ loading: true });
		const { page } = this.state;
		const res = await http.getJournals({ page: page + 1, size: 10 });
		if (res.status !== 200) {
			return;
		}
		const { content, hasNext } = res.data;
		this.setState({
			page: page + 1,
			clickMore: true,
			content,
			hasNext,
			loading: false,
		});
	}

	formatContent(journals) {
		const label = /#.*#/g;
		if (isEmpty(journals)) {
			return [];
		}
		return journals.map(journal => {
			const { sourceContent } = journal;
			if (isEmpty(sourceContent)) {
				return journal;
			}
			const tags = sourceContent.match(label);
			if (isEmpty(tags) || isEmpty(tags[0])) {
				return journal;
			}
			let tag = tags[0];
			const arr = sourceContent.replace(tag, '');
			return { ...journal, sourceContent: arr, tag };
		});
	}

	render() {
		const { journals, user } = this.props;
		if (isEmpty(journals)) {
			return <Spinner />;
		}
		const { clickMore, loading } = this.state;
		const { hasNext } = clickMore ? this.state : journals;
		const { content } = journals;
		const { nickname } = user;
		content.push(...this.state.content);
		const journalList = this.formatContent(content);
		return (
			<>
				<Helmet>
					<title>自言 | 知行志</title>
				</Helmet>
				<div className="mx-auto px-4 max-w-6xl tracking-wider md:leading-relaxed sm:leading-normal mx-800">
					<div>
						<div style={{ position: 'relative' }}>
							{isEmpty(journalList)
								? ''
								: journalList.map(ziyan => <Card content={{ nickname, ...ziyan }} key={ziyan.id} />)}
						</div>
					</div>
				</div>
				<nav className="pagination flex flex-row justify-center mt-8" role="navigation" aria-label="pagination">
					<More hasNext={hasNext} handleMore={() => this.handleMore()} loading={loading} />
				</nav>
			</>
		);
	}
}

Journals.propTypes = {
	journals: PropTypes.object,
	user: PropTypes.object,
};
Journals.getInitialProps = async ctx => {
	const journals = __isBrowser__
		? (await http.getJournals({ page: 0, size: 10 })).data
		: (await ctx.service.api.getJournals({ page: 0, size: 10 })).journals;
	const user = __isBrowser__ ? (await http.getUser()).data : (await ctx.service.api.getUser()).user;
	return Promise.resolve({ journals, user });
};

export default Journals;
