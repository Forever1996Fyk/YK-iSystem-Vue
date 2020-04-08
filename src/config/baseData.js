/**
 * Created by YuKai Fan on 2020/1/15
 */
module.exports = {
  whetherOptions: [
    {key: 0, value: '否'},
    {key: 1, value: '是'}
  ],
  requestMethod: [
    {key: 'GET', value: 'GET'},
    {key: 'POST', value: 'POST'},
    {key: 'PUT', value: 'PUT'},
    {key: 'DELETE', value: 'DELETE'}
  ],
  marryFlag: [
    {key: 0, value: '未婚'},
    {key: 1, value: '已婚'}
  ],
  sex: [
    {key: 0, value: '男'},
    {key: 1, value: '女'}
  ],
  education: [
    {key: 0, value: '小学'},
    {key: 1, value: '初中'},
    {key: 2, value: '高中'},
    {key: 3, value: '大专'},
    {key: 4, value: '本科'},
    {key: 5, value: '硕士'},
    {key: 6, value: '博士'}
  ],
  leaveTypeOption: [
    {key: 0, value: '事假'},
    {key: 1, value: '婚假'},
    {key: 2, value: '产假'},
    {key: 3, value: '病假'},
    {key: 4, value: '公假'},
    {key: 5, value: '年假'},
    {key: 6, value: '其他'},
  ],
  articleStatus: [
    {key: 0, value: '已删除'},
    {key: 1, value: '已发布'},
    {key: 2, value: '草稿'},
  ],
  processStatus: [
    {key: 1, value: '已激活'},
    {key: 2, value: '已挂起'},
    {key: 0, value: '已结束'},
  ],
  menuLevel: [
    {key: 1, value: '菜单'},
    {key: 2, value: '子菜单'},
    {key: 3, value: '按钮'},
    {key: 4, value: 'api接口'}
  ],
  emailProtocols: [
    {key: 'POP3', value: 'POP3'},
    {key: 'SMTP', value: 'SMTP'},
    {key: 'IMAP', value: 'IMAP'},
  ],
  templateType: [
    {key: 1, value: '文本模板'},
    {key: 2, value: 'velocity模板'},
    {key: 3, value: 'freemarker模板'},
  ],
  contentType: [
    {key: 'application/x-www-form-urlencoded', value: 'application/x-www-form-urlencoded'},
    {key: 'multipart/form-data', value: 'multipart/form-data'},
    {key: 'application/json', value: 'application/json'},
    {key: 'text/xml', value: 'text/xml'},
  ],
  filterKeyValue(obj) {
    var result = obj.reduce((acc, cur) => {
      acc[cur.key] = cur.value;
      return acc
    }, {});
    return result;
  },
  descFilter(data) {
    if (data && data.length > 20) {
      data = data.substring(0, 20) + '...';
    }
    return data;
  },
};
