// wn_storex/pages/view/address.js
import { base64_encode } from '../../../we7/resource/js/base64';
import { backApp } from '../../../we7/resource/js/webview'
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		url: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData(options)
		const self = this;
		self.setData({
			url: ''
		})
		wx.chooseAddress({
			success: function (res) {
				var url = decodeURIComponent(self.data.back);
				console.log(base64_encode(encodeURI(JSON.stringify(res))))
				url = url + '&wxAddress=' + base64_encode(encodeURI(JSON.stringify(res)));
				console.log(url)
				backApp(url)
			},
			fail: function () {
				wx.navigateBack()
			}
		})
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

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	}
})