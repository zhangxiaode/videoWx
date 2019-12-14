import { request } from "../../utils/index";
Page({
    data: {
        displayMultipleItems: 4,
        nav: [],
        categoryId: 2,
        pageIndex: 1,
        pageSize: 3,
        videos: [],
        search: ""
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
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        })
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
                categoryId: this.data.categoryId,
                name: this.data.search,
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
    goDetail(event) {
        var item = event.currentTarget.dataset.item;
        wx.navigateTo({
            url: `/pages/detail/index?url=http://192.168.5.100${item.uri}&name=${item.name}`
        })
    },
    setCopy(event) {
        var copyStr = event.currentTarget.dataset.name
        var self = this
        wx.setClipboardData({
            data: copyStr,
            success(res) {
                wx.showToast({
                    title: "'" + copyStr + "' 复制成功",
                    icon: 'none'
                })
                self.setData({
                    search: copyStr
                })
            }
        })
    },
    handleInput(event) {
        this.setData({
            search: event.detail.value
        })
    },
    handleSearch(event) {
        request({
            url: `/apis/video`,
            method: "get",
            data: {
                pageIndex: this.data.pageIndex,
                pageSize: this.data.pageSize,
                name: this.data.search,
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
            }
        })
    }
})