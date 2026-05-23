/**
 * 云数据库读取封装
 * 从 uniCloud 读取数据，格式与 mock 保持一致
 * 通过云函数查询，绕过客户端 token 权限限制
 *
 * 使用方式：
 *   import { fetchPeople, fetchProjects, findPerson, findProject } from '@/api/db.js'
 */

// ===== 通用查询云函数 =====
async function callQuery(collection, where = {}, options = {}) {
  // 先尝试走 clientDB，失败则回退到云函数
  try {
    const db = uniCloud.database()
    let query = db.collection(collection)
    const keys = Object.keys(where)
    if (keys.length) {
      query = query.where(where)
    }
    const res = await query.get(options)
    if (res.result && res.result.data) {
      return res.result.data
    }
  } catch (e) {
    // clientDB 失败，走云函数
  }

  // 走云函数查询（不需要客户端 token）
  try {
    const res = await uniCloud.callFunction({
      name: 'query-db',
      data: { collection, where, options }
    })
    if (res.result && res.result.code === 0) {
      return res.result.data
    }
    return []
  } catch (e) {
    console.warn('云函数查询失败', e)
    return []
  }
}

// ===== 用户 =====
export async function fetchPeople() {
  return callQuery('harmony-users')
}

export async function findPerson(id) {
  const data = await callQuery('harmony-users', { id })
  return data[0] || null
}

// ===== 帖子 =====
export async function fetchProjects() {
  return callQuery('harmony-posts')
}

export async function findProject(id) {
  const data = await callQuery('harmony-posts', { id })
  return data[0] || null
}

// ===== 评论 =====
export async function fetchComments(postId) {
  return callQuery('harmony-comments', { postId })
}

// ===== 关注 =====
export async function fetchFollows() {
  return callQuery('harmony-follows')
}

// ===== 会话 =====
export async function fetchConversations() {
  return callQuery('harmony-conversations')
}
