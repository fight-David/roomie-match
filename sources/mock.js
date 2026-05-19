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
	have_room:  { label: '有房招友', color: '#526253' },
	seek_room:  { label: '搭子找房', color: '#A87063' },
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
		id: 'j02', authorId: 'p03', authorName: 'Iris', harmony: 87,
		postType: 'have_room',
		title: '中山公园 · 带阳台 · 一起煮周日的咖啡',
		location: '2号线 · 中山公园',
		budget: 4800,
		moveIn: '9月',
		tags: ['阳台', '咖啡', '养花', '周末菜场'],
		cover: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=70&auto=format',
		content: '老公房里层，阳台朝南能养花。希望室友是不爱开派对、但愿意在周末一起去乌中市集的那种人。'
	},
	{
		id: 'j03', authorId: 'p04', authorName: 'Theo', harmony: 81,
		postType: 'have_room',
		title: '陆家嘴 · 精装 · 两位互不打扰的工程师',
		location: '2号线 · 陆家嘴',
		budget: 7200,
		moveIn: '即可',
		tags: ['晨型', '安静', '独立卫浴', '程序员'],
		cover: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=70&auto=format',
		content: '每天七点半出门，九点前通勤到公司，回家只做两件事：看书和睡觉。想找一位作息类似的工程师或研究员。'
	},
	{
		id: 'j04', authorId: 'p02', authorName: 'Noah', harmony: 92,
		postType: 'have_room',
		title: '徐家汇 · 老洋房 · 一个会放黑胶的客厅',
		location: '1号线 · 徐家汇',
		budget: 5500,
		moveIn: '7月',
		tags: ['黑胶', '老洋房', '独立电影', '不熬夜'],
		cover: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=900&q=70&auto=format',
		content: '客厅在走廊里接了一个小唱机，周末放 Bill Evans。希望室友也喜欢爵士 / 新浪潮，偶尔我们可以一起看场午夜电影。'
	},
	{
		id: 'j05', authorId: 'p01', authorName: 'Aria', harmony: 95,
		postType: 'have_room',
		title: '新天地 · LOFT · 带挑高窗的早餐桌',
		location: '10号线 · 新天地',
		budget: 6200,
		moveIn: '8月中',
		tags: ['LOFT', '挑高', '早餐桌', '做饭'],
		cover: 'https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?w=900&q=70&auto=format',
		content: '两层 LOFT 共用厨房。我喜欢在周日做 brunch，希望未来的室友愿意轮流掌勺，预算偏 mid-senior。'
	},
	{
		id: 'j06', authorId: 'p03', authorName: 'Iris', harmony: 84,
		postType: 'have_room',
		title: '江苏路 · 带花园 · 招一位养狗友好邻居',
		location: '11号线 · 江苏路',
		budget: 5800,
		moveIn: '9月',
		tags: ['花园', '养狗', '跑步', '早睡'],
		cover: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=900&q=70&auto=format',
		content: '我有一只六岁的柯基"土豆"，小区里有绿化带，早晚遛狗方便。希望室友爱狗、愿意偶尔帮忙投喂。'
	},
	{
		id: 'j07', authorId: 'p04', authorName: 'Theo', harmony: 78,
		postType: 'have_room',
		title: '张江高科 · 园区步行十分钟 · 短租 3 个月',
		location: '2号线 · 张江高科',
		budget: 4200,
		moveIn: '立即',
		tags: ['短租', '程序员', '健身', '外卖'],
		cover: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=70&auto=format',
		content: '项目期 3 个月短租。家附近有 Keep 直营店，健身党优先。生活作息规律，几乎不社交。'
	},
	{
		id: 'j08', authorId: 'p02', authorName: 'Noah', harmony: 90,
		postType: 'have_room',
		title: '人民广场 · 便利 · 一位文艺向的深夜同路人',
		location: '1号线 · 人民广场',
		budget: 5000,
		moveIn: '8月',
		tags: ['展览', '读书会', '晚睡', '独立电影'],
		cover: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=900&q=70&auto=format',
		content: '附近的上海当代艺术馆我每月去两次。我晚睡，希望合租的人也不会十一点就敲墙让我小声点。'
	},
	{
		id: 'j09', authorId: 'p01', authorName: 'Aria', harmony: 94,
		postType: 'have_room',
		title: '世纪大道 · 新房 · 朝南双阳台招一位安静人类',
		location: '9号线 · 世纪大道',
		budget: 6500,
		moveIn: '9月',
		tags: ['新房', '双阳台', '安静', '养花'],
		cover: 'https://images.unsplash.com/photo-1494203484021-3c454daf695d?w=900&q=70&auto=format',
		content: '刚交房，精装。我自己会带几十盆花，希望室友能一起照料，不用开口也能默契地接力浇水。'
	},
	{
		id: 'j10', authorId: 'p03', authorName: 'Iris', harmony: 86,
		postType: 'have_room',
		title: '虹桥枢纽 · 出差党专属 · 周末见不到人的室友招募',
		location: '10号线 · 虹桥火车站',
		budget: 4600,
		moveIn: '即可',
		tags: ['出差', '安静', '独立卫浴', '极简'],
		cover: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=900&q=70&auto=format',
		content: '咨询行业，一周出差 3-4 天。家里基本只有周末会有人。希望室友也是见得少、处得好的类型。'
	},
	{
		id: 'j11', authorId: 'p04', authorName: 'Theo', harmony: 82,
		postType: 'have_room',
		title: '世博 · 江景 · 两位晨跑爱好者的清晨合约',
		location: '8号线 · 耀华路',
		budget: 5800,
		moveIn: '8月',
		tags: ['晨跑', '江景', '晨型', '健身'],
		cover: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=900&q=70&auto=format',
		content: '每天六点出门沿世博滨江跑十公里。希望室友也喜欢晨跑，合租最关键是作息一致。'
	},
	{
		id: 'j12', authorId: 'p02', authorName: 'Noah', harmony: 91,
		postType: 'have_room',
		title: '武康路 · 民国公寓 · 木地板上的漫长夏天',
		location: '10号线 · 上海图书馆',
		budget: 7500,
		moveIn: '7月',
		tags: ['民国', '老公寓', '木地板', '读书'],
		cover: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=70&auto=format',
		content: '房子在武康路巷子深处，阳光很好。我在 Neuhaus 工作，预算中高。希望室友是设计/金融背景。'
	},
	{
		id: 'j13', authorId: 'p01', authorName: 'Aria', harmony: 89,
		postType: 'have_room',
		title: '打浦桥 · 精装两房 · 愿意共享香氛的室友',
		location: '9号线 · 打浦桥',
		budget: 5200,
		moveIn: '8月底',
		tags: ['香氛', '整洁', '分担家务', '不抽烟'],
		cover: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=900&q=70&auto=format',
		content: '我是香氛爱好者，家里常年有 Diptyque。希望室友不抽烟、对气味敏感、愿意每周一起打扫。'
	},
	{
		id: 'j14', authorId: 'p04', authorName: 'Theo', harmony: 80,
		postType: 'have_room',
		title: '龙阳路 · 地铁一分钟 · 招一位滑雪同好',
		location: '16号线 · 龙阳路',
		budget: 4800,
		moveIn: '10月',
		tags: ['滑雪', '骑行', '户外', '周末出城'],
		cover: 'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?w=900&q=70&auto=format',
		content: '每年 12-3 月会飞崇礼 / 北海道。希望室友也是户外党，能一起订行程更好。'
	},
	{
		id: 'j15', authorId: 'p03', authorName: 'Iris', harmony: 88,
		postType: 'have_room',
		title: '南京西路 · 复古公寓 · 希望找一位爱做饭的女孩',
		location: '2号线 · 南京西路',
		budget: 6000,
		moveIn: '9月',
		tags: ['女生', '做饭', '复古', '静安'],
		cover: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900&q=70&auto=format',
		content: '我基本每晚下班自己做饭。希望合租的女生也愿意一起分工买菜。房子是 80 年代老公寓，有壁炉。'
	},
	{
		id: 'j16', authorId: 'p02', authorName: 'Noah', harmony: 93,
		postType: 'have_room',
		title: '外滩源 · 带书房 · 一名设计师的产品人找搭子',
		location: '2号线 · 南京东路',
		budget: 8000,
		moveIn: '7月',
		tags: ['设计师', '书房', '创业', '独立电影'],
		cover: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=900&q=70&auto=format',
		content: '独立书房 1 间，原木。我在 Figma/Sketch 工作。希望找一位同行，晚上可以偶尔聊作品。预算 senior。'
	},
	{
		id: 'j17', authorId: 'p01', authorName: 'Aria', harmony: 96,
		postType: 'have_room',
		title: '静安寺 · 小户型 · 一人养十盆薄荷',
		location: '7号线 · 静安寺',
		budget: 4500,
		moveIn: '立即',
		tags: ['一室户', '薄荷', '养花', '朝南'],
		cover: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?w=900&q=70&auto=format',
		content: '一室户改两房，通透。我种了十几盆薄荷，清晨打开窗就是气味。希望室友耐摔打、不挑剔。'
	},
	{
		id: 'j18', authorId: 'p04', authorName: 'Theo', harmony: 83,
		postType: 'have_room',
		title: '浦东金桥 · 通勤稳 · 只要作息稳定',
		location: '12号线 · 金海路',
		budget: 5000,
		moveIn: '9月',
		tags: ['金桥', '晨型', '独立卫浴', '上海本地'],
		cover: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=900&q=70&auto=format',
		content: '在罗氏上班，作息非常稳定。希望室友也是外资研发同事，或者作息相仿的上海本地人。'
	},
	{
		id: 'j19', authorId: 'p03', authorName: 'Iris', harmony: 85,
		postType: 'have_room',
		title: '长宁 · 带飘窗 · 两个猫奴的折中方案',
		location: '2号线 · 娄山关路',
		budget: 5500,
		moveIn: '8月',
		tags: ['养猫', '飘窗', '阳台', '分担家务'],
		cover: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=900&q=70&auto=format',
		content: '我有两只猫，另一间愿意允许另一只。飘窗朝东，早上阳光很好。希望室友有养猫经验。'
	},
	{
		id: 'j20', authorId: 'p02', authorName: 'Noah', harmony: 89,
		postType: 'have_room',
		title: '愚园路 · 老别墅改造 · 周末不社交的合约',
		location: '11号线 · 江苏路',
		budget: 7200,
		moveIn: '10月',
		tags: ['老别墅', '周末独处', '阅读', '爵士'],
		cover: 'https://images.unsplash.com/photo-1494203484021-3c454daf695d?w=900&q=70&auto=format',
		content: '愚园路的老别墅改造，三层我住一层。希望合租方不爱在客厅聊天，让周末安安静静地过完。'
	},
	{
		id: 'j21', authorId: 'p02', authorName: 'Noah', harmony: 94,
		postType: 'seek_room',
		title: '找搭子 · 两个设计师合租 · 预算 6000 / 人',
		location: '9号线或 10号线沿线',
		budget: 6000, moveIn: '8月',
		tags: ['9号线', '10号线', '设计师', '找房搭子'],
		cover: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=70&auto=format',
		content: '我在 Frog 做设计，想找一位同行或邻近职业的女生 / 男生一起在 9 号或 10 号线找一套两室。周末可以一起去看房。'
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
	{
		id: 'j24', authorId: 'p04', authorName: 'Theo', harmony: 82,
		postType: 'pure_match',
		title: '张江全栈 · 寻同频朋友 · 不一定合租',
		location: '浦东 / 张江',
		budget: 0, moveIn: '',
		tags: ['张江', '全栈', '程序员', '先认识'],
		cover: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=70&auto=format',
		content: '在张江药谷上班。想先认识一些作息相近的开发者 / 研究员，周末打打球、喝喝咖啡。合租之类的事情可以慢慢来。'
	},
	{
		id: 'j25', authorId: 'p02', authorName: 'Noah', harmony: 88,
		postType: 'pure_match',
		title: '深夜同路人 · 晚睡 / 爵士 / 独立电影',
		location: '不限',
		budget: 0, moveIn: '',
		tags: ['晚睡', '爵士', '独立电影', '先认识'],
		cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=70&auto=format',
		content: '不打算马上找房，想先找几个晚睡的同路人。如果你也喜欢周末在家听 Bill Evans、看一场深夜放映，我们可以先聊聊。'
	},
	{
		id: 'j26', authorId: 'p03', authorName: 'Iris', harmony: 86,
		postType: 'seek_room',
		title: '中山公园 · 招一位女孩搭子',
		location: '2号线 / 10号线',
		budget: 4500, moveIn: '9月',
		tags: ['女生', '中山公园', '找房搭子'],
		cover: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&q=70&auto=format',
		content: '想在中山公园附近一起租两房。我做品牌，希望搭子也是创意行业的女生，整洁、不带外人过夜是底线。'
	},
	{
		id: 'j27', authorId: 'p01', authorName: 'Aria', harmony: 93,
		postType: 'pure_match',
		title: '我养花你养猫 · 周日可以交换一顿晚餐',
		location: '静安 / 长宁',
		budget: 0, moveIn: '',
		tags: ['养花', '养猫', '做饭', '先认识'],
		cover: 'https://images.unsplash.com/photo-1510629260578-aeef3435bd2a?w=900&q=70&auto=format',
		content: '"我养花、你养猫"—— 我觉得这就是最浪漫的合租。先不谈房子。想找这样的朋友先一起吃一顿晚饭。'
	},
	{
		id: 'j28', authorId: 'p04', authorName: 'Theo', harmony: 80,
		postType: 'seek_room',
		title: '浦东找房搭子 · 独立卫浴 / 两位工程师',
		location: '2号线 / 12号线',
		budget: 6500, moveIn: '10月',
		tags: ['浦东', '工程师', '独立卫浴', '找房搭子'],
		cover: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=900&q=70&auto=format',
		content: '10 月合约到期。想在浦东或陆家嘴找一套双主卧。搭子希望也是工程师背景，作息规律，节假日各自安好。'
	},
	{
		id: 'j29', authorId: 'p02', authorName: 'Noah', harmony: 90,
		postType: 'pure_match',
		title: '咖啡 / 骑行 / 读书 · 先聊一聊',
		location: '不限',
		budget: 0, moveIn: '',
		tags: ['咖啡', '骑行', '读书', '先认识'],
		cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=70&auto=format',
		content: '我不是来找房的。我觉得"先认识人再谈生活"是这个平台最好的地方。如果我们都喜欢骑行和咖啡，先加个好友吧。'
	},
	{
		id: 'j30', authorId: 'p03', authorName: 'Iris', harmony: 84,
		postType: 'seek_room',
		title: '长宁 / 虹桥 · 招一位同频的搭子',
		location: '10号线 / 2号线',
		budget: 5000, moveIn: '9月底',
		tags: ['长宁', '虹桥', '找房搭子'],
		cover: 'https://images.unsplash.com/photo-1515942661900-94b3d1972591?w=900&q=70&auto=format',
		content: '想在长宁或虹桥找一套两房。有养狗的话更好——我喜欢带狗去中山公园。预算合理、作息健康的朋友优先。'
	}
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
	if ((p.red || []).some(x => /猫/.test(x)))    out.push('养猫')
	if ((p.red || []).some(x => /植物|花/.test(x))) out.push('植物系')
	if ((p.red || []).some(x => /咖啡/.test(x)))   out.push('咖啡党')
	if ((p.red || []).some(x => /黑胶|爵士/.test(x))) out.push('黑胶党')
	return out.slice(0, 4)
}   

export function findProject(id) {
	return PROJECTS.find(p => p.id === id) || PROJECTS[0]
}