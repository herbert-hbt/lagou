import createRouterMap from "./create-route-map";
import creatreRoute from "./util/create-router";

export default function createMatcher(routes) {
    const { pathList, pathMap } = createRouterMap(routes);

    function match(path) {
        const record = pathMap[path];
        if (record) {
            return creatreRoute(record, path)
        }
        return creatreRoute(null, path)
    }

    function addRoutes(routes) {
        createRouterMap(routes, pathList, pathMap)
    }

    return {
        match,
        addRoutes
    }
}