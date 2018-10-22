//axios默认设置cookie
axios.defaults.withCredentials = true;
var vue = new Vue({
    el: '#app',
    data: function () {
        return {
            //菜单编码
            activeIndex: '',
            //搜索表单
            searchForm: {
                zwgsmc: '',
                // yjdz: '',
                sjzt: '',
                shzt: ''
            },
            tableData: [],
            shiroData: [],//当前用户信息
            shztData: [],//审核状态下拉框
            sjztData: [],//数据状态下拉框
            imgViewVisible: false,
            //多选值
            multipleSelection: [],
            //显示加载中样
            loading: false,
            //当前页
            currentPage: 1,
            //分页大小
            pageSize: 10,
            //总记录数
            total: 0,

            //表高度变量---------------------------用户dialog
            userForm: {
                username: ''
            },
            tableData_user: [],
            userListVisible: false,
            tableheight_user: 251,
            //显示加载中样
            loading_user: false,
            //当前页
            currentPage_user: 1,
            //分页大小
            pageSize_user: 5,
            //总记录数
            total_user: 0
        }
    },
    created: function () {
        /**面包屑 by li.xue 20180628*/
        loadBreadcrumb("展会报名管理", "-1");
        this.shiroData = shiroGlobal;
        this.getShztData();//审核状态下拉框
        this.getSjztData();//数据状态下拉框
    },
    mounted: function () {
        this.searchClick('click');//条件查询
    },

    methods: {
        //审核状态下拉框
        getShztData: function () {
            axios.get('/xfxhapi/codelist/getCodetype/SHZT').then(function (res) {
                this.shztData = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //数据状态下拉框
        getSjztData: function () {
            axios.get('/xfxhapi/codelist/getCodetype/SJZT').then(function (res) {
                this.sjztData = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //表格查询事件
        searchClick: function (type) {
            //按钮事件的选择
            if (type == 'page') {
                this.tableData = [];
            } else if (type == 'delete') {
            } else {
                this.currentPage = 1;
            }
            this.loading = true;//表格重新加载
            var params = {
                zwgsmc: this.searchForm.zwgsmc,
                // yjdz: this.searchForm.yjdz,
                shzt: this.searchForm.shzt,
                sjzt: this.searchForm.sjzt,
                pageSize: this.pageSize,
                pageNum: this.currentPage,
                orgUuid: this.shiroData.organizationVO.uuid,
                orgJgid: this.shiroData.organizationVO.jgid
            }
            axios.post('/zhapi/qyjbxx/page', params).then(function (res) {
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
            this.searchForm.zwgsmc = '';
            this.searchForm.yjdz = '';
            this.searchForm.shzt = '';
            this.searchForm.sjzt = '';
            this.searchClick('reset');
        },
        //企业详情跳转
        qyDetails: function (val) {
            var params = {
                id: val.qyid
            }
            loadDivParam("prediction/exhprediction_detail", params);
        },
        //表格勾选事件
        selectionChange: function (val) {
            this.multipleSelection = val;
        },
        //新增跳转
        addClick: function (type) {
            if (type == 'page') {
                this.tableData_user = [];
            } else {
                if (type == 'init') {
                    this.userForm.username = '';
                }
                this.currentPage_user = 1;
            }
            this.loading_uesr = true;
            var params = {
                username: this.userForm.username,
                pageSize: this.pageSize_user,
                pageNum: this.currentPage_user
            };
            axios.post('/zhapi/qyjbxx/doFindZsxxByQyjbxx', params).then(function (res) {
                var tableTemp = new Array((this.currentPage_user - 1) * this.pageSize_user);
                this.tableData_user = tableTemp.concat(res.data.result.list);
                this.total_user = res.data.result.total;
                // this.tableData_user = res.data.result;
                // this.total_user = res.data.result.length;
                this.userListVisible = true;
                this.loading_user = false;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //用户弹出页翻页
        currentPageChange_user: function (val) {
            if (this.currentPage_user != val) {
                this.currentPage_user = val;
                this.addClick('page');
            }
        },
        clearUserList: function () {
            this.userForm.username = '';
            this.addClick('reset');
        },
        //编辑跳转
        editClick: function (val) {
            var params = {
                userid: val.userid,
                type: "BJ"
            }
            loadDivParam("prediction/exhprediction_edit", params);
        },
        deleteClick: function () {
            this.$confirm('确定删除已选中报名信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                for (var i in this.multipleSelection) {
                    this.multipleSelection[i].xgrid = this.shiroData.userid;
                    this.multipleSelection[i].xgrmc = this.shiroData.realName;
                    this.multipleSelection[i].deleteFlag = 'Y';
                }
                axios.post('/zhapi/qyjbxx/doDeleteJbxx', this.multipleSelection).then(function (res) {
                    this.$message({
                        message: "成功删除" + res.data.result + "条报名信息",
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
        selectUser: function (val) {
            if (val.qyid == null || val.qyid == '') {
                var params = {
                    userid: val.userid,
                    type: "XZ"
                }
                this.userListVisible = false;
                loadDivParam("prediction/exhprediction_edit", params);
            } else {
                this.$confirm('选中展商已有报名信息，是否进入编辑?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var params = {
                        userid: val.userid,
                        type: "BJ"
                    }
                    this.userListVisible = false;
                    loadDivParam("prediction/exhprediction_edit", params);
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: ''
                    // });
                });

            }

        }
    }
})