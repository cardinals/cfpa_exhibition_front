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
                cplx: ''
            },
            tableData: [],//列表信息
            shiroData: [],//当前用户信息
            cplxData: [],//产品类型大类
            allCplxCode: [],
            //显示加载中样
            loading: false,
            //当前页
            currentPage: 1,
            //分页大小
            pageSize: 10,
            //总记录数
            total: 0,

            chooseCplxVisible: false,//选择产品类型弹出页
            checkList: [],//选中的产品类型
            isIndeterminate: false,//全选按钮
            checkAll: false,

        }
    },
    created: function () {
        /**面包屑 by li.xue 20180628*/
        loadBreadcrumb("按产品类型统计", "按产品类型统计详情");
        //table高度
        tableheight = tableheight10;
        //登录用户
        this.shiroData = shiroGlobal;
        this.searchForm.cplx = getQueryString("cplx");
        this.getCplxData();//产品类型下拉框
        this.searchClick();
    },
    mounted: function () {
        this.searchClick('click');//条件查询
    },

    methods: {
        //产品类型下拉框
        getCplxData: function () {
            axios.get('/xfxhapi/codelist/getCplxSelect/CPLX').then(function (res) {
                this.cplxData = res.data.result;
                for (var i in this.cplxData) {
                    this.allCplxCode.push(this.cplxData[i].codeValue)
                }
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
                cplx: this.searchForm.cplx,
                pageSize: this.pageSize,
                pageNum: this.currentPage,
                orgUuid: this.shiroData.organizationVO.uuid,
                orgJgid: this.shiroData.organizationVO.jgid
            }
            axios.post('/xfxhapi/qyzwyx/doFindQyzwyxByCplx', params).then(function (res) {
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
            this.searchForm.cplx = getQueryString("cplx");
            this.searchClick('reset');
        },
        //点击导出按钮，显示弹出页
        exportClick: function () {
            this.chooseCplxVisible = true;
        },
        //全选按钮change事件
        handleCheckAllChange(event) {
            this.checkList = event ? this.allCplxCode : [];
            this.isIndeterminate = false;
        },
        //产品类型选择change事件
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.allCplxCode.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.allCplxCode.length;
        },
        //点击导出至本地按钮
        exportExs: function () {
            if (this.checkList.length == 0) {
                this.$message.error('至少选择一个产品类型');
            } else {
                window.open("/xfxhapi/qyzwyx/doExportQyzwyxByCplx/" + this.checkList);
            }
        },
        //关闭弹出页
        closeDialog: function () {
            this.checkList = [];
            this.isIndeterminate = false;
            this.checkAll = false;
        }
    }
})