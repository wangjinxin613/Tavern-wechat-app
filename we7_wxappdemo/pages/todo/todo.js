// todo.js
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		todo: [
			{
				"title": "12312",
				"done": true
			},
			{
				"title": "3223",
				"done": false
			}
		]
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		app.util.footer(this);
		const self = this
		app.util.getUserInfo(function (response) {
			self.getTodo()
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
	getTodo() {
		const self = this
		app.util.request({
			'url': 'entry/wxapp/todoLists',
			success(res) {
				if (!res.errno) {
					self.setTodo(res.data.data)
				}
			}
		})
	},
	add(e) {
		const self = this;
		app.util.request({
			'url': 'entry/wxapp/TodoAdd',
			data: {
				title: e.detail.value
			},
			success(res) {
				self.getTodo();
			}
		})
	},
	done(e) {
		const self = this;
		var index = e.currentTarget.dataset.index;
		var done = e.currentTarget.dataset.done;
		app.util.request({
			'url': 'entry/wxapp/TodoEdit',
			data: {
				id: index,
				done: done
			},
			success(res) {
				self.getTodo()
			}
		})
	},
	showEdit(e) {
		var index = e.currentTarget.dataset.index;
		this.setData({
			editID: index
		})
	},
	edit(e) {
		const self = this;
		var index = e.currentTarget.dataset.index;
		app.util.request({
			'url': 'entry/wxapp/TodoEdit',
			data: {
				id: index,
				title: e.detail.value
			},
			success(res) {
				self.getTodo()
			}
		})
	},
	setTodo(todo) {
		const self = this
		wx.setStorage({
			key: 'we7_wxappdemo_todo',
			data: todo,
			success() {
				self.setData({
					todo: todo
				})
			}
		})
	},
	delect(e) {
		const self = this
		wx.showModal({
			title: '删除',
			content: '确定删除吗？',
			success(res) {
				if (res.confirm) {
					var index = e.currentTarget.dataset.index;
					app.util.request({
						'url': 'entry/wxapp/TodoDel',
						data: {
							id: index
						},
						success(res) {
							self.getTodo()
						}
					})
				}
			}
		})
	}
})