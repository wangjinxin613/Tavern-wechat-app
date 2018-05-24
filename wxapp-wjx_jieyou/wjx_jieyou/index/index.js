//index.js
var app = getApp();
//获取xsss
Page({
	data: {
		userInfo: {},
		startX: 0, //开始移动时距离左
		endX: 0, //结束移动时距离左
		nowPage: 0, //当前是第几个个页面
		xinList: [],
		//推送的演示控制
		tuisongDis: {
			display: "none",
			pageStyle: "filter: blur(0px);",
			btnStyle: "transform:translateY(-110%)"
		},
		isShuQuan:true,
		todayDay:new Date().toLocaleDateString()
	},
	//事件处理函数

	onLoad: function (e) {
		var self = this;
		//检验是否授权登陆
		wx.getSetting({
			success(res) {
			
				//没有授权
				if (!res.authSetting['scope.userInfo']) {
					console.log("没有授权");
					wx.showModal({
						title:"欢迎来到小酒馆",
						content: '第一次使用需要授权登陆，请点击页面中间的按钮进行授权',
						showCancel:false
						
					})
					// wx.authorize({
					// 	scope: 'scope.userInfo',
					// 	success() {
					// 		// 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
					// 		wx.startRecord()
					// 	}
					// })
					self.setData({
						isShowQuan:false
					});

				}else {
					self.setData({
						isShowQuan: true
					});
					//已经授权，开始登陆
					app.util.getUserInfo(function (response) {
						console.log(response);
						self.setData({
							userInfo: response
						})
						//加载信数据
						self.loadData(response.memberInfo.uid);
					})
				}
			}
		})
		
	},
	//加载信数据
	loadData: function (uid) {
		var self = this;
		var indexData = {};
		app.util.request({
			url: 'entry/wxapp/indexlist',
			data: {
				uid: uid
			},
			method: 'post',
			success: function (res) {
				
				//indexData接收数据并且转化成想要的数据
				indexData = res.data;
				var zin = 0;
				for (var Key in indexData) {
					//indexData[Key] = res.data[1].msg;
					
					indexData[Key].from = self.plusXing(indexData[Key].nickname, 0, 1);
					indexData[Key].to = self.data.userInfo.wxInfo.nickName;
					indexData[Key].isCom = false;
					indexData[Key].zIndex = zin;
					zin--;
				}
				//数据已经转换成为自己想要的
				wx.setStorage({
					key: 'indexData',
					data: indexData,
					success: function (e) {
						
					}
				})
				wx.getStorage({
					key: 'indexData',
					success: function (res) {
						self.setData({
							xinList: res.data
						});
						//加载信封切换动画
						self.checkPage(self.data.nowPage);
						
					},
				})
			},
			fail: function (response) {
				if (response.data.message) {
					//	app.util.message(response.data.message, '', 'error');
				}
			}

		});
	},
	plusXing: function (str, frontLen, endLen) {
		var len = str.length - frontLen - endLen;
		var xing = '';
		for (var i = 0; i < len; i++) {
			xing += '*';
		}
		return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
	},
	onReady: function () {

	},
	onShareAppMessage: function () {
		return {
			title: '解忧小酒馆，专治不开心~'
		}
	},
	//手指触发开始移动
	moveStart: function (e) {
		var startX = e.changedTouches[0].pageX;
		this.setData({
			startX: startX
		});

	},
	//手指触摸后移动完成触发事件
	moveItem: function (e) {
		var that = this;
		var endX = e.changedTouches[0].pageX;


		//计算手指触摸偏移剧距离
		var moveX = this.data.startX - endX;

		//向左移动
		if (moveX > 20) {

			if (that.data.nowPage >= (that.data.xinList.length - 1)) {
				wx.showToast({
					title: '最后一封信了喔,明天再来吧',
					icon: 'none'
				})
				return false;
			}
			that.setData({
				nowPage: that.data.nowPage + 1
			});

		}
		if (moveX < -20) {
			if (that.data.nowPage <= 0) {
				wx.showToast({
					title: '这是第一封信了喔',
					icon: 'none'
				})
				return false;
			}
			that.setData({
				nowPage: that.data.nowPage - 1
			});
		}
		//重新排页
		that.checkPage(that.data.nowPage);
	},
	// 页面判断逻辑,传入参数为当前是第几页 
	checkPage: function (index) {
		//信列表数据
		var data = this.data.xinList;
		var that = this;
		var m = 1;
		for (var i = 0; i < data.length; i++) {
			//先将所有的页面隐藏
			var disp = 'xinList[' + i + '].display';
			var sca = 'xinList[' + i + '].scale';
			var slateX = 'xinList[' + i + '].slateX';
			var style = 'xinList[' + i + '].style';

			//向左移动上一个页面
			if (i == (index - 1)) {
				that.setData({
					[slateX]: '-120%',
					[disp]: 1,

				});
			}
			//向右移动的最右边要display:none的页面
			if (i == (index + 3)) {
				that.setData({

					[slateX]: '20px',

				});
			}
			if (i == index || (i > index && (i < index + 3))) {
				//显示最近的三封
				that.setData({
					[disp]: 1
				});
				//第一封信
				if (m == 1) {
					this.setData({
						[sca]: 1,
						[slateX]: 0,

					});
				}
				//第一封信
				else if (m == 2) {
					this.setData({
						[sca]: 0.8,
						[slateX]: '20px',

					});
				}
				//第三封信
				else if (m == 3) {
					this.setData({
						[sca]: 0.6,
						[slateX]: '40px',

					});
				}
				m++;
			}

		}
	},
	//信件点击跳转函数
	location: function (e) {
		//信件id
		var id = e.currentTarget.dataset.idx;
		//开始跳转喔
		wx.navigateTo({
			url: '/wjx_jieyou/huixin/huixin?id=' + id,
		})
	},
	//推送页面的显示隐藏
	tuisong: function () {
		if (this.data.tuisongDis.display == 'none') {
			this.setData({
				"tuisongDis.display": "block",
				"tuisongDis.btnStyle": "transform:translateY(0)",
				"tuisongDis.pageStyle": "filter: blur(8px);",
			});
		} else {
			this.setData({
				"tuisongDis.display": "none",
				"tuisongDis.btnStyle": "transform:translateY(-100%)",
				"tuisongDis.pageStyle": "filter: blur(0px);",
			});
		}
	},
	updateUserInfo(result) {
		var app = getApp()
		//拿到用户数据时，通过app.util.getUserinfo将加密串传递给服务端
		//服务端会解密，并保存用户数据，生成sessionid返回
		app.util.getUserInfo(function (userInfo) {
			//这回userInfo为用户信息
			console.log(userInfo)
		}, result.detail)
		this.onLoad();
	}
})
