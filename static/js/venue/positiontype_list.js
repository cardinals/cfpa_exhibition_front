//axios默认设置cookie
axios.defaults.withCredentials = true;
var vue = new Vue({
    el: '#app',
    data: function () {
        return {
            //搜索表单
            searchForm: {
                zwfl: "",
                kkfl: "",
            },
            //表数据
            tableData: [],
            //显示加载中样
            loading: false,
            labelPosition: 'right',
            //多选值
            multipleSelection: [],
            //当前页
            currentPage: 1,
            //分页大小
            pageSize: 10,
            //总记录数
            total: 0,
            //登陆用户
            shiroData: "",
            //出口类型下拉框
            cklxData: [],
            //展位类型下拉框
            zwlbData: [],
            editFormVisible: false,
            selectUuid: '',
            dialogTitle: '',
            editForm: {
                zwfl: '',
                kkfl: '',
                flmj: '',
                fljg: '',
                fljgEng: ''
            },
            //isSngd: true,//是否室内光地
            isBzzw: false,//是否是标准展位 add by yushch 光地展位可选出口类型 20190417
            editFormRules: {
                zwfl: [
                    { required: true, message: '请选择展位类型', trigger: 'change' }
                ],
                kkfl: [
                    { required: true, message: '请选择出口类型', trigger: 'blur' },
                ],
                flmj: [
                    { required: true, message: '请输入单位面积', trigger: 'blur' },
                ],
                fljg: [
                    { required: true, message: '请输入单位面积价格(元)', trigger: 'blur' },
                ],
                fljgEng: [
                    { required: true, message: '请输入单位面积价格(美元)', trigger: 'blur' },
                ]
            }
        }
    },
    created: function () {
        /**面包屑 by li.xue 20180628*/
        loadBreadcrumb("展位分类", "-1");
        //table高度
        tableheight = tableheight10;
        //登录用户
        this.shiroData = shiroGlobal;
        //展位类型
        this.getZwlb();
        //出口类型
        this.getCklx();
        this.searchClick('click');
    },

    methods: {
        //展位类别下拉框
        getZwlb: function () {
            axios.get('/xfxhapi/codelist/getCodetype/ZWLX').then(function (res) {
                this.zwlbData = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //出口类型下拉框
        getCklx: function () {
            axios.get('/xfxhapi/codelist/getCodetype/CKLX').then(function (res) {
                this.cklxData = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //表格查询事件
        searchClick: function (type) {
            //按钮事件的选择
            if (type == 'page') {
                this.tableData = [];
            } else {
                this.currentPage = 1;
            }
            this.loading = true;//表格重新加载
            var params = {
                zwfl: this.searchForm.zwfl,
                kkfl: this.searchForm.kkfl,
                pageSize: this.pageSize,
                pageNum: this.currentPage
            }
            axios.post('/xfxhapi/zwflxx/page', params).then(function (res) {
                var tableTemp = new Array((this.currentPage - 1) * this.pageSize);
                this.tableData = tableTemp.concat(res.data.result.list);
                this.total = res.data.result.total;
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //清空查询条件
        clearClick: function () {
            this.searchForm.zwfl = "";
            this.searchForm.kkfl = "";
            this.searchClick('reset');
        },
        zwflChange: function (val) {
            if (val == '1') {
                //this.isSngd = false;
                this.isBzzw = true;
                this.editForm.kkfl = '';
                this.editForm.flmj = 12;
            } else if (val == '2') {
                //this.isSngd = true;
                this.isBzzw = false;
                this.editForm.flmj = 1;
            }else if (val == '3') {
                //this.isSngd = false;
                //this.editForm.kkfl = '';
                this.isBzzw = false;
                this.editForm.flmj = 1;
            }
        },
        addClick: function () {
            this.dialogTitle = '展位分类新增';
            this.editFormVisible = true;
        },
        //表格勾选事件
        selectionChange: function (val) {
            this.multipleSelection = val;
        },
        deleteClick: function () {
            if (this.multipleSelection == null || this.multipleSelection.length == 0) {
                this.$message.warning('至少选择一条信息');
            } else {
                this.$confirm('确定删除已选中分类信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    for (var i in this.multipleSelection) {
                        this.multipleSelection[i].xgrid = this.shiroData.userid;
                        this.multipleSelection[i].xgrmc = this.shiroData.realName;
                        this.multipleSelection[i].deleteFlag = 'Y';
                    }
                    axios.post('/xfxhapi/zwflxx/doDeleteByVolist', this.multipleSelection).then(function (res) {
                        this.$message.success("成功删除" + res.data.result + "条分类信息");
                        this.searchClick('delete');
                    }.bind(this), function (error) {
                        console.log(error)
                    })
                }).catch(() => {
                    this.$message.info('已取消删除');
                });
            }
        },
        editClick: function (val) {
            this.selectUuid = val.uuid;
            this.dialogTitle = '展位分类编辑';
            axios.get('/xfxhapi/zwflxx/' + this.selectUuid).then(function (res) {
                this.editForm.zwfl = res.data.result.zwfl;
                this.editForm.kkfl = res.data.result.kkfl;
                this.editForm.flmj = res.data.result.flmj;
                this.editForm.fljg = res.data.result.fljg;
                this.editForm.fljgEng = res.data.result.fljgEng;
                if (this.editForm.zwfl == '1') {
                    //this.isSngd = true;
                    this.isBzzw = true;
                } else {
                    //this.isSngd = false;
                    this.isBzzw = false;
                }
                this.editFormVisible = true;
            }.bind(this), function (error) {
                console.log(error)
            })

        },
        editSubmit: function (val) {
            this.$refs[val].validate((valid) => {
                if (valid) {
                    if (this.selectUuid == '') {//新增
                        var params = {
                            zwfl: this.editForm.zwfl,
                            kkfl: this.editForm.kkfl,
                            flmj: this.editForm.flmj,
                            fljg: this.editForm.fljg,
                            fljgEng: this.editForm.fljgEng,
                            cjrid: this.shiroData.userid,
                            cjrmc: this.shiroData.realName
                        }
                        axios.post('/xfxhapi/zwflxx/insertByVO', params).then(function (res) {
                            if (res.data.result > 0) {
                                this.$message.success('保存成功');
                                this.editFormVisible = false;
                                this.searchClick();
                            } else {
                                this.$message.error('保存失败');
                            }
                        }.bind(this), function (error) {
                            console.log(error)
                        })
                    } else {//编辑
                        var params = {
                            uuid: this.selectUuid,
                            zwfl: this.editForm.zwfl,
                            kkfl: this.editForm.kkfl,
                            flmj: this.editForm.flmj,
                            fljg: this.editForm.fljg,
                            fljgEng: this.editForm.fljgEng,
                            xgrid: this.shiroData.userid,
                            xgrmc: this.shiroData.realName
                        }
                        axios.post('/xfxhapi/zwflxx/updateByVO', params).then(function (res) {
                            if (res.data.result > 0) {
                                this.$message.success('保存成功');
                                this.editFormVisible = false;
                                this.searchClick();
                            } else {
                                this.$message.error('保存失败');
                            }
                        }.bind(this), function (error) {
                            console.log(error)
                        })
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        closeDialog: function (val) {
            this.editForm = {
                zwfl: '',
                kkfl: '',
                flmj: '',
                fljg: '',
                fljgEng: ''
            };
            this.$refs[val].resetFields();
            this.selectUuid = '';
            this.editFormVisible = false;
        }
    }

})
