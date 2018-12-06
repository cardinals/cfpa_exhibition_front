//axios默认设置cookie
axios.defaults.withCredentials = true;
var vue = new Vue({
    el: '#app',
    data: function () {
        return {
            //搜索表单
            searchForm: {
                zwmc: "",
                zwh: "",
                zwzt: "",
                qymc: ""
            },
            //表数据
            tableData: [],
            allRoles: [],
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
            // //表高度变量
			// tableheight: 291,
            //序号
            indexData: 0,
            //登陆用户
            shiroData: "",
            dataStatus: [{
                name: '新建展位',
                value: 'normal'
            }, {
                name: '已分配展位',
                value: 'allotted'
            }, {
                name: '已预定展位',
                value: 'bespoke'
            }, {
                name: '已确定展位',
                value: 'completed'
            }]
        }
    },
    created: function () {
        /**面包屑 by li.xue 20180628*/
        loadBreadcrumb("展位管理", "-1");
        //table高度
        tableheight = tableheight10;
        //登录用户
        this.shiroData = shiroGlobal;
        this.searchClick('click');
        this.closeleft();
    },

    methods: {
        //企业详情跳转
        qyDetails: function (val) {
            var params = {
                id: val.qyid
            }
            loadDivParam("prediction/exhprediction_detail", params);
        },
        //表格查询事件
        searchClick: function (type) {
            //按钮事件的选择
            if (type == 'page') {
                this.tableData = [];
            } else {
                this.currentPage = 1;
            }
            var _self = this;
            _self.loading = true;//表格重新加载
            var params = {
                zwmc: this.searchForm.zwmc.replace(/%/g, "\\%"),
                qymc: this.searchForm.qymc.replace(/%/g, "\\%"),
                zwh: this.searchForm.zwh.replace(/%/g, "\\%"),
                zwzt: this.searchForm.zwzt.replace(/%/g, "\\%"),
                pageSize: this.pageSize,
                pageNum: this.currentPage
            }
            axios.post('/xfxhapi/zwjbxx/doSearchListQyByVO', params).then(function (res) {

                var tableTemp = new Array((this.currentPage - 1) * this.pageSize);
                this.tableData = tableTemp.concat(res.data.result.list);
                this.total = res.data.result.total;
                _self.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //清空查询条件
        clearClick: function () {
            this.searchForm.zwh = "";
            this.searchForm.zwzt = "";
            this.searchForm.qymc = "";
            this.searchForm.zwmc = "";
            this.searchClick('reset');
        },
        //表格重新加载数据
        loadingData: function () {
            var _self = this;
            _self.loading = true;
            setTimeout(function () {
                console.info("加载数据成功");
                _self.loading = false;
            }, 300);
        }
    }

})
