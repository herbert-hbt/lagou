export default {
    render(h) {
        const route = this.$route;
        let depth = 0;
        this.routerView = true;
        let parent = this.$parent;
        while (parent) {
            if (parent.routerView) {
                depth++
            }
            parent = parent.$parent;
        }
        const record = route.matched[depth];
        if (!record) {
            return h();
        }
        return h(record.component)
    }
}