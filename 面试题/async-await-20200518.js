/****************************     原题    ********************************************/
//M为宏任务，m为微任务，s为同步代码
async function async1() {
  console.log("AAAA"); //s2.1
  async2(); //s2.2
  console.log("BBBB"); //s2.3
}
async function async2() {
  console.log("CCCC"); //s2.2.1
}
console.log("DDDD"); //s1
setTimeout(function () {
  console.log("FFFF"); //M1
}, 0);
async1(); //s2
new Promise(function (resolve) {
  console.log("GGGG"); //s3
  resolve();
}).then(function () {
  console.log("HHHH"); //m1
});
console.log("IIII"); //s4
//s1:               "DDDD"
//s2:
//  s2.1:           "AAAA"
//  s2.2:
//      s2.2.1:     "CCCC"
//  s2.3:           "BBBB"
//s3:               "GGGG"
//s4:               "IIII"
//m1:               "HHHH"
//s4:               "GGGG"
/****************************      扩展      ********************************************/
//M为宏任务，m为微任务，s为同步代码
async function async1() {
  console.log("async1 start"); //s2.1：同步执行
  await async2(); //s2.2：函数执行，为同步，跳入函数内
  console.log("async1 end"); //m1.s1：前有await，此代码隶属于await内异步结果之后的同步代码
  //await后的代码可以理解为整体包装为一个回调，会在异步结束之后立即执行
}
async function async2() {
  new Promise(function (resolve) {
    console.log("promise1"); //s2.2.1
    resolve();
  }).then(function () {
    console.log("promise2"); //m1：产生第一个微任务
  });
}
console.log("script start"); //s1：同步代码
setTimeout(function () {
  console.log("settimeout"); //M1：产生第一个宏任务
}, 0);
async1(); //s2：函数执行，为同步，跳入函数内
new Promise(function (resolve) {
  console.log("promise3"); //s3：同步执行
  resolve();
}).then(function () {
  console.log("promise4"); //m2：产生第二个微任务
});
console.log("script end"); //s4：同步执行
//  s1:                  "script start"
//  s2:
//      s2.1:            "async1 start"
//      s2.2:
//          s2.2.1:      "promise1"
//  s3:                  "promise3"
//  s4:                  "script end"
//  m1:                  "promise2"
//      m1.s1:           "async1 end"
//  m2:                  "promise4"
//  M1:                  "settimeout"
