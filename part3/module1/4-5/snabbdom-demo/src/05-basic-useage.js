import { init, h } from 'snabbdom'

const patch = init([]);//init返回一个函数，这个函数用于对比比两个vnode差异，并更新到dom上，参数为模块数组
let vNode = h("div#container.cls", "Hello World")//h用于创建vnode，第一个参数为标签+选择器模式，第二个参数为children，如果是字符串，则为标签内的内容
const app = document.querySelector("#app");
let oldNode = patch(app, vNode);//patch的第一个参数也可以是真实dom，此时会先将真实dom转为虚拟dom
vNode = h("div", "new hello world");
oldNode = patch(oldNode, vNode);
setTimeout(() => {
    vNode = h("div#container.cls", [
        h("h1", "sdjbhfvjsdh"),
        h("p", "as,dfjbhkasdjb")
    ])
    oldNode = patch(oldNode, vNode);
    setTimeout(() => {
        oldNode = patch(oldNode, h("!"));//清空时，不可传入null，而需要用注释节点替换
    }, 2000);
}, 2000);
