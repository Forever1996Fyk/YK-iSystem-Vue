/**
 * Created by YuKai Fan on 2020/1/13
 */
import request from '@/utils/request'

/**
 * 新增网关路由表
 * @param data
 * @returns {AxiosPromise}
 */
export function addGatewayRoute(data) {
  return request({
    url: '/system/api/gatewayRoute/addGatewayRoute',
    method: 'post',
    data
  })
}

/**
 * 根据id查询网关路由表
 * @param data
 * @returns {*}
 */
export function getGatewayRouteById(id) {
  return request({
    url: '/system/api/gatewayRoute/getGatewayRouteById',
    method: 'get',
    params: { id }
  })
}

/**
 * 更新网关路由表
 * @param data
 */
export function editGatewayRoute(data) {
  return request({
    url: '/system/api/gatewayRoute/editGatewayRoute',
    method: 'put',
    data
  })
}

/**
 * 根据id删除网关路由表
 * @param data
 */
export function delGatewayRoute(id) {
  return request({
    url: '/system/api/gatewayRoute/delGatewayRoute',
    method: 'delete',
    params: { id }
  })
}

/**
 * 根据ids批量删除网关路由表
 * @param data
 */
export function delGatewayRouteByIds(ids) {
  return request({
    url: '/system/api/gatewayRoute/delGatewayRoute/' + ids,
    method: 'delete'
  })
}

/**
 * 获取所有的网关路由表(不分页)
 * @param data
 * @returns {*}
 */
export function getGatewayRoutesNoPage(data) {
  return request({
    url: '/system/api/gatewayRoute/getGatewayRoutes/noPage',
    method: 'get',
    params: data
  })
}

/**
 * 获取所有网关路由表
 * @param data
 * @returns {*}
 */
export function getGatewayRoutes(data) {
  return request({
    url: '/system/api/gatewayRoute/getGatewayRoutes',
    method: 'get',
    params: data
  })
}
