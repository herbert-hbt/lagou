const CookieParser = process.server ? require("cookieparser") : undefined;

//必须以函数形式定义state，服务端为多实例
export const state = () => {
    return {
        user: null
    }
}
export const mutations = {
    SetUser(state, data) {
        state.user = data;
    }
}

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        let user = null;
        if (req.headers.cookie) {
            const parsed = CookieParser.parse(req.headers.cookie);
            try {
                user = JSON.parse(parsed.user);
            } catch (e) {
                console.error("转cookie出错了", e)
            }
        }

        commit("SetUser", user)
    }
}