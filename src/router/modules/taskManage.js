/**
 * Created by YuKai Fan on 2020/4/3
 */
const taskManageRouter = {
  path: 'taskManage',
  component: () => import('@/views/systemManage/index'),
  name: 'taskManage',
  meta: {
    title: 'taskManage'
  },
  children: [
    {
      path: 'taskScheduler',
      component: () => import('@/views/systemManage/taskManage/taskScheduler'),
      name: 'taskScheduler',
      meta: {
        title: 'taskScheduler',
        roles: ['admin']
      }
    },
    {
      path: 'taskLog',
      component: () => import('@/views/systemManage/taskManage/taskLog'),
      name: 'taskLog',
      meta: {
        title: 'taskLog',
        roles: ['admin']
      }
    },
  ]
};

export default taskManageRouter
