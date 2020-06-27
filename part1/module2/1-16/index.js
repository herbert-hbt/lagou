//初版
// const curry = (fn) => {
//   const pNum = fn.length;
//   let pArr = [];
//   const cirFn = (...arg) => {
//     pArr = [...pArr, ...arg];
//     if (pNum === pArr.length || pNum < pArr.length) {
//       const value = fn(...pArr);
//       pArr = [];
//       return value;
//     } else {
//       return cirFn;
//     }
//   };
//   return cirFn;
// };

// const curry = (fn) =>
//   function cirFn(...arg) {
//     return arg.length < fn.length
//       ? (...arg2) => cirFn(...arg, ...arg2)
//       : fn(...arg);
//   };
// console.log(cirFn)

const curry = (fn) =>
  (cirFn = (...arg) =>
    arg.length < fn.length ? (...arg2) => cirFn(...arg, ...arg2) : fn(...arg));
const sum = (a, b, c) => {
  return a + b + c;
};
curriedSum = curry(sum);

console.log(cirFn);
console.log(curriedSum(1)(2)(3));
console.log(curriedSum(1, 2)(3));
// console.log(curriedSum(1, 2, 5, 6)(33));
console.log(curriedSum(1, 2)(5, 6));

const a = () => (const a = 5);
a()