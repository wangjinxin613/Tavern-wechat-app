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
	onPreviewImage : function(event) {
		app.util.showImage(event);
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