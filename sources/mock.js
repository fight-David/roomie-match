export const RED_TAGS = [
  '做饭', '安静', '早睡', '健身', '游戏', '猫',      // 核心高频合租重合项
  '夜跑', '篮球', '骑行', '爬山', '露营',            // 运动/户外活动 (原 sport 演变)
  '咖啡', '阅读', '摄影', '陶艺', '植物'             // 休闲/生活情调
];

// 🔴 Dark List (一票否决/雷区/生活陋习)
// 综合了您的：抽烟、吵闹、不洗碗、带外人过夜、养狗、不关灯、拖鞋乱丢、熬夜打游戏、邋遢、带人回家、制造噪音
export const BLACK_TAGS = [
  '抽烟',               // 绝对一票否决项
  '邋遢', '不洗碗', '拖鞋乱丢', // 卫生雷区 (原 clean 细化)
  '带人回家', '带外人过夜',     // 社交雷区 (原 social 细化)
  '制造噪音', '吵闹',          // 声响雷区 (原 noise 细化)
  '不关灯', '熬夜打游戏',       // 作息雷区 (原 sleep 细化)
  '养狗'
]

export const DIMENSIONS = [
  {
    key: 'noise',
    label: '声响',
    top: '喜欢热闹',
    bottom: '喜欢安静'
  },

  {
    key: 'schedule',
    label: '作息',
    top: '早睡党',
    bottom: '夜猫子'
  },

  {
    key: 'tidy',
    label: '整洁',
    top: '爱干净',
    bottom: '随性'
  },

  {
    key: 'social',
    label: '社交',
    top: '喜欢交流',
    bottom: '注重边界'
  },

  {
    key: 'finance',
    label: '财务',
    top: 'AA清晰',
    bottom: '差不多就行'
  },

  {
    key: 'pets_vibe',
    label: '宠物',
    top: '喜欢宠物',
    bottom: '保持距离'
  }
]


