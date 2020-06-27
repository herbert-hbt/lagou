# 步骤

1. step1

   1. hbt-pages 文件夹
      1. github 上创建一个仓库 hbt-pages
      2. git clone XXX
      3. cd hbt-pages && yarn int -y
      4. 新建 lib/index.js 并编写（拷贝 gulpfile.js 内的内容）
      5. 安装依赖（参考 3-15 中的 devDependency）
   2. my-demo 文件夹：
      1. 复制 3-15 中的 my-demo
      2. 去除 package.json 中的 devDependency，并重新安装

2. step2
   1. 在 hbt-pages 中 yarn link
   2. 在 my-demo 中
      1. yarn link "hbt-pages"//node_modules 中出现 hbt-pages 文件夹，并标识为软连接
      2. 修改 gulpfile.js 为 module.exports = require("hbt-pages");
      3. yarn install//安装依赖
      4. yarn add gulp gulp-cli -D//临时安装一下
      5. 新建文件 hbt-pages.config.js，并编写//约定大于配置，提供 hbt-pages 模块需要的数据
   3. 在 hbt-pages 中
      1. 读取 hbt-pages.conig.js 文件当做 data 的数据
      2. 修改 script 任务中的 presets 选项为 require 模式
   4. 在 my-demo 中 yarn build
3. step3：提取 gulpfile.js 中的路径，为可配置项
   1. 在 hbt-pages 的 lib/index.js 抽离路径配置
   2. 在 my-demo 中配置 build 选项
4. step4：封装 gulp 工具
   1. 删除 my-demo 中的 gulpfile.js
   2. yarn gulp build --gulpfile ./node_modules/hbt-pages/lib/index.js ---cwd . //指定 gulpfile，指定工作目录
   3. 在 hbt-pages 中
      1. 创建 bin/hbt-pages.js 文件//cli 的执行入口
      2. package.json 中配置 bin 字段
      3. 重新 unlink、link、chmod 755 bin/hbt-pages.js
      4. 编写 hbt-pages.js，主要是向参数中拼接参数
5. step5：发布并使用模块
   1. 在 file 中配置要发布的路径//npm 包会自动发布根目录文件和 package.json 中 files 字段定义的路径
   2. npm publish
   3. 使用 hbt-pages 包
      1. 新建 demo 文件夹
      2. 从 myd-demo 中国拷贝 public、src 和 hbt-pages.config.js 文件
      3. yarn add hbt-pages -D//如果淘宝镜像源没有及时同步，可以到淘宝镜像源官网，找到所对应的包，惊醒 sync 操作
      4. yarn hbt-pages build
      5. 在package.json中定义scripts
# 笔记

1. code . -a：在当前窗口打开当前目录
2. 引用一个第三方包时，只会自动安装，dependency 中的包，DevDependency 则不会
