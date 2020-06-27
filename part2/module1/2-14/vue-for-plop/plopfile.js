//Plop的入口文件， 需要导出一个函数
//此函数接收一个plop对象，用于创建生成器任务
module.exports = (plop) => {
  plop.setGenerator("component", {
    //生成器的名称
    description: "create a component", //生成器的描述
    prompts: [
      //命令行交互数组
      {
        type: "input",
        name: "name", //变量key
        message: "component name",
        default: "MyComponent",
      },
    ],
    actions: [
      {
        type: "add", //add代表添加文件
        path: "src/components/{{name}}/{{name}}.vue", //输出路径，此处可以使用双括号形式引用变量
        templateFile: "plop-templates/components.hbs", //基于handlebars语法
      },
    ], //命令行交互后的钩子函数，一个个执行
  });
};
