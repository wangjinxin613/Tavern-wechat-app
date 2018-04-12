var app = getApp();
Page({
    data : {
        joinDeadline : {
            selected : '2017-06-05',
            ranage : {start : '2016-01-01', end : '2020-01-01'}
        },
		session: {},
		activity : {id : 0},
		position : {longitude : 0, latitude : 0},
		items: [
			{name: 'username', value: '填写真实姓名'},
			{name: 'tel', value: '填写手机号码'}
		]
    },
    onLoad: function (request) {
        var $this = this;
        $this.setData({
            'joinDeadline.ranage' : { start: new app.util.date().dateAdd('y', -1)},
			'joinDeadline.selected' : new app.util.date().dateToStr('yyyy-MM-dd', new app.util.date().dateAdd('w', 2))
        });
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
					$this.setData({
						'joinDeadline.selected' : response.data.data.join_deadline_date
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
		wx.getLocation({
			type : 'gcj02',
			success : function(position) {
				$this.setData({
					position : {longitude : position.longitude, latitude : position.latitude}
				});
			}
		});
	},
	onJoinDeadlineDateChange : function(event) {
		this.setData({
			'joinDeadline.selected' : event.detail.value
		})
	},
	onFormSubmit : function(event) {
		var $this = this;
		var form = event.detail.value;
		if (!form.title) {
			wx.showToast({
				title: '请输入活动主题',
				icon: 'error',
				duration: 2000
			});
		}
		if (!form.description) {
			wx.showToast({
				title: '请输入活动详情',
				icon: 'error',
				duration: 2000
			});
		}
		app.util.request({
			url: 'entry/wxapp/postactivity',
			data: {
				m: 'rcdonkey_signup',
				title : form.title,
				description : app.util.parseContent(form.description), //处理内容中的特殊字符，比如emoji
				joindeadline : form.joindeadline,
				id : $this.data.activity.id,
				longitude : $this.data.position.longitude,
				latitude : $this.data.position.latitude,
			},
			method : 'post',
			success: function (response) {
				wx.showToast({
					title: response.data.message,
					icon: 'success',
					duration: 2000,
					success : function() {
						wx.redirectTo({
							url: '/rcdonkey_signup/pages/detail/detail?id=' + response.data.data.id
						});
					}
				});
			},
			fail : function(response) {
				if (response.data.message) {
					app.util.message(response.data.message, '', 'error');
				}
			}
		});
	}
})