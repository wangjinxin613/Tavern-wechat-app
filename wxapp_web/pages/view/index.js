import { urlAddCode, getUrl, getShareUrl } from '../../../we7/resource/js/webview'
var app = getApp();
Page({
	data: {
		canIUse: wx.canIUse('web-view'),
		url: ''
	},
	onLoad: function (options) {
		let url = '';
		// 分享url
		if (options.url) {
			url = decodeURIComponent(options.url)
		}
		// 小程序内跳转url
		if (!url) {
			try {
				url = wx.getStorageSync('we7_webview');
				if (url) {
					wx.removeStorageSync('we7_webview');
				}
			} catch (e) {}
		}

		// 获取url
		if (!url) {
			url = app.util.url('wxapp/home/wxapp_web');
		}
		urlAddCode(url);
	},
	onShow() {
		let url = '';
		try {
			url = wx.getStorageSync('we7_webview');
			if (url) {
				wx.removeStorageSync('we7_webview');
			}
		} catch (e) {
		}
		if (url) {
			url = urlAddCode(url);
			const self = this;
			self.setData({
				url: url
			});
		}
	},
	onShareAppMessage: function (options) {
		var url = app.util.url('wxapp/home/wxapp_web');
		url = url + '&url=' + encodeURIComponent(options.webViewUrl);
		console.log(url);
		return {
			path: '/wn_storex/pages/view/index?url=' + encodeURIComponent(url),
			success: function(res) {
			},
			fail: function(res) {
			}
		}
	}
});