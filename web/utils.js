function dateFormat(fmt, date) {
	let ret;
	const opt = {
		'y+': date.getFullYear().toString(), // 年
		'M+': (date.getMonth() + 1).toString(), // 月
		'd+': date.getDate().toString(), // 日
		'H+': date.getHours().toString(), // 时
		'm+': date.getMinutes().toString(), // 分
		'S+': date.getSeconds().toString(), // 秒
		// 有其他格式化字符需求可以继续添加，必须转化成字符串
	};
	for (let k in opt) {
		ret = new RegExp('(' + k + ')').exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], ret[1].length === 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
		}
	}
	return fmt;
}

export function formatDate(datetime) {
	let date = new Date(datetime);
	const str = dateFormat('yyyy-MM-dd', date);
	date = null;
	return str;
}

export function formatDate2CHN(datetime) {
	let date = new Date(datetime);
	const str = dateFormat('yyyy年MM月dd日', date);
	date = null;
	return str;
}

export function getDateMonth(datetime) {
	let date = new Date(datetime);
	const str = dateFormat('MM', date);
	date = null;
	return str;
}

export function getDateDay(datetime) {
	let date = new Date(datetime);
	const str = dateFormat('dd', date);
	date = null;
	return str;
}

export function getDateYear(datetime) {
	let date = new Date(datetime);
	const str = dateFormat('yyyy', date);
	date = null;
	return str;
}

export function getFormatDate(datetime) {
	let date = new Date(datetime);
	const str = dateFormat('MM-dd', date);
	date = null;
	return str;
}

export function getFormatDateCHN(datetime) {
	let date = new Date(datetime);
	const str = dateFormat('yyyy年MM月', date);
	date = null;
	return str;
}

export function formatFullDate(datetime) {
	let date = new Date(datetime);
	const str = dateFormat('yyyy-MM-dd HH:mm:SS', date);
	date = null;
	return str;
}

export function isEmpty(content) {
	if (typeof content === 'undefined' || content === null) {
		return true;
	}
	if (typeof content === 'object') {
		if (typeof content instanceof Array) {
			return content.length < 0;
		}
		return Object.keys(content).length < 1;
	} else if (typeof content === 'string') {
		return content === null || content === '';
	}
}

export function getHashCode(str, caseSensitive) {
	if (!caseSensitive) {
		str = str.toLowerCase();
	}
	var hash = 1315423911,
		i,
		ch;
	for (i = str.length - 1; i >= 0; i--) {
		ch = str.charCodeAt(i);
		hash ^= (hash << 5) + ch + (hash >> 2);
	}
	return hash & 0x7fffffff;
}

const randColor = [
	'#177cb0',
	'#065279',
	'#ffb3a7',
	'#ff8c31',
	'#4b5cc4',
	'#574266',
	'#3d3b4f',
	'#725e82',
	'#c3272b',
	'#f9906f',
	'#16a951',
	'#56004f',
	'#e77c8e',
	'#4f383e',
	'#f00056',
];

export function getRandomColor(tag) {
	const index = getHashCode(tag, true) % randColor.length;
	return randColor[index];
}

/**
 * 获取文章图片
 * @param post
 * @param randomCoverList
 * @returns {string|*}
 */
export function getPostThumbnail(post, randomCoverList) {
	const { thumbnail } = post;
	if (!isEmpty(thumbnail)) {
		return thumbnail;
	}
	if (isEmpty(randomCoverList)) {
		return '';
	}
	const imageList = randomCoverList.split(';');
	if (isEmpty(imageList)) {
		return '';
	}
	const random = Math.floor(Math.random() * (100 - 1 + 1) + 1);
	const index = random % imageList.length;
	return imageList[index];
}
