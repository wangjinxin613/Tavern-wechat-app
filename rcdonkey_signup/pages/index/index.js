var app = getApp();
Page({
	data : {
		activity : [],
		datalock : false,
		page : 1
	},
	onLoad: function (request) {
		var $this = this;
	},
	onReady: function () {
		var $this = this;
		app.util.getUserInfo(function(response){
			$this.getActivity(1);
		});
	},
	onPullDownRefresh : function() {
		var $this = this;
		$this.setData({
			activity : [],
		});
		$this.getActivity(1, function(data){
			$this.setData({
				activity : data
			});
			wx.stopPullDownRefresh();
		});
		
	},
	onReachBottom : function() {
		var $this = this;
		var page = $this.data.page + 1;
		$this.getActivity(page);
	},
	onDeleteActivity : function(event) {
		var $this = this;
		var id = event.currentTarget.id;
		if (!id) {
			app.util.message({
				title : '请选择要删除的活动',
				type : 'error'
			});
			return;
		}
		wx.showModal({
			title : '系统信息',
			content : '您确认要删除吗？',
			success : function() {
				app.util.request({
					url: 'entry/wxapp/deleteActivity',
					data: {
						m: 'rcdonkey_signup',
						id : id
					},
					method : 'post',
					success: function (response) {
						$this.getActivity(1, function(data){
							$this.setData({
								activity : data
							});
						});
					},
					fail : function() {
						
					}
				});
			}
		});
	},
	getActivity : function(page, callback) {
		var $this = this;
		if ($this.data.datalock) {
			return false;
		}
		$this.setData({
			page: page,
			datalock : true,
		});
		console.log($this.data.datalock);
		app.util.request({
			url: 'entry/wxapp/my',
			data: {
				m: 'rcdonkey_signup',
				page : page
			},
			method : 'post',
			success: function (response) {
				if (typeof callback == 'function') {
					callback(response.data.data);
					$this.setData({
						datalock : false
					});
				} else {
					var activity = $this.data.activity;
					if (response.data.data) {
						for (var i in response.data.data) {
							activity.push(response.data.data[i]);
						}
					}
					$this.setData({
						activity : activity,
						datalock : false
					});
				}
			}
		});
	}
})