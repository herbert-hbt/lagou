# 步骤

1. 创建文件夹（文件夹名包含 generator 字段）mkdir generator-sample
2. cd generator-sample
3. yarn init -y
4. yarn add yeomao-generator//提供生成器的基类，基类中提供一些工具函数，使创建生成器更加便捷
5. 创建目录结构

```
generator-sample
    generators
        app
            inde.js
```

6. 编写 index.js
7. yarn link //注册到全局
8. 使用 在任一文件夹内运行：yo sample，就会创建一个 temp.txt 文件//为 generator-sample 去除 generator 的部分

# 使用模板创建文件

1. 在 generators/app 文件夹下创建 templates 文件夹，用于存放各种模板
2. 在 templates 下创建模板文件
3. 在 index 中使用 copyTpl 方法生成文件
