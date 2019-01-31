//axios默认设置cookie
axios.defaults.withCredentials = true;
var vue = new Vue({
    el: '#app',
    data: function () {
        return {
            //搜索表单
            searchForm: {
                zwh: "",
                qymc: "",
            },
            //表数据
            tableData: [],
            //显示加载中样
            loading: false,
            //当前页
            currentPage: 1,
            //分页大小
            pageSize: 10,
            //总记录数
            total: 0,
            //登陆用户
            shiroData: "",
            //清空日志弹出页
            deleteFormVisible: false,
            deleteForm: {
                fssj: []
            },
            deleteFormRules: {
                fssj: [
                    { required: true, message: '请选择清空日志的发送日期范围', trigger: 'blur' }
                ]
            }
        }
    },
    created: function () {
        loadBreadcrumb("短信日志", "-1");
        //table高度
        tableheight = tableheight10;
        //登录用户
        this.shiroData = shiroGlobal;
        this.searchClick('click');
    },

    methods: {
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
                zwh: this.searchForm.zwh,
                qymc: this.searchForm.qymc,
                pageSize: this.pageSize,
                pageNum: this.currentPage
            }
            axios.post('/xfxhapi/zwsms/page', params).then(function (res) {
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
            this.searchForm.zwh = "";
            this.searchForm.qymc = "";
            this.searchClick('reset');
        },
        //点击清空日志
        deleteClick: function () {
            this.deleteFormVisible = true;
        },
        //清空日志提交
        deleteSubmit: function (val) {
            this.$refs[val].validate((valid) => {
                if (valid) {
                    var date = new Date(this.deleteForm.fssj[0]);
                    var date1 = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                    var date2 = new Date(this.deleteForm.fssj[1]);
                    var date3 = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate() + ' ' + date2.getHours() + ':' + date2.getMinutes() + ':' + date2.getSeconds();
                    this.$confirm('确定清空' + date1 + '至' + date3 + '发送的日志信息?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        var params = {
                            fssj_begin: date1,
                            fssj_end: date3,
                            xgrid: this.shiroData.userid,
                            xgrmc: this.shiroData.realName
                        }
                        axios.post('/xfxhapi/zwsms/doDeleteByFssj', params).then(function (res) {
                            this.$message.success("成功清空" + res.data.result + "条日志信息");
                            this.closeDialog('deleteForm');
                            this.searchClick('delete');
                        }.bind(this), function (error) {
                            console.log(error)
                        })
                    }).catch(() => {
                        this.$message.info('已取消清空');
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        closeDialog: function (val) {
            this.deleteForm = {
                fssj: []
            };
            this.$refs[val].resetFields();
            this.deleteFormVisible = false;
        }
    }

})
