// footer.js
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		"tabBar": {
			"color": "#999",
			"selectedColor": "#f86b4f",
			"borderStyle": "#fff",
			"backgroundColor": "#fff",
			"list": [
				{
					"pagePath": "/wn_storex/pages/store/index",
					"iconPath": "/wn_storex/resource/icon/home.png",
					"selectedIconPath": "/wn_storex/resource/icon/home-selected.png",
					"text": "123121"
				},
				{
					"pagePath": "/wn_storex/pages/category/category",
					"iconPath": "/wn_storex/resource/icon/category.png",
					"selectedIconPath": "/wn_storex/resource/icon/category-selected.png",
					"text": "分类"
				},
				{
					"pagePath": "/wn_storex/pages/home/index",
					"iconPath": "/wn_storex/resource/icon/user.png",
					"selectedIconPath": "/wn_storex/resource/icon/user-selected.png",
					"text": "我的"
				}
			]
		},
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		this.setData({
			isFooter: app.tabBar.list['1'].iconPath == '/we7/resource/icon/user.png'
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
	change() {
		if (this.data.isFooter) {
			app.tabBar.list['1'] = {
				"pagePath": "/we7_wxappdemo/pages/footer/footer",
				"iconPath": "/we7/resource/icon/home.png",
				"selectedIconPath": "/we7/resource/icon/homeselect.png",
				"text": "哈哈"
			};
		} else {
			app.tabBar.list['1'] = {
				"pagePath": "/we7_wxappdemo/pages/footer/footer",
				"iconPath": "/we7/resource/icon/user.png",
				"selectedIconPath": "/we7/resource/icon/userselect.png",
				"text": "底部"
			};
		}
		wx.redirectTo({
			url: '/we7_wxappdemo/pages/footer/footer',
		})
	}
})