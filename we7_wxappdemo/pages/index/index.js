var app = getApp();
Page({
	data: {
		text: "demo"
	},
	onLoad: function (options) {
		// 页面初始化 options为页面跳转所带来的参数
		const self = this
		app.util.request({
			'url': 'entry/wxapp/list',
			'cachetime': '30',
			success(res) {
				self.setData({
					list: res.data.data
				})
			}
		})
	},
	onReady: function () {
		// 页面渲染完成
		const self = this;
		app.util.footer(self);
		app.util.getUserInfo(function (response) {
			wx.showToast({
				title: '登陆成功'
			})
			self.setData({
				userInfo: response
			})
		})
	},
	onShow: function () {
		// 页面显示
	},
	onHide: function () {
		// 页面隐藏
	},
	onUnload: function () {
		// 页面关闭
	},
	add() {
		const self = this
		app.util.request({
			'url': 'entry/wxapp/list',
			'cachetime': '30',
			success(res) {
				self.setData({
					list: self.data.list.concat(res.data.data)
				})
			}
		})
	},
	request() {
		app.util.request({
			'url': 'entry/wxapp/test',
			'cachetime': '30',
			complete(res) {
				console.log(res.data);
				wx.showModal({
					title: (res.data && res.data.errno == 0) ? '成功' : '失败',
					content: (res.data && res.data.errno == 0) ? '返回结果：' + res.data.message : '',
				})
			}
		});
	},
	setting() {
		const self = this
		wx.openSetting({
			success(res) {
				console.log(res);
				wx.setStorageSync('userInfo', '');
				app.util.getUserInfo(function (response) {
					self.setData({
						userInfo: response
					})
				})
			}
		})
	}
})