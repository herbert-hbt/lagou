const express = require("express");
const fs = require("fs");
const template = require("art-template");

const app = express();

app.get("/", (req, res) => {
    //1. 获取页面末班
    const templateStr = fs.readFileSync("./index.html", "utf-8");
    // console.log(templateStr)
    //2. 获取数据
    const data = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
    console.log(data);
    //3. 渲染
    const resData = template.render(templateStr, data);
    //4. 把渲染结果发送到客户端

    res.send(resData);
})

app.listen(3000, () => {
    console.log("running...")
})