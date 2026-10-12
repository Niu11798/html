// pages/index/index.js
Page({
  data: {
    targetDate: '2046-09-16',
    days: 0,
    hours: '00',
    minutes: '00',
    seconds: '00',
    hoursPrevious: '00',
    minutesPrevious: '00',
    secondsPrevious: '00',
    hoursRolling: false,
    minutesRolling: false,
    secondsRolling: false,
    centuryPercent: 0,
    centuryDays: 0
  },

  onShow() {
    this.startCountdown();
    this.updateCenturyProgress();
  },

  onHide() {
    this.stopCountdown();
  },

  onUnload() {
    this.stopCountdown();
  },

  startCountdown() {
    this.stopCountdown();
    this.updateCountdown();
    if (new Date(this.data.targetDate).getTime() <= Date.now()) return;
    this.countdownInterval = setInterval(() => this.updateCountdown(), 1000);
  },

  stopCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
      this.countdownInterval = null;
    }
    if (this.rollTimeout) {
      clearTimeout(this.rollTimeout);
      this.rollTimeout = null;
    }
    this.setData({
      hoursPrevious: this.data.hours,
      minutesPrevious: this.data.minutes,
      secondsPrevious: this.data.seconds,
      hoursRolling: false,
      minutesRolling: false,
      secondsRolling: false
    });
  },

  // 更新倒计时
  updateCountdown() {
    const now = Date.now();
    const target = new Date(this.data.targetDate).getTime();

    const diff = Math.max(0, target - now);

    const days = Math.floor(diff / 86400000);
    const hours = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');

    // 只更新变化的字段，降低 setData 频率
    const patch = {};
    if (days !== this.data.days) patch.days = days;
    const nextValues = { hours, minutes, seconds };
    ['hours', 'minutes', 'seconds'].forEach(unit => {
      const next = nextValues[unit];
      if (next !== this.data[unit]) {
        patch[`${unit}Previous`] = this.data[unit];
        patch[unit] = next;
        patch[`${unit}Rolling`] = true;
      }
    });
    if (Object.keys(patch).length) this.setData(patch);
    if (patch.hoursRolling || patch.minutesRolling || patch.secondsRolling) {
      if (this.rollTimeout) clearTimeout(this.rollTimeout);
      this.rollTimeout = setTimeout(() => {
        this.rollTimeout = null;
        this.setData({
          hoursPrevious: this.data.hours,
          minutesPrevious: this.data.minutes,
          secondsPrevious: this.data.seconds,
          hoursRolling: false,
          minutesRolling: false,
          secondsRolling: false
        });
      }, 520);
    }
    if (diff === 0) this.stopCountdown();
  },

  // 更新百年征程进度（1946 建校 → 2046 百年校庆）
  updateCenturyProgress() {
    const start = new Date('1946-09-16').getTime();
    const end = new Date('2046-09-16').getTime();
    const now = Date.now();
    let percent = ((now - start) / (end - start)) * 100;
    percent = Math.max(0, Math.min(100, percent));
    const days = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    this.setData({
      centuryPercent: Math.round(percent * 10) / 10,
      centuryDays: days
    });
  },

  // 复制吉林大学官网链接
  copyOfficialLink() {
    wx.setClipboardData({
      data: 'https://www.jlu.edu.cn/',
      success() {
        wx.showToast({
          title: '已复制官网地址',
          icon: 'success'
        });
      }
    });
  },

  // 分享给好友
  onShareAppMessage() {
    const days = Math.max(0, Math.ceil((new Date('2046-09-16').getTime() - Date.now()) / 86400000));
    return {
      title: `距离吉林大学100周年校庆还有 ${days} 天，一起倒计时！`,
      path: '/pages/index/index',
      imageUrl: '/images/logo.png'
    };
  }
});
