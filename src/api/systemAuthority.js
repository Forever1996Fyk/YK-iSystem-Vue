/**
 * Created by YuKai Fan on 2020/1/13
 */
import request from '@/utils/request'

/**
 * 新增系统权限表
 * @param data
 * @returns {AxiosPromise}
 */
export function addSystemAuthority(data) {
  return request({
    url: '/admin/api/systemAuthority/addSystemAuthority',
    method: 'post',
    data
  })
}

/**
 * 根据id查询系统权限表
 * @param data
 * @returns {*}
 */
export function getSystemAuthorityById(id) {
  return request({
    url: '/admin/api/systemAuthority/getSystemAuthorityById',
    method: 'get',
    params: { id }
  })
}

/**
 * 更新系统权限表
 * @param data
 */
export function editSystemAuthority(data) {
  return request({
    url: '/admin/api/systemAuthority/editSystemAuthority',
    method: 'put',
    data
  })
}

/**
 * 根据id删除系统权限表
 * @param data
 */
export function delSystemAuthority(id) {
  return request({
    url: '/admin/api/systemAuthority/delSystemAuthority',
    method: 'delete',
    params: { id }
  })
}

/**
 * 根据ids批量删除系统权限表
 * @param data
 */
export function delSystemAuthorityByIds(ids) {
  return request({
    url: '/admin/api/systemAuthority/delSystemAuthority/' + ids,
    method: 'delete'
  })
}

/**
 * 获取所有的系统权限表(不分页)
 * @param data
 * @returns {*}
 */
export function getSystemAuthoritiesNoPage(data) {
  return request({
    url: '/admin/api/systemAuthority/getSystemAuthorities/noPage',
    method: 'get',
    params: data
  })
}

/**
 * 获取所有系统权限表
 * @param data
 * @returns {*}
 */
export function getSystemAuthorities(data) {
  return request({
    url: '/admin/api/systemAuthority/getSystemAuthorities',
    method: 'get',
    params: data
  })
}
