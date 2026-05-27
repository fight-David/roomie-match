// utils/match.js — 室友匹配 Harmony 算法

import { normalizeSubwayLine } from '@/utils/cities.js'

const WEIGHTS = {
    budget:   20,
    district: 15,
    subway:   15,
    dims:     30,
    loves:    10,
    limits:   10,
}

// 所有参与计算的维度 key（与 DIMENSIONS 保持一致）
const DIM_KEYS = ['schedule', 'tidy', 'social', 'noise', 'finance', 'pets_vibe']

export function calcHarmony(currentUser, targetUser) {
    if (!currentUser || !targetUser) return { score: 0, reasons: [] }

    const budget   = calcBudgetScore(currentUser, targetUser)
    const district = calcDistrictScore(currentUser, targetUser)
    const subway   = calcSubwayScore(currentUser, targetUser)
    const dims     = calcDimsScore(currentUser, targetUser)
    const loves    = calcLovesScore(currentUser, targetUser)
    const limits   = calcLimitsScore(currentUser, targetUser)

    const reasons = uniqueArray([
        ...district.reasons,
        ...subway.reasons,
        ...loves.reasons,
        ...dims.reasons,
    ]).slice(0, 3)

    const total = budget.score + district.score + subway.score +
                  dims.score + loves.score + limits.score

    return {
        score: Math.max(0, Math.min(100, Math.round(total))),
        reasons,
    }
}

// ── 预算 ──
function calcBudgetScore(a, b) {
    const aMin = a.budget_min || 0
    const aMax = a.budget_max || 0
    const bMin = b.budget_min || 0
    const bMax = b.budget_max || 0

    if (!aMax || !bMax) return { score: WEIGHTS.budget * 0.5 }  // 没填预算给中间分

    const overlapMin = Math.max(aMin, bMin)
    const overlapMax = Math.min(aMax, bMax)

    if (overlapMax <= overlapMin) return { score: 0 }  // 无交集

    const overlap    = overlapMax - overlapMin
    const totalRange = Math.max(aMax, bMax) - Math.min(aMin, bMin)

    if (totalRange === 0) return { score: WEIGHTS.budget }  // 完全相同

    return { score: WEIGHTS.budget * (overlap / totalRange) }
}

// ── 区域 ──
function calcDistrictScore(a, b) {
    const arrA = a.target_districts || []
    const arrB = b.target_districts || []
    const common = intersection(arrA, arrB)
    const denom  = Math.max(arrA.length, arrB.length, 1)

    return {
        score:   WEIGHTS.district * (common.length / denom),
        reasons: common.length > 0 ? [`你们都倾向住在${common[0]}`] : [],
    }
}

// ── 地铁 ──
// 兼容 '9号线' 和 '9' 两种格式
function calcSubwayScore(a, b) {
    const arrA = (a.target_subways || []).map(normalizeSubwayLine)
    const arrB = (b.target_subways || []).map(normalizeSubwayLine)
    const common = intersection(arrA, arrB)
    const denom  = Math.max(arrA.length, arrB.length, 1)

    return {
        score:   WEIGHTS.subway * (common.length / denom),
        reasons: common.length > 0 ? [`都偏好${common[0]}号线附近`] : [],
    }
}

// ── 人格维度 ──
function calcDimsScore(a, b) {
    const dimsA = a.dims || {}
    const dimsB = b.dims || {}

    // 取两人都有值的 key，避免缺失 key 拉低分数
    const keys = DIM_KEYS.filter(k => dimsA[k] != null && dimsB[k] != null)
    if (keys.length === 0) return { score: WEIGHTS.dims * 0.5, reasons: [] }

    let total = 0
    keys.forEach(k => {
        const diff = Math.abs((dimsA[k] || 3) - (dimsB[k] || 3))
        total += (5 - diff)  // 最大 5，最小 1
    })

    const percent = total / (keys.length * 5)
    const reasons = percent > 0.8 ? ['生活节奏比较接近'] : []

    return { score: WEIGHTS.dims * percent, reasons }
}

// ── 爱好 ──
function calcLovesScore(a, b) {
    const arrA  = a.loves || []
    const arrB  = b.loves || []
    const common = intersection(arrA, arrB)
    const denom  = Math.max(arrA.length, arrB.length, 1)

    return {
        score:   WEIGHTS.loves * (common.length / denom),
        reasons: common.length > 0 ? [`你们都喜欢${common[0]}`] : [],
    }
}

// ── 底线（双向检测）──
// A 的底线 ∩ B 的爱好 → 冲突；B 的底线 ∩ A 的爱好 → 冲突
function calcLimitsScore(a, b) {
    const conflictsAB = intersection(a.limits || [], b.loves || [])
    const conflictsBA = intersection(b.limits || [], a.loves || [])
    const totalConflicts = conflictsAB.length + conflictsBA.length

    if (totalConflicts === 0) return { score: WEIGHTS.limits }

    // 每个冲突扣一半权重，最多扣完
    const penalty = Math.min(totalConflicts * (WEIGHTS.limits / 2), WEIGHTS.limits)
    return { score: WEIGHTS.limits - penalty }
}

// ── 工具 ──
function intersection(arr1 = [], arr2 = []) {
    if (!arr1.length || !arr2.length) return []
    return arr1.filter(item => arr2.includes(item))
}

function uniqueArray(arr = []) {
    return [...new Set(arr)]
}
