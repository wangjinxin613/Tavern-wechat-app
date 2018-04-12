var app = getApp();
Page({
	data : {
		activity : {}
	},
	onLoad: function (request) {
		var $this = this;
		if (request.id) {
			app.util.request({
				url: 'entry/wxapp/detail',
				data: {
					m: 'rcdonkey_signup',
					id : request.id
				},
				method : 'post',
				success: function (response) {
					$this.setData({
						'activity' : response.data.data
					});
				}
			});
		}
	},
	onReady: function () {
		var $this = this;
		app.util.getUserInfo(function (response) {
			$this.setData({
				session: response
			});
		});
	},
	onJoin : function() {
		var $this = this;

		if (!$this.data.activity) {
			app.util.message({
				title : '活动不存在或是已经被删除',
				redirect : 'redirect:/rcdonkey_signup/pages/index/index'
			});
		}
		app.util.request({
			url: 'entry/wxapp/join',
			data: {
				m: 'rcdonkey_signup',
				id : $this.data.activity.id
			},
			method : 'post',
			success: function (response) {
				if (response.data.errno) {
					app.util.message({
						title : response.data.message,
						type : 'error',
						redirect : response.data.data.redirect
					});
				} else {
					app.util.message({
						title : '报名成功',
						redirect : 'redirect:/rcdonkey_signup/pages/detail/detail?id=' + $this.data.activity.id
					});
				}
			}
		});
	},
	onPreviewImage : function(event) {
		app.util.showImage(event);
	},
	onPullDownRefresh : function() {
		var $this = this;
		app.util.request({
			url: 'entry/wxapp/detail',
			data: {
				m: 'rcdonkey_signup',
				id : $this.data.activity.id
			},
			method : 'post',
			success: function (response) {
				$this.setData({
					activity : [],
				});
				$this.setData({
					'activity' : response.data.data
				});
				wx.stopPullDownRefresh();
			}
		});
	},
	onShareAppMessage: function () {
		var $this = this;
		return {
			title: $this.data.activity.title,
			path: '/rcdonkey_signup/pages/detail/detail?id=' + $this.data.activity.id,
			success: function(res) {
			}
		}
	}
})