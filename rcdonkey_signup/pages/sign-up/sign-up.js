var app = getApp();
Page({
	data : {
		activity : {},
		items: [
			{name: 'private', value: '仅发布者可见', checked: 'true'},
			{name: 'public', value: '全员可见'},
		]
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
	onFormSubmit : function(event) {
		var $this = this;
		var form = event.detail.value;

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
				id : $this.data.activity.id,
				remark : form.remark
			},
			method : 'post',
			success: function (response) {
				app.util.message({
					title : '报名成功',
					redirect : 'redirect:/rcdonkey_signup/pages/detail/detail?id=' + $this.data.activity.id
				});
			}
		});
	}
})