// pages/data/data.js
// 六个校区在长春市的地理位置（经纬度）
const campusList = [
  { id: 0, name: '前卫校区', address: '朝阳区前进大街2699号', latitude: 43.838, longitude: 125.280 },
  { id: 1, name: '南岭校区', address: '南关区人民大街5988号', latitude: 43.852, longitude: 125.338 },
  { id: 2, name: '新民校区', address: '朝阳区新民大街828号', latitude: 43.875, longitude: 125.308 },
  { id: 3, name: '朝阳校区', address: '朝阳区西民主大街6号', latitude: 43.890, longitude: 125.287 },
  { id: 4, name: '南湖校区', address: '朝阳区南湖大路5372号', latitude: 43.852, longitude: 125.296 },
  { id: 5, name: '和平校区', address: '绿园区西安大路5333号', latitude: 43.893, longitude: 125.252 }
];

Page({
  data: {
    campusPoints: [],
    campusCount: campusList.length,
    selectedCampus: null
  },

  onLoad() {
    // 经纬度等比例映射到示意图，四周留白以容纳校区名称
    const longitudes = campusList.map(c => c.longitude);
    const latitudes = campusList.map(c => c.latitude);
    const minLon = Math.min(...longitudes);
    const maxLon = Math.max(...longitudes);
    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const campusPoints = campusList.map(c => ({
      id: c.id,
      name: c.name,
      left: Math.round(14 + (c.longitude - minLon) / (maxLon - minLon) * 72),
      top: Math.round(14 + (maxLat - c.latitude) / (maxLat - minLat) * 72)
    }));
    this.setData({ campusPoints });
  },

  // 点击校区名称显示地址
  onCampusTap(e) {
    const id = Number(e.currentTarget.dataset.id);
    const campus = campusList.find(c => c.id === id);
    if (campus) {
      this.setData({ selectedCampus: campus });
    }
  },

  // 分享给好友
  onShareAppMessage() {
    return {
      title: '吉林大学数据速览：六大校区、师资力量、院士风采',
      path: '/pages/data/data',
      imageUrl: '/images/logo.png'
    };
  }
});
