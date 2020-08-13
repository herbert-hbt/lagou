import View from "./components/view";
import Link from "./components/link";


let _Vue = null;
export default function install(Vue) {
    _Vue = Vue;
    _Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                this._routerRoot = this;
                this._router = this.$options.router;
                this._router.init(this);
                Vue.util.defineReactive(this, '_route', this._router.history.current)
            } else {
                this._routerRoot = this.$parent && this.$parent._routerRoot
            }
        }
    });
    Object.defineProperty(Vue.prototype, "$router", {
        get() {
            return this._routerRoot._router
        }
    });
    Object.defineProperty(Vue.prototype, "$route", {
        get() {
            return this._routerRoot._route
        }
    });
    _Vue.component("RouterView", View);
    _Vue.component("RouterLink", Link);

}