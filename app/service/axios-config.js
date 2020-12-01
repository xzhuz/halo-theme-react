'use strict';

const axios = require('axios');

const baseUrl = process.env.NODE_ENV === 'production' ? 'http://127.0.0.1:8090' : 'http://127.0.0.1:8090';
const apiAuth = process.env.NODE_ENV === 'production' ? '111111111111111' : '111111111111111';

const service = axios.create({
	baseURL: baseUrl,
	timeout: 5000,
	withCredentials: true,
	changeOrigin: true, //如果是跨域访问，需要配置这个参数
});

service.interceptors.request.use(
	config => {
		config.headers['API-Authorization'] = apiAuth;
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

exports.api = service;
