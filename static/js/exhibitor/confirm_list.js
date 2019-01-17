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
            gsjcEditFlag: true,
            xzqhDataTree: [],
            //邮寄信息表单
            jbxxForm: {
                zwgsmc: '',
                yjdzsheng: '',
                yjdzshi: '',
                yjdzxx: '',
                lxr: '',
                lxrsj: '',
                qrzt: '',
                gsjc: ''
            },
            //开票信息表单
            kpxxForm: {
                kplx: '',
                kpgsmc: '',
                tyshxydm: '',
                gsdz: '',
                dhhm: '',
                khyh: '',
                yhzh: ''
            },
            gsjc: '',
            jbxxRules: {
                zwgsmc: [
                    { required: true, message: '请输入中文公司名称', trigger: 'blur' },
                    { min: 1, max: 100, message: '最多可输入100个字', trigger: 'blur' }
                ],
                xzqh: [
                    { required: true, message: '请选择邮寄地址省市', trigger: 'change' }
                ],
                yjdzxx: [
                    { required: true, message: '请输入详细地址', trigger: 'blur' },
                    { min: 1, max: 100, message: '最多可输入100个字', trigger: 'blur' }
                ],
                lxr: [
                    { required: true, message: '请输入联系人', trigger: 'blur' },
                    { min: 1, max: 25, message: '最多可输入25个字', trigger: 'blur' }
                ],
                lxrsj: [
                    { required: true, message: '请输入联系人手机号码', trigger: 'blur' },
                    { pattern: /^[0-9]*$/, message: '只能输入数字', trigger: 'blur' },
                    { min: 1, max: 30, message: '最多输入30个数字', trigger: 'blur' }
                ]
            },
            kpxxRules: {
                kplx: [
                    { required: true, message: '请选择开票类型', trigger: 'change' }
                ],
                kpgsmc: [
                    { required: true, message: '请输入开票公司名称', trigger: 'blur' },
                    { min: 1, max: 100, message: '最多可输入100个字', trigger: 'blur' }
                ],
                tyshxydm: [
                    { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
                    { pattern: /^[A-Za-z0-9 ]+$/, message: '只能输入数字和字母', trigger: 'blur' },
                    { min: 22, max: 22, message: '请输入18位统一社会信用代码（不包含空格）', trigger: 'blur' }
                ],
                gsdz: [
                    { required: true, message: '请输入公司地址', trigger: 'blur' },
                    { min: 1, max: 150, message: '最多可输入150个字', trigger: 'blur' }
                ],
                dhhm: [
                    { required: true, message: '请输入电话号码', trigger: 'blur' },
                    { pattern: /^[0-9]*$/, message: '只能输入数字', trigger: 'blur' },
                    { min: 1, max: 50, message: '最多输入50个数字', trigger: 'blur' }
                ],
                khyh: [
                    { required: true, message: '请输入开户银行', trigger: 'blur' },
                    { min: 1, max: 50, message: '最多可输入50个字', trigger: 'blur' }
                ],
                yhzh: [
                    { required: true, message: '请输入银行账号', trigger: 'blur' },
                    { pattern: /^[0-9 ]*$/, message: '只能输入数字', trigger: 'blur' },
                    { min: 0, max: 37, message: '最多可输入30位银行账号', trigger: 'blur' }
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
        loadBreadcrumb("信息确认", "-1");
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
                        this.gsjc = res.data.result.gsjc;
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
        addBlankYhzh: function () {
            if (this.kpxxForm.yhzh != undefined && this.kpxxForm.yhzh != '' && this.kpxxForm.yhzh != null) {
                this.kpxxForm.yhzh = this.kpxxForm.yhzh.replace(/\s/g, '').replace(/(\w{4})(?=\w)/g, "$1 ");
            }
        },
        addBlankXydm: function () {
            if (this.kpxxForm.tyshxydm != undefined && this.kpxxForm.tyshxydm != '' && this.kpxxForm.tyshxydm != null) {
                this.kpxxForm.tyshxydm = this.kpxxForm.tyshxydm.replace(/\s/g, '').replace(/(\w{4})(?=\w)/g, "$1 ");
            }
        },
        fplxChange: function (val) {
            if (val == "2") {//普通发票
                this.kpxxForm.dhhm = "";
                this.kpxxForm.khyh = "";
                this.kpxxForm.yhzh = "";
            }
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
                        yjdzsheng: this.jbxxForm.xzqh[0],
                        yjdzshi: this.jbxxForm.xzqh[1],
                        yjdzxx: this.jbxxForm.yjdzxx,
                        lxr: this.jbxxForm.lxr,
                        lxrsj: this.jbxxForm.lxrsj,
                        xgrid: this.shiroData.userid,
                        xgrmc: this.shiroData.username
                    }
                    axios.post('/xfxhapi/qyjbxx/doUpdateByVO', params).then(function (res) {
                        if (res.data.result > 0) {
                            this.$message.success('邮寄信息修改成功');
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
                    var yhzh_str = null;
                    if (this.kpxxForm.yhzh != null && this.kpxxForm.yhzh != '' && this.kpxxForm.yhzh != undefined) {
                        yhzh_str = this.kpxxForm.yhzh.replace(/ /g, "");
                    } else {
                        yhzh_str = '';
                    }
                    var params = {
                        uuid: this.kpxxForm.uuid,
                        kplx: this.kpxxForm.kplx,
                        kpgsmc: this.kpxxForm.kpgsmc,
                        tyshxydm: this.kpxxForm.tyshxydm.replace(/ /g, ""),
                        gsdz: this.kpxxForm.gsdz,
                        dhhm: this.kpxxForm.dhhm,
                        khyh: this.kpxxForm.khyh,
                        yhzh: yhzh_str,
                        xgrid: this.shiroData.userid,
                        xgrmc: this.shiroData.username
                    }
                    axios.post('/xfxhapi/qykpxx/doUpdateByVO', params).then(function (res) {
                        if (res.data.result > 0) {
                            this.$message.success('开票信息修改成功');
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
        editGsjcClick: function () {
            this.gsjcEditFlag = false;
        },
        saveGsjcClick: function () {
            this.loading = true;
            var params = {
                qyid: this.jbxxForm.qyid,
                gsjc: this.jbxxForm.gsjc,
                xgrid: this.shiroData.userid,
                xgrmc: this.shiroData.username
            }
            axios.post('/xfxhapi/qyjbxx/doUpdateByVO', params).then(function (res) {
                if (res.data.result > 0) {
                    this.$message.success('公司简称修改成功');
                }
                this.gsjcEditFlag = true;
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        saveGsjcCancle: function () {
            this.gsjcEditFlag = true;
            this.jbxxForm.gsjc = this.gsjc;
        },
        qrztSubmit: function () {
            if (this.jbxxEditFlag && this.kpxxEditFlag && this.gsjcEditFlag) {
                var params = {
                    qyid: this.jbxxForm.qyid,
                    qrzt: 'Y',
                    qrsj: '1',
                    xgrid: this.shiroData.userid,
                    xgrmc: this.shiroData.username
                }
                axios.post('/xfxhapi/qyjbxx/doUpdateByVO', params).then(function (res) {
                    if (res.data.result > 0) {
                        this.$message.success('信息已确认！');
                    }
                    this.findInfoByUserid(this.shiroData.userid, 'init');
                    this.loading = false;
                }.bind(this), function (error) {
                    console.log(error);
                })
            } else if (!this.jbxxEditFlag) {
                this.$message.warning('邮寄地址尚未保存！');
            } else if (!this.kpxxEditFlag) {
                this.$message.warning('开票信息尚未保存！');
            } else if (!this.gsjcEditFlag) {
                this.$message.warning('公司简称尚未保存！');
            }
        },
        qrztCancle: function () {

        }
    }
})