//axios默认设置cookie
axios.defaults.withCredentials = true;
var vue = new Vue({
    el: '#app',
    data: function () {
        return {
            //搜索表单
            searchForm: {
                //zwmc: "",
                //zwzt: "",
                //qymc: ""
                zwh: "",
                qymc: "",
                zwlb: "",
                cklx: "",
                zwzt: ""
            },
            //导出条件
            exportForm: {
                zwh: "",
                qymc: "",
                zwlb: "",
                cklx: "",
                zwzt: ""
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
            }],
            //出口类型下拉框
            cklxData: [],
            //展位类型下拉框
            zwlbData: [{
                name:'标准展位'
                
            },{
                name:'光地'
                
            }],
        }
    },
    created: function () {
        /**面包屑 by li.xue 20180628*/
        loadBreadcrumb("展位管理", "-1");
        //table高度
        tableheight = tableheight10;
        //登录用户
        this.shiroData = shiroGlobal;
        //展位类型
        //this.getZwlb();
        //出口类型
        this.getCklx();
        this.searchClick('click');
        /**delete by yushch 20181218 前台报错暂时注掉 */
        //this.closeleft();
    },

    methods: {
        //展位类别下拉框
        /*光地区分室内室外，不查代码集
        getZwlb: function () {
            axios.get('/xfxhapi/codelist/getCodetype/ZWLX').then(function (res) {
                this.zwlbData = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        */
        //出口类型下拉框
        getCklx: function () {
            axios.get('/xfxhapi/codelist/getCodetype/CKLX').then(function (res) {
                this.cklxData = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
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
                zwh: this.searchForm.zwh.replace(/%/g, "\\%"),
                qymc: this.searchForm.qymc.replace(/%/g, "\\%"),
                zwlb: this.searchForm.zwlb.replace(/%/g, "\\%"),
                cklx: this.searchForm.cklx.replace(/%/g, "\\%"),
                zwzt: this.searchForm.zwzt.replace(/%/g, "\\%"),
                pageSize: this.pageSize,
                pageNum: this.currentPage
            }
            axios.post('/xfxhapi/zwjbxx/doSearchListQyByVO', params).then(function (res) {

                var tableTemp = new Array((this.currentPage - 1) * this.pageSize);
                this.tableData = tableTemp.concat(res.data.result.list);
                this.total = res.data.result.total;
                _self.loading = false;
                //add by yushch 20181219 查询成功后保存查询条件到变量用作导出条件
                this.exportForm.zwh = this.searchForm.zwh.replace(/%/g, "\\%");
                this.exportForm.qymc = this.searchForm.qymc.replace(/%/g, "\\%");
                this.exportForm.zwlb = this.searchForm.zwlb.replace(/%/g, "\\%");
                this.exportForm.cklx = this.searchForm.cklx.replace(/%/g, "\\%");
                this.exportForm.zwzt = this.searchForm.zwzt.replace(/%/g, "\\%");
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //清空查询条件
        clearClick: function () {
            this.searchForm.zwh = "";
            this.searchForm.zwzt = "";
            this.searchForm.qymc = "";
            this.searchForm.zwlb = "";
            this.searchForm.cklx = "";
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
        },
        //展位管理导出功能 add by yushch 20181219
        exportClick: function () {
            var param = this.exportForm.zwh + "," + this.exportForm.zwzt + "," + this.exportForm.qymc + "," + this.exportForm.zwlb + "," + this.exportForm.cklx;
            window.open("/xfxhapi/zwjbxx/doExport/" + param);
        },
        //展位分析功能 add by yushch 20181228
        analysisClick: function () {
            loadDivParam("venue/position_analysis");
        },
        //取消指定
        cancleVenue: function (val) {
            this.$confirm('展位 ' + val.zwh + ' 确定取消指定?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var params = {
                    uuid: val.uuid
                }
                axios.post('/xfxhapi/zwjbxx/doCancelByVO', params).then(function (res) {
                    if (res.data.result.qyid == null && res.data.result.zwzt == 'normal') {
                        this.$message.success('展位 ' + res.data.result.zwh + ' 已成功取消指定');
                        this.searchClick('page');
                    }
                }.bind(this), function (error) {
                    console.log(error)
                })
            }).catch(() => {
                // this.$message.info('已取消删除');
            });
        },
        //更改字体颜色
        changeFontColor: function(val){
            if(val.zwzt == 'normal'){
                return 'color:#e40613';
            }else if(val.zwzt == 'bespoke'){
                return 'color:#f7962f';
            }else if(val.zwzt == 'completed'){
                return 'color:#42D885';
            }
        },
        //更改付款状态
        changePaid: function (val,operation) {
            //完成付款
            if(operation == '1'){
                this.$confirm('展位 ' + val.zwh + ' 确定修改展位状态为【已确定展位】?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var params = {
                        uuid: val.uuid,
                        zwzt:'completed',
                    }
                    axios.post('/xfxhapi/zwjbxx/changePaid', params).then(function (res) {
                        if (res.data.result.zwzt == 'completed') {
                            this.$message.success('展位 ' + res.data.result.zwh + ' 展位状态修改成功');
                            this.searchClick('page');
                        }else{
                            this.$message.error('展位 ' + res.data.result.zwh + ' 展位状态修改失败');
                            this.searchClick('page');
                        }
                    }.bind(this), function (error) {
                        console.log(error)
                    })
                }).catch(() => {
                    // this.$message.info('已取消删除');
                });
            }else{//取消付款
                this.$confirm('展位 ' + val.zwh + ' 确定修改展位状态为【已预定展位】?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var params = {
                        uuid: val.uuid,
                        zwzt:'bespoke',
                    }
                    axios.post('/xfxhapi/zwjbxx/changePaid', params).then(function (res) {
                        if (res.data.result.zwzt == 'bespoke') {
                            this.$message.success('展位 ' + res.data.result.zwh + ' 展位状态修改成功');
                            this.searchClick('page');
                        }else{
                            this.$message.error('展位 ' + res.data.result.zwh + ' 展位状态修改失败');
                            this.searchClick('page');
                        }
                    }.bind(this), function (error) {
                        console.log(error)
                    })
                }).catch(() => {
                    // this.$message.info('已取消删除');
                });
            }
            
        },
    }

})
