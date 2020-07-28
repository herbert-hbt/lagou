const marked = require("marked");

module.exports = (source) => {
  console.log(source);
  const html = marked(source);
  console.log(html);
  return html;
};
