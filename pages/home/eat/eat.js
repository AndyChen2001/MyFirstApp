// pages/home/eat/eat.js
const app=getApp()
const AV = require('../../../libs/av-core-min');
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist1:[
      { url: '../../images/buttons/eat.png', id:"index/index"},
    ],
    slimeaction:"https://www.z4a.net/images/2021/07/20/meal1.gif",
    dialogShow: false,
    medicineBeforeDialogShow: false,
    takeMedicineAfter: false,
    timeStart: util.formatTime(new Date()),
    buttons: [
      {text: '点错啦'}, {text: '早饭'},
      {text: '中饭'}, {text: '晚饭'}
    ],
    medicineButton: [
      {text: '这就去吃'}
    ],
    meals:'',
  },

  click: function (e) {
    console.log(e.currentTarget.dataset.id)
    const jumpto = e.currentTarget.dataset.id
    console.log(this.data.takeMedicineAfter)
    if(this.data.meals){//如果已经吃过，meals会是空字符串
      //设置吃饭结束时间计算持续时间并上传
      const eatTime = new AV.Object('EatTime')
      const currentUser = AV.User.current()
      eatTime.set('parent',currentUser)
      console.log('开始时间：',this.data.timeStart)
      eatTime.set('eattimeStart',this.data.timeStart)
      var timeEnd = util.formatTime(new Date())
      var stime = Date.parse(new Date(this.data.timeStart))
      var etime = Date.parse(new Date(timeEnd))
      var eatDuration = etime - stime
      eatTime.set('eatDuration',eatDuration)
      eatTime.set('meals',this.data.meals)
      console.log('创建的eatTime',eatTime)
      eatTime.save()
    }
    //判断有没有药要饭后吃
    if(this.data.takeMedicineAfter){
      this.timeToMedicineAfter()
    }
    else{
      wx.redirectTo({
        url: '../' + jumpto,
      })
    }
  },

  openConfirm: function () {
    this.setData({
      dialogShow: true
    })
  },
  timeToMedicineAfter: function(){
    console.log("medicineAfter")
    this.setData({
      takeMedicineAfter: false,
      medicineAfterDialogShow: true,
    })
  },
  timeToMedicineBefore: function(){
    console.log("medicineBefore");
    this.setData({
      medicineBeforeDialogShow: true,
    })
  },

  tapDialogButton(e) {
    app.globalData.TakeMedicineBefore = false;
    console.log(e.detail)
    if(e.detail.index==0){
      wx.redirectTo({
        url: '../index/index',
      })
      return
    }
    const currentUser = AV.User.current()
    //记录每餐吃饭情况（早饭：0；中饭：1；晚饭：2）
    var meals =currentUser.get('meals')
    for(var j = 0; j<3 ;j++){
      if(e.detail.index-1 == j){
        if(meals[j]){//如果已经吃过
          wx.redirectTo({
            url: '../index/index',
          })
          wx.showToast({
            title: '已经吃过！',
            icon: 'error',
          })
          return
        }
        meals[j]=true
        var mealsText = ["早饭","中饭","晚饭"]
        this.setData({
          meals: mealsText[e.detail.index-1],
          timeStart: util.formatTime(new Date())
        })
      }
      currentUser.set("meals",meals);
      currentUser.save();
    }
    
    var values = currentUser.get('medicineBefore')?currentUser.get('medicineBefore'):[]
    for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if(e.detail.index-1 == values[j]){//index从1到3，values从0到2是吃饭前
          app.globalData.TakeMedicineBefore = true/* 饭前吃药，以便吃完药可以回到吃饭 */
          this.timeToMedicineBefore();
          break;
        }
    }
    values = currentUser.get('medicineAfter')?currentUser.get('medicineAfter'):[]
    for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
      if(e.detail.index+2 == values[j]){//index从1到3，values从3到5是吃饭后
        this.setData({
          takeMedicineAfter: true,
        })
        console.log('TakeMedicineAfter');
        break;
      }
    }
    this.setData({
        dialogShow: false,
    })

    if(meals[0]==true&&meals[1]==true&&meals[2]==true){
    if(!app.globalData.eatfinish){
    app.exp("eat");
    app.globalData.eatfinish = true;
    }
    console.log(app.globalData.eatfinish);
    var complete = currentUser.attributes.accomplished; //从leancloud取数组赋值后存储，吃饭对应第2个
    complete[2] = true;
    currentUser.set("accomplished",complete);
    currentUser.save();
    }
  },

  tapMedicineBeforeDialog: function(){
    this.setData({
      medicineBeforeDialogShow: false,
    })
    wx.navigateTo({
      url: '../medicine/medicine',
    })
  },
  tapMedicineAfterDialog: function(){
    this.setData({
      medicineAfterDialogShow: false,
    })
    wx.redirectTo({
      url: '../medicine/medicine',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.openConfirm()
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
    wx.hideHomeButton();
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
