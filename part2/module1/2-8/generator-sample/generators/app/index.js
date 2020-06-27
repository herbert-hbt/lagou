//此文件作为Generator的核心入口
//需要导出一个继承自Yeoman Generator的类型
//Yeoman Generator在工作中会自动调用我们在此类型中定义的一些生命周期函数
//我们在这些方法中可以通过调用父类提供的一些工具方法实现一些功能，例如文件写入

const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  prompting() {
    //询问用户环节自动调用这个方法
    const questions = [
      {
        type: "input", //用户输入类型
        name: "title", //问题的key
        message: "请输入标题名称", //问题信息
        default: this.appname, //默认值，this.appname指的是当前项目名
      },
      {
        type: "input", //用户输入类型
        name: "success", //问题的key
        message: "打印成功字段嘛？", //问题信息
        default: true, //默认值，this.appname指的是当前项目名
      },
    ]; //问题数组
    return this.prompt(questions).then((answers) => {
      this.answers = answers; //answers是键值对，key为question中的name，value为用户输入或者默认值
    });
  }
  writing() {
    //在自动生成文件阶段调用
    this.fs.write(this.destinationPath("temp.txt"), Math.random().toString()); //生成temp.txt文件，内容为随机数

    //使用模板
    const tmpl = this.templatePath("foo.txt"); //此处会默认到templates目录下去找文件
    const output = this.destinationPath("foo.txt"); //设置输出路径
    const context = this.answers;
    this.fs.copyTpl(tmpl, output, context);
  }
};
