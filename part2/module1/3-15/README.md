# 步骤

1. git clone https://github.com/zce/zce-gulp-demo.git
2. yarn add gulp -D
3. style 相关
   1. yarn add gulp-sass -D//会连带安装 node-sass，里面有一些对 c++程序级的依赖，有一些二进制的包需要到国外站点下载
4. 脚本相关
   1. yarn add gulp-babel @babel/core @babel/preset-env -D
5. 模板相关（案例使用的是 swig 模板引擎）
   1. yarn add gulp-swig -D
6. 图片字体模块（主要是压缩）
   1. yarn add gulp-imagemin -D
7. 其他文件(public 文件夹)和文件清除
   1. yarn add del -D
8. 插件的自动加载
   1. yarn add gulp-load-plugins -D
9. 搭建开发服务器
   1. yarn add browser-sync -D
10. 监听文件变化
   1. gulp 中提供的 watch api + browser-sync 配置中的 files 选项
11. 处理node_module内文件的引用
   1. yarn add gulp-useref -D：利用注释改变文件引用路径，并且合并到统一文件中
12. 压缩文件
   1. js：gulp-uglifyÎ
   2. css：gulp-clean-css
   3. html：gulp-htmlmin
   4. 判断流中文件类型：gulp-if
