exports.foo = (done) => {
  console.log("foo task working~");
  done(); //用于表示任务完成，必须调用
};

exports.default = (done) => {
  console.log("default task working~");
  done(); //用于表示任务完成，必须调用
};

//gulp4.0之前的语法
// const gulp = require("gulp");
// gulp.task("bar", (done) => {
//   console.log("bar working~");
//   done();
// });

const { series, parallel } = require("gulp");
const task1 = (done) => {
  setTimeout(() => {
    console.log("task1 working~");
    done();
  }, 1000);
};
const task2 = (done) => {
  setTimeout(() => {
    console.log("task2 working~");
    done();
  }, 1000);
};
const task3 = (done) => {
  setTimeout(() => {
    console.log("task3 working~");
    done();
  }, 1000);
};

exports.seriesTask = series(task1, task2, task3);
exports.parallelTask = parallel(task1, task2, task3);
