// page/component/index.js
Page({
  onPullDownRefresh: function(){
    wx.stopPullDownRefresh()
  },
  data: {
    imgUrls: [
      'http://p1.meituan.net/mmc/bd3936065b51559541261f01a09a0326118664.jpg',
      'http://p0.meituan.net/mmc/109d5bab5dd9ad831009390e39f12a63199948.jpg',
      'http://p0.meituan.net/mmc/89857b57ad3109a921e5e7dff7e2b3d4102033.jpg'
    ],
    theater:null,
    coming:null,
    winWidth: 0,  
    winHeight: 0,  
    // tab切换  
    currentTab: 0,  

  },
   onLoad: function() {  
    var that = this;  
  
    /** 
     * 获取系统信息 
     */  
    wx.getSystemInfo( {  
  
      success: function( res ) {
        console.log(res);  
        that.setData( {  
          winWidth: res.windowWidth,  
          winHeight: res.windowHeight  
        });  
      }  
  
    });
    wx.request({
      url: 'https://api.douban.com/v2/movie/in_theaters',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'content-type': 'json'}, // 设置请求的 header
      success: function(res){
        // success
        // console.log(res.data);
        that.setData({
          theater:res.data.subjects
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    });
    wx.request({
      url: 'https://api.douban.com/v2/movie/coming_soon',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {'content-type': 'json'}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res.data);
        that.setData({
          coming:res.data.subjects
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },   
  
   /** 
     * 滑动切换tab 
     */  
  bindChange: function( e ) {  
  
    var that = this;  
    that.setData( { currentTab: e.detail.current });  
  
  },  
  /** 
   * 点击tab切换 
   */  
  swichNav: function( e ) {  
  
    var that = this;  
  
    if( this.data.currentTab === e.target.dataset.current ) {  
      return false;  
    } else {  
      that.setData( {  
        currentTab: e.target.dataset.current  
      })  
    }  
  }, 

  viewFilmDetail:function(e){
    var data = e.currentTarget.dataset;
    console.log(data.id);
    wx.navigateTo({
      url:"../detail/detail?id="+data.id
    })
  } 
})