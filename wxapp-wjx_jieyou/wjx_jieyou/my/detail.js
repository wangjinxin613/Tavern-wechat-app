// pages/my/index.js
const app = getApp()
var data_list = {
	huixin: ' 嗨，亲爱的客人。我是醉翁儿，酒馆的主人。欢迎来到解忧小酒馆。在这里，如果您愿意，可以向我倾诉一切烦恼，我将尽我所能，为您解答。每一个孤独的灵魂都值得不被忽视，你也可以选择给其他人解答烦恼，微小的安慰就会让人铭记一生。我想让你记住，而不是仅仅知道，无论什么时候，随时随地，为你效劳。'
}
Page({

	/**
	 * 页面的初始数据
	 */
	
	data: {
		userInfo:{},
		data_list:data_list,
		type1:'',
		id:''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (e) {

		var id = e.id;
		var type1 = e.type;
		var self = this;
		self.setData({
			id:id,
			type1:type1
		})
		if(id == null){
			self.setData({	
				type1: '1',

			})
		}
		app.util.getUserInfo(function (response) {
			self.setData({
				userInfo: response
			})

		})
		app.util.request({
			
			url: 'entry/wxapp/detail',
			data: {
				id: id,
				type:type1
			},
			method: 'post',
			success: function (res) {
				console.log(res);
				if (res.data.huixin != null) {
					res.data.huixin = app.convertHtmlToText(res.data.huixin);
				}
				if(res.data.id != null){
					self.setData({
						data_list: res.data
					})
				}
			
			},
			fail: function (response) {
				if (response.data.message) {
					app.util.message(response.data.message, '', 'error');
				}
			}
		});
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
	}
})