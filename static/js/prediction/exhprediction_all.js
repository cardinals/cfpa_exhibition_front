//异步加载详情页
var shiroGlobal = "";
var realname = "";
var permissions = [];
//异步加载详情页
$(function () {
    axios.get('/xfxhapi/shiro').then(function (res) {
        shiroGlobal = res.data;
        if (res.data != null && res.data != "") {
            var flag = getQueryString("flag");
            if(flag){
                //动态加载main
                loadDiv(flag);
            }else{
                //动态加载main
                loadDiv("prediction/exhprediction_edit");
            }
            //用户权限
            for (var i in res.data.permissions) {
                permissions.push(res.data.permissions[i]);
            }
            realname = res.data.username;
            if (realname == null || realname == "") {
                realname = "欢迎您！"
            }
            vm.userForm.userid = res.data.userid;
            vm.userForm.usernameWord = res.data.username;
            vm.userForm.passwordWord = "admin123";
            document.querySelector("#realname").innerHTML = realname;
        } else {
            window.location.href = "/templates/login.html";
        }
    }.bind(this), function (error) {
        console.log(error)
    });
});

//axios默认设置cookie
axios.defaults.withCredentials = true;
var vm = new Vue({
    el: '#app_all',
    data: function () {
        var validatePwdAgain = (rule, value, callback) => {
            if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(value) == false) {
                callback(new Error("密码应为6-16位字母和数字组合"));
            } else if (value !== this.userForm.password) {
                callback(new Error("两次输入密码不一致"));
            } else {
                callback();
            }
        };
        return {
            dialogVisible: false,
            userForm: {
                usernameWord: "",//保存原用户名
                passwordWord: "",//仅用于显示
                userid: "",
                username: "",
                password: "admin123",
                passwordAgain: "admin123",
                messageCode: "",
                messageCodeReal: "",
                messageCodeText: "获取验证码",
                messageBtnFlag: false,
                //修改按钮文字
                usernameText: "修改",
                passwordText: "修改",
                //修改框标识位
                usernameFlag: false,
                passwordFlag: false,
            },
            time: 60,
            timer: "",
            
            userInforRules: {
                username: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '请填写正确的手机号码', trigger: 'blur' }
                ],
                messageCode: [
                    { type: "number", required: true, message: '请输入验证码', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/, message: '密码应为6-16位字母和数字组合', trigger: 'blur' }
                ],
                passwordAgain: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: validatePwdAgain, trigger: "blur" }
                ],
            },
        }
    },
    mounted: function () {
    },
    methods: {
        //退出登录
        logout: function () {
            $('#login-out-form')[0].submit();
        },
        showDialog: function () {
            this.dialogVisible = true;
            this.userForm.usernameText = "修改";
            this.userForm.passwordText = "修改";
            this.userForm.usernameFlag = false;
            this.userForm.passwordFlag = false;
            this.timer = null;
            this.userForm.messageCodeText = "获取验证码";
            this.userForm.messageBtnFlag = false;

            this.$nextTick(() => {
                this.$refs.userForm.resetFields();
            })

            this.getData();
        },
        getData: function () {
            this.userForm.username = this.userForm.usernameWord;
            this.userForm.password = this.userForm.passwordWord;
        },
        changeUsername: function () {
            if (this.userForm.usernameFlag == false) {
                this.userForm.usernameFlag = true;
                this.userForm.usernameText = "取消";
            } else if (this.userForm.usernameFlag == true) {
                this.userForm.usernameFlag = false;
                this.userForm.usernameText = "修改";
                this.userForm.username = this.userForm.usernameWord;
            }
        },
        changePassword: function () {
            if (this.userForm.passwordFlag == false) {
                this.userForm.passwordFlag = true;
                this.userForm.passwordText = "取消";
                this.userForm.password = "";
                this.userForm.passwordAgain = "";
            } else if (this.userForm.passwordFlag == true) {
                this.userForm.passwordFlag = false;
                this.userForm.passwordText = "修改";
                this.userForm.password = this.userForm.passwordWord;
            }
        },
        getMessageCode: function () {
            this.userForm.messageCode = "";
            this.userForm.messageCodeText = "发送中...";
            this.userForm.messageBtnFlag = true;

            axios.get('/xfxhapi/signin/getUsernameNum/' + this.userForm.username).then(function (res) {
                if (res.data.result != 0) {
                    this.$message({
                        message: '用户名已存在',
                        type: 'error'
                    });
                    this.userForm.messageCodeText = "获取验证码";
                    this.userForm.messageBtnFlag = false;
                } else {
                    axios.get('/xfxhapi/signin/sendMessage?phone=' + this.userForm.username).then(function (res) {
                        this.userForm.messageCodeReal = res.data.msg;
                        var count = this.time;
                        this.timer = setInterval(() => {
                            if (count == 0) {
                                clearInterval(this.timer);
                                this.timer = null;
                                this.userForm.messageCodeText = "获取验证码";
                                this.userForm.messageBtnFlag = false;
                            } else {
                                this.userForm.messageCodeText = count + "秒后获取"
                                count--;
                                this.userForm.messageBtnFlag = true;
                            }
                        }, 1000)
                    }.bind(this), function (error) {
                        console.log(error);
                    });
                }
            }.bind(this), function (error) {
                console.log(error)
            })


        },
        register: function () {
            if(!this.userForm.usernameFlag && !this.userForm.passwordFlag){
                this.$message({
                    showClose: true,
                    message: '用户名密码未修改！',
                    type: 'warning'
                });
                return;
            }
            this.$refs["userForm"].validate((valid) => {
                if (valid) {
                    var params = {
                        userid: this.userForm.userid
                    }
                    if(!this.usernameFlag){
                        params.username = this.userForm.username;
                    }
                    if(!this.passwordFlag){
                        params.password = this.userForm.password;
                    }
                    axios.post('/xfxhapi/account/updateByVO', params).then(function (res) {
                        var result = res.data.result;
                        if (result == 1) {
                            this.$message({
                                message: '修改成功，3秒后退出登录',
                                type: 'success'
                            });
                            var count = 3;
                            var timer = setInterval(() => {
                                if (count == 0) {
                                    this.logout();
                                } else {
                                    count--;
                                }
                            }, 1000);
                        } else {
                            this.$message({
                                message: '修改失败，请重试',
                                type: 'error'
                            });
                        }
                    }.bind(this), function (error) {
                        console.log(error)
                    })
                } else {
                  console.log('error submit!!');
                  return false;
                }
            });
        }
    },

})