#

1. yarn init -y
2. yarn add sass -D//下完之后，会在 node_modules 下出现一个.bin 目录,bin 目录下有一个可运行的 sass 文件
3. ./node_modules/.bin/sass scss/main.scss css/style.css // ./node_modules/.bin/sass：指令；scss/main.scss：输入文件路径；css/style.css：输出文件路径
4. 将./node_modules/.bin/sass 命令集成到 package.json 的 scripts 属性中去
   1. package.json 中的 scripts 会自动检索 node_modules/.bin 下的命令，所以不必再写路径，只需写名称即可
   2. "build-sass":"sass scss/main.scss css/style.css --watch"//--watch 会触发热更新，自动编译
5. yarn add browser-sync -D//browser-sync 用于启动一个测试服务器，运行项目
6. scripts 中，添加"serve":"browser-sync ."//--file 'css/\*.css'：会执行监听
7. scripts 中，添加"preserve":"yarn build-sass"//preXXX，会在 XXX 命令执行前执行
8. yarn add npm-run-all -D //npm-run-all：并行执行 npm 命令
   1. scripts 中，添加"start":"run-p build-sass serve"//同时执行 build-sass 和 erve
