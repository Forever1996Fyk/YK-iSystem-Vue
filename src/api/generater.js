/**
 * Created by YuKai Fan on 2020/1/13
 */
import request from '@/utils/request'

/**
 * 获取所有数据库表
 * @param data
 * @returns {*}
 */
export function getDBTables(data) {
  return request({
    url: '/generate/api/generate/getDBTables',
    method: 'get',
    params: data
  })
}
