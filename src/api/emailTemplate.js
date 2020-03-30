/**
 * Created by YuKai Fan on 2020/1/13
 */
import request from '@/utils/request'

/**
 * 新增邮件模板表
 * @param data
 * @returns {AxiosPromise}
 */
export function addEmailTemplate(data) {
  return request({
    url: '/message/api/emailTemplate/addEmailTemplate',
    method: 'post',
    data
  })
}

/**
 * 根据id查询邮件模板表
 * @param data
 * @returns {*}
 */
export function getEmailTemplateById(id) {
  return request({
    url: '/message/api/emailTemplate/getEmailTemplateById',
    method: 'get',
    params: { id }
  })
}

/**
 * 更新邮件模板表
 * @param data
 */
export function editEmailTemplate(data) {
  return request({
    url: '/message/api/emailTemplate/editEmailTemplate',
    method: 'put',
    data
  })
}

/**
 * 根据id删除邮件模板表
 * @param data
 */
export function delEmailTemplate(id) {
  return request({
    url: '/message/api/emailTemplate/delEmailTemplate',
    method: 'delete',
    params: { id }
  })
}

/**
 * 根据ids批量删除邮件模板表
 * @param data
 */
export function delEmailTemplateByIds(ids) {
  return request({
    url: '/message/api/emailTemplate/delEmailTemplate/' + ids,
    method: 'delete'
  })
}

/**
 * 获取所有的邮件模板表(不分页)
 * @param data
 * @returns {*}
 */
export function getEmailTemplatesNoPage(data) {
  return request({
    url: '/message/api/emailTemplate/getEmailTemplates/noPage',
    method: 'get',
    params: data
  })
}

/**
 * 获取所有邮件模板表
 * @param data
 * @returns {*}
 */
export function getEmailTemplates(data) {
  return request({
    url: '/message/api/emailTemplate/getEmailTemplates',
    method: 'get',
    params: data
  })
}
