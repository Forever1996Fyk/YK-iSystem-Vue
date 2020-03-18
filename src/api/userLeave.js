/**
 * Created by YuKai Fan on 2020/1/13
 */
import request from '@/utils/request'

/**
 * 新增用户请假申请表
 * @param data
 * @returns {AxiosPromise}
 */
export function addUserLeave(data) {
  return request({
    url: '/business/api/userLeave/addUserLeave',
    method: 'post',
    data
  })
}

/**
 * 根据id查询用户请假申请表
 * @param data
 * @returns {*}
 */
export function getUserLeaveById(id) {
  return request({
    url: '/business/api/userLeave/getUserLeaveById',
    method: 'get',
    params: { id }
  })
}

/**
 * 更新用户请假申请表
 * @param data
 */
export function editUserLeave(data) {
  return request({
    url: '/business/api/userLeave/editUserLeave',
    method: 'put',
    data
  })
}

/**
 * 根据id删除用户请假申请表
 * @param data
 */
export function delUserLeave(id) {
  return request({
    url: '/business/api/userLeave/delUserLeave',
    method: 'delete',
    params: { id }
  })
}

/**
 * 根据ids批量删除用户请假申请表
 * @param data
 */
export function delUserLeaveByIds(ids) {
  return request({
    url: '/business/api/userLeave/delUserLeave/' + ids,
    method: 'delete'
  })
}

/**
 * 获取所有的用户请假申请表(不分页)
 * @param data
 * @returns {*}
 */
export function getUserLeavesNoPage(data) {
  return request({
    url: '/business/api/userLeave/getUserLeaves/noPage',
    method: 'get',
    params: data
  })
}

/**
 * 获取所有用户请假申请表
 * @param data
 * @returns {*}
 */
export function getUserLeaves(data) {
  return request({
    url: '/business/api/userLeave/getUserLeaves',
    method: 'get',
    params: data
  })
}
