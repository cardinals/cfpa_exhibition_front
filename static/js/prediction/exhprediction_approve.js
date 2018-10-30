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
                gsmc: '',
                // yjdz: '',
                shzt: '01'
            },
            //审批表单
            approveForm: {
                shzt: -1,
                reserve1: ""
            },
            tableData: [],
            shiroData: [],//当前用户信息
            shztData: [],//审核状态下拉框
            selectIndex: '',
            isReject: false,//未通过flag
            previewTitle: '',
            previewImg: '',
            imgViewVisible: false,
            approveFormVisible: false,
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
        loadBreadcrumb("展会报名审核", "-1");
        //table高度
        tableheight = tableheight10;
        //登录用户
        this.shiroData = shiroGlobal;
        this.getShztData();//审核状态下拉框
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
                gsmc: this.searchForm.gsmc.replace(/%/g,"\\%"),
                // yjdz: this.searchForm.yjdz,
                shzt: this.searchForm.shzt,
                approveflag: 'y',
                pageSize: this.pageSize,
                pageNum: this.currentPage,
                orgUuid: this.shiroData.organizationVO.uuid,
                orgJgid: this.shiroData.organizationVO.jgid
            }
            axios.post('/xfxhapi/qyjbxx/page', params).then(function (res) {
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
            this.searchForm.gsmc = '';
            this.searchForm.yjdz = '';
            this.searchForm.shzt = '01';
            this.searchClick('reset');
        },
        //企业详情跳转
        qyDetails: function (val) {
            var params = {
                id: val.qyid
            }
            loadDivParam("prediction/exhprediction_detail", params);
        },
        //营业执照预览
        imgPreview: function (val) {
            this.previewTitle = val.zwgsmc;
            axios.get('/xfxhapi/qyjbxx/doFindJbxxById/' + val.qyid).then(function (res) {
                this.previewImg = res.data.result.yyzzBase64;
            }.bind(this), function (error) {
                console.log(error)
            })
            this.imgViewVisible = true;
        },
        //获取选中的行号（从0开始）
        showRow(row) {
            this.selectIndex = this.tableData.indexOf(row);
        },
        //审核操作列点击
        approveClick: function (val) {
            var params = {
                id: val.qyid
            }
            loadDivParam("prediction/exhprediction_approveSubmit", params);
            // this.approveForm = Object.assign({}, val);
            // axios.get('/xfxhapi/qyjbxx/doFindJbxxById/' + val.qyid).then(function (res) {
            //     this.approveForm.yyzzBase64 = res.data.result.yyzzBase64;
            // }.bind(this), function (error) {
            //     console.log(error)
            // })
            // //如果是未通过审核意见显示*代表必填
            // if (this.approveForm.shzt == '02')
            //     this.isReject = true;
            // this.approveFormVisible = true;
        },
        //审核提交事件
        approveSubmit: function (val) {
            if (val.shzt == '01') {
                this.$message({
                    message: "请选择审核状态",
                    type: "error",
                    showClose: true
                });
            } else if (this.isReject == true && val.reserve1 == null) {
                this.$message({
                    message: "请填写审核意见",
                    type: "error",
                    showClose: true
                });
                // } else if (validateBytes(val.reserve1, 36)) {
                //     this.$message({
                //         message: "字段超长，请重新输入",
                //         type: "error",
                //         showClose: true
                //     });
            } else {
                //审核状态改变才调用后台approveByVO方法
                if (val.shzt == this.tableData[this.selectIndex].shzt && val.reserve1 == this.tableData[this.selectIndex].reserve1) {
                    this.$message({
                        message: "审核状态及审核意见未改变",
                        type: "error",
                        showClose: true
                    });
                } else {
                    if (val.shzt == '02') {//未通过
                        val.sjzt = '04';
                    } else if (val.shzt == '03') {//已通过
                        val.sjzt = '05';
                    }
                    var params = {
                        qyid: val.qyid,
                        shzt: val.shzt,
                        sjzt: val.sjzt,
                        reserve1: val.reserve1,//审核意见
                        shrid: this.shiroData.userid,
                        shrmc: this.shiroData.realName,
                        shsj: '1'
                    };
                    axios.post('/xfxhapi/qyjbxx/updateByVO', params).then(function (res) {
                        if (res.data.result == 1) {
                            this.tableData[this.selectIndex].shzt = val.shzt;
                            if(this.tableData[this.selectIndex].shzt=='01'){
                                this.tableData[this.selectIndex].shztmc = '待审核';
                            }else if(this.tableData[this.selectIndex].shzt=='02'){
                                this.tableData[this.selectIndex].shztmc = '未通过';
                            }else if(this.tableData[this.selectIndex].shzt=='03'){
                                this.tableData[this.selectIndex].shztmc = '已通过';
                            }
                        }
                    }.bind(this), function (error) {
                        console.log(error)
                    })
                    this.approveFormVisible = false;
                }
            }
        },
        //审核状态为未通过时审核意见显示*代表必填
        radioChange: function () {
            if (this.approveForm.shzt == '02')
                this.isReject = true;
            else
                this.isReject = false;
        },
        closeDialog: function (val) {
            val.shzt = '';
            this.approveFormVisible = false;
        },
    },

})