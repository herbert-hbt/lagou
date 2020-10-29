import { request } from "@/plugins/request.js";


export const getTags = () => {
    return request({
        method: "GET",
        url: "/api/tags"
    })
}