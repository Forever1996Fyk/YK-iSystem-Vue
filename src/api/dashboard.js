/**
 * Created by YuKai Fan on 2020/4/14
 */
import request from '@/utils/request'

/**
 * 获取首页数据(操作访问量, 消息, 新闻统计)
 * @param data
 * @returns {AxiosPromise}
 */
export function getIndexCountData(data) {
  return request({
    url: '/base/api/index/getIndexCountData',
    method: 'get',
    params: data
  })
}

/**
 * 获取首页数据(cpu, jvm服务性能图)
 * @param data
 * @returns {AxiosPromise}
 */
export function getIndexChartData(data) {
  return request({
    url: '/base/api/index/getIndexChartData',
    method: 'get',
    params: data
  })
}

/**
 * 获取首页数据(新闻热搜, todo列表, 个人信息数据)
 * @param data
 * @returns {AxiosPromise}
 */
export function getIndexInfoData(data) {
  return request({
    url: '/base/api/index/getIndexInfoData',
    method: 'get',
    params: data
  })
}

/**
 * 获取首页数据(新闻热搜)
 * @param data
 * @returns {AxiosPromise}
 */
export function getHotNews(data) {
  return request({
    url: '/base/api/index/getHotNews',
    method: 'get',
    params: data
  })
}
