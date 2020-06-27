//node不熟，参照 古晓辉 同学答案补写的
var num = 20;

const obj = {
  num: 10,
  func: (num) => {
    this.num += 5;
    console.log(this.num); //web:25：箭头函数，this指向定义时的this，此处为全局环境，20+5=25
    //node：NaN，箭头函数，this指向定义时的this，此处为全局环境，undefined+5=NaN
    num += 5;
    console.log(num); //web:45：参数num，40+5=45
    var num = 30; //node:45：参数num，40+5=45

    return function () {
      this.num += 4;
      console.log(this.num); //web：29：普通函数调用，默认绑定到全局，20+5+4=29
      //node：NaN：普通函数调用，默认绑定到全局，undefined+4=NaN
      num += 10;
      console.log(num); //web：40：形成闭包，30+10=40；
      //node：40：形成闭包，30+10=40；
    };
  },
};
obj.func(40)();
