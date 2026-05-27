export const GENDERS = [
    { v: '女', icon: '♀', label: 'Women', hint: '与女性合租' },
    { v: '男', icon: '♂', label: 'Men', hint: '与男性合租' },
    { v: '不限', icon: '✶', label: 'Everyone', hint: '对性别无所谓' },
]

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
    { key: 'schedule', label: '作息', left: '🌙 夜猫子', right: '☀️ 早睡派' },
    { key: 'tidy', label: '整洁', left: '🌀 随性派', right: '✨ 洁净派' },
    { key: 'social', label: '社交浓度', left: '🙈 需要个人空间', right: '🎉 喜欢一起玩' },
]


export const POST_TYPES = {
    have_room: { label: '有房招友', color: '#526253' },
    seek_room: { label: '搭子找房', color: '#A87063' },
    pure_match: { label: '先认识人', color: '#6B6F6A' }
}