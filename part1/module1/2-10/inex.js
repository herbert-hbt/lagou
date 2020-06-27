const pS = new Promise((res, rej) => {
  res("success");
});

const pF = new Promise((res, rej) => {
  rej("error");
});

//测试catch结果
pF.then((p) => {
  console.log("成功了", p);
})
  .catch((p) => {
    console.log("失败了", p);
    return p
  })
  .then((p) => {
    console.log("失败被捕获后then执行了", p);
  })
  .catch((p) => {
    console.log("失败被捕获后catch执行了", p);
  });

// pS.then(() => {
//     console.log('1');
//     return pS;
// }).then(() => {
//     console.log('2');
//     return pF;
// }).catch()
