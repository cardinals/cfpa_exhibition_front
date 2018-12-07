//axios默认设置cookie
axios.defaults.withCredentials = true;
var vue = new Vue({
    el: '#app',
    data: function () {
        return {
            //搜索表单
            searchForm: {
                id: "",
                username: ""
                // term: new Array()
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
            //序号
            indexData: 0,
            //详情页是否显示
            itemFormVisible: false,
            //Dialog Title
            dialogTitle: "邮箱编辑",
            //选中的序号
            editIndex: -1,
            //修改界面是否显示
            editFormVisible: false,
            editLoading: false,

            //修改界面数据
            editForm: {
                username: "",
                password: "",
                encoding: "",
                host: "",
                port: "",
                protocol: ""
            },
            //表单验证
            editFormRules: {

                username: [
                    { required: true, message: '请输入邮箱名称', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
                    { pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/ , message: '仅支持数字和字母组合的邮箱地址',trigger: 'blur' },
                    { min: 1, max: 30, message: '最多输入30个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入邮箱密码', trigger: 'blur' },
                    { pattern: /^[0-9A-Za-z]{1,30}$/, message: '邮箱密码应为1-30位字母、数字', trigger: 'blur' },
                ],
                port: [
                    // { required: true, message: "请输入端口号(仅为数字类型)", trigger: "blur" },
                    { pattern: /^\d{2,4}$/, message: '端口号应为2-4位数字',trigger: 'blur'},],

                encoding:[
                    { pattern: /^[0-9A-Za-z]{1,10}$/, message: '编码应为1-10位字母、数字', trigger: 'blur' }
                ],

                host:[
                    { pattern: /^[0-9A-Za-z]{1,16}$/, message: 'SMTP应为1-16位字母、数字', trigger: 'blur' }
                ],

                protocol:[
                    { pattern: /^[0-9A-Za-z]{1,5}$/, message: '授权码应为1-5位字母、数字', trigger: 'blur' }
                ]   

            },

            editFormSelect: [],
            editRoles: [],
            roleDetailVisible: false,
            roleDetailList: [],
            roleDetailSelect: [],
            //操作方式
            operation: "insert",
            //登陆用户
            shiroData: "",
            //修改密码是否显示
            editPasswordShow: false,
            //登陆用户名-旧
            usernameOld: "",
        }
    },
    created: function () {
        /**面包屑 */
        loadBreadcrumb("邮箱管理", "-1");
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
                username: this.searchForm.username.replace(/%/g, "\\%"),
                // term: this.searchForm.term[0],
                pageSize: this.pageSize,
                pageNum: this.currentPage
            }
            //邮箱管理-表格
            axios.post('/xfxhapi/mail/findByVO', params).then(function (res) {
                this.tableData = res.data.result;
                this.total = res.data.result.length;
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },

        //清空查询条件
        clearClick: function () {
            this.searchForm.id = "",
                this.searchForm.username = "",
                this.searchClick('reset');
        },
        //表格勾选事件
        selectionChange: function (val) {
            for (var i = 0; i < val.length; i++) {
                var row = val[i];
            }
            this.multipleSelection = val;
            console.info(val);
        },

        //增加、修改
        dateChangebirthday(val) {
            this.editForm.birth = val;
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

        //新增事件
        addClick: function () {
            this.dialogTitle = "邮箱新增";
            this.editPasswordShow = true;
            this.editFormVisible = true;
            this.editForm={}
        },
        //表格修改事件
        editClick: function (val, index) {
            this.editIndex = index;
            this.dialogTitle = "邮箱编辑";
            this.editPasswordShow = false;
            this.editSearch(val);
            this.editFormVisible = true;
        },

        //修改密码
        editPassword: function () {
            var flag = this.editPasswordShow;
            this.editPasswordShow = !flag;
        },

        
        //修改时查询方法
        editSearch: function (val) {
            //获取选择行主键
            var params = {
                uuid: val.uuid
            };
            axios.post('/xfxhapi/mail/findByVO', params).then(function (res) {
                this.editForm = res.data.result[0];
            }.bind(this), function (error) {
                console.log(error)
            })

        },

        //编辑提交点击事件
        editSubmit: function (val) {
            this.$refs["editForm"].validate((valid) => {
             
                if (valid) {

                    var params = {
                        username: val.username,
                        password: val.password,
                        encoding: val.encoding,
                        host: val.host,
                        port: val.port,
                        protocol: val.protocol
                        // term: val.term,
                    }
                    if (this.dialogTitle == "邮箱新增") {

                        axios.post('/xfxhapi/mail/insertByVO', params).then(function (res) {
                            // res.data.result.term = new Date();
                            this.tableData.unshift(res.data.result);
                            this.total = this.tableData.length;
                        }.bind(this), function (error) {
                            console.log(error)
                        })
                        this.editFormVisible = false;

                    } else if (this.dialogTitle == "邮箱编辑") {

                        params.uuid = val.uuid;
                        params.username = val.username;
                        params.password = val.password;
                        params.encoding = val.encoding;
                        params.host = val.host;
                        params.port = val.port;
                        params.protocol = val.protocol;
                        // params.term = val.term;
                        params.alterId = this.shiroData.userid;
                        params.alterName = this.shiroData.realName;
                        this.editSubmitUpdateDB(params);
                    }

                } else {
                    console.log('error save!!');
                    return false;
                }
            });
        },

        //修改方法
        editSubmitUpdateDB: function (params) {


            axios.post('/xfxhapi/mail/updateByVO', params).then(function (res) {

                var result = res.data.result;
                this.tableData[this.editIndex].username = result.username;
                this.tableData[this.editIndex].password = result.password;
                this.tableData[this.editIndex].encoding = result.encoding;
                this.tableData[this.editIndex].host = result.host;
                this.tableData[this.editIndex].port = result.port;
                this.tableData[this.editIndex].protocol = result.protocol;
                // this.tableData[this.editIndex].term = new Date();
                this.editFormVisible = false;

            }.bind(this), function (error) {
                console.log(error)
            })
        },

        //获取复选框选中值
        getCheckValue(val) {
            this.editFormSelect = val;
        },

        //删除所选，批量删除
        removeSelection: function () {
            if (this.multipleSelection.length < 1) {
                this.$message({
                    message: "请至少选中一条记录",
                    type: "warning"
                });
                return;
            }
            this.$confirm('确认删除选中信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.post('/xfxhapi/mail/deleteByList', this.multipleSelection).then(function (res) {

                    this.$message({
                        message: "成功删除" + res.data.result + "条用户信息",
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
        //查看详情
        closeDialog: function (val) {
            this.editFormVisible = false;
            this.$refs["editForm"].resetFields();
        },

    },

})