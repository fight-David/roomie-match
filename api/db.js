/**
 * 云数据库读取封装
 * 从 uniCloud 读取数据，格式与 mock 保持一致
 * 通过云函数查询，绕过客户端 token 权限限制
 *
 * 使用方式：
 *   import { fetchPeople, fetchProjects, findPerson, findProject } from '@/api/db.js'
 */

// ===== 通用查询云函数 =====
// 直接走云函数（项目使用自定义 token，不走 clientDB 避免 split 报错）
async function callQuery(collection, where = {}, options = {}) {
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
  if (!id) return null
  let data = await callQuery('harmony-users', { id })
  if (!data?.length) {
    data = await callQuery('harmony-users', { wx_uid: id })
  }
  if (!data?.length) {
    data = await callQuery('harmony-users', { _id: id })
  }
  return data?.[0] || null
}

// ===== 帖子 =====
export async function fetchProjects() {
  return callQuery('harmony-posts')
}

export async function findProject(id) {
  if (!id) return null
  // 同时尝试 id 和 _id 两种字段（兼容云端自增 _id 与自定义 id）
  let data = await callQuery('harmony-posts', { id })
  if (!data?.length) {
    data = await callQuery('harmony-posts', { _id: id })
  }
  return data?.[0] || null
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
