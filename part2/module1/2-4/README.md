# 构建

```
    yarn global add yo generator
    yo node//node代表的是g安装的enerator-node
    yo node:cli
    yarn link//全局link
    chmod 755 2-4 yarn link 过来的话 ,需要找到原始文件(不是link后的文件) 设置执行权限
```

# 查看和 yarn 相关的可用的命令：yarn global bin

# 查看看环境变量所在目录

```
echo $PATH
```

# ls -la 查看当前文件夹下文件权限

```
drwxr-xr-x 14 root wheel 448 5 13 10:12 ..
-rw-r--r-- 1 hebaiting admin 0 3 16 10:19 .keepme
lrwxr-xr-x 1 hebaiting admin 57 6 5 11:20 2-4 -> ../../../Users/hebaiting/.config/yarn/link/2-4/lib/cli.js
lrwxr-xr-x 1 hebaiting admin 31 3 19 13:29 2to3 -> ../Cellar/python/3.7.7/bin/2to3
```

- 第一段：drwxr-xr-x：文件权限
  - 1 位：
    - -：表示文件
    - d：表示目录
    - p：表示管道
    - l：表示连接（可能有多个）
  - 2~4 位：表示管理员的权限
    - r：read：是否可读，值为 4
    - w：write：是否可写，值为 2
    - x：execute：是否可执行，值为 1
  - 5-7 位：表示用户所在群组权限
  - 8-10 位：其他群组权限
- 第二段：14：文件硬链接数或目录子目录数
- 第三段：root：文件拥有者
- 第四段：wheel：文件拥有者所在组
- 第五段：448：文件文件大小(以字节为单位)
- 第六~八段：5 13 10:12：文件创建月份、天、时间
- 第九段：文件名（如果是链接，包含->和链接路径 ）

# 设置权限：chmod 755 my-module

- chmod：用于设置权限
- 755：每一位分别代表三类用户的权限（1：可执行，4：可读，5 可读可执行（4+1），7 可写（4+2+1））
