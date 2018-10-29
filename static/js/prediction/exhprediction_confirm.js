var pageShzt = '';
window.onbeforeunload = function () {
    if (pageShzt != '01') {
        return "确认展会报名数据已经提交？未提交的报名数据将会丢失！";
    }
}
new Vue({
    el: "#app",
    data: function () {
        return {
            loading: false,
            showPicVisible: false,
            editZwyx: false,
            editPage: true,
            previewImg: '',
            qyid: "",//企业id
            userid: "",

            //企业基本信息
            jbxxData: {
                zwgsmc: '',
                tyshxydm: '',
                yyzzBase64: '',
                yjdz: '',
                frdb: '',
                frdbdh: '',
                lxr: '',
                lxrsj: '',
                cz: '',
                bgdh: '',
                dzyx: '',
                wz: '',
                sjztmc: '',
                shztmc: '',
                cjrmc: '',
                cjsj: '',
                xgrmc: '',
                xgsj: '',
                shrmc: '',
                shsj: ''
            },
            //企业开票信息
            kpxxData: {},
            //企业问卷调查
            wjdcData: {},
            //企业介绍
            qyjsData: {
                logoBase64: '',
                qyjj: ''
            },
            //产品介绍
            cpjsData: [],
            //展位需求意向
            zwyxData: [],
            zwyxForm: []
        }
    },
    created: function () {
        var type = getQueryString("type");
        this.shiroData = shiroGlobal;
        this.loading = true;
        this.userid = getQueryString("userid");
        this.getJbxxData(this.userid);
    },
    methods: {
        //企业基本信息
        getJbxxData: function (val) {
            this.loading = true;
            var params = {
                userid: this.userid,
                deleteFlag: 'N'
            }
            axios.post('/xfxhapi/qyjbxx/doFindByUserid', params).then(function (res) {
                if (res.data.result != null) {
                    this.jbxxData = res.data.result;
                    this.jbxxData.yjdz = this.jbxxData.yjdzshengmc + this.jbxxData.yjdzshimc + this.jbxxData.yjdzxx;
                    if (this.jbxxData.sjzt == '01' || this.jbxxData.sjzt == '04') {
                        this.editPage = false;
                    } else {
                        this.editPage = true;
                    }
                    this.qyid = this.jbxxData.qyid;
                    this.getKpxxData(this.qyid);
                    this.getWjdcData(this.qyid);
                    this.getQyjsData(this.qyid);
                    this.getCpjsData(this.qyid);
                    this.getZwyxData(this.qyid);
                    pageShzt = this.jbxxData.shzt;
                }
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //企业开票信息
        getKpxxData: function (val) {
            axios.get('/xfxhapi/qykpxx/' + val).then(function (res) {
                if (res.data.result != null) {
                    this.kpxxData = res.data.result;
                    //统一社会信用代码格式化
                    this.kpxxData.tyshxydm = longNumFormat(this.kpxxData.tyshxydm);
                    //银行账户格式化
                    this.kpxxData.yhzh = longNumFormat(this.kpxxData.yhzh);
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //企业问卷调查
        getWjdcData: function (val) {
            axios.get('/xfxhapi/qywjdc/' + val).then(function (res) {
                if (res.data.result != null) {
                    this.wjdcData = res.data.result;
                    var tempList = this.wjdcData.reserve1.split(",");
                    var zycp = '';
                    for (var i in tempList) {
                        zycp = zycp + tempList[i].substr(4) + '、';
                    }
                    this.wjdcData.zycp = zycp.substr(0, zycp.length - 1);
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //企业介绍
        getQyjsData: function (val) {
            axios.get('/xfxhapi/qyjs/doFindQyjsById/' + val).then(function (res) {
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
            axios.post('/xfxhapi/qycpjs/doFindCpxxById', param).then(function (res) {
                if (res.data.result != null) {
                    this.cpjsData = res.data.result;
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //展位需求意向
        getZwyxData: function (val) {
            var params = {
                qyid: val,
                deleteFlag: 'N'
            }
            axios.post('/xfxhapi/qyzwyx/list', params).then(function (res) {
                if (res.data.result.length == 0) {
                    this.zwyxData = null;
                } else if (res.data.result.length > 0) {
                    //this.xqyxForm = res.data.result[0];
                    //返回null时不自动带入min值
                    this.zwyxData = res.data.result[0];
                    if (res.data.result[0].bzzwgs != null) {
                        // this.zwyxData.bzzwgs = res.data.result[0].bzzwgs;
                        this.zwyxForm.bzzwgs = res.data.result[0].bzzwgs;
                    }
                    if (res.data.result[0].sngdzw != null) {
                        // this.zwyxData.sngdzw = res.data.result[0].sngdzw;
                        this.zwyxForm.sngdzw = res.data.result[0].sngdzw;
                    }
                    if (res.data.result[0].swgdzw != null) {
                        // this.zwyxData.swgdzw = res.data.result[0].swgdzw;
                        this.zwyxForm.swgdzw = res.data.result[0].swgdzw;
                    }
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        imgPreview: function (val) {
            this.previewImg = val;
            this.showPicVisible = true;
        },
        saveClick: function () {
            if (this.zwyxForm.bzzwgs > 0 || this.zwyxForm.sngdzw > 0 || this.zwyxForm.swgdzw > 0) {
                if (this.zwyxData == null) {//新增
                    var params = {
                        qyid: this.qyid,
                        bzzwgs: this.zwyxForm.bzzwgs,
                        sngdzw: this.zwyxForm.sngdzw,
                        swgdzw: this.zwyxForm.swgdzw,
                        deleteFlag: 'N',
                        cjrid: this.shiroData.userid,
                        cjrmc: this.shiroData.username
                    }
                    axios.post('/xfxhapi/qyzwyx/doInsertByVo', params).then(function (res) {
                        if (res.data.result == 1) {
                            this.$message({
                                message: '成功保存企业参展展位需求意向',
                                type: 'success'
                            });
                            this.getZwyxData(this.qyid);
                            this.editZwyx = false;
                        }
                    }.bind(this), function (error) {
                        console.log(error);
                    })
                } else {//修改
                    var params = {
                        uuid: this.zwyxData.uuid,
                        qyid: this.qyid,
                        bzzwgs: this.zwyxForm.bzzwgs,
                        sngdzw: this.zwyxForm.sngdzw,
                        swgdzw: this.zwyxForm.swgdzw,
                        xgrid: this.shiroData.userid,
                        xgrmc: this.shiroData.username
                    }
                    axios.post('/xfxhapi/qyzwyx/doUpdateByVO', params).then(function (res) {
                        if (res.data.result == 1) {
                            this.$message({
                                message: '成功保存企业参展展位需求意向',
                                type: 'success'
                            });
                            this.getZwyxData(this.qyid);
                            this.editZwyx = false;
                        }
                    }.bind(this), function (error) {
                        console.log(error);
                    })
                }
            } else {
                this.$message({
                    message: '请至少选择一种展位填写需求意向',
                    type: 'warning'
                });
            }
        },
        canclClick: function () {
            var params = {
                userid: this.userid
            }
            loadDivParam("prediction/exhprediction_edit", params);
        },
        submitClick: function () {
            this.$confirm('提交后仅可修改展位意向信息，其他信息不能修改', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var params = {
                    qyid: this.qyid,
                    sjzt: '03',
                    shzt: '01',
                    xgrid: this.shiroData.userid,
                    xgrmc: this.shiroData.username
                }
                axios.post('/xfxhapi/qyjbxx/doUpdateByVO', params).then(function (res) {
                    if (res.data.result == 1) {
                        this.$message({
                            message: '报名信息已提交待审核',
                            type: 'success'
                        });
                        this.editPage = true;
                        this.jbxxData.shzt = '01';
                        pageShzt = '01';
                    }
                }.bind(this), function (error) {
                    console.log(error);
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消提交'
                });
            });
        },
    }
})
