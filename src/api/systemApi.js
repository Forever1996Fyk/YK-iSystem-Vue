/**
 * Created by YuKai Fan on 2020/1/13
 */
import request from '@/utils/request'

/**
 * 新增网关api接口表
 * @param data
 * @returns {AxiosPromise}
 */
export function addSystemApi(data) {
  return request({
    url: '/system/api/systemApi/addSystemApi',
    method: 'post',
    data
  })
}

/**
 * 根据id查询网关api接口表
 * @param data
 * @returns {*}
 */
export function getSystemApiById(id) {
  return request({
    url: '/system/api/systemApi/getSystemApiById',
    method: 'get',
    params: { id }
  })
}

/**
 * 更新网关api接口表
 * @param data
 */
export function editSystemApi(data) {
  return request({
    url: '/system/api/systemApi/editSystemApi',
    method: 'put',
    data
  })
}

/**
 * 根据id删除网关api接口表
 * @param data
 */
export function delSystemApi(id) {
  return request({
    url: '/system/api/systemApi/delSystemApi',
    method: 'delete',
    params: { id }
  })
}

/**
 * 根据ids批量删除网关api接口表
 * @param data
 */
export function delSystemApiByIds(ids) {
  return request({
    url: '/system/api/systemApi/delSystemApi/' + ids,
    method: 'delete'
  })
}

/**
 * 获取所有的网关api接口表(不分页)
 * @param data
 * @returns {*}
 */
export function getSystemApisNoPage(data) {
  return request({
    url: '/system/api/systemApi/getSystemApis/noPage',
    method: 'get',
    params: data
  })
}

/**
 * 获取所有网关api接口表
 * @param data
 * @returns {*}
 */
export function getSystemApis(data) {
  return request({
    url: '/system/api/systemApi/getSystemApis',
    method: 'get',
    params: data
  })
}
