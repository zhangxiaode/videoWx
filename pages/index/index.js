import { request } from "../../utils/index";
Page({
  data: {
    nav: {
      displayMultipleItems: 5,
      items: [
        {
          id: 1,
          name: "内地"
        },
        {
          id: 2,
          name: "美国"
        },
        {
          id: 3,
          name: "恐怖"
        },
        {
          id: 4,
          name: "惊悚"
        },
        {
          id: 5,
          name: "喜剧"
        },
        {
          id: 6,
          name: "香港"
        }
      ]
    },
    navIndex: 1,
    pageIndex: 1,
    pageSize: 10,
    videos: [
      {
        poster: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=750",
        videoName: "斯洛克新国",
        resource: "/assets/movie.ogv"
      },
      {
        poster: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=750",
        videoName: "斯洛克",
        resource: "/assets/movie.ogv"
      },
      {
        poster: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=750",
        videoName: "斯洛克新国际折叠车斯洛克新国际折叠电动车",
        resource: "/assets/movie.ogv"
      },
      {
        poster: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=750",
        videoName: "斯洛克新国际折叠电",
        resource: "/assets/movie.ogv"
      },
      {
        poster: "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=750",
        videoName: "斯洛克新国际折叠车",
        resource: "/assets/movie.ogv"
      }
    ]
  },
  onShow() { },
  onPullDownRefresh() {
    // 下拉刷新操作
    // this.setData({
    //   pageIndex: 1
    //   videos: []
    // })
    // request({
    //   url: `/apis/video`,
    //   method: "get",
    //   data: {
    //     pageIndex: this.data.pageIndex,
    //     pageSize: this.data.pageSize,
    //     type: this.data.navIndex
    //   }
    // }).then(response => {
    //   if (response.code == 200) {
    //     this.videos = res.data;
    //     wx.stopPullDownRefresh();
    //   }
    // })
  },
  onReachBottom() {
    // 上拉加载操作
    // this.setData({
    //   pageIndex: this.data.pageIndex + 1
    // })
    // request({
    //   url: `/apis/video`,
    //   method: "get",
    //   data: {
    //     pageIndex: this.data.pageIndex,
    //     pageSize: this.data.pageSize,
    //     type: this.data.navIndex
    //   }
    // }).then(response => {
    //   if (response.code == 200) {
    //     this.videos.push(res.data);
    //     wx.stopPullDownRefresh();
    //   }
    // })
  },
  changeNav(e) {
    this.setData({
      navIndex: e.currentTarget.dataset.id
    })
    this.getVideo();
  },
  getVideo() {
    // request({
    //   url: `/apis/video`,
    //   method: "get",
    //   data: {
    //     pageIndex: this.data.pageIndex,
    //     pageSize: this.data.pageSize,
    //     type: this.data.navIndex
    //   }
    // }).then(response => {
    //   if (response.code == 200) {
    //     if(this.data.pageIndex == 1) {
    //       this.setData({
    //         pageIndex: 1,
    //         videos: []
    //       })
    //     }
    //     this.videos.push(res.data);
    //     wx.stopPullDownRefresh();
    //   }
    // })
  },
  goVideoDetail() {
  }
})