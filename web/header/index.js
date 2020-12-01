import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './index.less';
import './burger.less';

class Header extends React.PureComponent {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			open: false,
		};
	}
	getMenuItem(menu, url) {
		const current = url === menu.url ? 'current' : '';
		return (
			<li className={`item flex flex-wrap p-0 ${current}-item`} key={menu.url}>
				<Link className={`link text-lg md:text-base sm:text-sm relative snow-link ${current} `} to={`${menu.url}`}>
					{menu.name}
				</Link>
			</li>
		);
	}

	handleClick() {
		const { open } = this.state;
		this.setState({
			open: !open,
		});
	}

	render() {
		const { open } = this.state;
		let { location, menus } = this.props;
		const headerMenus = Array.isArray(menus) ? menus : menus.menus;
		return (
			<header className="header nav-wrapper top-0 right-0 left-0 w-full z-50 fixed bg-white">
				<nav className="nav h-16 m-0-auto flex justify-between w-10/12">
					<button
						className={`toggle-nav z-10 bg-transparent shadow-none border-0 m-0 p-2`}
						type="button"
						onClick={() => this.handleClick()}>
						<div className={`burger -squeeze ${open ? 'open' : ''}`}>
							<span className="burger-lines" />
						</div>
					</button>
					<ul className={`nav-list list-none m-0 p-0 block h-full w-full ${open ? '-open' : ''}`} role="navigation">
						<div className="list -left w-7/12 ">{headerMenus.map(menu => this.getMenuItem(menu, location))}</div>
						<div className="list -right w-5/12">
							<div className="overlay h-full w-5/12 cursor-pointer absolute right-0 top-0 absolute" />
						</div>
					</ul>
				</nav>
			</header>
		);
	}
}

Header.propTypes = {
	location: PropTypes.string,
	menus: PropTypes.array,
};
export default Header;
