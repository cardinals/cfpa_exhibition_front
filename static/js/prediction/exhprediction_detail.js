new Vue({
    el: "#app",
    data: function () {
        return {
            activeName: "first",
            loading: false,
            shiroData: [],
            showPicVisible: false,
            isENG: false,
            previewImg: '',
            qyid: "",//企业id

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
            //企业选择的标准展位data
            bzzwData: [],
            //光地展位data
            gdzwData: [],
            approveFormVisible: false,
            //审批表单
            approveForm: {
                shzt: -1,
                reserve1: ""
            },
            isReject: false,//未通过flag
        }
    },
    created: function () {
        var type = getQueryString("type");
        if (type == 'search') {
            loadBreadcrumb("展会报名管理", "展会报名详情");
        } else if (type == 'approve') {
            loadBreadcrumb("展会报名审核", "展会报名详情");
        }
        this.shiroData = shiroGlobal;
        this.loading = true;
        this.qyid = getQueryString("id");
        this.getJbxxData(this.qyid);
        this.getKpxxData(this.qyid);
        this.getWjdcData(this.qyid);
        this.getQyjsData(this.qyid);
        this.getCpjsData(this.qyid);
        this.getZwyxData(this.qyid);
        this.getSelectedBzzw();
        this.getSelectedGdzw();
    },

    methods: {
        //企业基本信息
        getJbxxData: function (val) {
            this.loading = true;
            axios.get('/xfxhapi/qyjbxx/doFindJbxxById/' + val).then(function (res) {
                // this.jbxxData = res.data.result;
                if (res.data.result != null) {
                    this.jbxxData = res.data.result;
                    this.jbxxData.imageUrl = baseUrl + "/upload/" + this.jbxxData.src;
                    if (this.jbxxData.usertype == 'ENG') {
                        this.isENG = true;
                        this.jbxxData.yjdz = this.jbxxData.yjdzxx;
                    } else {
                        this.jbxxData.yjdz = this.jbxxData.yjdzshengmc + this.jbxxData.yjdzshimc + this.jbxxData.yjdzxx;
                    }
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
            axios.get('/xfxhapi/qykpxx/' + val).then(function (res) {
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
                    //统一社会信用代码格式化
                    this.kpxxData.tyshxydm = longNumFormat(this.kpxxData.tyshxydm);
                    //银行账户格式化
                    this.kpxxData.yhzh = longNumFormat(this.kpxxData.yhzh);
                } else {
                    this.kpxxData = {};
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
                    this.qyjsData.imageUrl = baseUrl + "/upload/" + this.qyjsData.src;
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
            axios.post('/xfxhapi/qycpjs/list', param).then(function (res) {
                if (res.data.result != null) {
                    this.cpjsData = res.data.result;
                    for (var i in this.cpjsData) {
                        this.cpjsData[i].imageUrl = baseUrl + "/upload/" + this.cpjsData[i].src;
                    }
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //展位需求意向
        getZwyxData: function (val) {
            axios.get('/xfxhapi/qyzwyx/' + val).then(function (res) {
                if (res.data.result != null) {
                    this.zwyxData = res.data.result;
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        imgPreview: function (val) {
            this.previewImg = val;
            this.showPicVisible = true;
        },

        //获取企业选择的标准展位信息
        getSelectedBzzw: function () {
            var param = {
                qyid: this.qyid,
                zwlb: "标准展位"
            }
            axios.post('/xfxhapi/zwjbxx/doFindZwAndJgByVo', param).then(function (res) {
                if (res.data.result.length > 0) {
                    this.bzzwData = res.data.result;
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //获取企业选择的光地展位信息
        getSelectedGdzw: function () {
            var param = {
                qyid: this.qyid,
                zwlb: "光地"
            }
            axios.post('/xfxhapi/zwjbxx/doFindZwAndJgByVo', param).then(function (res) {
                if (res.data.result.length > 0) {
                    this.gdzwData = res.data.result;
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //审核点击事件
        approveClick: function () {
            this.approveForm = {
                shzt: this.jbxxData.shzt,
                sjzt: this.jbxxData.sjzt,
                reserve1: this.jbxxData.reserve1
            };
            this.approveFormVisible = true;
        },
        //审核提交事件
        approveSubmit: function (val) {
            if (this.approveForm.shzt == '01') {
                this.$message({
                    message: "请选择审核状态",
                    type: "error",
                    showClose: true
                });
            } else if (this.isReject == true && (this.approveForm.reserve1 == null || this.approveForm.reserve1 == '')) {
                this.$message({
                    message: "请填写审核意见",
                    type: "error",
                    showClose: true
                });
            } else {
                //审核状态改变才调用后台approveByVO方法
                if (this.approveForm.shzt == this.jbxxData.shzt && this.approveForm.reserve1 == this.jbxxData.reserve1) {
                    this.$message({
                        message: "审核状态及审核意见未改变",
                        type: "error",
                        showClose: true
                    });
                } else {
                    if (this.approveForm.shzt == '02') {//未通过
                        this.approveForm.sjzt = '04';
                    } else if (this.approveForm.shzt == '03') {//已通过
                        this.approveForm.sjzt = '05';
                    }
                    var params = {
                        qyid: this.qyid,
                        shzt: this.approveForm.shzt,
                        sjzt: this.approveForm.sjzt,
                        reserve1: this.approveForm.reserve1,//审核意见
                        shrid: this.shiroData.userid,
                        shrmc: this.shiroData.realName,
                        shsj: '1'
                    };
                    axios.post('/xfxhapi/qyjbxx/updateByVO', params).then(function (res) {
                        if (res.data.result == 1) {
                            this.approveFormVisible = false;
                            this.$message.success('已审核');
                            var type = getQueryString("type");
                            if (type == 'search') {
                                loadDivParam("prediction/exhprediction_list");
                            } else if (type == 'approve') {
                                loadDivParam("prediction/exhprediction_approve");
                            }
                        }
                    }.bind(this), function (error) {
                        console.log(error)
                    })
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
            this.approveForm = {
                shzt: -1,
                reserve1: ""
            };
            this.$refs[val].resetFields();
            this.approveFormVisible = false;
        },
    }
})
