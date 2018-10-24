var vm = new Vue({
    el: "#app",
    data: {
        //form标识
        loginFlag: true,
        regFlag: false,
        FUAFlag: false,
        FUBFlag: false,
        FPAFlag: false,
        FPBFlag: false,
        FPCFlag: false,
        FPDFlag: false,
        formFlag: "loginFlag",
        //登录
        username: "",
        password: "",
        src: "/xfxhapi/imageCode",
        validateCode: "",
        messages: "",
        unscid: "",
        loginType: "InfoCollect",
        //英文版登陆
        ENcomfrom: "ENG",
        //管理员登录
        GLYusername: "",
        GLYpassword: "",
        GLYsrc: "/xfxhapi/imageCode",
        GLYvalidateCode: "",
        GLYmessages: "",
        GLYloginType: "MyShiro",
        //注册
        time: 60,
        timer: null,
        mobile: "",
        messageCode: "",
        messageCodeReal: "",

        mail: "",
        mailCode: "",
        mailCodeReal: "",
        mailCodeText: "Get Verification Code",
        //获取验证码 
        // messageCodeText: "Get Verification Code",
        password1: "",
        password2: "",
        //注册校验标识
        // mobileAlertFlag: false,
        mailAlertFlag: false,
        // messageCodeAlertFlag: false,
        mailCodeAlertFlag: false,
        password1TipFlag: false,
        password1AlertFlag: false,
        password2AlertFlag: false,
        //忘记用户名
        FUmail: "",
        FUmailCode: "",
        FUmailCodeReal: "",
        FUmailCodeText: "Get Verification Code",
        FUtimer: null,
        FUusername: "18904047625",
        FUmessageCode: "",
        FUmessageCodeReal: "",
        FUmessageCodeText: "Get Verification Code",
        FUpassword: "",
        FUsrc: "/xfxhapi/imageCode",
        FUvalidateCode: "",
        //忘记密码
        FPBmail: "",
        FPBmailCode: "",
        FPBmailCodeReal: "",
        FPBmailCodeText: "Get Verification Code",
        FPBtimer: null,
        FPCmobile: "",
        FPCmessageCode: "",
        FPCmessageCodeReal: "",
        FPCmessageCodeText: "Get Verification Code",
        FPCtimer: null,
        FPDusername: "",
        FPDpassword1: "",
        FPDpassword2: "",
        FPDregisterData: "",
        //提交校验标识
        FPDpassword1TipFlag: false,
        FPDpassword1AlertFlag: false,
        FPDpassword2AlertFlag: false,
    },
    created: function () {
        var reg = new RegExp("(^|&)msg=([^&]*)(&|$)",'i');
        var r = window.location.search.substr(1).match(reg);
        var msg = "";
        if(r != null){
            msg = unescape(r[2]);
        }
        if(msg.indexOf("UnknownAccountException") > -1){
            alert("Account does not exist！");
        }else if(msg.indexOf("IncorrectCredentialsException") > -1){
            alert("The password is incorrect！");
        }else if(msg.indexOf("ExcessiveAttemptsException") > -1){
            alert("Password entered more than 5 errors！");
        }else if(msg.indexOf("kaptchaValidateFailed") > -1){
            alert("The verification code error！");
        }
        if(msg != ""){
            history.replaceState(null, null, top.location.href.substr(0,top.location.href.indexOf("?")));
        }

        axios.get('/xfxhapi/shiro').then(function (res) {
            if (res.data != null && res.data.username != null && res.data.username != "") {
                window.location.href = "../templates/prediction/exhprediction_all_ENG.html";
            }
        }.bind(this), function (error) {
            console.log(error);
        });
    },
    mounted: function () {
        $('#username').focus();
    },
    methods: {
        //通用方法
        reset: function () {
            this.username = "";
            this.password = "";
        },
        // showForm: function (flag) {
        //     if (flag == 'loginFlag') {
        //         this.loginFlag = true;
        //         this.regFlag = false;
        //     } else if (flag == 'regFlag') {
        //         this.loginFlag = false;
        //         this.regFlag = true;
        //     } else if (flag == 'FUFlag') {
        //         this.FUFlag = true;
        //         this.loginFlag = false;
        //         this.regFlag = false;
        //         $('#FUusername').attr('disabled', 'disabled');
        //     }
        // },
        changeForm: function (flag) {
            if (flag == 'loginFlag') {
            } else if (flag == 'regFlag') {
            } else if (flag == 'FUAFlag') {
                this.FUmail = "";
                this.FUmailCode = "";
            } else if (flag == 'FUBFlag') {
                $('#FUusername').attr('disabled', 'disabled');
                this.FUmessageCode = "";
                this.FUpassword = "";
                this.FUvalidateCode = "";
            } else if (flag == 'FPBFlag') {
                this.FPBmail = "";
                this.FPBmailCode = "";
                this.FPBmailCodeReal = "";
                this.FPBmailCodeText = "Get Verification Code";
                this.FPBtimer = null;
            } else if (flag == 'FPDFlag') {
                this.FPDusername = "";
                this.FPDpassword1 = "";
                this.FPDpassword2 = "";
            } else if (flag == 'bakFlag') {
                // 未保存的数据将丢失，确定返回吗？
                var r = confirm("Unsaved data will be lost. Do you want to return?");
                if (r == false) {
                    return;
                }
            }
            this.formFlag = flag;
        },
        //用户登录
        login: function () {
            if (this.username == null || this.username == '') {
                //用户名不能为空！ 
                alert("User name can not be empty!")
            } else if (this.password == null || this.password == '') {
                //密码不能为空！ 
                alert("The password can not be empty!")
            } else if (this.validateCode == null || this.validateCode == '') {
                //验证码不能为空！ 
                alert("The verification code can not be empty!")
            } else {
                $('#login-form').submit();
            }
        },
        reloadCode: function () {
            $('#checkCode').attr('src', '/xfxhapi/imageCode?' + ((new Date()).valueOf()));
        },
        //注册
        mailCheck: function () {
            if (!(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/.test(this.mail))) {
                // 邮箱格式不正确
                this.mailAlertFlag = true;
                return false;
            } else {
                this.mailAlertFlag = false;
                return true;
            }
        },
        getMailCode: function () {
            this.mailCode = "";
            if (this.mailCheck()) {
                this.mailCodeText = "Sending...";
                $('#mail-btn').attr('disabled', 'disabled');
                axios.get('/xfxhapi/signin/getMailNumENG/' + this.mail.replace(".", "_")).then(function (res) {
                    if (res.data.result != 0) {
                        // 该邮箱已注册！
                        alert("The email is registered!");
                        this.mailCodeText = "Get Verification Code";
                        $('#mail-btn').removeAttr("disabled");
                    } else {
                        axios.get('/xfxhapi/signin/sendMailEng?mail=' + this.mail).then(function (res) {
                            this.mailCodeReal = res.data.msg;
                            var count = this.time;
                            this.timer = setInterval(() => {
                                if (count == 0) {
                                    clearInterval(this.timer);
                                    this.timer = null;
                                    this.mailCodeText = "Get Verification Code";
                                    $('#mail-btn').removeAttr("disabled");
                                } else {
                                    this.mailCodeText = count + "seconds later"
                                    count--;
                                    $('#mail-btn').attr('disabled', 'disabled');
                                }
                            }, 1000)
                        }.bind(this), function (error) {
                            console.log(error);
                        });
                    }
                }.bind(this), function (error) {
                    console.log(error);
                });
            }
        },
        mailCodeCheck: function () {
            if (!(/^[0-9a-zA-Z]{6}$/.test(this.mailCode))) {
                this.mailCodeAlertFlag = true;
                return false;
            } else {
                this.mailCodeAlertFlag = false;
                return true;
            }
        },
        password1Check: function () {
            if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.password1))) {
                this.password1TipFlag = false;
                this.password1AlertFlag = true;
                return false;
            } else {
                this.password1TipFlag = false;
                this.password1AlertFlag = false;
                return true;
            }
        },
        password1Tip: function () {
            this.password1TipFlag = true;
            this.password1AlertFlag = false;
        },
        password2Check: function () {
            if (this.password1 !== this.password2) {
                this.password2AlertFlag = true;
                return false;
            } else {
                this.password2AlertFlag = false;
                return true;
            }
        },
        register: function () {
            this.mailCheck();
            this.mailCodeCheck();
            this.password1Check();
            this.password2Check();
            if (this.mailCheck() && this.mailCodeCheck() && this.password1Check() && this.password2Check() && this.messageCode == this.messageCodeReal) {

                var params = {
                    username: this.mail,
                    password: this.password1,
                    usertype: "ENG",
                    deptid: "ZSYH"
                }
                axios.post('/xfxhapi/signin/insertByVO', params).then(function (res) {
                    //注册成功！ 
                    alert("Registration is successful!");
                    this.username = this.mail;
                    this.password = this.password1;
                    this.changeForm('loginFlag');
                }.bind(this), function (error) {
                    console.log(error)
                })
            }
        },
        //忘记用户名
        FUmailCheck: function () {
            if (!(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/.test(this.FUmail))) {
                // 邮箱格式不正确
                alert("The email format is not correct");
                return false;
            } else {
                return true;
            }
        },
        getFUMailCode: function () {
            this.FUmailCode = "";
            if (this.FUmailCheck()) {
                this.FUmailCodeText = "Sending...";
                $('#FUmail-btn').attr('disabled', 'disabled');
                axios.get('/xfxhapi/signin/getMailNum/' + this.FUmail.replace(".", "_")).then(function (res) {
                    if (res.data.result == 0) {
                        // 该邮箱未注册！
                        alert("The email is not registered!");
                        this.FUmailCodeText = "Get Verification Code";
                        $('#FUmail-btn').removeAttr("disabled");
                    } else if (res.data.result == 1) {
                        axios.get('/xfxhapi/signin/sendMailEng?mail=' + this.FUmail).then(function (res) {
                            this.FUmailCodeReal = res.data.msg;
                            var count = this.time;
                            this.timer = setInterval(() => {
                                if (count == 0) {
                                    clearInterval(this.timer);
                                    this.timer = null;
                                    this.FUmailCodeText = "Get Verification Code";
                                    $('#FUmail-btn').removeAttr("disabled");
                                } else {
                                    this.FUmailCodeText = count + "seconds later"
                                    count--;
                                    $('#FUmail-btn').attr('disabled', 'disabled');
                                }
                            }, 1000)
                        }.bind(this), function (error) {
                            console.log(error);
                        });
                    }
                }.bind(this), function (error) {
                    console.log(error);
                });
            }
        },
        FUIdentify: function () {
            if (this.FUmail == null || this.FUmail == '') {
                alert("The email can not be empty!")
            } else if (this.FUmailCode == null || this.FUmailCode == '') {
                alert("The verification code can not be empty!")
            } else {
                if (this.FUmailCode == this.FUmailCodeReal) {
                    axios.get('/xfxhapi/signin/getMailNum/' + this.FUmail.replace(".", "_")).then(function (res) {
                        if (res.data.result == 0) {
                            alert("The email is not registered!");
                        } else if (res.data.result == 1) {
                            axios.get('/xfxhapi/signin/getUsernameByMail/' + this.FUmail.replace(".", "_")).then(function (res) {
                                alert("User name back to success!");
                                this.username = res.data;
                                this.changeForm('loginFlag');
                            }.bind(this), function (error) {
                                console.log(error);
                            });
                        }
                    }.bind(this), function (error) {
                        console.log(error);
                    });

                } else {
                    //验证码输入错误，请核对后再试 
                    alert("Verification code input error, please check and try again");
                }
            }
        },
        //作废
        getFUMessageCode: function () {
            axios.get('/xfxhapi/signin/sendMessage?phone=' + this.FUusername).then(function (res) {
                this.FUmessageCodeReal = res.data.msg;
                var count = this.time;
                this.FUtimer = setInterval(() => {
                    if (count == 0) {
                        clearInterval(this.FUtimer);
                        this.FUtimer = null;
                        this.FUmessageCodeText = "Get Verification Code";
                        $('#FUmobile-btn').removeAttr("disabled");
                    } else {
                        this.FUmessageCodeText = count + "seconds later"
                        count--;
                        $('#FUmobile-btn').attr('disabled', 'disabled');
                    }
                }, 1000)
            }.bind(this), function (error) {
                console.log(error);
            });
        },
        reloadFUCode: function () {
            $('#FUcheckCode').attr('src', '/xfxhapi/imageCode?' + ((new Date()).valueOf()));
        },
        FUlogin: function () {
            if (this.FUusername == null || this.FUusername == '') {
                alert("User name can not be empty!")
            } else if (this.FUmessageCode == null || this.FUmessageCode == '') {
                alert("短信验证码不能为空！")
            } else if (this.FUpassword == null || this.FUpassword == '') {
                alert("The password can not be empty!")
            } else if (this.FUvalidateCode == null || this.FUvalidateCode == '') {
                alert("The verification code can not be empty!")
            } else {
                this.username = this.FUusername;
                this.password = this.FUpassword;
                this.validateCode = this.FUvalidateCode;
                $('#login-form').submit();
            }
        },
        //
        //忘记密码
        //B
        FPBmailCheck: function () {
            if (!(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/.test(this.FPBmail))) {
                //邮箱格式不正确
                alert("The email format is not correct");
                return false;
            } else {
                return true;
            }
        },
        getFPBMailCode: function () {
            this.FPBmailCode = "";
            if (this.FPBmailCheck()) {
                this.FPBmailCodeText = "Sending...";
                $('#FPBmail-btn').attr('disabled', 'disabled');
                axios.get('/xfxhapi/signin/getUsernameNum/' + this.FPBmail.replace(".", "_")).then(function (res) {
                    if (res.data.result == 0) {
                        //该邮箱未注册！
                        alert("The email is not registered!");
                        this.FPBmailCodeText = "Get Verification Code";
                        $('#FPBmail-btn').removeAttr("disabled");
                    } else if (res.data.result == 1) {
                        axios.get('/xfxhapi/signin/sendMailEng?mail=' + this.FPBmail).then(function (res) {
                            this.FPBmailCodeReal = res.data.msg;
                            var count = this.time;
                            this.FPBtimer = setInterval(() => {
                                if (count == 0) {
                                    clearInterval(this.FPBtimer);
                                    this.FPBtimer = null;
                                    this.FPBmailCodeText = "Get Verification Code";
                                    $('#FPBmail-btn').removeAttr("disabled");
                                } else {
                                    this.FPBmailCodeText = count + "seconds later"
                                    count--;
                                    $('#FPBmail-btn').attr('disabled', 'disabled');
                                }
                            }, 1000)
                        }.bind(this), function (error) {
                            console.log(error);
                        });
                    }
                }.bind(this), function (error) {
                    console.log(error);
                });
            }
        },
        FPBIdentify: function () {
            if (this.FPBmail == null || this.FPBmail == '') {
                // 邮箱不能为空！
                alert("The email can not be empty!")
            } else if (this.FPBmailCode == null || this.FPBmailCode == '') {
                //验证码不能为空!
                alert("The verification code can not be empty!")
            } else {
                if (this.FPBmailCode == this.FPBmailCodeReal) {
                    axios.get('/xfxhapi/signin/findByUsername/' + this.FPBmail.replace(".", "_")).then(function (res) {
                        this.changeForm('FPDFlag');
                        this.FPDregisterData = res.data.result;
                        this.FPDusername = this.FPDregisterData[0].username;
                        $(FPDusername).attr('disabled', 'disabled');
                        // alert("请输入新密码！");
                    }.bind(this), function (error) {
                        console.log(error);
                    });
                } else {
                    //验证码输入错误，请核对后再试
                    alert("Verification code input error, please check and try again.");
                }
            }
        },
        //D
        FPDpassword1Check: function () {
            if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.FPDpassword1))) {
                this.FPDpassword1TipFlag = false;
                this.FPDpassword1AlertFlag = true;
                return false;
            } else {
                this.FPDpassword1TipFlag = false;
                this.FPDpassword1AlertFlag = false;
                return true;
            }
        },
        FPDpassword1Tip: function () {
            this.FPDpassword1TipFlag = true;
            this.FPDpassword1AlertFlag = false;
        },
        FPDpassword2Check: function () {
            if (this.FPDpassword1 !== this.FPDpassword2) {
                this.FPDpassword2AlertFlag = true;
                return false;
            } else {
                this.FPDpassword2AlertFlag = false;
                return true;
            }
        },
        FPregister: function () {
            this.FPDpassword1Check();
            this.FPDpassword2Check();
            if (this.FPDpassword1Check() && this.FPDpassword2Check() && this.FPDmessageCode == this.FPDmessageCodeReal) {
                var params = {
                    userid: this.FPDregisterData[0].userid,
                    username: this.FPDusername,
                    password: this.FPDpassword1,
                }
                axios.post('/xfxhapi/signin/updateByVO', params).then(function (res) {
                    if (res.data.result == 1) {
                        //密码修改成功！
                        alert("Password changed successfully!");
                        this.username = this.FPDusername;
                        this.password = this.FPDpassword1;
                        this.changeForm('loginFlag');
                    }
                }.bind(this), function (error) {
                    console.log(error)
                })
            }
        },
    }
});