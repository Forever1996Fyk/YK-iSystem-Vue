export default {
  route: {
    dashboard: '首页',
    documentation: '文档',
    guide: '引导页',
    SystemManage: '系统管理',
    AuthorityManage: '权限管理',
    genCode: '代码生成',
    gateway: '路由网关',
    systemApi: '系统api',
    UserManage: '用户管理',
    systemUser: '系统用户',
    systemAuthority: '系统权限',
    systemMenu: '系统菜单',
    systemRole: '系统角色',
    ArticleManage: '文章管理',
    createArticle: '创建文章',
    articleList: '文章列表'
  },
  navbar: {
    dashboard: '首页',
    github: '项目地址',
    logOut: '退出登录',
    profile: '个人中心',
    theme: '换肤',
    size: '布局大小'
  },
  login: {
    title: '系统登录',
    logIn: '登录',
    username: '账号',
    password: '密码',
    any: '随便填',
    thirdparty: '第三方登录',
    thirdpartyTips: '本地不能模拟，请结合自己业务进行模拟！！！'
  },
  documentation: {
    documentation: '文档',
    github: 'Github 地址'
  },
  permission: {
    addRole: '新增角色',
    editPermission: '编辑权限',
    roles: '你的权限',
    switchRoles: '切换权限',
    tips: '在某些情况下，不适合使用 v-permission。例如：Element-UI 的 el-tab 或 el-table-column 以及其它动态渲染 dom 的场景。你只能通过手动设置 v-if 来实现。',
    delete: '删除',
    confirm: '确定',
    cancel: '取消'
  },
  guide: {
    description: '引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于',
    button: '打开引导'
  },
  components: {
    documentation: '文档',
    tinymceTips: '富文本是管理后台一个核心的功能，但同时又是一个有很多坑的地方。在选择富文本的过程中我也走了不少的弯路，市面上常见的富文本都基本用过了，最终权衡了一下选择了Tinymce。更详细的富文本比较和介绍见',
    dropzoneTips: '由于我司业务有特殊需求，而且要传七牛 所以没用第三方，选择了自己封装。代码非常的简单，具体代码你可以在这里看到 @/components/Dropzone',
    stickyTips: '当页面滚动到预设的位置会吸附在顶部',
    backToTopTips1: '页面滚动到指定位置会在右下角出现返回顶部按钮',
    backToTopTips2: '可自定义按钮的样式、show/hide、出现的高度、返回的位置 如需文字提示，可在外部使用Element的el-tooltip元素',
    imageUploadTips: '由于我在使用时它只有vue@1版本，而且和mockjs不兼容，所以自己改造了一下，如果大家要使用的话，优先还是使用官方版本。'
  },
  table: {
    userName: '用户名',
    nickName: '昵称',
    userIcon: '用户头像',
    account: '账号',
    marryFlag: '婚否',
    education: '学历',
    phone: '手机号',
    email: '邮箱',
    prov: '省份',
    city: '城市',
    dist: '区名',
    address: '详细地址',
    idCard: '身份证号',
    age: '年龄',
    sex: '性别',
    authority: '权限',
    roleName: '角色名称',
    roleCode: '角色编码',
    assignAuth: '分配权限',
    assignRole: '分配角色',
    title: '标题',
    importance: '重要性',
    type: '类型',
    remark: '备注',
    search: '搜索',
    add: '添加',
    export: '导出',
    id: '序号',
    author: '作者',
    status: '状态',
    actions: '操作',
    edit: '编辑',
    View: '查看',
    publish: '发布',
    draft: '草稿',
    delete: '删除',
    cancel: '取 消',
    confirm: '确 定',
    tableName: '表名称',
    generate: '生成代码',
    routeName: '路由名称',
    routeDesc: '路由描述',
    path: '路径',
    serviceId: '服务id',
    stripPrefix: '忽略前缀',
    persist: '保留数据',
    retryable: '重试',
    apiCode: '接口编码',
    apiName: '接口名称',
    apiCategory: '接口分类',
    apiDesc: '接口描述',
    requestMethod: '请求方式',
    contentType: '响应类型',
    className: '类名',
    methodName: '方法名',
    auth: '是否认证',
    open: '是否开放',
    publishTime: '发布时间',
    articleClass: '文章分类',
    articleCover: '文章封面',
    isComment: '开启评论',
    comment: '评论',
    authMenu: '权限菜单',
    menuName: '菜单名称',
    menuCode: '菜单编码',
    menuDesc: '菜单描述',
    pMenu: '上级菜单',
    menuScheme: '路径前缀',
    menuTarget: '打开方式',
    routePath: '路由路径',
    icon: '图标',
    menuLevel: '菜单级别',
    sort: "序号",
    menuUrl: '路由路径'
  },
  example: {
    warning: '创建和编辑页面是不能被 keep-alive 缓存的，因为keep-alive 的 include 目前不支持根据路由来缓存，所以目前都是基于 component name 来进行缓存的。如果你想类似的实现缓存效果，可以使用 localStorage 等浏览器缓存方案。或者不要使用 keep-alive 的 include，直接缓存所有页面。详情见'
  },
  errorLog: {
    tips: '请点击右上角bug小图标',
    description: '现在的管理后台基本都是spa的形式了，它增强了用户体验，但同时也会增加页面出问题的可能性，可能一个小小的疏忽就导致整个页面的死锁。好在 Vue 官网提供了一个方法来捕获处理异常，你可以在其中进行错误处理或者异常上报。',
    documentation: '文档介绍'
  },
  excel: {
    export: '导出',
    selectedExport: '导出已选择项',
    placeholder: '请输入文件名(默认excel-list)'
  },
  zip: {
    export: '导出',
    placeholder: '请输入文件名(默认file)'
  },
  pdf: {
    tips: '这里使用   window.print() 来实现下载pdf的功能'
  },
  theme: {
    change: '换肤',
    documentation: '换肤文档',
    tips: 'Tips: 它区别于 navbar 上的 theme-pick, 是两种不同的换肤方法，各自有不同的应用场景，具体请参考文档。'
  },
  tagsView: {
    refresh: '刷新',
    close: '关闭',
    closeOthers: '关闭其它',
    closeAll: '关闭所有'
  },
  settings: {
    title: '系统布局配置',
    theme: '主题色',
    tagsView: '开启 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '侧边栏 Logo'
  }
}
