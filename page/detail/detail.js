import douban from '../../utils/fetch';
const URL = 'https://api.getweapp.com/vendor/douban/subject?id=';
// const URL = 'https://api.douban.com/v2/movie/subject/';

const searchByTagUrl = 'https://api.getweapp.com/vendor/douban/search?tag=';
Page({
    data: {
        id: '',
        filmDetai: {},
        showLoading: true,
        showContent: false,
    },
    onLoad: function(options) {
        wx.showNavigationBarLoading()
        console.log(options);
        var that = this;
        var id = options.id;
        that.setData({
            id: options.id
        })
        douban.fetchFilmDetail.call(that, URL, id);

    },
    viewPersonDetail: function(e) {
        var data = e.currentTarget.dataset;
        wx.redirectTo({
            url: '../personDetail/personDetail?id=' + data.id
        })
    },
    viewFilmByTag: function(e) {
        var data = e.currentTarget.dataset;
        var keyword = data.tag;
        wx.redirectTo({
            url: '../personDetail/personDetail?id=' + data.id
        })
    },
    viewFilmByTag: function(e) {
        var data = e.currentTarget.dataset;
        var keyword = data.tag;
        wx.navigateTo({
            url: ''
        })
    }

})