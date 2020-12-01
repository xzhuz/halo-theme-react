import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { http } from '@@/http';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { isEmpty } from '@/utils';
import Spinner from '@/spinner';
import Img from '@/image';
import './index.less';

class Photos extends React.PureComponent {
	constructor(props) {
		super(props);
		this.getTeams = this.getTeams.bind(this);
		this.masonryGallery = this.masonryGallery.bind(this);
		this.handleClickTeam = this.handleClickTeam.bind(this);
		this.handleImageOnLoad = this.handleImageOnLoad.bind(this);
		this.reRangeGallery = this.reRangeGallery.bind(this);
		this.closeLightbox = this.closeLightbox.bind(this);
		this.setPhotos = this.setPhotos.bind(this);
		this.myRef = React.createRef();
		this.state = {
			currentTeam: '*',
			lso: null,
			viewerIsOpen: false,
			currentImage: 0,
			photos: [],
		};
	}

	handleClickTeam(e) {
		const { lso } = this.state;
		if (isEmpty(lso)) {
			this.initIsotope();
			return;
		}
		const filterValue = e.target.dataset.filter;
		this.setState({ currentTeam: filterValue.replace('.', '') });
		lso.arrange({ filter: filterValue });
		this.reRangeGallery();
	}

	componentDidMount() {
		const { currentTeam } = this.state;
		this.masonryGallery(currentTeam);
		this.reRangeGallery();
	}

	reRangeGallery() {
		const { photos } = this.state;
		const imgs = document.querySelectorAll(`img[class*="lazyload"]`);
		if (!isEmpty(imgs)) {
			imgs.forEach(g => {
				photos.push({
					src: g.src,
					title: g.alt,
					srcset: g.src,
				});
			});
		}
		this.setState({ photos });
	}

	masonryGallery() {
		if (typeof window === 'undefined') {
			return;
		}
		this.initIsotope();
	}

	initIsotope() {
		const { lso } = this.state;
		if (!isEmpty(lso)) {
			return;
		}
		const Isotope = require('isotope-layout');
		const masonryGallery = this.myRef.current;
		if (isEmpty(masonryGallery)) {
			return;
		}
		const iso = new Isotope(masonryGallery, {
			itemSelector: '.gallery-item',
			masonry: { gutter: 10 },
		});
		this.setState({ lso: iso });
	}

	setPhotos(gallery) {
		if (isEmpty(gallery)) {
			return;
		}
		const photos = [];
		gallery.forEach(g => {
			photos.push({
				src: g.url,
				title: isEmpty(g.name) ? g.url : g.name,
				srcset: g.thumbnail,
			});
		});
		this.setState({ photos });
	}

	componentWillUnmount() {
		this.setState({
			lso: null,
		});
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const masonryGallery = this.myRef.current;
		const { lso } = this.state;
		const { gallery } = this.props;
		if (!isEmpty(masonryGallery) && isEmpty(lso) && !isEmpty(gallery)) {
			this.initIsotope();
			this.setPhotos(gallery);
		}
	}

	getTeams(gallery) {
		return [...new Set(gallery.map(g => (isEmpty(g.team) ? 'default' : g.team)))];
	}

	handleImageOnLoad() {
		const { lso, currentTeam } = this.state;
		lso.arrange({ filter: currentTeam });
	}

	handleImageClick(e) {
		const { key } = e.target.dataset;
		if (isEmpty(key)) {
			return;
		}
		this.setState({ currentImage: key, viewerIsOpen: true });
	}

	closeLightbox() {
		this.setState({ currentImage: 0, viewerIsOpen: false });
	}

	render() {
		const { gallery, isBrowser } = this.props;
		if (isEmpty(gallery)) {
			return <Spinner />;
		}
		const { currentTeam, currentImage, viewerIsOpen, photos } = this.state;
		return (
			<>
				<Helmet>
					<title>相册 | 知行志</title>
				</Helmet>
				<div className="mx-auto px-4 max-w-6xl tracking-wider md:leading-relaxed sm:mx-800">
					<div className="photos-box article-content">
						<nav className="gallery-filter block relative">
							<ul className="list-none p-0 mb-1.5	text-base">
								<li className="inline-block">
									<a
										href="javascript:void(0);"
										role="button"
										data-filter="*"
										onClick={e => this.handleClickTeam(e)}
										className={currentTeam === '*' ? 'active' : ''}>
										全部
									</a>
								</li>
								{this.getTeams(gallery).map(g => (
									<li key={g} className="inline-block">
										<a
											href="javascript:void(0);"
											data-filter={isEmpty(g) ? '.default' : `.${g}`}
											onClick={e => this.handleClickTeam(e)}
											className={currentTeam === g ? 'active' : ''}>
											{isEmpty(g) || g === 'default' ? '默认' : g}
										</a>
									</li>
								))}
							</ul>
						</nav>
					</div>
					<div className="gallery masonry-gallery" ref={this.myRef}>
						{gallery.map((g, index) => (
							<figure
								className={`gallery-item col-3 mb-3.5 relative block ${isEmpty(g.team) ? 'default' : g.team}`}
								key={g.id}>
								<header className="gallery-icon">
									<a data-fancybox="gallery" href="javascript:void(0);">
										<Img
											clsName="lazyload"
											url={g.url}
											alt={g.name}
											index={index}
											isBrowser={isBrowser}
											onLoad={e => this.handleImageOnLoad(e)}
											onClick={e => this.handleImageClick(e)}
										/>
									</a>
								</header>
								<figcaption className="gallery-caption absolute inset-0 w-full z-10 pointer-events-none">
									<div className="gallery-summary absolute inline-block	w-full -bottom-0 transition-all duration-200 ease-in-out px-2.5 pb-1.5">
										<p className="gallery-title block mt-1 whitespace-nowrap overflow-ellipsis overflow-hidden w-full z-10 text-base font-semibold p-0 m-0">
											{g.name}
										</p>
										<p className="gallery-description text-sm transition-colors duration-150 ease-linear p-0 m-0">
											{g.description}
										</p>
									</div>
								</figcaption>
							</figure>
						))}
					</div>
				</div>
				<ModalGateway>
					{viewerIsOpen ? (
						<Modal onClose={() => this.closeLightbox()}>
							<Carousel
								currentIndex={currentImage}
								views={photos.map(x => ({
									...x,
									srcset: x.srcSet,
									caption: x.title,
								}))}
							/>
						</Modal>
					) : null}
				</ModalGateway>
			</>
		);
	}
}

Photos.propTypes = {
	gallery: PropTypes.array,
	isBrowser: PropTypes.bool,
};

Photos.getInitialProps = async ctx => {
	const gallery = __isBrowser__ ? (await http.getGallery({})).data : (await ctx.service.api.getGallery({})).gallery;
	return Promise.resolve({ gallery, isBrowser: __isBrowser__ });
};

export default Photos;
