/**
 * Created by YuKai Fan on 2020/1/13
 */
import request from '@/utils/request'

/**
 * 新增操作日志表
 * @param data
 * @returns {AxiosPromise}
 */
export function addActionLog(data) {
  return request({
    url: '/system/api/actionLog/addActionLog',
    method: 'post',
    data
  })
}

/**
 * 根据id查询操作日志表
 * @param data
 * @returns {*}
 */
export function getActionLogById(id) {
  return request({
    url: '/system/api/actionLog/getActionLogById',
    method: 'get',
    params: { id }
  })
}

/**
 * 更新操作日志表
 * @param data
 */
export function editActionLog(data) {
  return request({
    url: '/system/api/actionLog/editActionLog',
    method: 'put',
    data
  })
}

/**
 * 根据id删除操作日志表
 * @param data
 */
export function delActionLog(id) {
  return request({
    url: '/system/api/actionLog/delActionLog',
    method: 'delete',
    params: { id }
  })
}

/**
 * 根据ids批量删除操作日志表
 * @param data
 */
export function delActionLogByIds(ids) {
  return request({
    url: '/system/api/actionLog/delActionLog/' + ids,
    method: 'delete'
  })
}

/**
 * 获取所有的操作日志表(不分页)
 * @param data
 * @returns {*}
 */
export function getActionLogsNoPage(data) {
  return request({
    url: '/system/api/actionLog/getActionLogs/noPage',
    method: 'get',
    params: data
  })
}

/**
 * 获取所有操作日志表
 * @param data
 * @returns {*}
 */
export function getActionLogs(data) {
  return request({
    url: '/system/api/actionLog/getActionLogs',
    method: 'get',
    params: data
  })
}
