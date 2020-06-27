const fp = require("lodash/fp");
const path = require("path");
const fs = require("fs");

//Monad IO函子
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
  join() {
    return this._value();
  }
  flatMap(fn) {
    return this.map(fn).join();
  }
}
const readFile = (url) => {
  return IO.of(fs.readFileSync(url, "utf-8"));
};
const print = (value) => {
  return IO.of(value);
};
const filePath = path.resolve(__dirname, "./package.json");
const r = readFile(filePath)
  .map((x = fp.toUpper))
  .flatMap(print)
  // .join();
console.log(r);
