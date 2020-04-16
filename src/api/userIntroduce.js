/**
 * Created by YuKai Fan on 2020/1/13
 */
import request from '@/utils/request'

/**
 * 新增用户简介表
 * @param data
 * @returns {AxiosPromise}
 */
export function addUserIntroduce(data) {
  return request({
    url: '/base/api/userIntroduce/addUserIntroduce',
    method: 'post',
    data
  })
}

/**
 * 根据id查询用户简介表
 * @param data
 * @returns {*}
 */
export function getUserIntroduceById(id) {
  return request({
    url: '/base/api/userIntroduce/getUserIntroduceById',
    method: 'get',
    params: { id }
  })
}

/**
 * 更新用户简介表
 * @param data
 */
export function editUserIntroduce(data) {
  return request({
    url: '/base/api/userIntroduce/editUserIntroduce',
    method: 'put',
    data
  })
}

/**
 * 根据id删除用户简介表
 * @param data
 */
export function delUserIntroduce(id) {
  return request({
    url: '/base/api/userIntroduce/delUserIntroduce',
    method: 'delete',
    params: { id }
  })
}

/**
 * 根据ids批量删除用户简介表
 * @param data
 */
export function delUserIntroduceByIds(ids) {
  return request({
    url: '/base/api/userIntroduce/delUserIntroduce/' + ids,
    method: 'delete'
  })
}

/**
 * 获取所有的用户简介表(不分页)
 * @param data
 * @returns {*}
 */
export function getUserIntroducesNoPage(data) {
  return request({
    url: '/base/api/userIntroduce/getUserIntroduces/noPage',
    method: 'get',
    params: data
  })
}

/**
 * 获取所有用户简介表
 * @param data
 * @returns {*}
 */
export function getUserIntroduces(data) {
  return request({
    url: '/base/api/userIntroduce/getUserIntroduces',
    method: 'get',
    params: data
  })
}
