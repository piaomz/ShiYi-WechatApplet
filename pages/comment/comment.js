// pages/comment/comment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight:app.globalData.windowHeight,
    comment:[],
    id: "f4b905395cdfd23300d41a8c1f0757b2",
    mycomment:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    this.setData({
      id:options.id
    })
    const db = wx.cloud.database()
    var that=this
    db.collection('Comment').where({
      id: that.data.id
    }).get({
      success(res) {
        console.log(res)
        for (let i = 0; i < res.data.length; i++) {
          that.setData({
            ['comment[' + i + '].username']: res.data[i].username,
            ['comment[' + i + '].text']: res.data[i].text,
          })
        }
      }
    })
  },
  inputfunc:function(e){
    this.setData({
      mycomment: e.detail.value
    })
  },
  onTapHome() {
    wx.navigateBack({
      
    })
  },
  send:function(){
    const db = wx.cloud.database()
    var that = this
      if(app.globalData.userInfo&&that.data.mycomment){
        db.collection('Comment').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            id:that.data.id,
            username: app.globalData.userInfo.nickName,
            text:that.data.mycomment
          },
          success(res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            that.setData({
              ['comment[' + that.data.comment.length + '].username']: app.globalData.userInfo.nickName,
              ['comment[' + that.data.comment.length + '].text']: that.data.mycomment,
              mycomment:''
            })
            console.log(res)
          }
        })
      }else{

      }
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