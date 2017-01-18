import douban from '../../utils/fetch';
var searchByTagUrl = 'https://api.douban.com/v2/movie/search?tag=';
var config = {
    city: '北京',
    count: 20
}
Page({
    data: {
        films: [],
        hasMore: true,
        showLoading: true,
        start: 0,
        windowHeight: 0,
        url: '',
        keyword: ''
    },
    onLoad: function(options) {
        var that = this;
        that.setData({
            url: options.url,
            keyword: options.keyword,
            title: options.keyword
        })
        douban.search.call(that, that.data.url, that.data.keyword, that.data.start, config.count);
    },
    onShow: function() {
        var that = this
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    windowHeight: res.windowHeight * 2 + 112
                })
            }
        })
    },
    scroll: function(e) {
        console.log(e)
    },
    scrolltolower: function() {
        var that = this
        douban.search.call(that, that.data.url, that.data.keyword, that.data.start, config.count)
    },
    viewFilmDetail: function(e) {
        var data = e.currentTarget.dataset;
        wx.navigateTo({
            url: "../detail/detail?id=" + data.id
        })
    },
    onPullDownRefresh: function() {
        var that = this
        that.setData({
            films: [],
            hasMore: true,
            showLoading: true,
            start: 0
        })
        douban.search.call(that, that.data.url, that.data.keyword, that.data.start, config.count)
    },
    viewFilmByTag: function(e) {
        var data = e.currentTarget.dataset
        var keyword = data.tag
        wx.navigateTo({
            url: '../searchResult/searchResult?url=' + encodeURIComponent(searchByTagUrl) + '&keyword=' + keyword
        })
    }
})