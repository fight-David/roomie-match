// utils/persona.js
//
// 根据用户 onboarding 信息智能生成室友人格
// 设计原则：不写死 tag，而是从 dims 数值 + loves/limits 语义推断

// ── 维度阈值 ──
const HIGH = 4   // >= HIGH 视为"偏高"
const LOW  = 2   // <= LOW  视为"偏低"

// ── 维度 → 人格词（高/低各一个词）──
const DIM_WORDS = {
    schedule:  { high: '早起',   low: '夜猫'   },
    tidy:      { high: '洁净',   low: '随性'   },
    social:    { high: '社交',   low: '安静'   },
    noise:     { high: '热闹',   low: '清净'   },
    finance:   { high: 'AA 控',  low: '随缘'   },
    pets_vibe: { high: '爱宠',   low: '无宠'   }
}

// ── loves/limits 关键词 → 人格词（模糊匹配）──
// key 是正则片段，value 是对应的人格词
const TAG_PATTERNS = [
    { pattern: /健身|跑步|骑行|游泳|爬山|夜跑|篮球/, word: '健身' },
    { pattern: /做饭|烹饪|厨房|美食|下厨/,           word: '厨艺' },
    { pattern: /咖啡|茶|下午茶|brunch/i,             word: '咖啡' },
    { pattern: /植物|花|绿植|园艺/,                  word: '植物' },
    { pattern: /猫|狗|宠物|毛孩/,                    word: '爱宠' },
    { pattern: /游戏|电竞|steam|主机/i,              word: '游戏' },
    { pattern: /摄影|相机|拍照/,                     word: '摄影' },
    { pattern: /阅读|读书|书/,                       word: '阅读' },
    { pattern: /音乐|乐器|吉他|钢琴|黑胶/,           word: '音乐' },
    { pattern: /设计|艺术|绘画|陶艺/,                word: '艺术' },
    { pattern: /旅行|露营|户外|citywalk/i,           word: '户外' },
    { pattern: /电影|剧|追剧|影院/,                  word: '影迷' },
]

// 从 loves 数组里提取最有代表性的人格词（最多 1 个）
function extractTagWord(loves = []) {
    for (const { pattern, word } of TAG_PATTERNS) {
        if (loves.some(t => pattern.test(t))) return word
    }
    return null
}

// ── 主函数：生成人格标题 ──
export function buildPersonaTitle(profile = {}) {
    const dims   = profile.dims   || {}
    const loves  = profile.loves  || []
    const limits = profile.limits || []

    const parts = []

    // 1. 从 dims 里取最突出的 1-2 个维度词
    const dimEntries = Object.entries(DIM_WORDS)
    for (const [key, { high, low }] of dimEntries) {
        const val = dims[key]
        if (!val) continue
        if (val >= HIGH) parts.push(high)
        else if (val <= LOW) parts.push(low)
        if (parts.length >= 2) break
    }

    // 2. 从 loves 里提取一个兴趣词（如果 dims 词不够 2 个）
    if (parts.length < 2) {
        const tagWord = extractTagWord(loves)
        if (tagWord && !parts.includes(tagWord)) parts.push(tagWord)
    }

    // 3. 兜底
    if (parts.length === 0) return '自在型室友'
    return parts.slice(0, 2).join('·') + '型室友'
}

// ── 3 个维度的轴条数据 ──
const PERSONA_DIMS = [
    {
        key: 'schedule',
        label: '早睡倾向',
        // 每个区间的描述，从低到高
        descs: [
            { max: 25,  text: '习惯深夜才入睡' },
            { max: 50,  text: '作息比较灵活'   },
            { max: 75,  text: '倾向早睡早起'   },
            { max: 100, text: '雷打不动的早睡党' }
        ]
    },
    {
        key: 'tidy',
        label: '整洁度',
        descs: [
            { max: 25,  text: '生活随性，不拘小节' },
            { max: 50,  text: '整洁度适中'         },
            { max: 75,  text: '对整洁有一定要求'   },
            { max: 100, text: '家里必须一尘不染'   }
        ]
    },
    {
        key: 'social',
        label: '社交浓度',
        descs: [
            { max: 25,  text: '需要大量个人空间' },
            { max: 50,  text: '社交适度，张弛有度' },
            { max: 75,  text: '喜欢和室友互动'   },
            { max: 100, text: '越热闹越好'       }
        ]
    }
]

function getDesc(descs, pct) {
    return descs.find(d => pct <= d.max)?.text || descs[descs.length - 1].text
}

// 把 dims 1-5 映射成 0-100%
function dimToPct(val) {
    return Math.round(((val || 3) - 1) / 4 * 100)
}

export function buildPersonaBars(dims = {}) {
    return PERSONA_DIMS.map(d => ({
        key:   d.key,
        label: d.label,
        pct:   dimToPct(dims[d.key]),
        desc:  getDesc(d.descs, dimToPct(dims[d.key]))
    }))
}
