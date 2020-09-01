const proxyObj = (obj) => new Proxy(obj, {
    get: (target, key) => key in target ? target[key] : new Error(`Property ${key} does not exist`)
})


const man = {
    name: 'jscoder',
    age: 22
}
const proxyMan = proxyObj(man);
console.log(proxyMan.name) // "jscoder"
console.log(proxyMan.age) // 22
console.log(proxyMan.location) // "jscoder"
