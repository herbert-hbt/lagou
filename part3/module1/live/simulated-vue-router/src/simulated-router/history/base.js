import createRouter from "../util/create-router";

export default class History {
    constructor(router) {
        this.router = router;
        this.current = createRouter(null, "/");
        this.cb = null;
    }
    listen(cb) {
        this.cb = cb;
    }
    transitionTo(path, onComplete) {
        this.current = this.router.matcher.match(path);
        this.cb && this.cb(this.current)
        onComplete && onComplete()
    }
}