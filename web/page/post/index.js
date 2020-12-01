import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { http } from '@@/http';
import { isEmpty, formatFullDate } from '@/utils';
import { markdown } from '@/markdown';
import { lineNumbersBlock } from '@/lineNumber';
import Comment from '@/comment';
import Sponsor from '@/sponsor';
import Spinner from '@/spinner';
import './index.less';

class Post extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			lineNumber: false,
		};
	}
	getTagItem(id, name, isTag) {
		const path = isTag ? 'tags' : 'categories';
		return (
			<Link to={`/${path}/${id}`} className="mt-2 mb-2 mr-2" key={id}>
				· {name}
			</Link>
		);
	}

	getTagsAndCategory(tags, isTag) {
		if (isEmpty(tags)) {
			return '';
		}
		const icon = isTag ? 'tag' : 'folder';
		return (
			<>
				<i className={`iconfont icon-${icon}`} style={{ fontSize: '12px', lineHeight: '36px' }} />
				{tags.map(tag => this.getTagItem(tag.slug, tag.name, isTag))}
			</>
		);
	}

	componentDidMount() {
		this.lightLineNumber();
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		// 主要是判断是否有渲染 行号
		const codes = document.querySelectorAll('.md-content pre>code[class*="language-"]>span[class*="hljs-"]');
		if (!isEmpty(codes)) {
			this.lightLineNumber();
		}
	}

	lightLineNumber() {
		if (typeof document === 'undefined') {
			return;
		}
		const codes = document.querySelectorAll('.md-content pre>code[class*="language-"]');
		if (isEmpty(codes)) {
			return;
		}
		for (let i = 0; i < codes.length; i++) {
			lineNumbersBlock(codes[i]);
		}
	}

	render() {
		const { post, settings } = this.props;
		if (isEmpty(post)) {
			return <Spinner />;
		}
		const { QR_code_zfb, QR_code_wx } = settings;
		const { originalContent, createTime, visits, wordCount, title, tags, categories } = post;
		return (
			<>
				<Helmet>
					<title>{title} | 知行志</title>
				</Helmet>
				<div className="article-content">
					<div className="mx-auto px-4 max-w-6xl tracking-wider md:leading-relaxed sm:leading-normal mx-800">
						<h1 className="pb-0 mb-0 text-3xl sm:text-2xl lg:text-4xl font-normal text-left post-title">{title}</h1>
						<p className="text-left mt-4">
							<span className="color-gray">
								<i className="iconfont icon-calendar" /> {formatFullDate(createTime)}
							</span>
							<span className="color-gray ml-2">
								<i className="iconfont icon-Eyesight" /> {visits}
							</span>
							<span className="color-gray ml-2">
								<i className="iconfont icon-yuedu" /> {Math.ceil(wordCount / 200) + 1} 分钟
							</span>
						</p>
					</div>

					<div
						className="mx-auto px-4 mt-4 max-w-6xl tracking-wider md:leading-relaxed sm:leading-normal mx-800 md-content"
						dangerouslySetInnerHTML={{ __html: markdown(originalContent) }}
					/>
					<div className="mx-auto px-4 mt-8 max-w-6xl tracking-wider md:leading-relaxed sm:leading-normal mx-800">
						<p className="text-center text-gray-700">
							<a
								href="https://creativecommons.org/licenses/by/4.0/"
								className="underline"
								target="_blank"
								rel="external nofollow">
								知识共享署名4.0
							</a>
							国际许可协议进行许可
						</p>
						<div>
							<Sponsor alipay={QR_code_zfb} wechat={QR_code_wx} />
						</div>
						<p className="flex flex-row justify-start flex-wrap">
							{this.getTagsAndCategory(tags, true)}
							{this.getTagsAndCategory(categories, false)}
						</p>
						<hr className="mt-4" style={{ backgroundColor: 'rgba(96, 125, 139, .05); size: 2px' }} />
					</div>
					<div className="mx-auto px-4 mt-16 max-w-6xl tracking-wider md:leading-relaxed sm:leading-normal mx-800">
						<Comment fullPath={post.fullPath} title={post.title} />
					</div>
				</div>
			</>
		);
	}
}

Post.propTypes = {
	post: PropTypes.object,
	settings: PropTypes.object,
};
Post.getInitialProps = async ctx => {
	const postId = __isBrowser__ ? ctx.match.params.id : ctx.params.id;
	const post = __isBrowser__ ? (await http.getPostDetail(postId)).data : (await ctx.service.api.getPost(postId)).post;
	const settings = __isBrowser__ ? (await http.getSettings()).data : (await ctx.service.api.getSettings()).settings;
	return Promise.resolve({ post, settings });
};
export default Post;
