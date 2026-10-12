// pages/welcome/welcome.js
Page({
  // 进入主页面
  goToMain() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  // 分享给好友
  onShareAppMessage() {
    return {
      title: '吉林大学100周年倒计时，等你来见证',
      path: '/pages/welcome/welcome',
      imageUrl: '/images/logo.png'
    };
  }
});
