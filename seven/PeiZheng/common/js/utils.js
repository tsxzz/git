class Utils {
    constructor(){
        this.baseUrl = 'http://159.75.169.224:7300/pz'
    }
    getUserInfo() {
        uni.login({
            success: res => {
                console.log(res);
                this.request({
                    url: '/auth/wxLogin',
                    data: {
                        code: res.code
                    },
                    success: res => {
                        console.log('res',res); 
                    }
                })
            }
        })
    }
    request(option = {
        showLoding: false
    }){
        //判断url是否存在
        if(!option.url){
            return false;
        }
        if(option.showLoding){
            this.showLoding()
        }
        uni.request({
            url: this.baseUrl + option.url,
            data: option.data ? option.data : {},
            header: option.header ? option.header: {},
            method: option.method ? option.method: 'GET',
            success: (response) => {
                uni.hideLoading()
                //后端返回数据异常
                if(response.data.code != 10000){
                    if(option.fail && typeof option.fail == 'function'){
                        option.fail(response)
                    }
                }else{
                    //返回数据正常
                    if(option.success && typeof option.success == 'function'){
                        option.success(response.data)
                    }
                }
            },
            fail: (response) => {
                uni.hideLoading()
                console.log(response);
            }
        })
    }
    //创建一个加载的效果
    showLoding() {
        const isShowLoading = uni.getStorage('isShowLoading')
        if(isShowLoading){
            uni.hideLoading()
            uni.setStorageSync('isShowLoading',false)
        }
        uni.showLoding({
            title: '加载中。。。',
            complet: function(){
                uni.setStorageSync('isShowLoading', true)
            },
            fail: function(){
                uni.setStorageSync('isShowLoading', false)
            }
        })
    }
}
export default new Utils()