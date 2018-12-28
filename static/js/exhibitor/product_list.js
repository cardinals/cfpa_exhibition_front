var pageShzt = '';

new Vue({
    el: "#app",
    data: function () {
        return {
            loading: false,
            showPicVisible: false,
            previewImg: '',
            qyid: "",//企业id
            userid: "",
            //产品介绍
            cpjsData: [],
        }
    },
    created: function () {
        this.shiroData = shiroGlobal;
        this.loading = true;
        this.userid = getQueryString("userid");
        this.getJbxxData(this.userid);
    },
    methods: {
        //根据userid查询qyid
        getJbxxData: function (val) {
            this.loading = true;
            var params = {
                userid: this.userid,
                deleteFlag: 'N'
            }
            axios.post('/xfxhapi/qyjbxx/doFindByUserid', params).then(function (res) {
                if (res.data.result != null) {
                    this.qyid = res.data.result.qyid;
                    this.getCpjsData(this.qyid);
                }
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //产品介绍
        getCpjsData: function (val) {
            var param = {
                qyid: val
            }
            axios.post('/xfxhapi/qycpjs/list', param).then(function (res) {
                if (res.data.result != null) {
                    this.cpjsData = res.data.result;
                    for (var i in this.cpjsData) {
                        this.cpjsData[i].imageUrl = baseUrl + "/upload/" + this.cpjsData[i].src
                    }
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //图片预览
        imgPreview: function (val) {
            this.previewImg = val;
            this.showPicVisible = true;
        },
        
    }
})
