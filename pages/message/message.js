// pages/message/message.js
const { initialMessages } = require('../../utils/data.js');

const STORAGE_KEY = 'jlu_messages';
const STORAGE_KEY_USER = 'jlu_user';

Page({
  data: {
    messages: [],
    newMessage: '',
    user: { nickname: '访客', avatarUrl: '' }
  },

  onLoad() {
    // 读取本机身份（昵称 + 头像），用于区分留言者
    let user = wx.getStorageSync(STORAGE_KEY_USER);
    if (!user || !user.nickname) {
      user = { nickname: '访客', avatarUrl: '' };
    }
    this.setData({ user });

    // 优先读取本地持久化的留言；首次进入用初始留言
    let messages = wx.getStorageSync(STORAGE_KEY);
    if (!messages || !messages.length) {
      messages = initialMessages.map((m, i) => ({
        ...m,
        id: i + 1,
        likes: 0,
        liked: false
      }));
      wx.setStorageSync(STORAGE_KEY, messages);
    }
    this.setData({ messages });
  },

  // 保存留言到本地
  save(messages) {
    wx.setStorageSync(STORAGE_KEY, messages);
  },

  // 保存身份到本地
  saveUser(user) {
    this.setData({ user });
    wx.setStorageSync(STORAGE_KEY_USER, user);
  },

  // 选择头像（转存为本地持久路径，避免临时路径失效）
  onChooseAvatar(e) {
    const tempPath = e.detail.avatarUrl;
    if (!tempPath) return;
    wx.getFileSystemManager().saveFile({
      tempFilePath: tempPath,
      success: (res) => {
        this.saveUser({ ...this.data.user, avatarUrl: res.savedFilePath });
      },
      fail: () => {
        // 保存失败时退回临时路径（本次会话内仍可显示）
        this.saveUser({ ...this.data.user, avatarUrl: tempPath });
      }
    });
  },

  // 昵称失焦时保存最终值（避免中文输入法“拼音→选字”过程中把半成品存进去）
  onNicknameBlur(e) {
    const nickname = e.detail.value;
    this.saveUser({ ...this.data.user, nickname });
  },

  // 输入留言内容
  onMessageInput(e) {
    this.setData({
      newMessage: e.detail.value
    });
  },

  // 添加留言
  addMessage() {
    const content = this.data.newMessage.trim();
    if (content === '') {
      wx.showToast({ title: '请输入留言内容', icon: 'none' });
      return;
    }
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const timeString = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;

    const newMsg = {
      id: Date.now(),
      content,
      time: timeString,
      user: (this.data.user.nickname || '').trim() || '访客',
      avatarUrl: this.data.user.avatarUrl || '',
      likes: 0,
      liked: false
    };

    const messages = [newMsg, ...this.data.messages];
    this.setData({ messages, newMessage: '' });
    this.save(messages);
  },

  // 点赞 / 取消点赞
  toggleLike(e) {
    const id = e.currentTarget.dataset.id;
    const messages = this.data.messages.map(m => {
      if (m.id === id) {
        return { ...m, liked: !m.liked, likes: m.likes + (m.liked ? -1 : 1) };
      }
      return m;
    });
    this.setData({ messages });
    this.save(messages);
  },

  // 删除留言
  deleteMessage(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '删除留言',
      content: '确定要删除这条留言吗？',
      success: (res) => {
        if (res.confirm) {
          const messages = this.data.messages.filter(m => m.id !== id);
          this.setData({ messages });
          this.save(messages);
        }
      }
    });
  },

  // 分享给好友
  onShareAppMessage() {
    return {
      title: '吉大百年校庆祝福墙，留下你的祝福',
      path: '/pages/message/message',
      imageUrl: '/images/logo.png'
    };
  }
});
