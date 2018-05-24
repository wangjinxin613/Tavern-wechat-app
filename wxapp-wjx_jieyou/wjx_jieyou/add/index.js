// pages/add/index.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		userInfo: {}
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
			//console.log(response);
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

	},
	//提交操作
	submit: function (e) {
		console.log(e);
		var fId = e.detail.formId;
		var that = this;
		var title = e.detail.value.title;
		var body = e.detail.value.body;
		var isAgree = e.detail.value.isAgree;
		//字数不够的情况下
		if(body.length <= 15) {
			app.util.message({
				title: '信的内容至少15字，还差' + (15-body.length) +'个字，加油喔(*╹▽╹*)',
				type: 'error'
			});
			return false;
		}
		//信的内容不存在
		if (body == "" || body == null) {
			app.util.message({
				title: '信的内容必填~',
				type: 'error'
			});
			return false;
		} else {
			app.util.request({
				url: 'entry/wxapp/add',
				data: {
					body: body,
					uid: that.data.userInfo.memberInfo.uid,
					avatar: that.data.userInfo.memberInfo.avatar,
					fid: fId,
					isAgree:isAgree
				},
				method: 'post',
				success: function (res) {
					console.log(res);
					if (res.data.code == 1) {
						app.util.message({
							title: '信已写好并寄出',
							redirect: 'redirect:/wjx_jieyou/my/index',
							type: 'success'
						});
					}
				},
				fail: function (response) {
					if (response.data.message) {
						app.util.message(response.data.message, '', 'error');
					}
				}
			});
		}
	}
})