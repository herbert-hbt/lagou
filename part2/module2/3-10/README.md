# 步骤

1. yarn init -y
2. yarn add parcel-bundler -D
3. 新建 src/index.html(入口文件为 HTML 文件)
4. 引入 js 文件
5. yarn parcel src/index.html//默认开启开发服务器，且可以修改后可以自动刷新，也可以使用 HMR，使用方法和 webpack 相似
6. yarn parcel build src/index.html//以生产模式打包

# 笔记

1. 可以自动安装依赖
2. 加载其他资源也可以零配置
3. 支持动态导入
4. parcel 比 webpack 快，多进程打包（webpack 可以使用 happy webpack）
