import axios from "axios";

export const request = axios.create({
    baseURL: 'https://conduit.productionready.io'
});
export default ({ store }) => {
    request.interceptors.request.use((config) => {
        const { user } = store.state;
        if (user && user.token) {
            config.headers.Authorization = `Token ${user.token}`
        }
        return config;
    }, (error) => {
        //请求未发出去就发生了失败，很少见
        return Promise.reject(error)
    })
}