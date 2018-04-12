// pay.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		app.util.footer(this);
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},
	pay(e) {
		const self = this
		if (e.detail.value.sum > 0) {
			wx.showModal({
				title: '确认支付',
				content: '确认支付' + e.detail.value.sum + '元？',
				success: function (res) {
					if (res.confirm) {
						app.util.request({
							'url': 'entry/wxapp/pay',
							data: {
								sum: e.detail.value.sum
							},
							'cachetime': '0',
							success(res) {
								if (res.data && res.data.data) {
									wx.requestPayment({
										'timeStamp': res.data.data.timeStamp,
										'nonceStr': res.data.data.nonceStr,
										'package': res.data.data.package,
										'signType': 'MD5',
										'paySign': res.data.data.paySign,
										'success': function (res) {
											//支付成功后，系统将会调用payResult() 方法，此处不做支付成功验证，只负责提示用户
										},
										'fail': function (res) {
											//支付失败后，
										}
									})
								}
							}
						})
					}
				}
			})
		} else {
			this.setData({
				showTopTips: true,
				tip: '请输入正确金额'
			})
			setTimeout(function () {
				self.setData({
					showTopTips: false
				});
			}, 3000);
		}
	}
})