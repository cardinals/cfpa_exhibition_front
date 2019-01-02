axios.defaults.withCredentials = true;
var vm = new Vue({
    el: '#app',
    data: function () {
        return {
            //菜单编码
            activeIndex: '',
            //显示加载中样
            loading: false,
            qyid: '',
            shztFlag: false,
            jbxxEditFlag: true,
            kpxxEditFlag: true,
            xzqhDataTree: [],
            //邮寄信息表单
            jbxxForm: {
                ywgsmc: '',
                yjdzxx: '',
                lxr: '',
                lxrsj: ''
            },
            //开票信息表单
            kpxxForm: {
                kpgsmc: '',
                gsdz: '',
                dhhm: '',
                yhzh: ''
            },
            jbxxRules: {
                ywgsmc: [
                    { required: true, message: 'Company name is required', trigger: 'blur' },
                    { pattern: /^[a-z\d\.\,\|\- ]+$/i, message: 'Characters and number and blank and ,.-| only', trigger: 'blur' },
                    { min: 1, max: 200, message: 'less than 200 characters', trigger: 'blur' }
                ],
                yjdzxx: [
                    { required: true, message: 'Company address is required', trigger: 'blur' },
                    { pattern: /^[a-z\d\.\,\|\- ]+$/i, message: 'Characters and number and blank and ,.-| only', trigger: 'blur' },
                    { min: 1, max: 200, message: 'less than 200 characters', trigger: 'blur' }
                ],
                lxr: [
                    { required: true, message: 'Contact Person is required', trigger: 'blur' },
                    { pattern: /^[a-z\d\.\,\|\- ]+$/i, message: 'Characters and number and blank and ,.-| only', trigger: 'blur' },
                    { min: 1, max: 50, message: 'less than 50 characters', trigger: 'blur' }
                ],
                lxrsj: [
                    { required: true, message: "Contact Person's Phone is required", trigger: 'blur' },
                    { pattern: /^[\d\-]+$/, message: 'Number and hyphen only', trigger: 'blur' },
                    { min: 1, max: 30, message: 'less than 30 characters', trigger: 'blur' }
                ],
            },
            kpxxRules: {
                kpgsmc: [
                    { required: true, message: 'Company Name on the Invoice is required', trigger: 'blur' },
                    { pattern: /^[A-Za-z0-9 ]+$/, message: 'Characters and number and blank only', trigger: 'blur' },
                    { min: 1, max: 200, message: 'less than 200 characters', trigger: 'blur' }
                ],
                gsdz: [
                    { required: true, message: 'Customer Contact is required', trigger: 'blur' },
                    { pattern: /^[A-Za-z0-9 ]+$/, message: 'Characters and number and blank only', trigger: 'blur' },
                    { min: 1, max: 300, message: 'less than 300 characters', trigger: 'blur' }
                ],
                dhhm: [
                    { required: true, message: 'Phone Number is required', trigger: 'blur' },
                    { pattern: /^[\d\-]+$/, message: 'Number and hyphen only', trigger: 'blur' },
                    { min: 1, max: 30, message: 'less than 30 characters', trigger: 'blur' }
                ],
                yhzh: [
                    { required: true, message: 'Fax is required', trigger: 'blur' },
                    { pattern: /^[0-9 ]*$/, message: 'Number and blank only', trigger: 'blur' },
                    { min: 1, max: 16, message: 'less than 16 characters', trigger: 'blur' }
                ]
            },
            //树结构配置
            defaultProps: {
                children: 'children',
                label: 'codeName',
                value: 'codeValue'
            },
        }
    },
    created: function () {
        loadBreadcrumb("Confirm Information", "-1");
        this.shiroData = shiroGlobal;
        this.findInfoByUserid(this.shiroData.userid, 'init');
    },
    mounted: function () {
        this.getXzqhDataTree();
    },
    methods: {
        //通过userid查询基本信息数据
        findInfoByUserid: function (userid, type) {
            this.loading = true;
            var params = {
                userid: userid,
                deleteFlag: 'N'
            }
            axios.post('/xfxhapi/qyjbxx/doFindByUserid', params).then(function (res) {
                if (res.data.result != null && res.data.result != "") {
                    if (res.data.result.sjzt == "05" && res.data.result.shzt == "03") {//数据状态-已审核，审核状态-已通过
                        this.jbxxForm = res.data.result;
                        this.qyid = res.data.result.qyid;
                        //行政区划级联下拉处理
                        var xzqhArray = [];
                        xzqhArray.push(res.data.result.yjdzsheng);
                        xzqhArray.push(res.data.result.yjdzshi);
                        this.jbxxForm.xzqh = xzqhArray;
                        if (type == 'init') {
                            this.findKpxxByQyid(this.qyid);
                        } else {
                            this.loading = false;
                        }
                    } else {
                        this.shztFlag = true;
                        this.loading = false;
                        this.$confirm('您尚未通过审核！', '提示', {
                            confirmButtonText: '去查看',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            window.location.href = baseUrl + "/templates/prediction/exhprediction_all.html?url=/prediction/exhprediction_edit";
                            // loadDivParam("prediction/exhprediction_edit");
                        }).catch(() => {

                        });
                    }
                } else {//未报名
                    this.shztFlag = true;
                    this.loading = false;
                    this.$confirm('您尚未报名！', '提示', {
                        confirmButtonText: '去报名',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        window.location.href = baseUrl + "/templates/prediction/exhprediction_all.html?url=/prediction/exhprediction_edit";
                        // loadDivParam("prediction/exhprediction_edit");
                    }).catch(() => {

                    });
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //通过企业id查找开票信息
        findKpxxByQyid: function (qyid) {
            this.loading = true;
            var params = {
                qyid: qyid,
                deleteFlag: 'N'
            }
            axios.post('/xfxhapi/qykpxx/list', params).then(function (res) {
                this.kpxxForm = res.data.result[0];
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //行政区划级联选择数据
        getXzqhDataTree: function () {
            axios.post('/xfxhapi/codelist/getYjdz').then(function (res) {
                this.xzqhDataTree = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        editJbxxClick: function () {
            this.jbxxEditFlag = false;
        },
        saveJbxxClick: function (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.loading = true;
                    var params = {
                        qyid: this.jbxxForm.qyid,
                        yjdzxx: this.jbxxForm.yjdzxx,
                        lxr: this.jbxxForm.lxr,
                        lxrsj: this.jbxxForm.lxrsj,
                        xgrid: this.shiroData.userid,
                        xgrmc: this.shiroData.username
                    }
                    axios.post('/xfxhapi/qyjbxx/doUpdateByVO', params).then(function (res) {
                        if (res.data.result > 0) {
                            this.$message.success('Post Information has been saved !');
                        }
                        this.jbxxEditFlag = true;
                        this.findInfoByUserid(this.shiroData.userid, 'init');
                        this.loading = false;
                    }.bind(this), function (error) {
                        console.log(error);
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        saveJbxxCancle: function (formName) {
            this.$refs[formName].resetFields();
            this.jbxxEditFlag = true;
            this.findInfoByUserid(this.shiroData.userid, 'cancle');
        },
        editKpxxClick: function () {
            this.kpxxEditFlag = false;
        },
        saveKpxxClick: function (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var params = {
                        uuid: this.kpxxForm.uuid,
                        kpgsmc: this.kpxxForm.kpgsmc,
                        gsdz: this.kpxxForm.gsdz,
                        dhhm: this.kpxxForm.dhhm,
                        yhzh: this.kpxxForm.yhzh,
                        xgrid: this.shiroData.userid,
                        xgrmc: this.shiroData.username
                    }
                    axios.post('/xfxhapi/qykpxx/doUpdateByVO', params).then(function (res) {
                        if (res.data.result > 0) {
                            this.$message.success('Invoice Information has been saved !');
                        }
                        this.kpxxEditFlag = true;
                        this.findKpxxByQyid(this.qyid);
                        this.loading = false;
                    }.bind(this), function (error) {
                        console.log(error);
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        saveKpxxCancle: function (formName) {
            this.$refs[formName].resetFields();
            this.kpxxEditFlag = true;
            this.findKpxxByQyid(this.qyid);
        },
        qrztSubmit: function () {
            if (this.jbxxEditFlag && this.kpxxEditFlag) {
                var params = {
                    qyid: this.jbxxForm.qyid,
                    qrzt: 'Y',
                    xgrid: this.shiroData.userid,
                    xgrmc: this.shiroData.username
                }
                axios.post('/xfxhapi/qyjbxx/doUpdateByVO', params).then(function (res) {
                    if (res.data.result > 0) {
                        this.$message.success('Information has been comfirmed !');
                    }
                    this.findInfoByUserid(this.shiroData.userid, 'init');
                    this.loading = false;
                }.bind(this), function (error) {
                    console.log(error);
                })
            } else if (!this.jbxxEditFlag) {
                this.$message.warning('Post Information has not been saved !');
            } else if (!this.kpxxEditFlag) {
                this.$message.warning('Invoice Information has not been saved !');
            }
        },
        qrztCancle: function () {

        }
    }
})