/**
 * Created by YuKai Fan on 2020/3/23
 */
import request from '@/utils/request'

/**
 * 获取任务执行日志列表
 * @param data
 * @returns {AxiosPromise}
 */
export function getJobLogs(data) {
  return request({
    url: '/system/api/taskScheduler/jobLogs',
    method: 'get',
    params: data
  })
}

/**
 * 获取定时任务列表
 * @param data
 * @returns {AxiosPromise}
 */
export function getJobs(data) {
  return request({
    url: '/system/api/taskScheduler/jobs',
    method: 'get',
    params: data
  })
}

/**
 * 添加定时任务
 * @param data
 * @returns {AxiosPromise}
 */
export function addLocalJob(data) {
  return request({
    url: '/system/api/taskScheduler/addLocalJob',
    method: 'post',
    data
  })
}

/**
 * 修改定时任务
 * @param data
 * @returns {AxiosPromise}
 */
export function editLocalJob(data) {
  return request({
    url: '/system/api/taskScheduler/editLocalJob',
    method: 'put',
    data
  })
}

/**
 * 添加远程定时任务
 * @param data
 * @returns {AxiosPromise}
 */
export function addHttpJob(data) {
  return request({
    url: '/system/api/taskScheduler/addHttpJob',
    method: 'post',
    data
  })
}

/**
 * 修改远程定时任务
 * @param data
 * @returns {AxiosPromise}
 */
export function editHttpJob(data) {
  return request({
    url: '/system/api/taskScheduler/editHttpJob',
    method: 'put',
    data
  })
}

/**
 * 删除任务
 * @param data
 * @returns {AxiosPromise}
 */
export function deleteJob(data) {
  return request({
    url: '/system/api/taskScheduler/deleteJob/' + data.jobName + '/' + data.jobGroupName + '/' + data.id,
    method: 'delete',
  })
}

/**
 * 暂停定时任务
 * @param data
 * @returns {AxiosPromise}
 */
export function pauseJob(data) {
  return request({
    url: '/system/api/taskScheduler/pauseJob/' + data.jobName + '/' + data.jobGroupName + '/' + data.id,
    method: 'put',
  })
}

/**
 * 恢复任务
 * @param data
 * @returns {AxiosPromise}
 */
export function resumeJob(data) {
  return request({
    url: '/system/api/taskScheduler/resumeJob/' + data.jobName + '/' + data.jobGroupName + '/' + data.id,
    method: 'put',
  })
}
