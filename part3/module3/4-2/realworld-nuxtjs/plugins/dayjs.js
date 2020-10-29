import Vue from "vue";
import dayjs from "dayjs";

Vue.filter("dateFormate", (value, format = "YYYY-MM-DD HH:mm:ss") => {
    return dayjs(value).format(format)
})