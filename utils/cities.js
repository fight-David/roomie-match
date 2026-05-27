// utils/cities.js
//
// 城市配置：MVP 只开放上海，其他城市标记为未开放（灰态显示，"敬请期待"）
// 每个城市自带：districts（热门区域）/ subwayLines（地铁线路）/ tags（建议标签）

// ── 通用爱好/职业标签（所有城市共用）──
const COMMON_TAGS = [
  '养猫', '养花', '阳台', '晨型', '设计师', '程序员', '先认识',
  '咖啡', '健身', '做饭', '安静', '夜猫子'
]

export const CITIES = [
  {
    code: 'SH',
    name: '上海',
    open: true,
    districts: ['静安', '徐汇', '闵行', '黄浦', '宝山', '长宁', '杨浦', '浦东', '普陀'],
    subwayLines: [
      '1号线', '2号线', '3号线', '4号线', '6号线', '7号线', '8号线',
      '9号线', '10号线', '11号线', '12号线', '13号线', '15号线',
      '17号线', '18号线', "浦江线"
    ],
    extraTags: ['张江', '陆家嘴']
  },
  {
    code: 'BJ',
    name: '北京',
    open: false,
    districts: ['朝阳', '海淀', '东城', '西城', '丰台', '通州', '昌平', '石景山'],
    subwayLines: ['1号线', '2号线', '4号线', '5号线', '6号线', '8号线', '10号线', '13号线', '14号线', '15号线'],
    extraTags: ['国贸', '中关村', '望京']
  },
  {
    code: 'GZ',
    name: '广州',
    open: false,
    districts: ['天河', '越秀', '海珠', '番禺', '白云', '黄埔'],
    subwayLines: ['1号线', '2号线', '3号线', '4号线', '5号线', '6号线', '7号线', '8号线'],
    extraTags: ['珠江新城', '体育西', '琶洲']
  },
  {
    code: 'SZ',
    name: '深圳',
    open: false,
    districts: ['福田', '南山', '罗湖', '宝安', '龙岗', '龙华'],
    subwayLines: ['1号线', '2号线', '3号线', '4号线', '5号线', '7号线', '9号线', '11号线'],
    extraTags: ['科技园', '华强北', '前海']
  },
  {
    code: 'HZ',
    name: '杭州',
    open: false,
    districts: ['西湖', '上城', '拱墅', '滨江', '余杭', '萧山'],
    subwayLines: ['1号线', '2号线', '3号线', '4号线', '5号线', '6号线', '7号线'],
    extraTags: ['未来科技城', '滨江']
  },
  {
    code: 'SU',
    name: '苏州',
    open: false,
    districts: ['姑苏', '工业园区', '高新区', '相城', '吴中', '吴江'],
    subwayLines: ['1号线', '2号线', '3号线', '4号线', '5号线'],
    extraTags: ['金鸡湖', '独墅湖']
  },
  {
    code: 'NJ',
    name: '南京',
    open: false,
    districts: ['玄武', '秦淮', '鼓楼', '建邺', '江宁', '雨花台'],
    subwayLines: ['1号线', '2号线', '3号线', '4号线', '10号线', 'S1号线', 'S3号线'],
    extraTags: ['新街口', '河西']
  },
  {
    code: 'CD',
    name: '成都',
    open: false,
    districts: ['锦江', '青羊', '金牛', '武侯', '成华', '高新', '天府新区'],
    subwayLines: ['1号线', '2号线', '3号线', '4号线', '5号线', '7号线', '9号线', '10号线'],
    extraTags: ['天府三街', '春熙路']
  }
]

export const DEFAULT_CITY_CODE = 'SH'

export function getCity(code) {
  return CITIES.find(c => c.code === code) || CITIES[0]
}

export function getCityName(code) {
  return getCity(code).name
}

// 获取某城市的区域列表
export function getDistricts(code) {
  return getCity(code).districts || []
}

// 获取某城市的地铁线路
export function getSubwayLines(code) {
  return getCity(code).subwayLines || []
}

// 获取某城市的筛选建议标签（区域 + 地铁前几条 + 城市特色 + 通用爱好）
export function getFilterSugs(code) {
  const city = getCity(code)
  const subwayHot = (city.subwayLines || []).slice(0, 3)
  const districtHot = (city.districts || []).slice(0, 3)
  return [
    ...subwayHot,
    ...districtHot,
    ...(city.extraTags || []),
    ...COMMON_TAGS
  ]
}

// ── 地铁线路标准化 ──
// 统一转成纯数字字符串，特殊线路保留名称
// 支持：'1号线' → '1'，'1' → '1'，'浦江线' → '浦江'，'S1号线' → 'S1'
export function normalizeSubwayLine(raw) {
  if (!raw) return ''
  const s = String(raw).trim()
  // 去掉"号线"后缀
  const stripped = s.replace(/号线$/, '').trim()
  return stripped
}

// 标准化一组地铁线路
export function normalizeSubwayLines(arr = []) {
  return arr.map(normalizeSubwayLine).filter(Boolean)
}

// 显示用：把标准化后的值加回"号线"（纯数字或字母数字加"号线"，其他保留）
export function displaySubwayLine(normalized) {
  if (!normalized) return ''
  // 纯数字 或 字母+数字（如 S1）→ 加"号线"
  if (/^[A-Za-z]?\d+$/.test(normalized)) return normalized + '号线'
  // 其他（如"浦江"）→ 直接显示
  return normalized
}

