// pages/my/index.js
const app = getApp()

Page({

	/**
	 * 页面的初始数据
	 */

	data: {
		userInfo: {},
		btnDisplay: 'block',
		huiH: 0,
		bodyDisplay:'none',
		bodyBtnTxt:'显示',
		data_list:{}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (e) {
		var self = this;
		//信件id
		var id = e.id;
		//信id不存在提示并且返回到首页
		if (id == null || isNaN(id)) {
			wx.showToast({
				title: '信已经被删除或者不存在',
				icon: 'none'
			})
			setTimeout(function(){
				wx.navigateTo({
					url: '/wjx_jieyou/index/index',
				})
			},2000);
			
			return false;
		}
		//登录
		app.util.getUserInfo(function (response) {
			self.setData({
				userInfo: response
			})
			console.log(response);
		})
		console.log(self.data.userInfo);
		//根据信的id获取信的数据
		app.util.request({
			url: 'entry/wxapp/detail',
			data: {
				id: id,
			},
			method: 'post',
			success: function (res) {
				if (res.data.huixin != null) {
					res.data.huixin = app.convertHtmlToText(res.data.huixin);
				}

				if (res.data.id != null) {
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
	},
	huixin:function(e){
		this.setData({
			btnDisplay: 'none',
			huiH: 'auto'
		})
	},
	bodyDisplay:function(e){
		if(this.data.bodyDisplay == 'none'){
			this.setData({
				bodyDisplay: "block",
				bodyBtnTxt: '隐藏'
			});
		}else{
			this.setData({
				bodyDisplay: "none",
				bodyBtnTxt: '显示'
			});
		}
	},
	//回信
	formSubmit:function(e){
		var that = this;
		
		//写信者信息
		var xinId = that.data.data_list.id;
		//回信内容
		var content = e.detail.value.content;
		//将数据提交给后台
		app.util.request({
			url:"entry/wxapp/huixin",
			data:{
				xinId:xinId,
				content:content,
				uid: that.data.userInfo.memberInfo.uid
			},
			method:"post",
			success:function(e){
				
				app.util.message({
					title: '回信成功~',
					redirect: 'redirect:/wjx_jieyou/index/index',
					type: 'success'
				});
			}
		});
	}
})