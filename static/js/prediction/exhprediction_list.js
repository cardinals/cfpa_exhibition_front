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
                yjdz: '',
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
            //表高度变量
            tableheight: 443,
            //显示加载中样
            loading: false,
            //当前页
            currentPage: 1,
            //分页大小
            pageSize: 10,
            //总记录数
            total: 0
        }
    },
    created: function () {
        /**面包屑 by li.xue 20180628*/
        loadBreadcrumb("预报名信息审核", "-1");
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
                yjdz: this.searchForm.yjdz,
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
        addClick: function () {
            var params = {
                type: "XZ"
            }
            loadDivParam("prediction/exhprediction_edit", params);
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
        }
    }
})