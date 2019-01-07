//axios默认设置cookie
axios.defaults.withCredentials = true;
var vue = new Vue({
    el: '#app',
    data: function () {
        return {
            //搜索表单
            searchForm: {
                zgmc:'',
            },
            tableData: [],//列表信息
            shiroData: [],//当前用户信息
            zgData:[],//展馆名称
            selectedZg:[],//选中展馆
            //显示加载中样
            loading: false,
            //当前页
            currentPage: 1,
            //分页大小
            pageSize: 10,
            //总记录数
            total: 0,
        }
    },
    created: function () {
        loadBreadcrumb("展位管理", "展位数据分析");
        //table高度
        tableheight = tableheight10;
        //登录用户
        this.shiroData = shiroGlobal;
        this.getZgmc();
        this.searchClick();
    },

    methods: {
        //获取展馆名称
        getZgmc: function (){
            axios.get('/xfxhapi/zgjbxx/getZgmc').then(function (res) {
                this.zgData = res.data.result;
                this.zgData.push({
                    zgmc:"W3"
                });
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //表格查询事件
        searchClick: function () {
            this.loading = true;//表格重新加载
            var param={
                zgList:this.selectedZg,
                pageSize: this.pageSize,
                pageNum: this.currentPage
            }
            axios.post('/xfxhapi/zwjbxx/doFindQyZwNumDesc', param).then(function (res) {
                var tableTemp = new Array((this.currentPage - 1) * this.pageSize);
                this.tableData = tableTemp.concat(res.data.result.list);
                this.total = res.data.result.total;
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //重置
        clearClick: function () {
            this.selectedZg = [];
            for(var i in this.zgData){
                this.selectedZg.push(this.zgData[i].zgmc);
            }
            this.searchClick();
        },
    }
})