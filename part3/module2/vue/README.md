# 源码阅读

## 目录结构

* vue
  + dist：vue打包后的结果，分为很多版本，在readme中有介绍
  + examples：示例：vue的基本使用
  + src：源码
    - compiler：编译器：将模板转换为render函数，render函数用于创建虚拟dom
    - core：vue的核心，和平台无关
      - components：内置组件
      - global-api：定义vue中的静态方法
      - instance：创建vue实例，包含vue的构造函数、初始化、生命周期等
      - observer：用于实现vue的响应式机制
      - util：公共工具
      - vdom：虚拟dom部分，在snabbdom的基础上，添加了组件机制
    - platforms：和平台相关的代码
      - web
        - entry-xxx文件：打包时的入口文件
      - weex
    - server：服务端渲染相关代码
    - sfc：single file component：单文件组件相关
    - shared：公共代码

## flow：静态类型检查工具

* 通过类型腿短来进行类型检查
* 声明形式
  + //@flow
  + /\*@flow\*/
