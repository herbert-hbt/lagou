const { src, dest } = require("gulp");
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");

exports.default = () => {
  return src("src/*.css") //src用于创建读取流
    .pipe(cleanCss()) //压缩css
    .pipe(rename({ extname: ".min.css" })) //修改扩展名
    .pipe(dest("dist")); //dest用于创建写入流
};
