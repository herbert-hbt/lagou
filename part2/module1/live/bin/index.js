#!/usr/bin/env node
//如果头没写对，会报bad interpreter:No such file or directory

const { program } = require("commander");

const md2png = require(".."); //..或找到根目录，会找package.json，会找main字段
const pkg = require("../package.json");
program
  .version(pkg.version) //设置md2png -version
  .usage("<input>") // md2png命令后的第一段字符转
  .option("-o, --output <output>", "输出图片文件路径") //设置参数，输出位置
  .option("-w, --width <width>", "输出图片宽度") //设置参数，图片宽度
  .parse(process.argv).args.length || program.help();

const { args, output, width } = program;
const [input] = args;
md2png(input, output, width);
