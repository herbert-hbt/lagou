const modules = [
  (module, exports, req) => {
    exports.xxx = xxx;
    xxx = () => {};
  },
  () => {},
];

(function (modules) {
  const installM = {};
  const req = (id) => {
    if (installM[id]) {
      return installM[id];
    }
    const module = {
      exports: {},
    };
    modules[id](module.exports, module, module.exports, req);
  };
  return req(0);
})(modules);
