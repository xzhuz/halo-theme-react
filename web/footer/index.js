import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from '@/utils';
import './index.less';

class Footer extends React.PureComponent {
	render() {
		const { settings } = this.props;
		const { sina, qq, telegram, twitter, github, zhihu, mail, Icp, PublicSecurityRecord } = settings;
		return (
			<footer className="footer mt-8 text-center pt-12 pb-12">
				<div className="m-0-auto container mx-auto flex flex-row lg:justify-between md:justify-center items-center grid lg:grid-cols-2 md:grid-cols-1">
					<div className="offsite-links flex flex-row justify-center flex-wrap">
						{isEmpty(sina) ? (
							''
						) : (
							<a
								href={sina}
								className="circle p-10 m-3 inline-block leading-none relative text-center"
								target="_blank"
								rel="noopener">
								<span className="iconfont icon-weibo"> </span>
							</a>
						)}

						{isEmpty(qq) ? (
							''
						) : (
							<a
								href={`//wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`}
								className="circle p-10 m-3 inline-block leading-none relative text-center"
								target="_blank"
								rel="noopener"
								title="QQ Chat">
								<span className="iconfont icon-tencentqq"> </span>
							</a>
						)}

						{isEmpty(telegram) ? (
							''
						) : (
							<a
								href={`https://t.me/${telegram}`}
								className="circle p-10 m-3 inline-block leading-none relative text-center"
								target="_blank"
								rel="noopener"
								title="Telegram Chat">
								<span className="iconfont icon-telegram"> </span>
							</a>
						)}
						{isEmpty(twitter) ? (
							''
						) : (
							<a
								href={twitter}
								className="circle p-10 m-3 inline-block leading-none relative text-center"
								target="_blank"
								rel="noopener"
								title="Twitter">
								<span className="iconfont icon-twitter"> </span>
							</a>
						)}
						{isEmpty(github) ? (
							''
						) : (
							<a
								href={github}
								className="circle p-10 m-3 inline-block leading-none relative text-center"
								target="_blank"
								rel="noopener"
								title="Github">
								<span className="iconfont icon-github"> </span>
							</a>
						)}
						{isEmpty(zhihu) ? (
							''
						) : (
							<a
								href={zhihu}
								className="circle p-10 m-3 inline-block leading-none relative text-center"
								target="_blank"
								rel="noopener"
								title="知乎">
								<span className="iconfont icon-zhihu-circle-fill"> </span>
							</a>
						)}
						{isEmpty(mail) ? (
							''
						) : (
							<a
								href={`mailto:${mail}`}
								className="circle p-10 m-3 inline-block leading-none relative text-center"
								target="_blank"
								rel="noopener"
								title="邮箱">
								<span className="iconfont icon-email"> </span>
							</a>
						)}
					</div>
					<div className="site-info flex flex-col justify-center">
						<p>
							<a href="https://www.upyun.com/" target="_blank">
								<img
									className="text-center"
									src="https://baozi.fun/upload/2020/3/%E5%8F%88%E6%8B%8D%E4%BA%91_logo5-d11f2774c95f4d328c8a3e675c126cda.png"
									style={{ width: '48px' }}
								/>
							</a>
						</p>
						{isEmpty(Icp) ? (
							''
						) : (
							<p>
								<a href="http://beian.miit.gov.cn" target="_blank" className="text-xs">
									{Icp}
								</a>
							</p>
						)}
						{isEmpty(PublicSecurityRecord) ? (
							''
						) : (
							<p>
								<a href="http://www.beian.gov.cn" target="_blank" className="text-xs">
									{PublicSecurityRecord}
								</a>
							</p>
						)}
						<p className="text-sm color-gray-700">
							Power By Halo · Theme By
							<a rel="license" href="https://github.com/xzzai/halo-theme-xue.git" target="_blank">
								{' '}
								Xue
							</a>
						</p>
					</div>
				</div>
			</footer>
		);
	}
}

Footer.propTypes = {
	settings: PropTypes.object.isRequired,
};

export default Footer;
