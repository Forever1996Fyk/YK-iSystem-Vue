/**
 * Created by YuKai Fan on 2020/3/30
 */
const emailManageRouter = {
  path: 'emailManage',
  component: () => import('@/views/systemManage/index'),
  name: 'emailManage',
  meta: {
    title: 'emailManage'
  },
  children: [
    {
      path: 'emailConfig',
      component: () => import('@/views/systemManage/emailManage/emailConfig'),
      name: 'emailConfig',
      meta: {
        title: 'emailConfig',
        roles: ['admin']
      }
    },
    {
      path: 'emailLog',
      component: () => import('@/views/systemManage/emailManage/emailLog'),
      name: 'emailLog',
      meta: {
        title: 'emailLog',
        roles: ['admin']
      }
    },
    {
      path: 'emailTemplate',
      component: () => import('@/views/systemManage/emailManage/emailTemplate'),
      name: 'emailTemplate',
      meta: {
        title: 'emailTemplate',
        roles: ['admin']
      }
    }
  ]
};

export default emailManageRouter
