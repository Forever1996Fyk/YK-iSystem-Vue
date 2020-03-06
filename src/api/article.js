/**
 * Created by YuKai Fan on 2020/1/13
 */
import request from '@/utils/request'

/**
 * 新增文章管理表
 * @param data
 * @returns {AxiosPromise}
 */
export function addArticle(data) {
  return request({
    url: '/business/api/article/addArticle',
    method: 'post',
    data
  })
}

/**
 * 根据id查询文章管理表
 * @param data
 * @returns {*}
 */
export function getArticleById(id) {
  return request({
    url: '/business/api/article/getArticleById',
    method: 'get',
    params: { id }
  })
}

/**
 * 更新文章管理表
 * @param data
 */
export function editArticle(data) {
  return request({
    url: '/business/api/article/editArticle',
    method: 'put',
    data
  })
}

/**
 * 根据id删除文章管理表
 * @param data
 */
export function delArticle(id) {
  return request({
    url: '/business/api/article/delArticle',
    method: 'delete',
    params: { id }
  })
}

/**
 * 根据ids批量删除文章管理表
 * @param data
 */
export function delArticleByIds(ids) {
  return request({
    url: '/business/api/article/delArticle/' + ids,
    method: 'delete'
  })
}

/**
 * 获取所有的文章管理表(不分页)
 * @param data
 * @returns {*}
 */
export function getArticlesNoPage(data) {
  return request({
    url: '/business/api/article/getArticles/noPage',
    method: 'get',
    params: data
  })
}

/**
 * 获取所有文章管理表
 * @param data
 * @returns {*}
 */
export function getArticles(data) {
  return request({
    url: '/business/api/article/getArticles',
    method: 'get',
    params: data
  })
}
