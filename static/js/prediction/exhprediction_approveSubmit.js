//axios默认设置cookie
axios.defaults.withCredentials = true;
var vue = new Vue({
    el: '#app',
    data: function () {
        return {
            qyid: '',
            //审批表单
            approveForm: {
                shzt: -1,
                reserve1: ""
            },
            initData: {},
            shiroData: [],//当前用户信息
            isReject: false,//未通过flag
            previewTitle: '',
            previewImg: '',
            imgViewVisible: false,
            // approveFormVisible: false,
            //显示加载中样
            loading: false
        }
    },
    created: function () {
        this.loading = true;
        /**面包屑 by li.xue 20180628*/
        loadBreadcrumb("展会报名审核", "审核");
        this.shiroData = shiroGlobal;
        this.qyid = getQueryString("id");
        this.searchClick();
    },

    methods: {
        //营业执照预览
        imgPreview: function (val) {
            // this.previewTitle = this.initData.zwgsmc;
            // this.previewImg = this.initData.yyzzBase64;
            this.imgViewVisible = true;
        },
        //审核操作列点击
        searchClick: function (val) {
            axios.get('/xfxhapi/qyjbxx/doFindJbxxById/' + this.qyid).then(function (res) {
                this.approveForm = res.data.result;
                this.initData = {
                    shzt: this.approveForm.shzt,
                    sjzt: this.approveForm.sjzt,
                    reserve1: this.approveForm.reserve1
                };
                //统一社会信用代码格式化
                if (this.approveForm != "" && this.approveForm != null) {
                    this.approveForm.tyshxydm = longNumFormat(this.approveForm.tyshxydm);
                }
                //如果是未通过审核意见显示*代表必填
                if (this.approveForm.shzt == '02') {
                    this.isReject = true;
                }
                if (this.approveForm.usertype == 'CHN') {
                    this.previewTitle = this.approveForm.zwgsmc;
                } else if (this.approveForm.usertype == 'ENG') {
                    this.previewTitle = this.approveForm.ywgsmc;
                }
                this.previewImg = this.approveForm.yyzzBase64;
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //审核提交事件
        approveSubmit: function (val) {
            if (val.shzt == '01') {
                this.$message({
                    message: "请选择审核状态",
                    type: "error",
                    showClose: true
                });
            } else if (this.isReject == true && (val.reserve1 == null || val.reserve1 == '')) {
                this.$message({
                    message: "请填写审核意见",
                    type: "error",
                    showClose: true
                });
            } else {
                //审核状态改变才调用后台approveByVO方法
                if (val.shzt == this.initData.shzt && val.reserve1 == this.initData.reserve1) {
                    this.$message({
                        message: "审核状态及审核意见未改变",
                        type: "error",
                        showClose: true
                    });
                } else {
                    if (val.shzt == '02') {//未通过
                        val.sjzt = '04';
                    } else if (val.shzt == '03') {//已通过
                        val.sjzt = '05';
                    }
                    var params = {
                        qyid: val.qyid,
                        shzt: val.shzt,
                        sjzt: val.sjzt,
                        reserve1: val.reserve1,//审核意见
                        shrid: this.shiroData.userid,
                        shrmc: this.shiroData.realName,
                        shsj: '1'
                    };
                    axios.post('/xfxhapi/qyjbxx/updateByVO', params).then(function (res) {
                        if (res.data.result == 1) {
                            this.$message({
                                message: '已审核',
                                type: 'success',
                                showClose: true
                            });
                            loadDivParam("prediction/exhprediction_approve");
                            // this.tableData[this.selectIndex].shzt = val.shzt;
                            // if (this.tableData[this.selectIndex].shzt == '01') {
                            //     this.tableData[this.selectIndex].shztmc = '待审核';
                            // } else if (this.tableData[this.selectIndex].shzt == '02') {
                            //     this.tableData[this.selectIndex].shztmc = '未通过';
                            // } else if (this.tableData[this.selectIndex].shzt == '03') {
                            //     this.tableData[this.selectIndex].shztmc = '已通过';
                            // }
                        }
                    }.bind(this), function (error) {
                        console.log(error)
                    })
                    // this.approveFormVisible = false;
                }
            }
        },
        //审核状态为未通过时审核意见显示*代表必填
        radioChange: function () {
            if (this.approveForm.shzt == '02')
                this.isReject = true;
            else
                this.isReject = false;
        },
        closeDialog: function (val) {
            loadDivParam("prediction/exhprediction_approve");
        },
        toCompanyWebSite: function (val) {
            window.open("https://" + val);
        }
    },

})