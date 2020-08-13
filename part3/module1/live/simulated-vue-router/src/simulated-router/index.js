import install from "./install";
import createMatcher from "./create-matcher";
import HashHistory from "./history/hash";
import Html5History from "./history/html5";

export default class SimulatedRouter {
    constructor(options) {
        this._routes = options.routes || [];
        //匹配器, {match,addRoutes}
        this.matcher = createMatcher(this._routes);

        const mode = options.mode || "hash";
        switch (mode) {
            case "hash":
                this.history = new HashHistory(this);
                break;
            case "history":
                this.history = new Html5History(this);
                break;
            default:
                throw new Error("mode error")
        }
    }
    init(app) {
        const history = this.history;
        const setUpListener = () => history.setUpListener();
        history.transitionTo(history.getCurrentLocation(), setUpListener);
        history.listen(route => app._route = route)
    }
}
SimulatedRouter.install = install;