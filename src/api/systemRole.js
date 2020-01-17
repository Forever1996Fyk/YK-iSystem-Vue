/**
 * Created by YuKai Fan on 2020/1/13
 */
import request from '@/utils/request'

/**
 * 新增角色表
 * @param data
 * @returns {AxiosPromise}
 */
export function addSystemRole(data) {
  return request({
    url: '/admin/api/systemRole/addSystemRole',
    method: 'post',
    data
  })
}

/**
 * 根据id查询角色表
 * @param data
 * @returns {*}
 */
export function getSystemRoleById(id) {
  return request({
    url: '/admin/api/systemRole/getSystemRoleById',
    method: 'get',
    params: { id }
  })
}

/**
 * 更新角色表
 * @param data
 */
export function editSystemRole(data) {
  return request({
    url: '/admin/api/systemRole/editSystemRole',
    method: 'put',
    data
  })
}

/**
 * 根据id删除角色表
 * @param data
 */
export function delSystemRole(id) {
  return request({
    url: '/admin/api/systemRole/delSystemRole',
    method: 'delete',
    params: { id }
  })
}

/**
 * 根据ids批量删除角色表
 * @param data
 */
export function delSystemRoleByIds(ids) {
  return request({
    url: '/admin/api/systemRole/delSystemRole/' + ids,
    method: 'delete'
  })
}

/**
 * 获取所有的角色表(不分页)
 * @param data
 * @returns {*}
 */
export function getSystemRolesNoPage(data) {
  return request({
    url: '/admin/api/systemRole/getSystemRoles/noPage',
    method: 'get',
    params: data
  })
}

/**
 * 获取所有角色表
 * @param data
 * @returns {*}
 */
export function getSystemRoles(data) {
  return request({
    url: '/admin/api/systemRole/getSystemRoles',
    method: 'get',
    params: data
  })
}

/**
 * 分配权限
 * @param data
 * @returns {AxiosPromise}
 */
export function assignRoleAuth(data) {
  return request({
    url: '/admin/api/systemRole/assignRoleAuth',
    method: 'post',
    data
  })
}
