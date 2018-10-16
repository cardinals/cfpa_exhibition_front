//axios默认设置cookie
axios.defaults.withCredentials = true;
var vue = new Vue({
    el: '#app',
    data: function () {
        return {
            //搜索表单
            searchForm: {
                id: "",
                username: "",
                zwgsmc: "",
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
            //修改密码是否显示
            editPasswordShow: false,
            //Dialog Title
            dialogTitle: "展商用户编辑",
            //选中的序号
            editIndex: -1,
            //修改界面是否显示
            editFormVisible: false,
            editLoading: false,
            editFormRules: {
                username: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { min: 11, max: 11, message: '用户名格式不正确', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                ],
            },
            //修改界面数据
            editForm: {
                userid: "",
                username: "",
                password: "",
                checkPass: "",
                roles: [],
            },
            editFormSelect: [],
            //登陆用户
            shiroData: ""
        }
    },
    created: function () {
		/**面包屑 by li.xue 20180628*/
        loadBreadcrumb("展商管理", "-1");
        this.shiroData = shiroGlobal;
        this.searchClick('click');
    },
    methods: {
        //表格查询事件
        searchClick: function(type) {
            //按钮事件的选择
            if(type == 'page'){
                this.tableData = [];
            }else{
                this.currentPage = 1;
            }
            var _self = this;
            _self.loading = true;//表格重新加载
            var params = {
                username: this.searchForm.username,
                zwgsmc: this.searchForm.zwgsmc,
                pageSize: this.pageSize,
                pageNum: this.currentPage
            }
            axios.post('/zhapi/qyjbxx/doFindZsxxByQyjbxx', params).then(function (res) {
                this.tableData = res.data.result;
                this.total = res.data.result.length;
                _self.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },

        //清空查询条件
        clearClick: function () {
            this.searchForm.id = "",
            this.searchForm.username = "",
            this.searchForm.zwgsmc = "",
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
        
        //表格重新加载数据
        loadingData: function () {
            var _self = this;
            _self.loading = true;
            setTimeout(function () {
                console.info("加载数据成功");
                _self.loading = false;
            }, 300);
        },

        //修改密码
        editPassword: function(){
            var flag = this.editPasswordShow;
            this.editPasswordShow = !flag;
        },

        //新增事件
        addClick: function () {
            this.dialogTitle = "展商用户新增";
            this.editPasswordShow = true;
            this.editFormVisible = true;
        },
        //表格修改事件
        editClick: function(val, index) {
            this.editIndex = index;
            this.dialogTitle = "展商用户编辑";
            this.editPasswordShow = false;
            this.editSearch(val);
            this.editFormVisible = true;
        },

        //重置密码
        resetClick: function(val, index){
            var params = {
                pkid: val.pkid,
                userid: val.userid
            }
            this.$confirm('是否将密码重置成“111111”?', '提示', {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning'
            }).then(() => {
                axios.post('/xfxhapi/user/doResetPassword', params).then(function(res) {
                    this.$message({
                        message: "密码重置成功",
                        type: "success"
                    });
                }.bind(this), function (error) {
                    console.log(error)
                })
            }).catch(() => {
                this.$message({
                type: 'info',
                message: '已取消重置'
                });          
            });
             
        },

        //修改时查询方法
        editSearch: function(val){
            //获取选择行主键
            var params = {
                pkid: val.pkid,
                deptid: "ZSYH"
            };
            axios.post('/xfxhapi/user/findByVO', params).then(function(res) {
                this.editForm = res.data.result[0];
                //密码、再次密码置空
                this.editForm.password = '';
                this.editForm.checkPass = '';
                //角色复选框赋值
                /** 展商用户不考虑角色
                var roles = [];
                for (var i = 0; i < this.editForm.roles.length; i++) {
                    roles.push(this.editForm.roles[i].rolename);
                }
                this.editForm.roles = roles;
                */
            }.bind(this), function (error) {
                console.log(error)
            }) 
        },

        //保存前校验
        validateSave: function(){
            if(this.editForm.username=="" || this.editForm.username==null) {
                this.$message.warning({
                    message: '请输入用户名！',
                    showClose: true
                });
                return false;
            }else if(this.editForm.username!="" && this.editForm.username!=null){
                var mobileReg = /^[1][3,4,5,7,8][0-9]{9}$/;
                if (!mobileReg.test(this.editForm.username)){
                    this.$message.warning({
                        message: '请输入正确手机号！',
                        showClose: true
                    });
                    return false;
                }
            }
            return true;
        },

        //编辑提交点击事件
        editSubmit: function(val) {
            if(this.validateSave()){
                if(this.editPasswordShow){
                    if(this.editForm.password=="" || this.editForm.password==null){
                        this.$message.warning({
                            message: '请输入密码！',
                            showClose: true
                        });
                        return false;
                    }else if(this.editForm.checkPass=="" || this.editForm.checkPass==null){
                        this.$message.warning({
                            message: '请输入确认密码！',
                            showClose: true
                        });
                        return false;
                    }else if(this.editForm.password!=this.editForm.checkPass){
                        this.$message.warning({
                            message: '两次密码输入不一致！',
                            showClose: true
                        });
                        return false;
                    }
                }
                if(this.dialogTitle == "展商用户新增"){
                    axios.get('/xfxhapi/account/getNum/' + this.editForm.username).then(function(res){
                        if(res.data.result != 0){
                            this.$message({
                                message: "用户名已存在!",
                                type: "error"
                            });
                        }else{
                            var params = {
                                username: val.username,
                                password: val.password,
                                deptid: "ZSYH"
                            }
                            axios.post('/xfxhapi/user/insertByVO', params).then(function(res){
                                var addData = res.data.result;
                                this.tableData.unshift(addData);
                                this.total = this.tableData.length;
                            }.bind(this),function(error){
                                console.log(error)
                            })
                            this.editFormVisible = false;
                        }
                    }.bind(this),function(error){
                        console.log(error)
                    })
                }else if(this.dialogTitle == "展商用户编辑"){
                    var params = {
                        pkid: val.pkid,
                        userid: val.userid,
                        username: val.username,
                        deptid: "ZSYH",
                        alterId: this.shiroData.userid,
                        alterName: this.shiroData.realName
                    }
                    if(this.editPasswordShow){
                        params.password = val.password;
                    }
                    axios.post('/xfxhapi/user/updateByVO', params).then(function (res){
                        var result = res.data.result;
                        this.tableData[this.editIndex].username = result.username;
                        this.editFormVisible = false;
                        this.$message({
                            message: "编辑成功！",
                            type: "success"
                        });
                    }.bind(this), function (error) {
                        console.log(error)
                    })
                }
            }
        },
        
        //获取复选框选中值
        getCheckValue(val){
            this.editFormSelect = val;
        },
        
        //删除所选，批量删除
        removeSelection: function () {
            this.$confirm('确认删除选中信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.post('/xfxhapi/user/deleteByIds', this.multipleSelection).then(function (res) {
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
        }
    },
    
})