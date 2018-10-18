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
            zwyxData: {},
            zwyxForm: {
                bzzwgs: '',
                sngdzw: '',
                swgdzw: ''
            }
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
            axios.post('/zhapi/qyjbxx/doFindByUserid', params).then(function (res) {
                if (res.data.result != null) {
                    this.jbxxData = res.data.result;
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
                }
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //企业开票信息
        getKpxxData: function (val) {
            axios.get('/zhapi/qykpxx/' + val).then(function (res) {
                if (res.data.result != null) {
                    this.kpxxData = res.data.result;
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //企业问卷调查
        getWjdcData: function (val) {
            axios.get('/zhapi/qywjdc/' + val).then(function (res) {
                if (res.data.result != null) {
                    this.wjdcData = res.data.result;
                    var tempList = this.wjdcData.reserve1.split(",");
                    var zycp = '';
                    for(var i in tempList){
                        zycp = zycp + tempList[i].substr(4)+'、';
                    }
                    this.wjdcData.zycp = zycp.substr(0,zycp.length - 1);
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
                if (res.data.result != null) {
                    this.cpjsData = res.data.result;
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //展位需求意向
        getZwyxData: function (val) {
            axios.get('/zhapi/qyzwyx/' + val).then(function (res) {
                this.zwyxData = res.data.result;
                if (res.data.result != null) {
                    this.zwyxForm = res.data.result;
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
                    axios.post('/zhapi/qyzwyx/doInsertByVo', params).then(function (res) {
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
                        uuid: this.zwyxForm.uuid,
                        qyid: this.qyid,
                        bzzwgs: this.zwyxForm.bzzwgs,
                        sngdzw: this.zwyxForm.sngdzw,
                        swgdzw: this.zwyxForm.swgdzw,
                        xgrid: this.shiroData.userid,
                        xgrmc: this.shiroData.username
                    }
                    axios.post('/zhapi/qyzwyx/doUpdateByVO', params).then(function (res) {
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
                axios.post('/zhapi/qyjbxx/doUpdateByVO', params).then(function (res) {
                    if (res.data.result == 1) {
                        this.$message({
                            message: '报名信息已提交待审核',
                            type: 'success'
                        });
                        this.editPage = true;
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
