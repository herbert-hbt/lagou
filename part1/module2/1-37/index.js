const fp = require("lodash/fp");
const path = require("path");
const fs = require("fs");

class IO {
  static of(value) {
    return new IO(() => value);
  }
  constructor(vFn) {
    this._value = vFn;
  }
  map(fn) {
    return new IO(fp.flowRight(fn, this._value));
  }
}

// const readFile = () => {
//   return IO.of(path.resolve(__dirname, "./package.json")).map((url) => {
//     return fs.readFileSync(url, "utf-8");
//   });
// };

// const print = (value) => {
//   return IO.of(value);
// };
// const cat = fp.flowRight(print, readFile);
// console.log(cat()._value()._value());

const readFile = (url) => {
  return IO.of(fs.readFileSync(url, "utf-8"));
};

const print = (value) => {
  return IO.of(value);
};

const cat = fp.flowRight(print, readFile);
const filePath = path.resolve(__dirname, "./package.json");
console.log(cat(filePath)._value()._value());
