import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/documentation',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/documentation/index'),
        name: 'Documentation',
        meta: { title: 'documentation', icon: 'documentation', affix: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/systemManage',
    component: Layout,
    redirect: '/systemManage/genCode',
    alwaysShow: true,
    name: 'SystemManage',
    meta: {
      title: 'SystemManage',
      icon: 'lock',
      roles: ['admin', 'customer']
    },
    children: [
      {
        path: 'genCode',
        component: () => import('@/views/systemManage/genCode'),
        name: 'genCode',
        meta: {
          title: 'genCode',
          roles: ['admin']
        }
      },
      {
        path: 'gateway',
        component: () => import('@/views/systemManage/gateway'),
        name: 'gateway',
        meta: {
          title: 'gateway',
          roles: ['admin']
        }
      },
      {
        path: 'systemApi',
        component: () => import('@/views/systemManage/systemApi'),
        name: 'systemApi',
        meta: {
          title: 'systemApi',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/userManage',
    component: Layout,
    redirect: '/userManage/systemUser',
    alwaysShow: true,
    name: 'UserManage',
    meta: {
      title: 'UserManage',
      icon: 'user',
      roles: ['admin']
    },
    children: [
      {
        path: 'systemUser',
        component: () => import('@/views/userManage/systemUser'),
        name: 'systemUser',
        meta: {
          title: 'systemUser',
          roles: ['admin']
        }
      },
      {
        path: 'systemRole',
        component: () => import('@/views/userManage/systemRole'),
        name: 'systemRole',
        meta: {
          title: 'systemRole',
          roles: ['admin']
        }
      },
      {
        path: 'systemAuthority',
        component: () => import('@/views/userManage/systemAuthority'),
        name: 'systemAuthority',
        meta: {
          title: 'systemAuthority',
          roles: ['admin']
        }
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
