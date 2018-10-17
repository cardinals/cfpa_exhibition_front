var vm = new Vue({
    el: "#app",
    data: {
        //form标识
        loginFlag: true,
        GLYloginFlag: true,
        regFlag: false,
        FUAFlag: false,
        FUBFlag: false,
        FPAFlag: false,
        FPBFlag: false,
        FPCFlag: false,
        FPDFlag: false,
        REAFlag: "",
        formFlag: "loginFlag",
        //登录
        username: "",
        password: "",
        src: "/xfxhapi/imageCode",
        validateCode: "",
        messages: "",
        unscid: "",
        loginType: "InfoCollect",
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
        //获取验证码 
        messageCodeText: "Get Verification Code",
        password1: "",
        password2: "",
        //注册校验标识
        mobileAlertFlag: false,
        messageCodeAlertFlag: false,
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
        //重置账户
        REAcompanyName: "",
        REAunscid: "",
        REAtimer: null,
        REAmobile: "",
        REAmessageCode: "",
        REAmessageCodeReal: "",
        REAmessageCodeText: "Get Verification Code",
        REApassword1: "",
        REApassword2: "",
        REAregisterData: "",
        //重置校验标识
        REAmobileAlertFlag: false,
        REAmessageCodeAlertFlag: false,
        REApassword1TipFlag: false,
        REApassword1AlertFlag: false,
        REApassword2AlertFlag: false,
    },
    created: function () {
        axios.get('/xfxhapi/shiro').then(function (res) {
            if (res.data != null && res.data.username != null && res.data.username != "") {
                window.location.href = "../templates/all.html";
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
            } else if (flag == 'FPCFlag') {
                this.FPCmobile = "";
                this.FPCmessageCode = "";
                this.FPCmessageCodeReal = "";
                this.FPCmessageCodeText = "Get Verification Code";
                this.FPCtimer = null;
            } else if (flag == 'FPDFlag') {
                this.FPDusername = "";
                this.FPDpassword1 = "";
                this.FPDpassword2 = "";
            } else if (flag == 'REAAFlag') {
                this.REAcompanyName = "";
                this.REAunscid = "";
            } else if (flag == 'REABFlag') {
                this.REAmobile = "";
                this.REAmessageCode = "";
                this.REAmessageCodeReal = "";
                this.REAmessageCodeText = "Get Verification Code";
                this.REApassword1 = "";
                this.REApassword2 = "";
                this.REAmobileAlertFlag = false;
                this.REAmessageCodeAlertFlag = false;
                this.REApassword1TipFlag = false;
                this.REApassword1AlertFlag = false;
                this.REApassword2AlertFlag = false;
            } else if (flag == 'bakFlag') {
                if(this.formFlag !== 'FPAFlag'){
                    // 未保存的数据将丢失，确定返回吗？
                    var r = confirm("Unsaved data will be lost. Do you want to return?");
                    if (r == false) {
                        return;
                    }
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
        nlogin: function () {
            var reg = /^[0-9a-zA-Z]{18}$/;
            if (this.unscid == null || this.unscid == '') {
                alert("统一社会信用代码不能为空！")
            }
            // else if(!reg.test(this.unscid)){
            //     alert("统一社会信用代码为18位字母或数字！")
            // }
            else {
                $('#login-form').submit();
                // window.location.href = "jxcsplan/jxcsplan_all.html?unscid=" + this.unscid;
            }

        },
        GLYlogin: function () {
            if (this.GLYusername == null || this.GLYusername == '') {
                alert("User name can not be empty!")
            } else if (this.GLYpassword == null || this.GLYpassword == '') {
                alert("The password can not be empty!")
            } else if (this.GLYvalidateCode == null || this.GLYvalidateCode == '') {
                alert("The verification code can not be empty!")
            } else {
                $('#GLYlogin-form').submit();
            }
        },
        reloadCode: function () {
            $('#checkCode').attr('src', '/xfxhapi/imageCode?' + ((new Date()).valueOf()));
        },
        //管理员登录
        reloadGLYCode: function () {
            $('#GLYcheckCode').attr('src', '/xfxhapi/imageCode?' + ((new Date()).valueOf()));
        },
        //注册
        mobileCheck: function () {
            if (!(/^1[34578]\d{9}$/.test(this.mobile))) {
                this.mobileAlertFlag = true;
                return false;
            } else {
                this.mobileAlertFlag = false;
                return true;
            }
        },
        getMessageCode: function () {
            this.messageCode = "";
            if (this.mobileCheck()) {
                //发送中
                this.messageCodeText = "Sending...";
                $('#mobile-btn').attr('disabled', 'disabled');
                axios.get('/xfxhapi/signin/getMobileNum/' + this.mobile).then(function (res) {
                    if (res.data.result != 0) {
                        // 用户名已存在！
                        alert("User name already exists!");
                        this.messageCodeText = "Get Verification Code";
                        $('#mobile-btn').removeAttr("disabled");
                    } else {
                        axios.get('/xfxhapi/signin/sendMessage?phone=' + this.mobile).then(function (res) {
                            this.messageCodeReal = res.data.msg;
                            var count = this.time;
                            this.timer = setInterval(() => {
                                if (count == 0) {
                                    clearInterval(this.timer);
                                    this.timer = null;
                                    this.messageCodeText = "Get Verification Code";
                                    $('#mobile-btn').removeAttr("disabled");
                                } else {
                                    // 秒后获取
                                    this.messageCodeText = count + "seconds later"
                                    count--;
                                    $('#mobile-btn').attr('disabled', 'disabled');
                                }
                            }, 1000)
                        }.bind(this), function (error) {
                            console.log(error);
                        });
                    }
                }.bind(this), function (error) {
                    console.log(error)
                })
            }
        },
        messageCodeCheck: function () {
            if (!(/^[0-9a-zA-Z]{6}$/.test(this.messageCode))) {
                this.messageCodeAlertFlag = true;
                return false;
            } else {
                this.messageCodeAlertFlag = false;
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
            this.mobileCheck();
            this.messageCodeCheck();
            this.password1Check();
            this.password2Check();
            if (this.mobileCheck() && this.messageCodeCheck() && this.password1Check() && this.password2Check() && this.messageCode == this.messageCodeReal) {

                var params = {
                    username: this.mobile,
                    password: this.password1,
                    deptid: "ZSYH"
                }
                axios.post('/xfxhapi/signin/insertByVO', params).then(function (res) {
                //注册成功！ 
                    alert("Registration is successful!");
                    this.username = this.mobile;
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
                alert("The mailbox format is not correct");
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
                        alert("The mailbox is not registered!");
                        this.FUmailCodeText = "Get Verification Code";
                        $('#FUmail-btn').removeAttr("disabled");
                    } else if (res.data.result == 1) {
                        axios.get('/xfxhapi/signin/sendMail?mail=' + this.FUmail).then(function (res) {
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
                alert("The mailbox can not be empty!")
            } else if (this.FUmailCode == null || this.FUmailCode == '') {
                alert("The verification code can not be empty!")
            } else {
                if (this.FUmailCode == this.FUmailCodeReal) {
                    axios.get('/xfxhapi/signin/getMailNum/' + this.FUmail.replace(".", "_")).then(function (res) {
                        if (res.data.result == 0) {
                            alert("The mailbox is not registered!");
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
        //A
        REAIdentify: function () {
            if (this.REAcompanyName == null || this.REAcompanyName == '') {
                alert("单位名称不能为空！")
            } else if (this.REAunscid == null || this.REAunscid == '') {
                alert("统一社会信用代码不能为空！")
            } else {
                var params = {
                    unscid: this.REAunscid,
                    companyname: this.REAcompanyName
                }
                axios.post('/xfxhapi/signin/findByUnscid/', params).then(function (res) {
                    this.REAregisterData = res.data.result;
                    if (this.REAregisterData.length == 0) {
                        alert("无记录，请重新输入！");
                    }
                    else {
                        this.changeForm('REABFlag');
                        this.REAmobile = this.REAregisterData[0].username;
                    }
                }.bind(this), function (error) {
                    console.log(error);
                });
            }
        },
        //B
        FPBmailCheck: function () {
            if (!(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/.test(this.FPBmail))) {
                //邮箱格式不正确
                alert("The mailbox format is not correct");
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
                axios.get('/xfxhapi/signin/getMailNum/' + this.FPBmail.replace(".", "_")).then(function (res) {
                    if (res.data.result == 0) {
                        //该邮箱未注册！
                        alert("The mailbox is not registered!");
                        this.FPBmailCodeText = "Get Verification Code";
                        $('#FPBmail-btn').removeAttr("disabled");
                    } else if (res.data.result == 1) {
                        axios.get('/xfxhapi/signin/sendMail?mail=' + this.FPBmail).then(function (res) {
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
                alert("The mailbox can not be empty!")
            } else if (this.FPBmailCode == null || this.FPBmailCode == '') {
                //验证码不能为空!
                alert("The verification code can not be empty!")
            } else {
                if (this.FPBmailCode == this.FPBmailCodeReal) {
                    axios.get('/xfxhapi/signin/findByMail/' + this.FPBmail.replace(".", "_")).then(function (res) {
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
        //C
        FPCmobileCheck: function () {
            if (this.FPCmobile == null || this.FPCmobile == '') {
                alert("手机号不能为空！")
                return false;
            } else if (!(/^1[34578]\d{9}$/.test(this.FPCmobile))) {
                alert("请填写正确的手机号码！")
                return false;
            } else {
                return true;
            }
        },
        getFPCMessageCode: function () {
            this.FPCmessageCode = "";
            if (this.FPCmobileCheck()) {
                this.FPCmessageCodeText = "Sending...";
                $('#FPCmobile-btn').attr('disabled', 'disabled');
                axios.get('/xfxhapi/signin/getMobileNum/' + this.FPCmobile).then(function (res) {
                    if (res.data.result == 0) {
                        //用户名不存在！
                        alert("User name does not exist!");
                        this.FPCmessageCodeText = "Get Verification Code";
                        $('#FPCmobile-btn').removeAttr("disabled");
                    } else {
                        axios.get('/xfxhapi/signin/sendMessage?phone=' + this.FPCmobile).then(function (res) {
                            this.FPCmessageCodeReal = res.data.msg;
                            var count = this.time;
                            this.FPCtimer = setInterval(() => {
                                if (count == 0) {
                                    clearInterval(this.FPCtimer);
                                    this.FPCtimer = null;
                                    this.FPCmessageCodeText = "Get Verification Code";
                                    $('#FPCmobile-btn').removeAttr("disabled");
                                } else {
                                    this.FPCmessageCodeText = count + "seconds later"
                                    count--;
                                    $('#FPCmobile-btn').attr('disabled', 'disabled');
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
        FPCIdentify: function () {
            if (this.FPCmobile == null || this.FPCmobile == '') {
                alert("手机号不能为空！")
            } else if (this.FPCmessageCode == null || this.FPCmessageCode == '') {
                alert("The verification code can not be empty!")
            } else {
                if (this.FPCmessageCode == this.FPCmessageCodeReal) {
                    axios.get('/xfxhapi/signin/findByPhone/' + this.FPCmobile).then(function (res) {
                        this.changeForm('FPDFlag');
                        this.FPDregisterData = res.data.result;
                        this.FPDusername = this.FPDregisterData[0].username;
                        $(FPDusername).attr('disabled', 'disabled');
                        // alert("请输入新密码！");
                    }.bind(this), function (error) {
                        console.log(error);
                    });
                } else {
                    alert("验证码输入错误，请核对后再试");
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
        //重置账户
        REAmobileCheck: function () {
            if (!(/^1[34578]\d{9}$/.test(this.REAmobile))) {
                this.REAmobileAlertFlag = true;
                return false;
            } else {
                this.REAmobileAlertFlag = false;
                return true;
            }
        },
        getREAMessageCode: function () {
            this.REAmessageCode = "";
            if (this.REAmobileCheck()) {
                this.REAmessageCodeText = "Sending...";
                $('#REAmobile-btn').attr('disabled', 'disabled');
                axios.get('/xfxhapi/signin/sendMessage?phone=' + this.REAmobile).then(function (res) {
                    this.REAmessageCodeReal = res.data.msg;
                    var count = this.time;
                    this.REAtimer = setInterval(() => {
                        if (count == 0) {
                            clearInterval(this.REAtimer);
                            this.REAtimer = null;
                            this.REAmessageCodeText = "Get Verification Code";
                            $('#REAmobile-btn').removeAttr("disabled");
                        } else {
                            this.REAmessageCodeText = count + "seconds later"
                            count--;
                            $('#REAmobile-btn').attr('disabled', 'disabled');
                        }
                    }, 1000)
                }.bind(this), function (error) {
                    console.log(error);
                });
            }
        },
        REAmessageCodeCheck: function () {
            if (!(/^[0-9a-zA-Z]{6}$/.test(this.REAmessageCode))) {
                this.REAmessageCodeAlertFlag = true;
                return false;
            } else {
                this.REAmessageCodeAlertFlag = false;
                return true;
            }
        },
        REApassword1Check: function () {
            if (!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.password1))) {
                this.REApassword1TipFlag = false;
                this.REApassword1AlertFlag = true;
                return false;
            } else {
                this.REApassword1TipFlag = false;
                this.REApassword1AlertFlag = false;
                return true;
            }
        },
        REApassword1Tip: function () {
            this.REApassword1TipFlag = true;
            this.REApassword1AlertFlag = false;
        },
        REApassword2Check: function () {
            if (this.REApassword1 !== this.REApassword2) {
                this.REApassword2AlertFlag = true;
                return false;
            } else {
                this.REApassword2AlertFlag = false;
                return true;
            }
        },
        REAregister: function () {
            this.REAmobileCheck();
            this.REAmessageCodeCheck();
            this.REApassword1Check();
            this.REApassword2Check();
            if (this.REAmobileCheck() && this.REAmessageCodeCheck() && this.REApassword1Check() && this.REApassword2Check() && this.REAmessageCode == this.REAmessageCodeReal) {
                var params = {
                    userid: this.REAregisterData[0].userid,
                    username: this.REAmobile,
                    password: this.REApassword1,
                }
                axios.post('/xfxhapi/signin/updateByVO', params).then(function (res) {
                    if (res.data.result == 1) {

                        alert("Reset successfully!");
                        this.username = this.REAmobile;
                        this.password = this.REApassword1;
                        this.changeForm('loginFlag');
                    }
                }.bind(this), function (error) {
                    console.log(error)
                })
            }
        },
    }
});