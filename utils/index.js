// const baseUrl = 'https://test.ixgoo.cn'
// const wssUrl = 'wss://test.ixgoo.cn'
const baseUrl = 'http://192.168.5.100:9000'
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}
const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}
const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}
const request = function({
    url,
    data = {},
    header = { 'token': wx.getStorageSync('token') || "" },
    method = "post",
    dataType = "json",
    responseType = "text"
}) {
    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: '加载中'
        })
        var headers = "header";
        var options = {
            url: baseUrl + url,
            data,
            method,
            dataType,
            responseType,
            success: (res) => {
                wx.hideLoading();
                if (res.data.code == 200) {
                    resolve(res.data)
                } else {
                    wx.showToast({
                        title: res.data.msg,
                        complete: () => {
                            resolve(res.data)
                        }
                    });
                }
            },
            fail: (err) => {
                wx.hideLoading();
                wx.showToast({
                    title: '网络错误!',
                    complete: () => {
                        reject(err)
                    }
                })
            },
            complete: () => {
                // hideLoading();
            }
        }
        header.token = wx.getStorageSync('token') || "";
        options[headers] = header;
        wx.request(options)
    })
}


module.exports = {
    formatTime,
    getSetting,
    getUserInfo,
    login,
    request
}