//异步加载详情页
var shiroGlobal = "";
var realname = "";
var permissions = [];
//异步加载详情页
$(function () {
    axios.get('/xfxhapi/shiro').then(function (res) {
        shiroGlobal = res.data;
        if (res.data != null && res.data != "") {
            //动态加载main
            loadDiv("prediction/exhprediction_edit");

            //用户权限
            for (var i in res.data.permissions) {
                permissions.push(res.data.permissions[i]);
            }
            realname = res.data.username;
            if (realname == null || realname == "") {
                realname = "Welcome"
            }
            vm.userForm.userid = res.data.userid;
            vm.userForm.usernameWord = res.data.username;
            vm.userForm.passwordWord = "admin123";
            document.querySelector("#realname").innerHTML = realname;
        } else {
            window.location.href = "/templates/login_ENG.html";
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
                callback(new Error("Password must be 6-16-bit alphanumeric combination."));
            } else if (value !== this.userForm.password) {
                callback(new Error("The two entries do not match. Please fill in again."));
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
                messageCodeText: "Get Verification Code",
                messageBtnFlag: false,
                //修改按钮文字
                usernameText: "edit",
                passwordText: "edit",
                //修改框标识位
                usernameFlag: false,
                passwordFlag: false,
            },
            time: 60,
            timer: "",
            
            userInforRules: {
                username: [
                    { required: true, message: 'Please input a email.', trigger: 'blur' },
                    { pattern: /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/, message: 'The email format is not correct.', trigger: 'blur' }
                ],
                messageCode: [
                    { type: "number", required: true, message: 'Please input the verification code.', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: 'Please input a password.', trigger: 'blur' },
                    { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/, message: 'Password must be 6-16-bit alphanumeric combination.', trigger: 'blur' }
                ],
                passwordAgain: [
                    { required: true, message: 'Please input the password again', trigger: 'blur' },
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
            this.userForm.usernameText = "edit";
            this.userForm.passwordText = "edit";
            this.userForm.usernameFlag = false;
            this.userForm.passwordFlag = false;
            this.timer = null;
            this.userForm.messageCodeText = "Get Verification Code";
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
                this.userForm.usernameText = "cancel";
            } else if (this.userForm.usernameFlag == true) {
                this.userForm.usernameFlag = false;
                this.userForm.usernameText = "edit";
                this.userForm.username = this.userForm.usernameWord;
            }
        },
        changePassword: function () {
            if (this.userForm.passwordFlag == false) {
                this.userForm.passwordFlag = true;
                this.userForm.passwordText = "cancel";
                this.userForm.password = "";
                this.userForm.passwordAgain = "";
            } else if (this.userForm.passwordFlag == true) {
                this.userForm.passwordFlag = false;
                this.userForm.passwordText = "edit";
                this.userForm.password = this.userForm.passwordWord;
            }
        },
        getMailCode: function () {
            this.userForm.messageCode = "";
            this.userForm.messageCodeText = "sending...";
            this.userForm.messageBtnFlag = true;

            axios.get('/xfxhapi/signin/getMailNumENG/' + this.userForm.username).then(function (res) {
                if (res.data.result != 0) {
                    this.$message({
                        message: 'The email is registered!',
                        type: 'error'
                    });
                    this.userForm.messageCodeText = "Get Verification Code";
                    this.userForm.messageBtnFlag = false;
                } else {
                    axios.get('/xfxhapi/signin/sendMail?mail=' + this.userForm.username).then(function (res) {
                        this.userForm.messageCodeReal = res.data.msg;
                        var count = this.time;
                        this.timer = setInterval(() => {
                            if (count == 0) {
                                clearInterval(this.timer);
                                this.timer = null;
                                this.userForm.messageCodeText = "Get Verification Code";
                                this.userForm.messageBtnFlag = false;
                            } else {
                                this.userForm.messageCodeText = count + "seconds later"
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
                    message: 'The username and password did not change!',
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
                                message: 'Modify success, log out after 3 seconds',
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
                                message: 'Modify the failure, please try again',
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