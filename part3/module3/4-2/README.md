# 步骤

* 项目初始化
    - 创建项目
        - 新建realworld-nuxtjs文件夹并进入
        - 初始化项目 npm init -y
        - 安装nuxt npm i nuxt
        - 配置package.json中的启动脚本
        - 创建pages文件夹
        - 在pages文件夹下，创建index.vue
        - 启动项目
    - 导入样式资源
        - 导入样式
            - 创建app.html文件
            - 找打nuxtjs文档，粘贴固定模板
            - 找到realworld中的css资源，
                - ionicons：找到对应的cdn资源，复制粘贴
                - googleapis：直接使用
                - productionready：复制粘贴到本地，新建static文件夹
    - 布局组件
        - pages下新建layout/index.vue文件
        - 创建基本结构后，复制realworld中header的nav标签部分和footer，并在中间添加<nuxt-child>标签
        - 自定义路由规则
            - 创建nuxt.config.js文件
            - 在router的extendRoutes中，清空默认生成的路由，将/指向layout
        - 创建home页面，并在nuxt.config.js添加路由规则，为layout的子路由
    - 导入登录注册页面
        - 创建login/index.vue
        - 复制并配置路由（共用一个文件）
        - 在login/index.vue中处理登录和注册不同页面的信息
    - 导入剩余页面
        - 创建profile并配置路由
        - 创建settings并配置路由
        - 创建editor并配置路由
        - 创建article并配置路由
    - 处理顶部导航栏链接
        - layout/index.vue中，将a链接改为nuxt-link
    - 处理导航链接高亮
        - 在nuxt.config.js中的router中配置linkActiveClass
        - 在nuxt-link home中添加exact
    - 封装请求模块
        - 创建utils/request.js
        - 配置axios
* 登录注册
    - 实现基本登录功能
        - 绑定数据模型
        - 处理提交事件
    - 封装请求方法
        - 将请求放置api对应模块
    - 表单验证
        - 添加require属性
        - type设置为emai和password
    - 错误处理
        - 将提交错误放置到头部显示
    - 用户注册
        - 调接口
        - 处理登录后返回信息
            - 存储到前端存储中
            - 存储到cookie中，前后端共享
    - 存储登录状态
        - 将token存储到store中（必须是store目录，nuxt会自动加载）
        - 将token存储到cookie中
        - 以action形式定义nextServerInit钩子，在钩子函数中将cookies中的token初始化到store容器中
        - 使用middleware进行页面拦截
    - 处理导航栏链接展示状态
        - 根据user展示信息
    - 处理页面访问权限
        - 新建middleware/authenticated.js文件，函数，根据user是否重定向到login
        - 在组件中定义，middleware属性
        - 同样设置middleware/notauthenticated.js
* 首页
    - 展示公共文章列表
        - 新建api/article.js，定义获取文章接口
        - 在pages/home/index.vue的asyncData中调用
        - 遍历展示
    - 分页
        - 设置参数
        - 显示页码
        - 监听路由参数，watchQuery
    - 标签
        - 展示列表
        - 处理链接点击事件
    - 处理tab选项卡
    - 处理your feed选项卡的数据
    - 处理token相关，
        - 拦截器中统一设置
        - 在插件中可以获取到上下文对象
            - 定义：plugins/xxx.js
            - 注册：在nuxt.config.js中的plugins字段中注册
            - 使用：插件中导出的函数会在app初始化时自动被调用，且必须以默认成员方式导出
    - 格式化发布时间
        - dayjs
        - 基于插件的过滤器
    - 点赞功能
        - 添加点赞
        - 删除点赞
* 详情页
    - 展示基本信息
    - 将md转为html -> markdown-it
    - 显示用户信息
    - 优化seo
    - 评论功能
* 发布部署
    - 打包
        - nuxt build
    - 最简单的部署方式
        - 配置Host+Port
            - 在nuxt.config.js中配置server字段

            

``` 
            server: {
                port: "3000",//lsof -i:3000检查3000端口是否被占用
                host: "0.0.0.0"//区别于localhost
            }
            ```

        - 压缩发布包
            - 文件列表
                - .nuxt文件夹
                - static文件夹
                - nuxt.config.js文件
                - package.json文件
                - package.lock.json文件
            - 手动压缩
        - 把发布包传到服务端
            - 登录服务器
                - ssh root@39.106.98.111
                - 输入密码
            - 创建项目目录
            - 上传：scp ./ttt.zip root@39.106.98.111:/data/webapps/bibf-manager/test-nuxt
        - 解压
            - 解压 `unzip ttt.zip` //需要服务器已集成unzip指令
        - 安装依赖
            - npm i//需要服务器已集成node和npm环境
        - 启动服务
            - npm start
        - 访问39.106.98.111:3000
    - 自动化部署 - githubt action
        - 环境准备
            - linux服务器
            - 代码提交到github仓库
        - 配置github access token到项目中
            - 位置：账号：settings -> developer ->  personal access token
            - 生成 -> generate
                - 填写name
                - 勾选权限（此处勾选第一大项）
                - 生成 （eb8cba395442e792e6e1ae0565cde89deda5c906）
            - 集成到项目
                - 进入项目
                - settings -> secrets -> new secret
                    - 名称：TOKEN（相当于变量）
                    - 值为上一步生成的token
                    - add secret
        - 配置github的action脚本
            - 在根目录创建.github/workflows目录
            - 下载main.yml文件到上一步创建的目录（https://gist.github.com/lipengzhou/b92f80142afa37aea397da47366bd872）
            - 编辑main.yml
                - 修改"打包构建" -> build的打包项目
                    - 新建 pm2.config.json文件
                    - 将pm2.config.json文件列入打包
                - 修改"部署到服务器" -> Deploy的scripts
            - 在项目内，创建username、host等secret，与main.yml对应
        - 部署
            - 本地提交：git add、commit
            - 设置tag：git tag v1.0.0
            - 推送tag：git push origin v1.0.0

# 信息

* 用户名 herbert
* 密码 herbert_hbt
* email herbert_hbt@126.com
