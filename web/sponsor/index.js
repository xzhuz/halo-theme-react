import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from '@/utils';
import './index.less';

class Sponsor extends React.PureComponent {
	constructor(props) {
		super(props);
		this.handleToggleAliPay = this.handleToggleAliPay.bind(this);
		this.handleToggleWeChat = this.handleToggleWeChat.bind(this);
		this.state = {
			showAliPay: false,
			showWeChat: false,
		};
	}

	handleToggleAliPay() {
		const { showAliPay } = this.state;
		this.setState({
			showAliPay: !showAliPay,
			showWeChat: false,
		});
	}

	handleToggleWeChat() {
		const { showWeChat } = this.state;
		this.setState({
			showWeChat: !showWeChat,
			showAliPay: false,
		});
	}
	render() {
		const { alipay, wechat } = this.props;
		if (isEmpty(alipay) && isEmpty(wechat)) {
			return <></>;
		}
		const { showAliPay, showWeChat } = this.state;
		return (
			<section className="donate">
				<div className="icon">
					{isEmpty(alipay) ? (
						''
					) : (
						<a href="javascript:void(0);" id="alipay" onClick={() => this.handleToggleAliPay()}>
							<i className="iconfont icon-alipay" />
						</a>
					)}
					{isEmpty(wechat) ? (
						''
					) : (
						<a href="javascript:void(0);" id="wechat" onClick={() => this.handleToggleWeChat()}>
							<i className="iconfont icon-wechatpay" />
						</a>
					)}
				</div>
				{isEmpty(alipay) ? (
					''
				) : (
					<div className={`qrcode qrcode-alipay ${showAliPay ? '' : 'hidden'}`}>
						<img src={alipay} alt="alipay" />
					</div>
				)}

				{isEmpty(wechat) ? (
					''
				) : (
					<div className={`qrcode qrcode-wechat ${showWeChat ? '' : 'hidden'}`}>
						<img src={wechat} alt="wechat" />
					</div>
				)}
			</section>
		);
	}
}

Sponsor.propTypes = {
	alipay: PropTypes.string,
	wechat: PropTypes.string,
};

export default Sponsor;
