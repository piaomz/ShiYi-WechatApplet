//index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight:null,
    windowWidth:null,
    y:1000,
    pos:false,
     groupnum:0,
    moving:false,
    helptext: "滑动以发布", 
    animationData: {},
    hidden: true,
    animationData2: {},
    hidden2: false,
    imgList: [],/*图片*/
    modalName: null,
    modalNamezf: null,
    textareaAValue: null,/*上传文本*/
    textareaBValue: null,
    tanchuangyincang:false,

    /*cyhr*/
    userInfo: app.globalData.userInfo,
    hasUserInfo: app.globalData.hasUserInfo,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  /*cyhr*/

    basicsList: [{
      icon: 'usefullfill',
      name: '开始',
      color:"text-blue"
    }, {
      icon: 'radioboxfill',
      name: '编辑',
      color:"text-orange"
      
    }, {
      icon: 'myfill',
      name: '审核'
    }, {
      icon: 'roundcheckfill',
      name: '发布'
    },],
    basics: 1,

    /**0**结束*/
/*sjj*/ 
    cardCur: 0,
    swiperList: [{
      id: 0,
      dzid:'',
      type: 'image',
      wenzi:'',
      dz:false,
      url: 'https://636c-cloud-1708-1259214274.tcb.qcloud.la/start/start1.jpg?sign=4041c3e01d11478fdfda513e2ffcd5aa&t=1558688665'
    }, {
      id: 1,
      dzid: '',
      type: 'image',
      wenzi: '',
      dz: false,
        url: 'https://636c-cloud-1708-1259214274.tcb.qcloud.la/start/start2.jpg?sign=ae3ef819417a1a4e71de61cad8f3a4ad&t=1558688700',
    }, {
      id: 2,
      dzid: '',
      type: 'image',
      wenzi: '',
      dz: false,
        url: 'https://636c-cloud-1708-1259214274.tcb.qcloud.la/start/start3.jpg?sign=9718b62be2708f7afdb06e6a70d0296c&t=1558688713'
    }, {
      id: 3,
      dzid: '',
      type: 'image',
      wenzi: '',
      dz: false,
        url: 'https://636c-cloud-1708-1259214274.tcb.qcloud.la/start/start4.jpg?sign=0647a598572b72e10da1abc4c2b15b7e&t=1558688732'
    }, {
      id: 4,
      dzid: '',
      type: 'image',
      wenzi: '',
      dz: false,
        url: 'https://636c-cloud-1708-1259214274.tcb.qcloud.la/start/start5.1.jpg?sign=50b95eb0a7a702552fca825b2b366c44&t=1558688748'
    }, {
      id: 5,
      dzid: '',
      type: 'image',
      wenzi: '',
      dz: false,
        url: 'https://636c-cloud-1708-1259214274.tcb.qcloud.la/start/start5.2.jpg?sign=f3e9ae3c3d26d2c1fd124b591dc1cf31&t=1558688768'
    }, {
      id: 6,
      dzid: '',
      type: 'image',
      wenzi: '',
      dz: false,
        url: 'https://636c-cloud-1708-1259214274.tcb.qcloud.la/start/start5.3.jpg?sign=14a33fc1956701008065659e97652216&t=1558688810'
      }, {
      id: 7,
      dzid: '',
      type: 'image',
      wenzi: '',
      dz: false,
        url: 'https://636c-cloud-1708-1259214274.tcb.qcloud.la/start/start6.jpg?sign=c3aa3cf5a98cdfe2d1fea13650d6a37d&t=1558688821'
      },{
      id: 8,
      dzid: '',
      type: 'image',
      wenzi: '',
      dz: false,
        url: 'https://636c-cloud-1708-1259214274.tcb.qcloud.la/start/start7.jpg?sign=2046cd87bce407b03bd005e7f18f9b31&t=1558688832'
      }, {
      id: 9,
      dzid: '',
      type: 'image',
      wenzi: '',
      dz: false,
        url: 'https://636c-cloud-1708-1259214274.tcb.qcloud.la/start/start8.jpg?sign=154b7cfc2da5ebfb24c3e60d8461e765&t=1558688842'
      },{
      id: 10,
      dzid: '',
      type: 'image',
      wenzi: '',
      dz: false,
        url: 'https://636c-cloud-1708-1259214274.tcb.qcloud.la/start/start9.jpg?sign=129ad5df7cc38006c38ead002a02db7e&t=1558688858'
      },
      {
        id: 11,
        dzid: '',
        type: 'next',
        wenzi: '',
        url: 'https://636c-cloud-1708-1259214274.tcb.qcloud.la/logo/slogen_lastpage.jpg?sign=2c5e3d6f09aad8d1a62e07886a425caa&t=1558684500'
      }
    ],
  },
  /*sjj.0.0.8 */
  
  showModalzf(e) {
    this.setData({
      modalNamezf: e.currentTarget.dataset.target
    })
  },
  hideModalzf(e) {
    this.setData({
      modalNamezf: null
    })
  },
