/**
 * Created by YuKai Fan on 2020/1/13
 */
import request from '@/utils/request'

/**
 * 新增系统用户表
 * @param data
 * @returns {AxiosPromise}
 */
export function createNewModel(data) {
  return request({
    url: '/workflow/api/activiti/createNewModel',
    method: 'post',
    data
  })
}

/**
 * 根据id删除系统用户表
 * @param data
 */
export function delModel(id) {
  return request({
    url: '/workflow/api/activiti/delModel',
    method: 'delete',
    params: { id }
  })
}

/**
 * 获取所有的模型列表(不分页)
 * @param data
 * @returns {*}
 */
export function getModelsNoPage(data) {
  return request({
    url: '/workflow/api/activiti/getModels/noPage',
    method: 'get',
    params: data
  })
}

/**
 * 获取所有的模型列表(分页)
 * @param data
 * @returns {*}
 */
export function getModels(data) {
  return request({
    url: '/workflow/api/activiti/getModels',
    method: 'get',
    params: data
  })
}
