/**
 * Created by YuKai Fan on 2020/1/13
 */
import request from '@/utils/request'

/**
 * 新增邮件日志表
 * @param data
 * @returns {AxiosPromise}
 */
export function addEmailLog(data) {
  return request({
    url: '/message/api/emailLog/addEmailLog',
    method: 'post',
    data
  })
}

/**
 * 根据id查询邮件日志表
 * @param data
 * @returns {*}
 */
export function getEmailLogById(id) {
  return request({
    url: '/message/api/emailLog/getEmailLogById',
    method: 'get',
    params: { id }
  })
}

/**
 * 更新邮件日志表
 * @param data
 */
export function editEmailLog(data) {
  return request({
    url: '/message/api/emailLog/editEmailLog',
    method: 'put',
    data
  })
}

/**
 * 根据id删除邮件日志表
 * @param data
 */
export function delEmailLog(id) {
  return request({
    url: '/message/api/emailLog/delEmailLog',
    method: 'delete',
    params: { id }
  })
}

/**
 * 根据ids批量删除邮件日志表
 * @param data
 */
export function delEmailLogByIds(ids) {
  return request({
    url: '/message/api/emailLog/delEmailLog/' + ids,
    method: 'delete'
  })
}

/**
 * 获取所有的邮件日志表(不分页)
 * @param data
 * @returns {*}
 */
export function getEmailLogsNoPage(data) {
  return request({
    url: '/message/api/emailLog/getEmailLogs/noPage',
    method: 'get',
    params: data
  })
}

/**
 * 获取所有邮件日志表
 * @param data
 * @returns {*}
 */
export function getEmailLogs(data) {
  return request({
    url: '/message/api/emailLog/getEmailLogs',
    method: 'get',
    params: data
  })
}
