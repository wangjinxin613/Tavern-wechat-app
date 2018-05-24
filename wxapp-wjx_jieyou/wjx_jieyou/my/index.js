// pages/my/index.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo:{},
		data_list:{}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// 页面渲染完成
		var self = this;

		app.util.getUserInfo(function (response) {
			self.setData({
				userInfo: response
			})
			//获取信件列表信息
			app.util.request({
				url: 'entry/wxapp/list',
				data: {
					uid: response.memberInfo.uid,
				},
				method: 'post',
				success: function (res) {
					console.log(res);
					for (var Key in res.data){
						if (res.data[Key].huixin != null){
							res.data[Key].huixin = app.convertHtmlToText(res.data[Key].huixin);
						}
					}
					console.log(res);
					self.setData({
						data_list:res.data
					})
				},
				fail: function (response) {
					if (response.data.message) {
						app.util.message(response.data.message, '', 'error');
					}
				}
			});
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

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {
		return {
			title: '解忧小酒馆，专治不开心~'
		}
	},
	open: function () {
		wx.navigateTo({
			url: '/pages/my/detail'
		})
	}
})