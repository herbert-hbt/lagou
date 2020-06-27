#!/usr/bin/env node

//Node cli 应用入口文件必须要有这样的文件头
//如果linux 或者 macOS 系统下还需要修改此文件的读写权限为 755 chmod 755 cli.js

//脚手架的工作过程：
// 1. 通过命令行交互询问用户问题，node中通过inquirer模块进行命令行操作
// 2. 根据用户回答的结果生成文件

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const ejs = require("ejs");

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: "Project name?",
    },
  ])
  .then((answers) => {
    // 2. 根据用户回答的结果生成文件
    // console.log(answers);

    // 模板目录
    const temlDir = path.join(__dirname, "templates");
    // 目标目录，一般为命令行执行时候的目录，即process.cwd()
    const destDir = process.cwd();
    // 将模板下的文件全部转换到目标目录
    fs.readdir(temlDir, (err, filesPath) => {
      //filesPath为对temlDir的相对路径数组
      if (err) throw err;
      filesPath.forEach((file) => {
        //通过模板引擎去渲染对应路径的文件
        // console.log(file);
        ejs.renderFile(
          path.join(temlDir, file), //渲染文件的绝对路径
          answers, //传入的变量
          (err, result) => {
            //回调
            if (err) throw err;
            // console.log(result);
            //将结果写成文件
            fs.writeFileSync(path.join(destDir, file), result);
          }
        );
      });
    });
  });
