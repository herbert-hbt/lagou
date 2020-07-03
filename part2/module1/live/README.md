# 步骤

1. yarn init -y
2. 新建 README.md
3. 新建 bin/index.js，用于放置脚本运行代码，修改 package.json 中的 bin 字段
4. 新建 lib/index.js，用于放置程序运行代码
5. 编写 bin/index.js
    1. 获取命令行参数
        1. yarn add commander
6. 编写 lib/index.js
    1. yarn add marked puppeteer
7. yarn link && chmod 755 .
