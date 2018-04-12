//app.js
App({
	onLaunch: function () {
		//调用API从本地缓存中获取数据
	},
	onShow: function () {
	},
	onHide: function () {
	},
	onError: function (msg) {
		console.log(msg)
	},
	util: require('we7/resource/js/util.js'),
	tabBar: {
		"color": "#123",
		"selectedColor": "#1ba9ba",
		"borderStyle": "#1ba9ba",
		"backgroundColor": "#fff",
		"list": [
			{
				"pagePath": "/we7/pages/index/index",
				"iconPath": "/we7/resource/icon/home.png",
				"selectedIconPath": "/we7/resource/icon/homeselect.png",
				"text": "首页"
			},
			{
				"pagePath": "/we7_wxappdemo/pages/todo/todo",
				"iconPath": "/we7/resource/icon/todo.png",
				"selectedIconPath": "/we7/resource/icon/todoselect.png",
				"text": "ToDo"
			},
			{
				"pagePath": "/we7_wxappdemo/pages/pay/pay",
				"iconPath": "/we7/resource/icon/user.png",
				"selectedIconPath": "/we7/resource/icon/userselect.png",
				"text": "支付"
			},
			{
				"pagePath": "/rcdonkey_signup/pages/publish/publish",
				"iconPath": "/we7/resource/icon/user.png",
				"selectedIconPath": "/we7/resource/icon/userselect.png",
				"text": "报名"
			}
		]
	},
	globalData:{
		userInfo : null,
	},

	siteInfo: {
		'uniacid' : '2',
		'acid' : '2',
		'version' : '1.0',
		'siteroot': 'https://youzhis.cn/app/index.php',
	},
	convertHtmlToText: function convertHtmlToText(inputText) {
		var returnText = "" + inputText;
		returnText = returnText.replace(/<\/div>/ig, '\r\n');
		returnText = returnText.replace(/<\/li>/ig, '\r\n');
		returnText = returnText.replace(/<li>/ig, '  *  ');
		returnText = returnText.replace(/<\/ul>/ig, '\r\n');
		//-- remove BR tags and replace them with line break
		returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");

		//-- remove P and A tags but preserve what's inside of them
		returnText = returnText.replace(/<p.*?>/gi, "\r\n");
		returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

		//-- remove all inside SCRIPT and STYLE tags
		returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
		returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
		//-- remove all else
		returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

		//-- get rid of more than 2 multiple line breaks:
		returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");

		//-- get rid of more than 2 spaces:
		returnText = returnText.replace(/ +(?= )/g, '');

		//-- get rid of html-encoded characters:
		returnText = returnText.replace(/ /gi, " ");
		returnText = returnText.replace(/&/gi, "&");
		returnText = returnText.replace(/"/gi, '"');
		returnText = returnText.replace(/</gi, '<');
		returnText = returnText.replace(/>/gi, '>');

		return returnText;
	}
		/**
	siteinfo:{ "uniacid": "2", "acid": "2", "multiid": "0", "version": "1.0", "siteroot": "http://youzhis.cn/app/index.php", "design_method": "3" }
*/
});