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
export function addJob(data) {
  return request({
    url: '/system/api/taskScheduler/addJob',
    method: 'post',
    data
  })
}

/**
 * 修改定时任务
 * @param data
 * @returns {AxiosPromise}
 */
export function editJob(data) {
  return request({
    url: '/system/api/taskScheduler/editJob',
    method: 'put',
    data
  })
}

/**
 * 删除任务
 * @param jobName
 * @param jobGroupName
 * @returns {AxiosPromise}
 */
export function deleteJob(jobName, jobGroupName) {
  return request({
    url: '/system/api/taskScheduler/deleteJob/' + jobName + '/' + jobGroupName,
    method: 'delete',
  })
}

/**
 * 暂停定时任务
 * @param jobName
 * @param jobGroupName
 * @returns {AxiosPromise}
 */
export function pauseJob(jobName, jobGroupName) {
  return request({
    url: '/system/api/taskScheduler/pauseJob' + jobName + '/' + jobGroupName,
    method: 'put',
  })
}

/**
 * 恢复任务
 * @param jobName
 * @param jobGroupName
 * @returns {AxiosPromise}
 */
export function resumeJob(jobName, jobGroupName) {
  return request({
    url: '/system/api/taskScheduler/resumeJob' + jobName + '/' + jobGroupName,
    method: 'put',
  })
}
