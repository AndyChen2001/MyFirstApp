// index.js
const AV = require('../../../libs/av-core-min');
// 获取应用实例
const app=getApp()
Page({
  data: {
    imglist1:[
      { url: '../../images/buttons/eat.png', id:"eat/eat"},
      { url: '../../images/buttons/medicine.png', id:"medicine/medicine"},
      { url: '../../images/buttons/infos.png', id:"../personal_infos/basic_infos/basic_infos"},
      { url: '../../images/buttons/practice.png', id:"practice/practice"},
      { url: '../../images/buttons/sleep.png', id:"sleep/sleep"},
    ],
    imglist2:[
      { url: '../../images/buttons/setting.png', id:"setting/setting"},
      { url: '../../images/buttons/reminder.png', id:"../reminder/takemedicine/takemedicine"},
    ],
    exp: app.globalData.exp,
    slimeaction:"https://www.z4a.net/images/2021/07/19/relax1.gif",
  },
  
  gotoPage_task:function(){
    wx.navigateTo({
      url:'/pages/home/task/task'
    })
  },
  gotoPage_statistics:function(){
    wx.navigateTo({
      url:'/pages/statistics/statistics'
    })
  },

  click: function (e) {
    app.homeclick(e)
  },
  // 事件处理函数
  onLoad() {

  },
  onShow(){
    if(app.globalData.SignedIn==false){
      wx.redirectTo({
        url: '../../login/login/login',
      })
    }
    this.setData({
      exp: app.globalData.exp/app.globalData.levelexplist[app.globalData.level]*100,
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
})
