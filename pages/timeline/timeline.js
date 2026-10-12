// pages/timeline/timeline.js
const { historyEvents } = require('../../utils/data.js');

Page({
  data: {
    timelineGroups: []
  },

  onLoad() {
    // 按院校（school）分组，便于时间轴分段展示
    const groups = [];
    historyEvents.forEach(ev => {
      const last = groups[groups.length - 1];
      if (!last || last.school !== ev.school) {
        groups.push({ school: ev.school, events: [ev], expanded: groups.length === 0 });
      } else {
        last.events.push(ev);
      }
    });
    this.setData({
      timelineGroups: groups
    });
  },

  toggleGroup(e) {
    const index = Number(e.currentTarget.dataset.index);
    const group = this.data.timelineGroups[index];
    if (!group) return;

    this.setData({
      [`timelineGroups[${index}].expanded`]: !group.expanded
    });
  },

  // 分享给好友
  onShareAppMessage() {
    return {
      title: '吉林大学百年校史沿革，见证六校合并的百年征程',
      path: '/pages/timeline/timeline',
      imageUrl: '/images/logo.png'
    };
  }
});
