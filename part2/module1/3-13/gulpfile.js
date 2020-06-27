const fs = require("fs");
const { Transform } = require("stream");
exports.default = () => {
  //创建文件读取流
  const read = fs.createReadStream("normalize.css");

  //创建文件输出流
  const write = fs.WriteStream("normalize.min.css");

  //创建文件转换流
  const transform = new Transform({
    transform: (chunk, encoding, callback) => {
      //核心转换过程
      //chunk:读取流中读取到的内容，格式为buffer
      const input = chunk.toString();
      const output = input.replace(/\s+/g, "").replace(/\/\*.+?\*\//g, "");
      callback(null, output); //第一个参数为错误参数，没有时，返回null
    },
  });

  read.pipe(transform).pipe(write);
  return read;
};
