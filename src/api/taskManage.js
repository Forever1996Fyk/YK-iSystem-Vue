/**
 * Created by YuKai Fan on 2020/3/17
 */
import request from '@/utils/request'

/**
 * 获取待办任务列表
 *
 * @param data
 * @returns {AxiosPromise}
 */
export function getUpcomingTasks(data) {
  return request({
    url: '/workflow/api/activiti/getUpcomingTasks',
    method: 'get',
    params: data
  })
}

/**
 * 获取已办任务列表
 *
 * @param data
 * @returns {AxiosPromise}
 */
export function getDoneTasks(data) {
  return request({
    url: '/workflow/api/activiti/getDoneTasks',
    method: 'get',
    params: data
  })
}

/**
 * 获取申请事项
 *
 * @param data
 * @returns {AxiosPromise}
 */
export function getApplicationMatters(taskId) {
  return request({
    url: '/workflow/api/activiti/getApplicationMatters/' + taskId,
    method: 'get'
  })
}

/**
 * 获取历史申请事项
 *
 * @param data
 * @returns {AxiosPromise}
 */
export function getHisApplicationMatters(executionId) {
  return request({
    url: '/workflow/api/activiti/getHisApplicationMatters/' + executionId,
    method: 'get'
  })
}

/**
 * 获取已办任务列表
 * @param taskId
 * @param type
 * @param pass
 * @returns {AxiosPromise}
 */
export function updateTask(taskId, type, pass) {
  return request({
    url: '/workflow/api/activiti/updateTask/' + taskId + '/' + type + '/' + pass,
    method: 'put',
  })
}

/**
 * 完成审批任务
 * @param taskId
 * @param pass
 * @returns {AxiosPromise}
 */
export function completeTask(taskId, pass, data) {
  return request({
    url: '/workflow/api/activiti/completeTask/' + taskId + '/' + pass,
    method: 'post',
    data
  })
}

/**
 * 获取流程高亮图片
 * @param processInstanceId
 * @returns {AxiosPromise}
 */
export function getHighLightProcImage(processInstanceId) {
  return request({
    url: '/workflow/api/activiti/getHighLightProcImage/' + processInstanceId,
    method: 'get',
  })
}

/**
 * 根据流程实例id获取审批信息
 * @param processInstanceId
 * @returns {AxiosPromise}
 */
export function getApproveInfo(processInstanceId) {
  return request({
    url: '/workflow/api/activiti/getApproveInfo/' + processInstanceId,
    method: 'get',
  })
}
