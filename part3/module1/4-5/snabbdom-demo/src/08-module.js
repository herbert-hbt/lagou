import { init, h } from 'snabbdom';
import style from 'snabbdom/modules/style';
import eventlistener from 'snabbdom/modules/eventlisteners';

const patch = init([style, eventlistener]);
const clickHandler = () => {
    console.log("谁点击了我");
}
let vNode = h("div#container.cls", {
    style: {
        backgoundColor: "red"
    },
    on: {
        click: clickHandler
    }
}, [
    h("h1", "sdjbhfvjsdh"),
    h("p", "as,dfjbhkasdjb")
])
const app = document.querySelector("#app");
let oldNode = patch(app, vNode);
