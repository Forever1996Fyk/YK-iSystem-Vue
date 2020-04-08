/**
 * Created by YuKai Fan on 2020/4/7
 */
const systemMonitorRouter = {
  path: 'systemMonitor',
  component: () => import('@/views/systemManage/index'),
  name: 'systemMonitor',
  meta: {
    title: 'systemMonitor'
  },
  children: [
    {
      path: 'serverMonitor',
      component: () => import('@/views/systemManage/systemMonitor/serverMonitor'),
      name: 'serverMonitor',
      meta: {
        title: 'serverMonitor',
        roles: ['admin']
      }
    },
    {
      path: 'druidMonitor',
      component: () => import('@/views/systemManage/systemMonitor/druidMonitor'),
      name: 'druidMonitor',
      meta: {
        title: 'druidMonitor',
        roles: ['admin']
      }
    }
  ]
};

export default systemMonitorRouter
