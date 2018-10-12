new Vue({
    el: "#app",
    data: function () {
        return {
            activeName: "first",
            loading: false,
            qyid: "",//企业id

            jbxxData: {
                zwgsmc:'',
                tyshxydm:'',
                yyzzBase64:'',
                yjdz:'',
                frdb:'',
                frdbdh:'',
                lxr:'',
                lxrsj:'',
                cz:'',
                bgdh:'',
                dzyx:'',
                wz:'',
                sjztmc:'',
                shztmc:'',
                cjrmc:'',
                cjsj:'',
                xgrmc:'',
                xgsj:'',
                shrmc:'',
                shsj:''
            },//企业基本信息
            kpxxData: {},//企业开票信息
            wjdcData: {},//企业问卷调查
            qyjsData: {
                logoBase64:'',
                qyjj:''
            },//企业介绍
            cpjsData: [],//产品介绍
            zwyxData: {},//展位需求意向
        }
    },
    created: function () {
        var type = getQueryString("type");
        // if (type == "GJSS") {
        //     loadBreadcrumb("高级搜索", "预案详情");
        // } else if (type == "YASH") {
        //     loadBreadcrumb("预案审核", "预案详情");
        // } else if (type == "YAFF") {
        //     loadBreadcrumb("预案分发", "预案详情");
        // } else if (type == "ZDDW") {
        //     loadBreadcrumb("重点单位详情", "预案详情");
        // } else {
        //     loadBreadcrumb("重点单位预案", "重点单位预案详情");
        // }

        this.loading = true;
        this.qyid = getQueryString("id");
        this.getJbxxData(this.qyid);
        this.getKpxxData(this.qyid);
        this.getWjdcData(this.qyid);
        this.getQyjsData(this.qyid);
        this.getCpjsData(this.qyid);
        this.getZwyxData(this.qyid);
    },

    methods: {
        //企业基本信息
        getJbxxData: function (val) {
            this.loading = true;
            axios.get('/zhapi/qyjbxx/doFindJbxxById/' + val).then(function (res) {
                // this.jbxxData = res.data.result;
                if (res.data.result != null) {
                    this.jbxxData = res.data.result;
                    //创建时间格式化
                    if (this.jbxxData.cjsj == null || this.jbxxData.cjsj == "") {
                        this.jbxxData.cjsj = '';
                    } else {
                        this.jbxxData.cjsj = dateFormat(this.jbxxData.cjsj);
                    }
                    //修改时间格式化
                    if (this.jbxxData.xgsj == null || this.jbxxData.xgsj == "") {
                        this.jbxxData.xgsj = '';
                    } else {
                        this.jbxxData.xgsj = dateFormat(this.jbxxData.xgsj);
                    }
                    //审核时间格式化
                    if (this.jbxxData.shsj == null || this.jbxxData.shsj == "") {
                        this.jbxxData.shsj = '';
                    } else {
                        this.jbxxData.shsj = dateFormat(this.jbxxData.shsj);
                    }
                }
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //企业开票信息
        getKpxxData: function (val) {
            axios.get('/zhapi/qykpxx/' + val).then(function (res) {
                this.kpxxData = res.data.result;
                if (this.kpxxData != null) {
                    //创建时间格式化
                    if (this.kpxxData.cjsj == null || this.kpxxData.cjsj == "") {
                        this.kpxxData.cjsj = '';
                    } else {
                        this.kpxxData.cjsj = dateFormat(this.kpxxData.cjsj);
                    }
                    //修改时间格式化
                    if (this.kpxxData.xgsj == null || this.kpxxData.xgsj == "") {
                        this.kpxxData.xgsj = '';
                    } else {
                        this.kpxxData.xgsj = dateFormat(this.kpxxData.xgsj);
                    }
                } else {
                    this.kpxxData = {};
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //企业问卷调查
        getWjdcData: function (val) {
            axios.get('/zhapi/qywjdc/' + val).then(function (res) {
                this.wjdcData = res.data.result;
                if (this.wjdcData == null) {
                    this.wjdcData = {};
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //企业介绍
        getQyjsData: function (val) {
            axios.get('/zhapi/qyjs/doFindQyjsById/' + val).then(function (res) {
                if (res.data.result != null) {
                    this.qyjsData = res.data.result;
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //产品介绍
        getCpjsData: function (val) {
            var param = {
                qyid: val
            }
            axios.post('/zhapi/qycpjs/doFindCpxxById', param).then(function (res) {
                this.cpjsData = res.data.result;
                if (this.cpjsData == null) {
                    this.cpjsData = [];
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //展位需求意向
        getZwyxData: function (val) {
            axios.get('/zhapi/qyzwyx/' + val).then(function (res) {
                this.zwyxData = res.data.result;
                if (this.zwyxData == null) {
                    this.zwyxData = {};
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        }
    }
})
