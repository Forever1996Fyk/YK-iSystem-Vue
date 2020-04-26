/**
 * Created by YuKai Fan on 2020/1/13
 */
import request from '@/utils/request'

/**
 * 新增热点新闻表
 * @param data
 * @returns {AxiosPromise}
 */
export function addHotNews(data) {
  return request({
    url: '/business/api/hotNews/addHotNews',
    method: 'post',
    data
  })
}

/**
 * 根据id查询热点新闻表
 * @param data
 * @returns {*}
 */
export function getHotNewsById(id) {
  return request({
    url: '/business/api/hotNews/getHotNewsById',
    method: 'get',
    params: { id }
  })
}

/**
 * 更新热点新闻表
 * @param data
 */
export function editHotNews(data) {
  return request({
    url: '/business/api/hotNews/editHotNews',
    method: 'put',
    data
  })
}

/**
 * 根据id删除热点新闻表
 * @param data
 */
export function delHotNews(id) {
  return request({
    url: '/business/api/hotNews/delHotNews',
    method: 'delete',
    params: { id }
  })
}

/**
 * 根据ids批量删除热点新闻表
 * @param data
 */
export function delHotNewsByIds(ids) {
  return request({
    url: '/business/api/hotNews/delHotNews/' + ids,
    method: 'delete'
  })
}

/**
 * 获取所有的热点新闻表(不分页)
 * @param data
 * @returns {*}
 */
export function getHotNewsNoPage(data) {
  return request({
    url: '/business/api/hotNews/getHotNews/noPage',
    method: 'get',
    params: data
  })
}

/**
 * 获取所有热点新闻表
 * @param data
 * @returns {*}
 */
export function getHotNews(data) {
  return request({
    url: '/business/api/hotNews/getHotNews',
    method: 'get',
    params: data
  })
}

/**
 * 导入excel
 * @returns {AxiosPromise}
 */
export function importHotNewsByExcel() {
  return request({
    url: '/business/api/hotNews/importHotNewsByExcel',
    method: 'post',
  })
}

/**
 * 导出excel
 * @returns {AxiosPromise}
 */
export function exportHotNewsToExcel() {
  return request({
    url: '/business/api/hotNews/exportHotNewsToExcel',
    method: 'get',
  })
}
