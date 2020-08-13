# 构建步骤

* 参考vue-router源码构建目录结构
    - src
        - simulated-router
            - components
                - link.js
                - view.js
            - history
                - base.js
                - hash.js
                - html5.js
            - create-matcher.js
            - create-route-map.js
            - index.js
            - install.js

            

# 流程逻辑

* Vue.use(VueRouter)
    - 执行VueRouter的install方法
        - 缓存Vue实例
        - 通过mixin，注册beforeCreate
        - 原型上挂载$router为Vue的私有属性_router（此时可能没值）
        - 原型上挂载$route为Vue的私有属性_route（此时可能没值）
        - 注册RouterLink组件
        - 注册RouterView组件
* 执行 new Router(routes)
    - 缓存传入的routes规则到_routes
    - 创建macher对象
        - 生成map
        - 构造match方法
        - 构造addRoute方法
    - 根据mode，创建history对象
        - new HashHistory(this)
            - 缓存传入的this（router）到router
            - 通过createRouter（path为初始"/"）创建current对象
            - 创建cb函数，初始值赋值为null
            - 初始化浏览器当前hash为"/"
* new Vue时传
* 在Vue的beforeCreate钩子中
    - 根据当前实例是否传入router对象
        - 传入
            - 将当前vue实例缓存到vue的_routerRoot私有变量中
            - 将传入的router对象缓存到_router私有变量中
            - 执行传入的router的init方法
                - 调用history的transitionTo方法，传入当前路径和完成时回调
                    - 将当前current赋值为传入路径对应的record
                    - cb存在时调用cb（此时尚赋值）
                    - 完成时回调存在时，调用完成时回调（此时存在）
                        - 监听hashchange事件，事件为tansitionTo(currentPath)（未传入第二个参数）
                - 调用history的listen方法，给cb赋值
            - 在当前vue对象上挂载响应式私有变量_route为传入的router对象history属性的current属性
* 在hash变化时，调用hashchange注册的回调
