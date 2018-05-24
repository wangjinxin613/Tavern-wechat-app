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
	
	globalData:{
		userInfo : null,
	},

	siteInfo:require('siteinfo.js'),
	
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