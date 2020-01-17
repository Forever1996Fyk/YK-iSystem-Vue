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
  }
};
