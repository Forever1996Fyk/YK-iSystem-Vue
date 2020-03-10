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
  articleStatus: [
    {key: 0, value: '已删除'},
    {key: 1, value: '已发布'},
    {key: 2, value: '草稿'},
  ],
  menuLevel: [
    {key: 1, value: '菜单'},
    {key: 2, value: '子菜单'},
    {key: 3, value: '按钮'},
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
