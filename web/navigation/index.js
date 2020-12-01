import React from 'react';

class Navigation extends React.PureComponent {
	render() {
		return (
			<div className="container mx-auto mt-4 pb-8 mx-800">
				<div className="entry-navigation">
					<div className="nav previous"></div>
				</div>
			</div>
		);
	}
}

Navigation.propTypes = {};

export default Navigation;
