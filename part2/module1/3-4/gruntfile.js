// Grunt的入口文件
// 用于定义一些需要Grunt自动执行的任务
// 需要导出一个函数
// 此函数接受一个Grunt的形参，内部提供一些创建任务时可以用到的API

module.exports = (grunt) => {
  grunt.registerTask("foo", () => {
    //第一个参数为任务名称，用于yarn grunt使用，为default时，为默认任务
    console.log("hello grunt");
  });
  grunt.registerTask("bar", "第二个参数为当前任务（bar）的描述", () => {
    //描述信息会出现yarn grunt --help的Available tasks中
    console.log("other task");
  });
  //   grunt.registerTask(
  //     "default",
  //     () => {
  //       console.log("default task");
  //     }
  //   );
  grunt.registerTask(
    "default",
    ["foo", "bar"] //第二个参数为任务名称数组时，会默认依次执行任务
  );
  //定义异步任务
  //1. 任务函数不可以使用箭头函数，需要function形式
  //2. 在任务函数内，需要通过this.async()构造一个标识函数，且在异步的回调的末尾调用，用于标识异步完成
  grunt.registerTask("async-task", function () {
    const done = this.async();
    setTimeout(() => {
      console.log("async task");
      done();
    }, 1000);
  });
  grunt.registerTask("bad-task", () => {
    console.log("run badTask");
    return false;
  });
  grunt.registerTask("async-bad", function () {
    const done = this.async();
    setTimeout(() => {
      console.log("async bad task");
      done(false);
    }, 1000);
  });

  grunt.initConfig({
    aa: {
      bb: {
        cc: 99,
      },
    },
    multiTask: {
      options: {
        ff: "uuu",
      },
      css: "1",
      js: {
        options: {
          ff: "JS-uuu",
        },
      },
    },
  });
  grunt.registerTask("use-config", () => {
    const aa = grunt.config("aa");
    const cc1 = aa.bb.cc;
    const cc2 = grunt.config("aa.bb.cc");
    console.log("cc1", cc1, "cc2", cc2);
  });

  //多目标任务，
  //1. 使用registerMultiTask注册
  //2. 在initConfig中配置与任务同名属性的对象，在对象内，除options的每个属性为一个target，每个target对应的数据，也可以是一个对象，其中的options会覆盖公共options相同的字段
  //3. yarn grunt multiTask：会将initConfig中定义的target依次执行一遍（有多少个属性，执行多少次（options字段除外））
  //4. yarn grunt multiTask:css：执行单个目标任务
  //5. options属性的对象会被当做任务的配置选项，在每个target中都可以获取到，通过this.options()获取
  grunt.registerMultiTask("multiTask", function () {
    const target = this.target;
    const data = this.data;
    const options = this.options();
    console.log(`target:${target},data:${data},options.aa:${options.ff}`);
  });
};
