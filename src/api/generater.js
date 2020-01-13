/**
 * Created by YuKai Fan on 2020/1/13
 */
import request from '@/utils/request'

export function getDBTables(query) {
  return request({
    url: '/generate/api/generate/getDBTables',
    method: 'get',
    params: query
  })
}
