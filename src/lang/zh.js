export default {
  route: {
    dashboard: '首页',
    documentation: '文档',
    guide: '引导页',
    SystemManage: '系统管理',
    AuthorityManage: '权限管理',
    genCode: '代码生成',
    gateway: '路由网关',
    taskScheduler: '任务调度',
    actionLog: '操作日志',
    taskLog: '任务日志',
    emailManage: '邮件管理',
    emailConfig: '邮件配置',
    emailLog: '邮件发送日志',
    emailTemplate: '邮件模板',
    systemApi: '系统api',
    UserManage: '用户管理',
    WorkflowManage: '协同管理',
    workflow: '工作流程',
    applyApprove: '申请审批',
    taskManage: '任务管理',
    modelerDesign: '流程设计器',
    systemUser: '系统用户',
    systemAuthority: '系统权限',
    systemMenu: '系统菜单',
    systemRole: '系统角色',
    ArticleManage: '文章管理',
    createArticle: '创建文章',
    articleList: '文章列表',
    modelList: '模型列表',
    processList: '流程列表',
    runningProcessList: '运行中流程',
    historyProcessList: '历史流程',
    userLeave: '请假流程',
    upcomingTask: '待办任务',
    doneTask: '已办任务',
    handleTask: '办理任务'
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
    menuUrl: '路由路径',
    designFlow: '设计流程图',
    modelId: '模型id',
    modelName: '模型名称',
    modelKey: '模型key',
    synchronizeData: '同步数据',
    description: '描述',
    deploy: '部署',
    startProcess: '启动流程',
    pendProcess: '挂起',
    activeProcess: '激活',
    processId: '流程id',
    processName: '流程名称',
    processKey: '流程key',
    version: '版本',
    deploymentId: '部署id',
    category: '类别',
    resourceName: '资源名称',
    deploymentTime: '部署时间',
    name: '名称',
    processInstanceId: '流程实例id',
    processDefinitionId: '流程定义id',
    processDefinitionKey: '流程定义key',
    processDefinitionVersion: '流程定义版本',
    deploymentName: '部署名称',
    diagramResourceName: '资源图片名称',
    processInfo: '流程信息',
    startUserId: '申请人id',
    startTime: '开始时间',
    endTime: '结束时间',
    duration: '持续时间',
    reason: '原因',
    leaveDays: '请假天数',
    leaveType: '请假类型',
    urlPath: '请假路径',
    submitApply: '提交申请',
    reSubmitApply: '重新提交',
    cancelApply: '取消申请',
    applyUserName: '申请人',
    taskId: '任务id',
    assignee: '委派人',
    createTime: '创建时间',
    handle: '办理',
    taskName: '当前任务',
    approveMsg: '审批意见',
    isPass: '是否通过',
    approveTime: '审批时间',
    handleTime: '处理时间',
    jobName: '任务名称',
    jobDescription: '任务描述',
    jobClassName: '任务类名',
    jobGroupName: '任务组名',
    jobStatus: '任务状态',
    jobTrigger: '任务类型',
    cronExpression: '任务表达式',
    repeatInterval: '间隔时间',
    repeatCount: '重复次数',
    misfirePolicy: '计划策略',
    concurrent: '并发执行',
    pause: '暂停',
    resume: '恢复',
    jobMessage: '任务信息',
    exceptionInfo:' 异常信息',
    ipAddr: 'ip地址',
    actionTime: '操作时间',
    projectName: '项目名称',
    inputParam: '输入参数',
    outputParam: '输出参数',
    log: '日志',
    protocol: '协议',
    smtpHost: '发件服务器域名',
    smtpUserName: '发件服务器账户',
    smtpPassword: '发件服务器授权码',
    isDefault: '是否默认',
    subject: '主题',
    recipients: '接收人',
    cc: '抄送人',
    content: '内容',
    attachment: '附件路径',
    sendNum: '发送次数',
    error: '错误信息',
    result: '结果',
    configName: '配置名称',
    tplName: '模板名称',
    tplCode: '模板编码',
    template: '模板',
    tplParams: '模板参数',
    templateType: '模板类型',
    config: '配置'
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
    closeAll: '关闭所有',
    ApplicationMatters: '申请事项'
  },
  settings: {
    title: '系统布局配置',
    theme: '主题色',
    tagsView: '开启 Tags-View',
    fixedHeader: '固定 Header',
    sidebarLogo: '侧边栏 Logo'
  },
  button: {
    approve: '批准',
    turnDown: '驳回',
    invalid: '作废',
  }
}
