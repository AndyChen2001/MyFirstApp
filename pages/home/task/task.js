// pages/message/message.js
var app = getApp()
Page({
  gotoPage_eat:function(){
    wx.navigateTo({
      url:'/pages/home/eat/eat'
    })
  },
  gotoPage_medicine:function(){
    wx.navigateTo({
      url:'/pages/home/medicine/medicine'
    })
  },
  gotoPage_sleep:function(){
    wx.navigateTo({
      url:'/pages/home/sleep/sleep'
    })
  },
  gotoPage_practice:function(){
    wx.navigateTo({
      url:'/pages/home/practice/practice'
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    message:'',
    sleepfinish: app.globalData.sleepfinish,
    eatfinish: app.globalData.eatfinish,
    medicinefinish: app.globalData.medicinefinish,
    practicefinish: app.globalData.practicefinish,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      message:options.message,
      sleepfinish:app.globalData.sleepfinish,
      eatfinish: app.globalData.eatfinish,
      medicinefinish: app.globalData.medicinefinish,
      practicefinish: app.globalData.practicefinish,
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