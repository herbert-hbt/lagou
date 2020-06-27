//递归策略
// const compose = (...fns) => {
//   const cirFn = (arg) => {
//     const v = fns.pop()(arg);
//     return fns.length ? cirFn(v) : v;
//   };
//   return cirFn;
// };

//reduce策略
const compose = (...fns) => (arg) =>
  fns.reverse().reduce((prev, next) => next(prev), arg);

const fn1 = (p) => {
  console.log("fn1", p);
  return 1 * p;
};
const fn2 = (p) => {
  console.log("fn2", p);
  return 2 * p;
};
const fn3 = (p) => {
  console.log("fn3", p);
  return 3 * p;
};

const a = compose(fn3, fn2, fn1);
console.log(a(5));
