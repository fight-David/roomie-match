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

export const POST_TYPES = {
  have_room: { label: '有房招友', color: '#526253' },
  seek_room: { label: '搭子找房', color: '#A87063' },
  pure_match: { label: '先认识人', color: '#6B6F6A' }
}

export const PROJECTS = [
  {
    id: 'j01', authorId: 'p01', authorName: 'Aria', harmony: 98,
    postType: 'have_room',
    title: '静安寺 · 两室一厅 · 寻一位爱植物的室友',
    location: '9号线 · 徐家汇',
    budget: 4200,
    moveIn: '8月',
    tags: ['养猫', '养花', '做饭', '朝南', '不打烊'],
    cover: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=70&auto=format',
    content: '我有一只叫豆子的布偶，家里养着二十几盆蕨类和琴叶榕，阳台朝南。希望找一位同样喜欢安静、喜欢做饭的朋友，把周末留给自己。'
  },
  {
    id: 'j22', authorId: 'p03', authorName: 'Iris', harmony: 90,
    postType: 'pure_match',
    title: '先认识一下 · 晨型 / 爱猫 / 不社交的周末',
    location: '不限',
    budget: 0, moveIn: '',
    tags: ['晨型', '养猫', '不社交', '先认识'],
    cover: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&q=70&auto=format',
    content: '还没到找房那一步。想先认识一些作息相近、愿意周末各自安静的朋友。如果我们聊得来，找房子是顺便的事。'
  },
  {
    id: 'j23', authorId: 'p01', authorName: 'Aria', harmony: 96,
    postType: 'seek_room',
    title: '想在静安找套两房 · 招一位插画 / 摄影的搭子',
    location: '静安 / 徐汇',
    budget: 5500, moveIn: '9月',
    tags: ['静安', '插画', '摄影', '找房搭子'],
    cover: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=70&auto=format',
    content: '一个人预算偏紧，想找一个气味相投的人一起在静安或徐汇找两房。我养了一只布偶，希望搭子对毛孩不过敏就行。'
  },
]

export function findPerson(id) {
  return PEOPLE.find(p => p.id === id) || PEOPLE[0]
}

export function personaOf(p) {
  if (p.persona && p.persona.length) return p.persona
  const out = []
  const d = p.dims || {}
  if (d.schedule >= 65) out.push('晨型')
  else if (d.schedule <= 40) out.push('深夜派')
  if (d.tidy >= 80) out.push('极度整洁')
  if (d.social <= 35) out.push('非社交型')
  if (d.cooking >= 70) out.push('爱下厨')
  if (d.pets >= 80) out.push('爱毛孩')
  if ((p.red || []).some(x => /猫/.test(x))) out.push('养猫')
  if ((p.red || []).some(x => /植物|花/.test(x))) out.push('植物系')
  if ((p.red || []).some(x => /咖啡/.test(x))) out.push('咖啡党')
  if ((p.red || []).some(x => /黑胶|爵士/.test(x))) out.push('黑胶党')
  return out.slice(0, 4)
}

export function findProject(id) {
  return PROJECTS.find(p => p.id === id) || PROJECTS[0]
}

// ---------- 消息 ----------
export const CONVERSATIONS = [
  {
    id: 'c01',
    peerId: 'p01',
    peerName: 'Aria Chen',
    peerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=70&auto=format',
    lastMsg: '周末一起看房吗？我上午有空',
    lastTime: '10:32',
    unread: 2,
    messages: [
      { from: 'peer', text: '你好，看到你的帖子感觉挺合适的', time: '09:15' },
      { from: 'me', text: '谢谢！你也在找静安附近的吗？', time: '09:18' },
      { from: 'peer', text: '对，我在 9 号线沿线', time: '09:20' },
      { from: 'me', text: '那挺近的，我就在徐家汇', time: '09:22' },
      { from: 'peer', text: '周末一起看房吗？我上午有空', time: '10:32' }
    ]
  },
  {
    id: 'c02',
    peerId: 'p03',
    peerName: 'Mia Lin',
    peerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&q=70&auto=format',
    lastMsg: '阳台朝南真不错，我们周末约吗？',
    lastTime: '昨天',
    unread: 0,
    messages: [
      { from: 'peer', text: '看到你发的帖子了，阳台朝南真好', time: '昨天 14:20' },
      { from: 'me', text: '谢谢！你也喜欢养植物吗？', time: '昨天 14:25' },
      { from: 'peer', text: '养了几盆龟背竹和绿萝', time: '昨天 14:30' },
      { from: 'me', text: '那我们可以交换扦插了哈哈', time: '昨天 14:32' },
      { from: 'peer', text: '阳台朝南真不错，我们周末约吗？', time: '昨天 15:00' }
    ]
  },
  {
    id: 'c03',
    peerId: 'p04',
    peerName: 'Jason Xu',
    peerAvatar: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=200&q=70&auto=format',
    lastMsg: '我也在找张江附近的房子',
    lastTime: '周一',
    unread: 1,
    messages: [
      { from: 'peer', text: '你好，看了你发的帖子', time: '周一 19:00' },
      { from: 'me', text: '嗨！你也在张江上班吗？', time: '周一 19:05' },
      { from: 'peer', text: '对，在药谷那边', time: '周一 19:06' },
      { from: 'peer', text: '我也在找张江附近的房子', time: '周一 19:07' }
    ]
  }
]
