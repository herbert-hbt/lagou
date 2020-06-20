const { src, dest, parallel, series, watch } = require("gulp");
const plugins = require("gulp-load-plugins")();

const del = require("del");

/**
 *
 *
 *
 * 样式模块
 *
 *
 *
 **/
const style = () => {
  //  base: "src" 指定打包之后目录结构也会有
  return src("src/assets/styles/*.scss", { base: "src" })
    .pipe(plugins.sass({ outputStyle: "expanded" })) //默认不会处理下划线开头的文件
    .pipe(dest("dist"));
};

/**
 *
 *
 *
 * 脚本模块
 *
 *
 *
 **/
const script = () => {
  return src("src/assets/scripts/*.js", { base: "src" })
    .pipe(plugins.babel({ presets: ["@babel/preset-env"] })) //若果babel()中不穿presets，就会几乎不会有转换，bebal只是一个平台，需要各种插件来实现功能
    .pipe(dest("dist")); //presets是指一些插件的集合
};

/**
 *
 *
 *
 * 模板模块
 *
 *
 *
 **/
const data = {
  //此数据用于模板引擎渲染模板
  menus: [
    {
      name: "Home",
      icon: "aperture",
      link: "index.html",
    },
    {
      name: "Features",
      link: "features.html",
    },
    {
      name: "About",
      link: "about.html",
    },
    {
      name: "Contact",
      link: "#",
      children: [
        {
          name: "Twitter",
          link: "https://twitter.com/w_zce",
        },
        {
          name: "About",
          link: "https://weibo.com/zceme",
        },
        {
          name: "divider",
        },
        {
          name: "About",
          link: "https://github.com/zce",
        },
      ],
    },
  ],
  pkg: require("./package.json"),
  date: new Date(),
};
const page = () => {
  console.log("here 执行了，，，，");
  return src("src/*.html", { base: "src" }) //可以使用"src/**/*.html",来通配所有的HTML文件
    .pipe(plugins.swig({ data, defaults: { cache: false } })) //此处需要设置cache，否则不会及时更新
    .pipe(dest("dist"));
};

/**
 *
 *
 *
 * 图片模块
 *
 *
 *
 **/
const image = () => {
  return src("src/assets/images/**", { base: "src" })
    .pipe(plugins.imagemin())
    .pipe(dest("dist"));
};

/**
 *
 *
 *
 * 文字模块
 *
 *
 *
 **/
const font = () => {
  return src("src/assets/fonts/**", { base: "src" })
    .pipe(plugins.imagemin()) //imagemin也可用于字体文件的压缩
    .pipe(dest("dist"));
};

const complile = parallel(style, script, page, image, font);
/**
 *
 *
 *
 * 其他文件
 *
 *
 *
 **/
const extra = () => {
  return src("public/**", { base: "public" }).pipe(dest("dist"));
};

/**
 *
 *
 *
 * dist删除
 *
 *
 *
 **/
const clean = () => {
  return del(["dist"]); //返回一个promise
};

/**
 *
 *
 *
 * 开发服务器
 *
 *
 *
 **/
const browserSync = require("browser-sync");
const bs = browserSync.create();
const serve = () => {
  //此处是监测文件变化之后，重新执行编译任务，编译过后导致dist文件发生变化，引发浏览器重载
  watch("src/assets/styles/*.scss", style);
  watch("src/assets/scripts/*.js", script);
  watch("src/*.html", page);
  // watch('src/assets/images/**',image);//对于图片、字体和公共文件，编译的效果只是文件压缩，在开发阶段，不必要一定做，
  // watch('src/assets/fonts/**',font);//但是要做两件事1.变化了浏览器重新刷新(reload发方法)，2.浏览器依赖的应该是源代码中的文件，设置server的baseDir
  // watch('public/**',extra);
  watch(
    ["src/assets/images/**", "src/assets/fonts/**", "public/**"],
    bs.reload
  ); //此处则是是监测文件变化之后，重新刷新浏览器
  bs.init({
    notify: false, //是否通知
    port: 4900, //设置端口
    open: false, //是否自动打开浏览器
    files: "dist/**", //指定监听的文件，只是dist下文件修改后，重新加载，也可以在编译的过程中，使用提供的reload api
    server: {
      baseDir: ["dist", "src", "public"], //会依次查找数组中对应文件夹的资源
      routes: {
        //遇到路径/node_modules，先去加载node_modules，一旦有请求，优于dist响应
        "/node_modules": "node_modules",
      },
    },
  });
};

/**
 *
 *
 *
 * 引用相关
 *
 *
 *
 **/

const useref = () => {
  return src("dist/*.html", { base: "dist" })
    .pipe(plugins.useref({ searchPath: ["dist", "."] }))
    .pipe(dest("dist"));
};

const build = series(clean, parallel(complile, extra));

const dev = series(style, script, page, serve);

module.exports = {
  complile,
  build,
  serve,
  dev,
  page,
};
