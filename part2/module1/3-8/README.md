# 步骤
1. yarn init -y
2. yarn add grunt
3. code gruntfile.js
4. 编写gruntfile.js
    1. yarn add grunt-contrib-clean//清除临时文件
    2. loadNpmTasks('grunt-contrib-clean')
    3. 配置targets 
5. yarn grunt clean:xxx//一般省略grunt-contrib
    - yarn add grunt-sass sass -D    
    - yarn add grunt-babel @babel/core @babel/preset-env -D
    - yarn add grunt-contrib-watch -D//使用yarn grunt watch即可运行