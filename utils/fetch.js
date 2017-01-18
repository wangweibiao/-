// import message from "../component/message/message";
var message = require('../component/message/message');
var config = {
    city: '北京',
    count: 20
}
export default {
    fetchFilms: (url, city, start, count, cd) => {
        var that = this;
        if (that.data.hasMor) {
            wx.request({
                url: url,
                data: {
                    city: config.city,
                    start: start,
                    count: count
                },
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: { "Content-Type": "application/json,application/json" }, // 设置请求的 header
                success: function(res) {
                    // success
                    if (res.data.subjects.length === 0) {
                        that.setData({
                            hasMore: false,
                        })
                    } else {
                        that.setData({
                            films: that.data.films.concat(res.data.subjects),
                            start: that.data.start + res.data.subjects.length,
                            showLoading: false
                        })
                    }
                    wx.stopPullDownRefresh()
                    typeof cb == "function" && cb(res.data)
                },
                fail: function() {
                    // fail
                    that.setData({
                        showLoading: false
                    })
                    message.show.call(that, {
                        content: '网络开小差了',
                        icon: 'warning',
                        duration: 3000
                    })
                }
            })
        }
    },
    fetchFilmDetail: function(url, id, cb) {
        var that = this;
        wx.request({
            url: url + id,
            method: 'GET',
            header: {
                "Content-Type": "application/json,application/json"
            },
            success: function(res) {
                console.log(res.data);
                that.setData({
                    filmDetail: res.data,
                    showLoading: false,
                    showContent: true
                })
                wx.setNavigationBarTitle({
                    title: res.data.title
                })
                wx.stopPullDownRefresh()
                typeof cb == 'function' && cb(res.data);
                wx.hideNavigationBarLoading();
            },
            fail: function() {
                that.setData({
                    showLoading: false
                })
                message.show.call(that, {
                    content: '网络开小差了',
                    icon: 'warning',
                    duration: 3000
                })
            }
        })
    },
    fetchPersonDetail: function(url, id, cb) {
        var that = this;
        wx.request({
            url: url + id,
            method: 'GET',
            header: {
                "Content-Type": "application/json,application/json"
            },
            success: function(res) {
                that.setData({
                    personDetail: res.data,
                    showLoading: false,
                    showContent: true
                })
                wx.setNavigationBarTitle({
                    title: res.data.name
                })
                wx.stopPullDownRefresh()
                typeof cb == 'function' && cb(res.data)
            },
            fail: function() {
                that.setData({
                    showLoading: false
                })
                message.show.call(that, {
                    content: '网络开小差了',
                    icon: 'warning',
                    duration: 3000
                })
            }
        })
    },
    search: function(url, keyword, start, count, cb) {
        var that = this
        var url = decodeURIComponent(url)
        if (that.data.hasMore) {
            wx.request({
                url: url + keyword,
                data: {
                    start: start,
                    count: count
                },
                method: 'GET',
                header: {
                    "Content-Type": "application/json,application/json"
                },
                success: function(res) {
                    if (res.data.subjects.length === 0) {
                        that.setData({
                            hasMore: false,
                            showLoading: false
                        })
                    } else {
                        that.setData({
                            films: that.data.films.concat(res.data.subjects),
                            start: that.data.start + res.data.subjects.length,
                            showLoading: false
                        })
                        wx.setNavigationBarTitle({
                            title: keyword
                        })
                    }
                    wx.stopPullDownRefresh()
                    typeof cb == 'function' && cb(res.data)
                },
                fail: function() {
                    that.setData({
                        showLoading: false
                    })
                    message.show.call(that, {
                        content: '网络开小差了',
                        icon: 'warning',
                        duration: 3000
                    })
                }
            })
        }
    }
}