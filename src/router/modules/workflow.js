/**
 * Created by YuKai Fan on 2020/3/16
 */
import Layout from '@/layout'

const workflowRouter = {
  path: '/workflowManage',
  component: Layout,
  redirect: '/workflowManage/workflow/modelList',
  alwaysShow: true,
  name: 'WorkflowManage',
  meta: {
    title: 'WorkflowManage',
    icon: 'workflow',
    roles: ['admin']
  },
  children: [
    {
      path: 'workflow',
      component: () => import('@/views/workflowManage/index'),
      name: 'workflow',
      meta: {
        title: 'workflow'
      },
      children: [
        {
          path: 'modelerDesign/:id(\\d+)',
          component: () => import('@/views/workflowManage/workflow/modelerDesign'),
          name: 'modelerDesign',
          meta: {
            title: 'modelerDesign',
            roles: ['admin']
          },
          hidden: true
        },
        {
          path: 'modelList',
          component: () => import('@/views/workflowManage/workflow/modelList'),
          name: 'modelList',
          meta: {
            title: 'modelList',
            roles: ['admin']
          }
        },
        {
          path: 'processList',
          component: () => import('@/views/workflowManage/workflow/processList'),
          name: 'processList',
          meta: {
            title: 'processList',
            roles: ['admin']
          }
        },
        // {
        //   path: 'runningProcessList',
        //   component: () => import('@/views/workflowManage/workflow/runningProcessList'),
        //   name: 'runningProcessList',
        //   meta: {
        //     title: 'runningProcessList',
        //     roles: ['admin']
        //   }
        // },
        // {
        //   path: 'hisrotyProcessList',
        //   component: () => import('@/views/workflowManage/workflow/hisrotyProcessList'),
        //   name: 'hisrotyProcessList',
        //   meta: {
        //     title: 'processList',
        //     roles: ['admin']
        //   }
        // },
      ]
    }
  ]
};

export default workflowRouter