// page/my/my.js
Page({
    data: {
        user: {}
    },
    onLoad: function(options) {
        // 页面初始化 options为页面跳转所带来的参数
        console.log("aaaa");
        var that = this
        wx.getUserInfo({

            success: function(res) {
                console.log(res);
                var userInfo = res.userInfo
                var nickName = userInfo.nickName
                var avatarUrl = userInfo.avatarUrl
                var gender = userInfo.gender //性别 0：未知、1：男、2：女 
                var province = userInfo.province
                var city = userInfo.city
                var country = userInfo.country
                that.setData({
                    user: {
                        nickName: nickName,
                        avatarUrl: avatarUrl,
                        city: city
                    }
                })
            }
        })
    },
    onReady: function() {
        // 页面渲染完成
    },
    onShow: function() {
        // 页面显示
    },
    onHide: function() {
        // 页面隐藏
    },
    onUnload: function() {
        // 页面关闭
    }
})