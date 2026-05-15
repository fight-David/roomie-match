// utils/harmony.js

/**
 * 室友匹配 Harmony 算法（MVP）
 * -----------------------------------
 * 最终返回：
 * {
 *   score: 92,
 *   reasons: []
 * }
 */

// 权重
const WEIGHTS = {
    gender: 20,
    budget: 15,
    district: 15,
    subway: 10,
    dims: 25,
    loves: 10,
    limits: 5,
}

/**
 * 主函数
 */
export function calcHarmony(currentUser, targetUser) {
    const reasons = []

    const gender = calcGenderScore(currentUser, targetUser)
    const budget = calcBudgetScore(currentUser, targetUser)
    const district = calcDistrictScore(currentUser, targetUser)
    const subway = calcSubwayScore(currentUser, targetUser)
    const dims = calcDimsScore(currentUser, targetUser)
    const loves = calcLovesScore(currentUser, targetUser)
    const limits = calcLimitsScore(currentUser, targetUser)

    // reasons
    reasons.push(...district.reasons)
    reasons.push(...subway.reasons)
    reasons.push(...loves.reasons)
    reasons.push(...dims.reasons)

    const total =
        gender.score +
        budget.score +
        district.score +
        subway.score +
        dims.score +
        loves.score +
        limits.score

    return {
        score: Math.max(0, Math.min(100, Math.round(total))),
        reasons: uniqueArray(reasons).slice(0, 3),
    }
}

/**
 * 性别匹配
 */
function calcGenderScore(userA, userB) {
    const score = WEIGHTS.gender

    // 不限
    if (
        userA.target_gender === '不限' ||
        userA.target_gender === userB.gender
    ) {
        return {
            score,
        }
    }

    return {
        score: 0,
    }
}

/**
 * 预算匹配
 */
function calcBudgetScore(userA, userB) {
    const overlap =
        Math.min(userA.budget_max, userB.budget_max) -
        Math.max(userA.budget_min, userB.budget_min)

    if (overlap <= 0) {
        return {
            score: 0,
        }
    }

    return {
        score: WEIGHTS.budget,
    }
}

/**
 * 区域匹配
 */
function calcDistrictScore(userA, userB) {
    const common = intersection(
        userA.target_districts,
        userB.target_districts
    )

    const ratio =
        common.length /
        Math.max(
            userA.target_districts.length,
            userB.target_districts.length,
            1
        )

    return {
        score: WEIGHTS.district * ratio,

        reasons:
            common.length > 0
                ? [`你们都倾向住在${common[0]}`]
                : [],
    }
}

/**
 * 地铁匹配
 */
function calcSubwayScore(userA, userB) {
    const common = intersection(
        userA.target_subways,
        userB.target_subways
    )

    const ratio =
        common.length /
        Math.max(
            userA.target_subways.length,
            userB.target_subways.length,
            1
        )

    return {
        score: WEIGHTS.subway * ratio,

        reasons:
            common.length > 0
                ? [`都偏好${common[0]}号线附近`]
                : [],
    }
}

/**
 * 人格维度匹配
 */
function calcDimsScore(userA, userB) {
    const keys = Object.keys(userA.dims)

    let total = 0

    keys.forEach((key) => {
        const diff = Math.abs(
            userA.dims[key] - userB.dims[key]
        )

        // 5分制
        total += (5 - diff)
    })

    const percent =
        total / (keys.length * 5)

    const reasons = []

    if (percent > 0.8) {
        reasons.push('生活节奏比较接近')
    }

    return {
        score: WEIGHTS.dims * percent,
        reasons,
    }
}

/**
 * loves 匹配
 */
function calcLovesScore(userA, userB) {
    const common = intersection(
        userA.loves,
        userB.loves
    )

    const ratio =
        common.length /
        Math.max(
            userA.loves.length,
            userB.loves.length,
            1
        )

    return {
        score: WEIGHTS.loves * ratio,

        reasons:
            common.length > 0
                ? [`你们都喜欢${common[0]}`]
                : [],
    }
}

/**
 * limits 检测
 * 如果对方踩中你的底线 -> 扣分
 */
function calcLimitsScore(userA, userB) {
    const conflicts = intersection(
        userA.limits,
        userB.loves
    )

    if (conflicts.length > 0) {
        return {
            score: 0,
        }
    }

    return {
        score: WEIGHTS.limits,
    }
}

/**
 * 交集
 */
function intersection(arr1 = [], arr2 = []) {
    return arr1.filter(item => arr2.includes(item))
}

/**
 * 去重
 */
function uniqueArray(arr = []) {
    return [...new Set(arr)]
}