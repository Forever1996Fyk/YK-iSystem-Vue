/**
 * Created by YuKai Fan on 2020/1/13
 */
import request from '@/utils/request'

/**
 * 新增待办事项表
 * @param data
 * @returns {AxiosPromise}
 */
export function addTodoTask(data) {
  return request({
    url: '/base/api/todoTask/addTodoTask',
    method: 'post',
    data
  })
}

/**
 * 根据id查询待办事项表
 * @param data
 * @returns {*}
 */
export function getTodoTaskById(id) {
  return request({
    url: '/base/api/todoTask/getTodoTaskById',
    method: 'get',
    params: { id }
  })
}

/**
 * 更新待办事项表
 * @param data
 */
export function editTodoTask(data) {
  return request({
    url: '/base/api/todoTask/editTodoTask',
    method: 'put',
    data
  })
}

/**
 * 根据id删除待办事项表
 * @param data
 */
export function delTodoTask(id) {
  return request({
    url: '/base/api/todoTask/delTodoTask',
    method: 'delete',
    params: { id }
  })
}

/**
 * 根据ids批量删除待办事项表
 * @param data
 */
export function delTodoTaskByIds(ids) {
  return request({
    url: '/base/api/todoTask/delTodoTask/' + ids,
    method: 'delete'
  })
}

/**
 * 获取所有的待办事项表(不分页)
 * @param data
 * @returns {*}
 */
export function getTodoTasksNoPage(data) {
  return request({
    url: '/base/api/todoTask/getTodoTasks/noPage',
    method: 'get',
    params: data
  })
}

/**
 * 获取所有待办事项表
 * @param data
 * @returns {*}
 */
export function getTodoTasks(data) {
  return request({
    url: '/base/api/todoTask/getTodoTasks',
    method: 'get',
    params: data
  })
}
