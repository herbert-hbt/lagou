const sass = require("sass");
const loadGruntTasks = require("load-grunt-tasks");

module.exports = (grunt) => {
  /**
   *
   *
   * clean 插件的使用
   *
   *
   */
  //   grunt.initConfig({
  //     clean: {
  //       //一般去除loadNpmTasks中的grunt-contrib
  //       temp: "temp/app.js", //需要删除的文件路径,支持通配符模式，如temp/*、temp/**
  //     },
  //   });
  //   grunt.loadNpmTasks("grunt-contrib-clean");
  /**
   *
   *
   * sass 插件的使用
   *
   *
   */
  //   grunt.initConfig({
  //     sass: {
  //       options: {
  //         sourceMap: true,
  //         implementation: sass, //需要配次options否则会报The implementation option must be passed to the Sass task
  //       },
  //       main: {
  //         //任务名称设为吗main
  //         files: {
  //           //通过file字段，指定编译后的css文件和被编译的scss文件
  //           "dist/css/main.css": "src/scss/main.scss",
  //         },
  //       },
  //     },
  //   });
  //   grunt.loadNpmTasks("grunt-sass");
  /**
   *
   *
   * babel 插件的使用
   *
   *
   */
  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true,
        implementation: sass, //需要配次options否则会报The implementation option must be passed to the Sass task
      },
      main: {
        //任务名称设为吗main
        files: {
          //通过file字段，指定编译后的css文件和被编译的scss文件
          "dist/css/main.css": "src/scss/main.scss",
        },
      },
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ["@babel/preset-env"],
      },
      main: {
        files: {
          "dist/js/app.js": "src/js/app.js",
        },
      },
    },
    watch: {
      js: {
        files: ["src/js/*.js"],
        tasks: ["babel"],
      },
      css: {
        files: ["src/scss/*.scss"],
        tasks: ["sass"],
      },
    },
  });
  loadGruntTasks(grunt); //会自动加载所有grunt插件中的任务
  grunt.registerTask("default", ["sass", "babel", "watch"]); // 确保第一次时会执行编译工作，yarn grunt执行即可
};
