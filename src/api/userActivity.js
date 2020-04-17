/**
 * Created by YuKai Fan on 2020/1/13
 */
import request from '@/utils/request'

/**
 * 新增用户动态表
 * @param data
 * @returns {AxiosPromise}
 */
export function addUserActivity(data) {
  return request({
    url: '/admin/api/userActivity/addUserActivity',
    method: 'post',
    data
  })
}

/**
 * 根据id查询用户动态表
 * @param data
 * @returns {*}
 */
export function getUserActivityById(id) {
  return request({
    url: '/admin/api/userActivity/getUserActivityById',
    method: 'get',
    params: { id }
  })
}

/**
 * 更新用户动态表
 * @param data
 */
export function editUserActivity(data) {
  return request({
    url: '/admin/api/userActivity/editUserActivity',
    method: 'put',
    data
  })
}

/**
 * 根据id删除用户动态表
 * @param data
 */
export function delUserActivity(id) {
  return request({
    url: '/admin/api/userActivity/delUserActivity',
    method: 'delete',
    params: { id }
  })
}

/**
 * 根据ids批量删除用户动态表
 * @param data
 */
export function delUserActivityByIds(ids) {
  return request({
    url: '/admin/api/userActivity/delUserActivity/' + ids,
    method: 'delete'
  })
}

/**
 * 获取所有的用户动态表(不分页)
 * @param data
 * @returns {*}
 */
export function getUserActivitysNoPage(data) {
  return request({
    url: '/admin/api/userActivity/getUserActivitys/noPage',
    method: 'get',
    params: data
  })
}

/**
 * 获取所有用户动态表
 * @param data
 * @returns {*}
 */
export function getUserActivitys(data) {
  return request({
    url: '/admin/api/userActivity/getUserActivitys',
    method: 'get',
    params: data
  })
}
