/**
 * Created by YuKai Fan on 2020/1/13
 */
import request from '@/utils/request'

/**
 * 新增定时任务调度日志表
 * @param data
 * @returns {AxiosPromise}
 */
export function addTaskLog(data) {
  return request({
    url: '/system/api/taskLog/addTaskLog',
    method: 'post',
    data
  })
}

/**
 * 根据id查询定时任务调度日志表
 * @param data
 * @returns {*}
 */
export function getTaskLogById(id) {
  return request({
    url: '/system/api/taskLog/getTaskLogById',
    method: 'get',
    params: { id }
  })
}

/**
 * 更新定时任务调度日志表
 * @param data
 */
export function editTaskLog(data) {
  return request({
    url: '/system/api/taskLog/editTaskLog',
    method: 'put',
    data
  })
}

/**
 * 根据id删除定时任务调度日志表
 * @param data
 */
export function delTaskLog(id) {
  return request({
    url: '/system/api/taskLog/delTaskLog',
    method: 'delete',
    params: { id }
  })
}

/**
 * 根据ids批量删除定时任务调度日志表
 * @param data
 */
export function delTaskLogByIds(ids) {
  return request({
    url: '/system/api/taskLog/delTaskLog/' + ids,
    method: 'delete'
  })
}

/**
 * 获取所有的定时任务调度日志表(不分页)
 * @param data
 * @returns {*}
 */
export function getTaskLogsNoPage(data) {
  return request({
    url: '/system/api/taskLog/getTaskLogs/noPage',
    method: 'get',
    params: data
  })
}

/**
 * 获取所有定时任务调度日志表
 * @param data
 * @returns {*}
 */
export function getTaskLogs(data) {
  return request({
    url: '/system/api/taskLog/getTaskLogs',
    method: 'get',
    params: data
  })
}
