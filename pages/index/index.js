import { request } from "../../utils/index";
Page({
    data: {
        displayMultipleItems: 4,
        nav: [],
        categoryId: 1,
        pageIndex: 1,
        pageSize: 10,
        videos: []
    },
    onShow() {
        this.getCategory();
    },
    onPullDownRefresh() {
        // 下拉刷新操作
        this.setData({
            pageIndex: 1
        })
        this.getVideo();
    },
    onReachBottom() {
        // 上拉加载操作
        this.setData({
            pageIndex: this.data.pageIndex + 1
        })
        this.getVideo();
    },
    changeNav(e) {
        this.setData({
            pageIndex: 1,
            categoryId: e.currentTarget.dataset.id
        })
        this.getVideo();
    },
    getCategory() {
        request({
            url: `/apis/category`,
            method: "get",
            data: {}
        }).then(res => {
            if (res.code == 200) {
                this.setData({
                    nav: res.data
                })
                this.getVideo();
            }
        })
    },
    getVideo() {
        request({
            url: `/apis/video`,
            method: "get",
            data: {
                pageIndex: this.data.pageIndex,
                pageSize: this.data.pageSize,
                categoryId: this.data.categoryId
            }
        }).then(res => {
            if (res.code == 200) {
                var videos = this.data.videos;
                if (this.data.pageIndex == 1) {
                    videos = [];
                }
                this.setData({
                    videos: [...videos, ...res.data]
                })
                wx.stopPullDownRefresh();
            }
        })
    },
    playVideo(event) {
        console.log(event)
    },
    goVideoDetail() {}
})