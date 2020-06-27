const fs = require("fs");
const path = require("path");
const { task } = require("folktale/concurrency/task");
const { split, find } = require("lodash/fp");

const readFile = (fileName) => {
  return task((reslover) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) {
        reslover.reject(err);
      }
      reslover.resolve(data);
    });
  });
};

readFile(path.resolve(__dirname, "package.json"))
  .map(split("\n"))
  .map(find((x) => x.includes("version")))
  .run()
  .listen({
    onRejected: (err) => console.log(err),
    onResolved: (value) => console.log(value),
  });
