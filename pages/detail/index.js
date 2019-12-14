import { request } from "../../utils/index";
Page({
    data: {
        name: "",
        url: ""
    },
    onShow() {
        this.setData({
            name: this.options.name,
            url: this.options.url
        })
    },
    onPullDownRefresh() {},
    onReachBottom() {}
})