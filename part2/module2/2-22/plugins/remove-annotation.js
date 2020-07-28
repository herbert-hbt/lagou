module.exports = class {
  apply(compiler) {
    compiler.hooks.emit.tap("remove-annotation", (compilation) => {
      for (const name in compilation.assets) {
        if (name.endsWith(".js")) {
          const contents = compilation.assets[name].source();
          const withoutAnnotation = contents.replace(/\/\*\*+\*\//g, "");
          compilation.assets[name] = {
            source: () => withoutAnnotation,
            size: () => withoutAnnotation.length, //size属性为必须属性
          };
        }
      }
    });
  }
};
