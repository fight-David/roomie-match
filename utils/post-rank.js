// utils/post-rank.js
//
// 帖子混合排序：每个用户看到的列表都不同
// score = harmony × 0.5 + recency × 0.3 + freshness_boost × 0.2

import { calcHarmony } from './match.js'

const W_HARMONY = 0.5
const W_RECENCY = 0.3
const W_FRESHNESS = 0.2

const NEW_POST_DAYS = 3       // 新帖前 3 天加权
const DAY_MS = 24 * 60 * 60 * 1000

// 时效性：越新越接近 1，越老越接近 0
function recencyScore(createdAt) {
  if (!createdAt) return 0.5
  const days = (Date.now() - createdAt) / DAY_MS
  return 1 / (1 + days)
}

// 新帖加权：发布 3 天内给一个递减的额外分
function freshnessBoost(createdAt) {
  if (!createdAt) return 0
  const days = (Date.now() - createdAt) / DAY_MS
  if (days >= NEW_POST_DAYS) return 0
  return 1 - days / NEW_POST_DAYS
}

/**
 * 给帖子列表打分并排序
 * @param posts  帖子数组（每条须有 authorId）
 * @param currentUser  当前用户 profile
 * @param peopleMap  { authorId: userObj } 映射，用来查作者
 * @returns 带 _score 字段的新数组（已按分数降序）
 */
export function rankPosts(posts, currentUser, peopleMap = {}) {
  if (!posts?.length) return []

  return posts
    .map(p => {
      const author = peopleMap[p.authorId]
      let harmony = 50
      if (author && currentUser?.dims) {
        try { harmony = calcHarmony(currentUser, author).score } catch {}
      }

      const recency = recencyScore(p.created_at)
      const fresh = freshnessBoost(p.created_at)

      const score =
        (harmony / 100) * W_HARMONY +
        recency * W_RECENCY +
        fresh * W_FRESHNESS

      return { ...p, _score: score, _harmony: harmony }
    })
    .sort((a, b) => b._score - a._score)
}
