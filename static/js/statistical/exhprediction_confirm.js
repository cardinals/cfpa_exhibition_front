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
                qrsj_start: '',
                qrsj_end: '',
                qrzt: ''
            },
            dataRange: [],
            tableData: [],//列表信息
            shiroData: [],//当前用户信息
            tableQrzt: '',
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
        loadBreadcrumb("按确认信息统计", "按确认信息统计详情");
        if (getQueryString("qrsj_start") != null && getQueryString("qrsj_start") != '' && getQueryString("qrsj_start") != undefined &&
            getQueryString("qrsj_end") != null && getQueryString("qrsj_end") != '' && getQueryString("qrsj_end") != undefined) {
            this.dataRange = [getQueryString("qrsj_start"), getQueryString("qrsj_end")];
        }
        this.searchForm.qrzt = getQueryString("qrzt");
        tableheight = tableheight10;
        this.shiroData = shiroGlobal;
        this.searchClick('click');//条件查询
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
            this.searchForm.qrsj_start = '';
            this.searchForm.qrsj_end = '';
            if (this.dataRange != null && this.dataRange.length > 0) {
                var date = new Date(this.dataRange[0]);
                this.searchForm.qrsj_start = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                var date2 = new Date(this.dataRange[1]);
                this.searchForm.qrsj_end = date2.getFullYear() + '-' + (date2.getMonth() + 1) + '-' + date2.getDate() + ' ' + date2.getHours() + ':' + date2.getMinutes() + ':' + date2.getSeconds();
            }
            this.tableQrzt = this.searchForm.qrzt;
            var params = {
                qrsj_start: this.searchForm.qrsj_start,
                qrsj_end: this.searchForm.qrsj_end,
                qrzt: this.searchForm.qrzt,
                pageSize: this.pageSize,
                pageNum: this.currentPage,
                orgUuid: this.shiroData.organizationVO.uuid,
                orgJgid: this.shiroData.organizationVO.jgid
            }
            axios.post('/xfxhapi/qyjbxx/ifConfirmedTjfxDetail', params).then(function (res) {
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
            if (getQueryString("qrsj_start") != null && getQueryString("qrsj_start") != '' && getQueryString("qrsj_start") != undefined &&
                getQueryString("qrsj_end") != null && getQueryString("qrsj_end") != '' && getQueryString("qrsj_end") != undefined) {
                this.dataRange = [getQueryString("qrsj_start"), getQueryString("qrsj_end")];
            }
            this.searchForm.qrzt = getQueryString("qrzt");
            this.searchClick('reset');
        }
    }
})