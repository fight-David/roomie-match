// api/db.js — 云数据库读取封装
// 通过云函数查询，绕过客户端 token 权限限制

import { DEFAULT_CITY_CODE } from '@/utils/cities.js'

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

// 按城市拉取用户列表（city 字段缺失的老数据默认归上海）
export async function fetchPeople(city) {
  const targetCity = city || DEFAULT_CITY_CODE
  // 先拉当前城市的用户，再拉没有 city 字段的老数据（兼容历史数据）
  const [withCity, noCity] = await Promise.all([
    callQuery('harmony-users', { city: targetCity }),
    callQuery('harmony-users', { city: null })
  ])
  // 合并去重（以 _id 为准）
  const seen = new Set()
  return [...withCity, ...noCity].filter(u => {
    const id = u._id || u.wx_uid
    if (seen.has(id)) return false
    seen.add(id)
    return true
  })
}

export async function findPerson(id) {
  if (!id) return null
  let data = await callQuery('harmony-users', { id })
  if (!data?.length) data = await callQuery('harmony-users', { wx_uid: id })
  if (!data?.length) data = await callQuery('harmony-users', { _id: id })
  return data?.[0] || null
}

// ===== 帖子 =====

// 按城市拉取帖子（city 字段缺失的老数据默认归上海）
export async function fetchProjects(city) {
  const targetCity = city || DEFAULT_CITY_CODE
  const [withCity, noCity] = await Promise.all([
    callQuery('harmony-posts', { city: targetCity }),
    callQuery('harmony-posts', { city: null })
  ])
  const seen = new Set()
  return [...withCity, ...noCity].filter(p => {
    const id = p._id || p.id
    if (seen.has(id)) return false
    seen.add(id)
    return true
  })
}

export async function findProject(id) {
  if (!id) return null
  let data = await callQuery('harmony-posts', { id })
  if (!data?.length) data = await callQuery('harmony-posts', { _id: id })
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
