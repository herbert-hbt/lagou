### 构建

```
yarn init -y
yarn add flow-bin -D
yarn flow init//初始化flow的配置文件
yarn flow//进行编译,需要yarn
//...
yarn flow stop：关闭服务
```

### 笔记

- 需要使用`//@flow`标记被 flow 检的文件
- 关闭编辑器默认对 JavaScript 的校验:code -> preference -> settings：搜所 javascript validation
- yarn 可以自动找到 node_modules 的.bin 文件夹下的可用命令
- yarn flow 之后会起一个后台服务，之后的 yarn flow 都有基于此，使用完毕之后需要 yarn flow stop 来结束服务
- 去除注解
  - 使用 flow-remove-types
    ```
        yarn add flow-remove-types -D
        yarn flow-remove-types . -d dist
    ```
  - 使用 babel
    ```
        yarn add @babel/core @babel/cli @babel/preset-flow -D
        {
            "presets":"@babel/preset-flow"//添加.babelrc的配置文件
        }
        yarn babel src  -d dist
    ```
