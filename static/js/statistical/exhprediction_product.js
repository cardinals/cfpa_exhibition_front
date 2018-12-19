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
            tableData: [],
            shiroData: [],//当前用户信息
            cplxData: [],
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

            chooseCplxVisible: false,
            checkList: []
        }
    },
    created: function () {
        /**面包屑 by li.xue 20180628*/
        loadBreadcrumb("展会报名管理", "-1");
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
            this.searchForm.cplx = '';
            this.searchClick('reset');
        },
        exportClick: function () {
            this.chooseCplxVisible = true;
        },
        exportExs: function () {

        }
    }
})