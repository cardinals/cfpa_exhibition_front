//axios默认设置cookie
axios.defaults.withCredentials = true;
var vue = new Vue({
    el: '#app',
    data: function () {
        return {
            visible: false,
            codeid: null,
            //搜索表单
            searchForm: {
                codeValue: '',
                codeName: ''
            },
            tableData: [],
            //显示加载中样
            loading: false,
            //多选值
            multipleSelection: [],
            //当前页
            currentPage: 1,
            //分页大小
            pageSize: 10,
            //总记录数
            total: 10,
            //新建页面是否显示
            addFormVisible: false,
            addFormRules: {
                codeValue: [
                    { required: true, message: "请输入代码值", trigger: "blur" },
                    { pattern: /^[0-9A-Za-z]{2,50}$/, message: '代码值应为2-50位字母、数字', trigger: 'blur' },
                ],
                codeName: [{ required: true, message: "请输入代码名称", trigger: "blur" }]
            },
            //新建数据
            addForm: {
                permissionname: "",
                permissioninfo: ""
            },
            //选中的序号
            selectIndex: -1,
            //修改界面是否显示
            editFormVisible: false,
            editFormRules: {
                codeValue: [
                    { required: true, message: "请输入代码值", trigger: "blur" },
                    { pattern: /^[0-9A-Za-z]{2,50}$/, message: '代码值应为2-50位字母、数字', trigger: 'blur' },
                ],
                codeName: [{ required: true, message: "请输入代码名称", trigger: "blur" }]
            },
            //修改界面数据
            editForm: {
                codetype: "",
                codetypeName: ""
            }
        }
    },
    created: function () {
		/**面包屑 by li.xue 20180628*/
        loadBreadcrumb("代码集管理", "代码集详情");
        //table高度
        tableheight = tableheight10;

        this.loading = true; //重新加载数据
        this.codeid = getQueryString("codeid");
        var params = {
            codeid: this.codeid,
            pageSize: this.pageSize,
            pageNum: this.currentPage
        };
        axios.post('/xfxhapi/codelist/detail/doFindByCodeid', params).then(function (res) {
            var tableTemp = new Array((this.currentPage-1)*this.pageSize);
            this.tableData = tableTemp.concat(res.data.result.list);
            this.total = res.data.result.total;
            this.loading = false;
        }.bind(this), function (error) {
            console.log(error)
        })
    },
    methods: {
        handleNodeClick(data) {
        },

        //日期控件格式化
        begindateChange(val) {
            this.searchForm.createTimeBegin = val;
        },
        enddateChange(val) {
            this.searchForm.createTimeEnd = val;
        },

        codetypeCilck: function (val) {
            window.location.href = this.$http.options.root + "/xfxhapi/codelist/getDetailPage/" + val.codeid;
        },

        //查询，初始化
        searchClick: function(type) {
            //按钮事件的选择
            if(type == 'page'){     
            }else{
                this.currentPage = 1;
            }
            this.loading = true;
            var params = {
                codeid: this.codeid,
                codeValue: this.searchForm.codeValue.trim(),
                codeName: this.searchForm.codeName.trim(),
                pageSize: this.pageSize,
                pageNum: this.currentPage
            };

            axios.post('/xfxhapi/codelist/detail/findByVO', params).then(function (res) {
                var tableTemp = new Array((this.currentPage-1)*this.pageSize);
                this.tableData = tableTemp.concat(res.data.result.list);
                this.total = res.data.result.total;
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },

        //表格勾选事件
        selectionChange: function (val) {
            this.multipleSelection = val;
        },

        //表格重新加载数据
        loadingData: function () {
            var _self = this;
            _self.loading = true;
            setTimeout(function () {
                console.info("加载数据成功");
                _self.loading = false;
            }, 300);
        },

        //新建：弹出Dialog
        addClick: function () {
            var _self = this;
            _self.addFormVisible = true;

        },

        //新建：保存
        addSubmit: function (val) {
            if(this.addForm.codeValue=="" || this.addForm.codeValue==null) {
                this.$message.warning({
                    message: '请输入代码值！',
                    showClose: true
                });
                return false;
            }else if(this.addForm.codeName=="" || this.addForm.codeName==null){
                this.$message.warning({
                    message: '请输入代码名称！',
                    showClose: true
                });
                return false;
            }else{
                var _self = this;
                axios.get('/xfxhapi/codelist/detail/getNum/' + this.codeid + '/' + this.addForm.codeValue).then(function (res) {
                    if (res.data.result != 0) {
                        _self.$message({
                            message: "代码值已存在!",
                            type: "error"
                        });
                    } else {
                        var params = {
                            codeid: this.codeid,
                            codeValue: val.codeValue.trim(),
                            codeName: val.codeName.trim(),
                            remark: val.remark
                        }
                        axios.post('/xfxhapi/codelist/detail/insertByVO', params).then(function (res) {
                            var addData = res.data.result;
                            addData.createTime = new Date();
                            _self.tableData.unshift(addData);
                            _self.total = _self.tableData.length;
                            this.$message({
                                message: "代码集详情新增成功！",
                                type: "success"
                            });
                        }.bind(this), function (error) {
                            console.log(error)
                        })
                        this.addFormVisible = false;
                        _self.loadingData();//重新加载数据
                    }
                }.bind(this), function (error) {
                    console.log(error)
                })
            }
        },

        //修改：弹出Dialog
        editClick: function(val) {
            var pkid = val.pkid;
            //循环终点
            var forEnd = this.tableData.length<this.pageSize*this.currentPage?this.tableData.length:this.pageSize*this.currentPage;
            //获取选择的行号
            for (var k = this.pageSize*(this.currentPage-1); k < forEnd; k++) {
                if (this.tableData[k].pkid == pkid) {
                    this.selectIndex = k;
                }
            }

            //直接从table中取值放在form表单中
            this.editForm = Object.assign({}, this.tableData[this.selectIndex]);
            this.editFormVisible = true;
        },

        //修改：保存
        editSubmit: function (val) {
            if(this.editForm.codeValue=="" || this.editForm.codeValue==null) {
                this.$message.warning({
                    message: '请输入代码值！',
                    showClose: true
                });
                return false;
            }else if(this.editForm.codeName=="" || this.editForm.codeName==null){
                this.$message.warning({
                    message: '请输入代码名称！',
                    showClose: true
                });
                return false;
            }else{
                var _self = this;
                var params = {
                    pkid: val.pkid,
                    codeValue: val.codeValue.trim(),
                    codeName: val.codeName.trim(),
                    remark: val.remark
                };
                axios.post('/xfxhapi/codelist/detail/updateByVO', params).then(function (res) {
                    this.tableData[this.selectIndex].codeValue = res.data.result.codeValue;
                    this.tableData[this.selectIndex].codeName = res.data.result.codeName;
                    this.tableData[this.selectIndex].remark = res.data.result.remark;
                    this.tableData[this.selectIndex].alterName = res.data.result.alterName;
                    this.tableData[this.selectIndex].alterTime = new Date();
                    this.$message({
                        message: "代码集详情编辑成功！",
                        type: "success"
                    });
                }.bind(this), function (error) {
                    console.log(error)
                })
                this.editFormVisible = false;
            }
            
        },

        //删除:批量删除
        removeSelection: function () {
            this.$confirm('确认删除选中信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.post('/xfxhapi/codelist/detail/deleteByIds', this.multipleSelection).then(function (res) {
                    this.$message({
                        message: "成功删除" + res.data.result + "条代码集信息",
                        showClose: true,
                        onClose: this.searchClick('delete')
                    });
                }.bind(this), function (error) {
                    console.log(error)
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
    
        closeDialog: function (val) {
            this.addFormVisible = false;
            val.permissionname = "";
            val.permissioninfo = "";
            this.$refs["addForm"].resetFields();
        },
        //清空查询条件
        clearClick: function () {
            this.searchForm.codeValue = "",
            this.searchForm.codeName = "",
            this.searchClick('reset');
        },
    },

})