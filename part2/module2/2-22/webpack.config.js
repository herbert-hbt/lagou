const RemoveAnnotation = require("./plugins/remove-annotation.js");

module.exports = {
  mode: "none",
  devtool:"source-map",
  plugins: [new RemoveAnnotation()],
};
