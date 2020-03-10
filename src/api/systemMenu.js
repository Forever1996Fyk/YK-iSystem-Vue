/**
 * Created by YuKai Fan on 2020/1/13
 */
import request from '@/utils/request'

/**
 * 新增系统菜单表
 * @param data
 * @returns {AxiosPromise}
 */
export function addSystemMenu(data) {
  return request({
    url: '/admin/api/systemMenu/addSystemMenu',
    method: 'post',
    data
  })
}

/**
 * 根据id查询系统菜单表
 * @param data
 * @returns {*}
 */
export function getSystemMenuById(id) {
  return request({
    url: '/admin/api/systemMenu/getSystemMenuById',
    method: 'get',
    params: { id }
  })
}

/**
 * 更新系统菜单表
 * @param data
 */
export function editSystemMenu(data) {
  return request({
    url: '/admin/api/systemMenu/editSystemMenu',
    method: 'put',
    data
  })
}

/**
 * 根据id删除系统菜单表
 * @param data
 */
export function delSystemMenu(id) {
  return request({
    url: '/admin/api/systemMenu/delSystemMenu',
    method: 'delete',
    params: { id }
  })
}

/**
 * 根据ids批量删除系统菜单表
 * @param data
 */
export function delSystemMenuByIds(ids) {
  return request({
    url: '/admin/api/systemMenu/delSystemMenu/' + ids,
    method: 'delete'
  })
}

/**
 * 获取所有的系统菜单表(不分页)
 * @param data
 * @returns {*}
 */
export function getSystemMenusNoPage(data) {
  return request({
    url: '/admin/api/systemMenu/getSystemMenus/noPage',
    method: 'get',
    params: data
  })
}
/**
 * 获取所有的系统菜单表(不分页)
 * @param data
 * @returns {*}
 */
export function getSystemMenusNodeList(data) {
  return request({
    url: '/admin/api/systemMenu/getSystemMenusNodeList',
    method: 'get',
    params: data
  })
}

/**
 * 获取所有系统菜单表
 * @param data
 * @returns {*}
 */
export function getSystemMenus(data) {
  return request({
    url: '/admin/api/systemMenu/getSystemMenus',
    method: 'get',
    params: data
  })
}
