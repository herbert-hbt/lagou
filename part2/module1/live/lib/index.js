const fs = require("fs");
const path = require("path");
const marked = require("marked");
const puppeteer = require("puppeteer");

module.exports = async (filePath, outpuPath, config) => {
  if (filePath) {
    const filename = path.resolve(filePath); //将md文件设为绝对路径
    if (!fs.existsSync(filename)) {
      //判断是否是合法路径
      throw new Error("文件路径不存在");
    }
    const stat = fs.statSync(filename);
    if (stat.isDirectory()) {
      //判断是否是文件
      throw new Error("给定路径是一个文件夹，而不是文件");
    }
    const contents = fs.readFileSync(filename, "utf8"); //读取文件
    const fragment = marked(contents); //将md文件转为html
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <link rel="stylesheet" href="https://unpkg.com/github-markdown-css">
      <style>
        .markdown-body {
          width: 90%;
          max-width: 700px;
          margin: 0 auto;
        }
      </style>
    </head>
    <body class="markdown-body">
      ${fragment}
    </body>
    </html>`;
    try {
      const browser = await puppeteer.launch(); //打开无头浏览器
      const page = await browser.newPage(); //新建页面
      await page.setContent(html); //加载html
      await page.screenshot({
        path: outpuPath || "output.png",
        fullPage: true,
      });
      await browser.close();
    } catch (e) {
      console.log("ssss");
    }
  }
};
