/**
 * Created by YuKai Fan on 2020/4/7
 */
const developManageRouter = {
  path: 'developManage',
  component: () => import('@/views/systemManage/index'),
  name: 'developManage',
  meta: {
    title: 'developManage'
  },
  children: [
    {
      path: 'genCode',
      component: () => import('@/views/systemManage/developManage/genCode'),
      name: 'genCode',
      meta: {
        title: 'genCode',
        roles: ['admin']
      }
    },
    {
      path: 'gateway',
      component: () => import('@/views/systemManage/developManage/gateway'),
      name: 'gateway',
      meta: {
        title: 'gateway',
        roles: ['admin']
      }
    },
    {
      path: 'actionLog',
      component: () => import('@/views/systemManage/developManage/actionLog'),
      name: 'actionLog',
      meta: {
        title: 'actionLog',
        roles: ['admin']
      }
    },
    {
      path: 'swaggerDocument',
      component: () => import('@/views/systemManage/developManage/swaggerUI'),
      name: 'swaggerDocument',
      meta: {
        title: 'swaggerDocument',
        roles: ['admin']
      }
    }
  ]
};

export default developManageRouter
