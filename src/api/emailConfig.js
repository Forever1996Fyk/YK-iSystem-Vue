/**
 * Created by YuKai Fan on 2020/1/13
 */
import request from '@/utils/request'

/**
 * 新增邮箱配置表
 * @param data
 * @returns {AxiosPromise}
 */
export function addEmailConfig(data) {
  return request({
    url: '/message/api/emailConfig/addEmailConfig',
    method: 'post',
    data
  })
}

/**
 * 根据id查询邮箱配置表
 * @param data
 * @returns {*}
 */
export function getEmailConfigById(id) {
  return request({
    url: '/message/api/emailConfig/getEmailConfigById',
    method: 'get',
    params: { id }
  })
}

/**
 * 更新邮箱配置表
 * @param data
 */
export function editEmailConfig(data) {
  return request({
    url: '/message/api/emailConfig/editEmailConfig',
    method: 'put',
    data
  })
}

/**
 * 根据id删除邮箱配置表
 * @param data
 */
export function delEmailConfig(id) {
  return request({
    url: '/message/api/emailConfig/delEmailConfig',
    method: 'delete',
    params: { id }
  })
}

/**
 * 根据ids批量删除邮箱配置表
 * @param data
 */
export function delEmailConfigByIds(ids) {
  return request({
    url: '/message/api/emailConfig/delEmailConfig/' + ids,
    method: 'delete'
  })
}

/**
 * 获取所有的邮箱配置表(不分页)
 * @param data
 * @returns {*}
 */
export function getEmailConfigsNoPage(data) {
  return request({
    url: '/message/api/emailConfig/getEmailConfigs/noPage',
    method: 'get',
    params: data
  })
}

/**
 * 获取所有邮箱配置表
 * @param data
 * @returns {*}
 */
export function getEmailConfigs(data) {
  return request({
    url: '/message/api/emailConfig/getEmailConfigs',
    method: 'get',
    params: data
  })
}