export const PEOPLE = [
  // ———— 男性 ————
  {
    id: 'p01',
    nickname: 'Aria Chen',
    target_gender: '男',
    age: '',
    gender: '男',
    budget_min: 2000,
    budget_max: 4400,
    bio: '在静安巷口找一扇朝南的窗。',
    target_districts: ['静安', '长宁'],
    target_subways: ['9', '10'],
    cover: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=70&auto=format',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=70&auto=format',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=900&q=70&auto=format',
    ],
    dims: { schedule: 4, tidy: 4, social: 2, noise: 5, finance: 3, pets_vibe: 4 },
    loves: ['咖啡', '独立电影', '陶艺', '植物'],
    limits: ['抽烟', '吵闹', '带外人过夜'],
  },
  {
    id: 'p02',
    nickname: 'Ethan d',
    target_gender: '男',
    age: '',
    gender: '男',
    budget_min: 2000,
    budget_max: 4400,
    bio: '下班会去打球，也会认真做饭。',
    target_districts: ['徐汇', '闵行'],
    target_subways: ['1', '11'],
    cover: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=70&auto=format',
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=70&auto=format',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=70&auto=format',
    ],
    dims: { schedule: 3, tidy: 1, social: 4, noise: 3, finance: 4, pets_vibe: 2 },
    loves: ['篮球', 'Citywalk'],
    limits: ['太邋遢'],
  },
  {
    id: 'p04',
    nickname: 'Jason Xu',
    target_gender: '女',
    age: '',
    gender: '男',
    budget_min: 2000,
    budget_max: 4400,
    bio: '游戏和工作都很投入，但不会打扰别人。',
    target_districts: ['杨浦', '宝山'],
    target_subways: ['3', '10'],
    cover: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=900&q=70&auto=format',
    photos: [
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=900&q=70&auto=format',
      'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=900&q=70&auto=format',
    ],
    dims: { schedule: 2, tidy: 3, social: 2, noise: 2, finance: 5, pets_vibe: 3 },
    loves: ['游戏', '动漫', '咖啡', '夜跑'],
    limits: ['带人过夜', '公共区域脏乱'],
  },
  {
    id: 'p06',
    nickname: 'Leo Zhang',
    target_gender: '女',
    age: '',
    gender: '男',
    budget_min: 2000,
    budget_max: 4400,
    bio: '周末喜欢骑车到处晃，也喜欢宅家。',
    target_districts: ['普陀', '静安'],
    target_subways: ['11', '2'],
    cover: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=70&auto=format',
    photos: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=70&auto=format',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=900&q=70&auto=format',
    ],
    dims: { schedule: 3, tidy: 3, social: 4, noise: 3, finance: 2, pets_vibe: 5 },
    loves: ['骑行', '露营', '咖啡'],
    limits: ['洁癖过度'],
  },
  {
    id: 'p08',
    nickname: 'Kevin Liu',
    target_gender: '不限',
    age: '',
    gender: '男',
    bio: '程序员，喜欢安静一点的生活节奏。',
    budget_min: 3000,
    budget_max: 6500,
    target_districts: ['浦东', '杨浦'],
    target_subways: ['2', '10'],
    cover: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=900&q=70&auto=format',
    photos: [
      'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=900&q=70&auto=format',
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=900&q=70&auto=format',
    ],
    dims: { schedule: 4, tidy: 4, social: 1, noise: 5, finance: 5, pets_vibe: 2 },
    loves: ['编程', '游泳', '耳机'],
    limits: ['带朋友聚会'],
  },
  {
    id: 'p10',
    nickname: 'Ryan Sun',
    target_gender: '不限',
    age: '',
    gender: '男',
    bio: '希望找到作息接近、相处舒服的人。',
    budget_min: 3000,
    budget_max: 6500,
    target_districts: ['静安', '普陀'],
    target_subways: ['7', '13'],
    cover: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=900&q=70&auto=format',
    photos: [
      'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=900&q=70&auto=format',
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=70&auto=format',
    ],
    dims: { schedule: 4, tidy: 3, social: 2, noise: 4, finance: 4, pets_vibe: 1 },
    loves: ['电影', '跑步', '桌游'],
    limits: ['深夜外放', '不讲卫生'],
  },

  // ———— 女性 ————
  {
    id: 'p03',
    nickname: 'Mia Lin',
    target_gender: '男',
    age: '',
    gender: '女',
    bio: '喜欢家里有阳光和一点点香薰味道。',
    budget_min: 2000,
    budget_max: 4400,
    target_districts: ['静安', '黄浦'],
    target_subways: ['2', '7'],
    cover: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&q=70&auto=format',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&q=70&auto=format',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=70&auto=format',
    ],
    dims: { schedule: 5, tidy: 5, social: 2, noise: 5, finance: 3, pets_vibe: 5 },
    loves: ['香薰', '瑜伽', 'Brunch', '植物'],
    limits: ['熬夜', '制造噪音'],
  },
  {
    id: 'p05',
    nickname: 'Sophie Jiang',
    target_gender: '女',
    age: '',
    gender: '女',
    bio: '希望回家以后是能真正放松下来的地方。',
    budget_min: 2000,
    budget_max: 4400,
    target_districts: ['浦东', '长宁'],
    target_subways: ['2', '13'],
    cover: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=900&q=70&auto=format',
    photos: [
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=900&q=70&auto=format',
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=900&q=70&auto=format',
    ],
    dims: { schedule: 4, tidy: 4, social: 3, noise: 4, finance: 3, pets_vibe: 4 },
    loves: ['摄影', '韩剧', '游泳'],
    limits: ['抽烟'],
  },
  {
    id: 'p07',
    nickname: 'Nina Gu',
    target_gender: '女',
    age: '',
    gender: '女',
    bio: '喜欢把家布置得像小型咖啡馆。',
    budget_min: 2000,
    budget_max: 4400,
    target_districts: ['徐汇', '黄浦'],
    target_subways: ['1', '9'],
    cover: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=70&auto=format',
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=70&auto=format',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&q=70&auto=format',
    ],
    dims: { schedule: 5, tidy: 5, social: 3, noise: 5, finance: 4, pets_vibe: 3 },
    loves: ['咖啡', '甜品', '设计', '黑胶'],
    limits: ['外放音乐'],
  },
  {
    id: 'p09',
    target_gender: '不限',
    nickname: 'Emily Zhao',
    age: '',
    gender: '女',
    bio: '想找可以一起做饭聊天的室友。',
    budget_min: 3000,
    budget_max: 6500,
    target_districts: ['闵行', '徐汇'],
    target_subways: ['1', '12'],
    cover: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=900&q=70&auto=format',
    photos: [
      'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=900&q=70&auto=format',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=900&q=70&auto=format',
    ],
    dims: { schedule: 3, tidy: 4, social: 5, noise: 3, finance: 3, pets_vibe: 4 },
    loves: ['做饭', '韩综', '小狗'],
    limits: ['冷漠沟通'],
  },
]