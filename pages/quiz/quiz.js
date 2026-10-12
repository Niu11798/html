// pages/quiz/quiz.js
const { quizQuestions } = require('../../utils/data.js');

const STORAGE_KEY_USER = 'jlu_user';

Page({
  data: {
    quizQuestions: [],
    currentQuestionIndex: 0,
    total: 0,
    selectedOption: null,
    showResult: false,
    isCorrect: false,
    score: 0,
    finished: false,
    ratePercent: 0,
    gradeText: '',
    user: { nickname: '访客', avatarUrl: '' }
  },

  onLoad() {
    this.setData({
      quizQuestions: quizQuestions,
      total: quizQuestions.length
    });
  },

  // 每次进入页面时读取共享身份（与留言板用同一个 jlu_user）
  onShow() {
    let user = wx.getStorageSync(STORAGE_KEY_USER);
    if (!user || !user.nickname) {
      user = { nickname: '访客', avatarUrl: '' };
    }
    this.setData({ user });
  },

  // 选择答案（仅在提交前可选）
  selectOption(e) {
    if (this.data.showResult) return;
    this.setData({
      selectedOption: Number(e.currentTarget.dataset.index)
    });
  },

  // 提交答案，判断对错并计分
  checkAnswer() {
    if (this.data.selectedOption === null || this.data.showResult) return;
    const current = this.data.quizQuestions[this.data.currentQuestionIndex];
    const isCorrect = this.data.selectedOption === current.correctAnswer;
    this.setData({
      isCorrect: isCorrect,
      score: this.data.score + (isCorrect ? 1 : 0),
      showResult: true
    });
  },

  // 下一题 / 查看成绩
  nextQuestion() {
    const { currentQuestionIndex, total, score } = this.data;
    if (currentQuestionIndex + 1 >= total) {
      this.setData({
        finished: true,
        ratePercent: Math.round((score / total) * 100),
        gradeText: this.getGradeText(score, total)
      });
      return;
    }
    this.setData({
      currentQuestionIndex: currentQuestionIndex + 1,
      selectedOption: null,
      showResult: false,
      isCorrect: false
    });
  },

  // 根据得分给出评语
  getGradeText(score, total) {
    const rate = score / total;
    if (rate >= 0.9) return '太棒了，你是吉大校史小达人！';
    if (rate >= 0.7) return '很不错，对吉大历史相当了解！';
    if (rate >= 0.5) return '还可以，去“历史事件”页补补课吧～';
    return '要加油哦，去“历史事件”页多看看～';
  },

  // 重新开始
  restart() {
    this.setData({
      currentQuestionIndex: 0,
      selectedOption: null,
      showResult: false,
      isCorrect: false,
      score: 0,
      finished: false,
      ratePercent: 0,
      gradeText: ''
    });
  },

  // 分享给好友
  onShareAppMessage() {
    return {
      title: '吉林大学校史知识问答，测测你了解多少',
      path: '/pages/quiz/quiz',
      imageUrl: '/images/logo.png'
    };
  }
});
