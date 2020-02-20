/**
 * Created by YuKai Fan on 2020/1/13
 */
import request from '@/utils/request'

/**
 * 新增系统用户表
 * @param data
 * @returns {AxiosPromise}
 */
export function addSystemUser(data) {
  return request({
    url: '/admin/api/systemUser/addSystemUser',
    method: 'post',
    data
  })
}

/**
 * 根据id查询系统用户表
 * @param data
 * @returns {*}
 */
export function getSystemUserById(id) {
  return request({
    url: '/admin/api/systemUser/getSystemUserById',
    method: 'get',
    params: { id }
  })
}

/**
 * 更新系统用户表
 * @param data
 */
export function editSystemUser(data) {
  return request({
    url: '/admin/api/systemUser/editSystemUser',
    method: 'put',
    data
  })
}

/**
 * 根据id删除系统用户表
 * @param data
 */
export function delSystemUser(id) {
  return request({
    url: '/admin/api/systemUser/delSystemUser',
    method: 'delete',
    params: { id }
  })
}

/**
 * 根据ids批量删除系统用户表
 * @param data
 */
export function delSystemUserByIds(ids) {
  return request({
    url: '/admin/api/systemUser/delSystemUser/' + ids,
    method: 'delete'
  })
}

/**
 * 获取所有的系统用户表(不分页)
 * @param data
 * @returns {*}
 */
export function getSystemUsersNoPage(data) {
  return request({
    url: '/admin/api/systemUser/getSystemUsers/noPage',
    method: 'get',
    params: data
  })
}

/**
 * 获取所有系统用户表
 * @param data
 * @returns {*}
 */
export function getSystemUsers(data) {
  return request({
    url: '/admin/api/systemUser/getSystemUsers',
    method: 'get',
    params: data
  })
}

/**
 * 分配角色
 * @param data
 * @returns {AxiosPromise}
 */
export function assignRole(data) {
  return request({
    url: '/admin/api/systemUser/assignRole',
    method: 'post',
    params: data
  })
}
