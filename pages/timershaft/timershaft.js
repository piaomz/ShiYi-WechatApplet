
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: [],
    res:[]
  },
  onTapHome() {
    wx.navigateBack({
    })
  },
  onTapComment(e) {
    wx.navigateTo({
      url: '/pages/comment/comment?id=' + e.currentTarget.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.globalData)



    // 1. 获取数据库引用
    const db = wx.cloud.database()
    // 2. 构造查询语句
    // collection 方法获取一个集合的引用
    // where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。API 也支持高级的查询条件（比如大于、小于、in 等），具体见文档查看支持列表
    // get 方法会触发网络请求，往数据库取数据
    var that = this
    //console.log(openID)
    
    var userListlength=0
    db.collection('Words').where({
      _openid: app.globalData.openID
    }).get({
      success(res) {
          for(let i = 0; i< res.data.length; i++) {
          that.setData({
            ['userList[' + i + '].url']: res.data[i].imageurl,
            ['userList[' + i + '].wenzi']: res.data[i].wenzi,
            ['userList[' + i + ']._id']: res.data[i]._id,
            ['userList[' + i + '].year']: res.data[i].time.year,
            ['userList[' + i + '].month']: res.data[i].time.month,
            ['userList[' + i + '].day']: res.data[i].time.day,
            ['userList[' + i + '].hour']: res.data[i].time.hour,
            ['userList[' + i + '].minute']: res.data[i].time.minute,
            ['userList[' + i + '].admire']: 0,
          })
          
        }
        for (let i = 0; i < res.data.length; i++) {
          console.log(that.data.userList[i]._id)
          db.collection('DzHis').where({
            dzid: that.data.userList[i]._id
          }).get({
            success(res) {
              console.log(res)
              that.setData({
                ['userList[' + i + '].admire']: res.data.length,
              })
            }
          })
        }
        for (let i = 0; i < res.data.length; i++) {
          console.log(that.data.userList[i]._id)
          db.collection('Comment').where({
            id: that.data.userList[i]._id
          }).get({
            success(res) {
              console.log(res)
              that.setData({
                ['userList[' + i + '].comment']: res.data.length,
              })
            }
          })
        }
        console.log(that.data.userList)
    }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})