/*sjj 0.0.8*/
  /*sjj */
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },
  onTapTimeLine() {
    wx.navigateTo({
      url: '/pages/timershaft/timershaft',
    })
  },
  onTapMine(){
    wx.navigateTo({
      url: '/pages/mine/mine',
    })
  },
  onTapAbout() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  onTapAdmire(){
    wx.navigateTo({
      url: '/pages/admire/admire',
    })
  },
  onTapSupport() {
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    })
  },
/*sjj0.0.8.4 */
refresh(){
  this.setData({
    groupnum:this.data.groupnum+1
  })
  wx.setStorageSync('groupnum', this.data.groupnum)
  // 1. 获取数据库引用
  const db = wx.cloud.database()
  // 2. 构造查询语句
  // collection 方法获取一个集合的引用
  // where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。API 也支持高级的查询条件（比如大于、小于、in 等），具体见文档查看支持列表
  // get 方法会触发网络请求，往数据库取数据
  var that=this
  db.collection('Words').where({
    groupnum: this.data.groupnum
  }).get({
    success(res) {
      // 输出 [{ "title": "The Catcher in the Rye", ... }]
      console.log(res)
      // console.log(that.data.swiperList[1])
      if(res.data.length<11){
        that.setData({
          groupnum: that.data.groupnum - 1
        })
        wx.setStorageSync('groupnum', that.data.groupnum)
        wx.showModal({
          title: '获取失败',
          content: '暂无更多',
          showCancel: false,
          cancelText: '',
          cancelColor: '',
          confirmText: '确定',
          confirmColor: 'black',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }else{
        for (let i = 0; i < 12; i++) {
          that.setData({
            cardCur: 0,
            ['swiperList[' + i + '].url']: res.data[i].imageurl,
            ['swiperList[' + i + '].wenzi']: res.data[i].wenzi,
            ['swiperList[' + i + '].dzid']: res.data[i]._id
          })
        }
      }
      
    },
    fail(res){
      wx.showModal({
        title: '获取失败',
        content: '网络错误或没有更多',
        showCancel: false,
        cancelText: '',
        cancelColor: '',
        confirmText: '',
        confirmColor: '',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
      that.setData({
        groupnum: that.data.groupnum - 1
      })
      wx.setStorageSync('groupnum', that.data.groupnum)
    }
  })
  console.log(this.data.swiperList)

  //获取数据库的引用
  for (let i = 0; i < 12; i++)
  {
    if(this.data.swiperList[i].dz==true){
      db.collection('DzHis').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
          dzid:this.data.swiperList[i].dzid
        },
        success(res) {
          // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
          
          console.log(res)
        }
      })
    }
  }
},
onTapKaifa(){
wx.showModal({
  title: '开发管理',
  content: '您不是开发者或管理员，无法打开',
  showCancel: false,
  cancelText: '',
  cancelColor: '',
  confirmText: '确定',
  confirmColor: 'black',
  success: function(res) {},
  fail: function(res) {},
  complete: function(res) {},
})
},
onUpTop(){
  this.setData({
    ['swiperList[' + this.data.cardCur + '].dz']: !this.data.swiperList[this.data.cardCur].dz,
  })
},

/*sjj0.0.8.4 */
  /*sjj */
changetext(){
  if(this.data.hidden){
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'linear',
    })
    this.animation = animation
    animation.opacity(0).step()
    this.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      this.setData({
        hidden: false,
        hidden2:true
      })

      var animation2 = wx.createAnimation({
        duration: 800,
        timingFunction: 'linear',
      })
      this.animation2 = animation2
      animation2.opacity(1).step()
      this.setData({
        animationData2: animation2.export()
      })
      setTimeout(function () {
        this.setData({
          hidden2: true
        })
      }.bind(this), 800)

    }.bind(this), 800)

   

  }else{
    var animation2 = wx.createAnimation({
      duration: 800,
      timingFunction: 'linear',
    })
    this.animation2 = animation2
    animation2.opacity(0).step()
    this.setData({
      animationData2: animation2.export()
    })
    setTimeout(function () {
      this.setData({
        hidden2: false,
        hidden:true
      })
      var animation = wx.createAnimation({
        duration: 800,
        timingFunction: 'linear',
      })
      this.animation = animation
      animation.opacity(1).step()
      this.setData({
        animationData: animation.export()
      })
      setTimeout(function () {
        this.setData({
          hidden: true
        })
      }.bind(this), 800)

    }.bind(this), 800)
    

  }
  
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var winW
    var winH
    wx.getSystemInfo({
      success: function (res) {
        winW = res.windowWidth
        winH = res.windowHeight - 64
      }
    })
    this.setData({ windowWidth: winW, windowHeight: winH })
    app.globalData.windowHeight=winH
    console.log(this.data.windowHeight)
    console.log(this.data.windowWidth)
    var that = this
    wx.getStorage({
      key: 'swiperlist',
      success(res) {
        console.log(res)
        that.setData({
          swiperList: res.data
        })
      }
    })
    wx.getStorage({
      key: 'groupnum',
      success(res) {
        console.log(res)
        that.setData({
          groupnum: res.data
        })
      }
    })
    wx.getStorage({
      key: 'userInfo',
      success(res) {
        console.log(res)
        that.setData({
          userInfo: res.data
        })
        app.globalData.userInfo = res.data
      }
    })
    wx.getStorage({
      key: 'hasUserInfo',
      success(res) {
        console.log(res)
        that.setData({
          hasUserInfo: res.data
        })
        app.globalData.hasUserInfo = res.data
      }
    })
  },
  /*cyrh*/
  getUserInfo: function (res) {
    console.log(res)
    app.globalData.userInfo = res.detail.userInfo
    this.setData({
      userInfo: res.detail.userInfo,
      hasUserInfo:true
    })
    app.globalData.hasUserInfo=true;
    /*cyrh*/
    wx.login({
      success(res) {
        console.log('用户的code:' + res.code)
      }
    })
    /*cyhr*/

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    var myDate = new Date();
    var hour = myDate.getHours()
    if (hour >= 18|| hour < 4) {
      this.setData({
        helptext: "晚上好！"
      })
    } else if (hour >= 4 && hour < 9) {
      this.setData({
        helptext: "早上好！"
      })
    } else if (hour >= 9 && hour < 11) {
      this.setData({
        helptext: "上午好！"
      })
    } else if (hour >= 11 && hour < 14) {
      this.setData({
        helptext: "中午好！"
      })
    } else if (hour >= 14 && hour < 18) {
      this.setData({
        helptext: "下午好！"
      })
    }
    // 初始化towerSwiper 传已有的数组名即可
    /*sjj */
    setInterval(this.changetext,3000)
    
    var that = this
    wx.cloud.callFunction({
      // 需调用的云函数名
      name: 'getopenID',
      // 传给云函数的参数
      data: {
      },
      // 成功回调
      success(res) {
        app.globalData.openID=res.result.userInfo.openId
        console.log(app.globalData.openID)
      },
    })
  },
  opencomment:function(){
    var id=this.data.swiperList[this.data.cardCur].dzid
    wx.navigateTo({
      url: '/pages/comment/comment?id='+id,
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  onChange(e) {
    if(this.data.moving==false){
      this.setData({ y: e.detail.y })
    }
       

   // console.log(this.data.pos)
   // console.log(this.data.y)
  },
  
  myviewmove:function(){
    var that = this
    if (that.data.pos == false) {
      that.setData({ y: 22, pos: true ,moving: true })
      setTimeout(function () { that.setData({ moving: false }) }, 700)
    } else {
      that.setData({ y: 1000, pos: false, moving: true })
      setTimeout(function () { that.setData({ moving: false }) }, 700)
    }
  },
  myviewmove2: function () {
    var that=this
      if (that.data.pos == false) {
        if (that.data.y < that.data.windowHeight * 0.88 * 0.8) {
          console.log("向上")
          that.setData({ y: 22, pos: true,moving:true})
          setTimeout(function () { that.setData({moving:false})}, 700)
        } else {
          that.setData({ y: 1000, moving: true })
          setTimeout(function () { that.setData({ moving: false }) }, 700)
        }
      } else {
        if (that.data.y > that.data.windowHeight * 0.88 * 0.2) {
          console.log("向下")
          that.setData({ y: 1000, pos: false, moving: true })
          setTimeout(function () { that.setData({ moving: false }) }, 700)
        } else {
          that.setData({ y: 22, moving: true })
          setTimeout(function () { that.setData({ moving: false }) }, 700)
        }
      }
    
  },
   
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo:app.globalData.hasUserInfo
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.setStorageSync('swiperlist',this.data.swiperList)
    wx.setStorageSync('groupnum', this.data.groupnum)
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
    
  },

  /**ChooseImage** */
  ChooseImage:function(){
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success:(res)=> {
        if(this.data.imgList.length != 0) {
      this.setData({
        imgList: this.data.imgList.concat(res.tempFilePaths)
      })
    } else {
      this.setData({
        imgList: res.tempFilePaths
      })
    }
      },
    })
  },
  DelImg(e) {
    wx.showModal({
      title: '朋友',
      content: '确定要丢掉这段回意吗？',
      cancelText: '想想',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  showModal2(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target,
      tanchuangyincang:true,
      textareaBValue:this.data.textareaAValue
    })
  },
  hideModal3(e) {
    this.setData({
      modalName: null,
      tanchuangyincang: false,
      textareaBValue: null
    })
  },
  hideModal2(e) {
    this.setData({
      modalName: null,
      tanchuangyincang: false,
      textareaAValue:this.data.textareaBValue,
      textareaBValue:null
    })
  },
  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
  },
  FabuBut: function () {
    /**上传图片，图片ID为picurl**/
    wx.showLoading({
      title: '正在发布中...',
      mask:true,
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
    var that = this;
    var MYDate = new Date();
    var picurl;
    var TIME = MYDate.getTime();
    wx.cloud.uploadFile({
      cloudPath: 'picture/' + app.globalData.openID + TIME + '.jpg',
      filePath: that.data.imgList[0],
      name: "sda",
      success: res => {
        wx.cloud.getTempFileURL({
          fileList: [res.fileID],
          success: res => {
            // get temp file URL
            picurl = res.fileList[0].tempFileURL
            console.log(picurl)
            const db = wx.cloud.database()
            db.collection('Words').add({
              data: {
                wenzi: that.data.textareaAValue,
                admire: 0,
                groupnum: -1,
                imageurl: picurl,
                time: {
                  year: MYDate.getFullYear(),
                  month: MYDate.getMonth() + 1,
                  day: MYDate.getDate(),
                  hour: MYDate.getHours(),
                  minute: MYDate.getMinutes(),
                  seconds: MYDate.getSeconds()
                }
              },
              success(res) {
                // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                console.log(res)
                wx.showModal({
                  title: '你添加了一个回意呢',
                  content: '请耐性等待审核噢',
                  confirmText:'好',
                  showCancel: false,
                })
                that.setData({
                  textareaAValue: null,
                  imgList: []
                })
              },
              fail: console.error
            })
          },
          fail: err => {
            // handle error
            wx.showModal({
              title: '错误提示',
              content: '上传文字失败',
              showCancel: false,
            })
          }
        })
        // get resource ID
        console.log(res)
      },
      fail: err => {
        // handle error
        wx.showModal({
          title: '错误提示',
          content: '上传图片失败',
          showCancel: false,
        })
      }
    })
  }
})