// wn_storex/pages/view/pay.js
import {base64_encode} from '../../../we7/resource/js/base64';
import { backApp } from '../../../we7/resource/js/webview';
var app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		const self = this;
		app.util.request({
			'url': 'entry/wxapp/pay',
			data: {
				orderid: options.orderid,
				pay_type: 'wechat',
				order_type: options.type || 'goods'
			},
			'cachetime': '0',
			success(res) {
				if (res.data && res.data.data && !res.data.errno) {
					wx.requestPayment({
						'timeStamp': res.data.data.timeStamp,
						'nonceStr': res.data.data.nonceStr,
						'package': res.data.data.package,
						'signType': 'MD5',
						'paySign': res.data.data.paySign,
						'success': function (res) {
							app.util.request({
								'url': 'entry/wxapp/payResult',
								data: {
									orderid: self.data.orderInfo.tid,
									pay_type: 'wechat',
									order_type: self.data.type || 'goods'
								},
								'cachetime': '0',
								success(res) {
									if (res.data.errno) {
										wx.showModal({
											title: '系统提示',
											content: res.data.message ? res.data.message : '错误',
											success: function (res) {
												console.log(res)
												if (res.confirm) {
													backApp()
												}
											}
										})
									} else {
										wx.showToast({
											title: '支付成功',
											success() {
												backApp(options.back)
											}
										})
									}
								}
							})
						},
						'fail': function (res) {
							backApp()
						}
					})
				}
			},
			fail(res) {
				wx.showModal({
					title: '系统提示',
					content: res.data.message ? res.data.message : '错误',
					showCancel: false,
					success: function (res) {
						if (res.confirm) {
							backApp()
						}
					}
				})
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

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})