var vm = new Vue({
    el: "#app",
    data: {
        //form标识
        loginFlag: true,
        regFlag: false,
        FUAFlag: false,
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
        mail: "",
        mailCode: "",
        mailCodeReal: "",
        mailCodeText: "Get Verification Code",
        mailBtnDisabled: false,
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
        FUmailBtnDisabled: false,
        //忘记密码
        FPBmail: "",
        FPBmailCode: "",
        FPBmailCodeReal: "",
        FPBmailCodeText: "Get Verification Code",
        FPBtimer: null,
        FPDusername: "",
        FPDpassword1: "",
        FPDpassword2: "",
        FPDregisterData: "",
        FPBmailBtnDisabled: false,
        //提交校验标识
        FPDpassword1TipFlag: false,
        FPDpassword1AlertFlag: false,
        FPDpassword2AlertFlag: false,
    },
    created: function () {
        this.autoWide();
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
        this.$refs.username.focus();
    },
    methods: {
        //适配屏幕分辨率
        autoWide: function(){
            //判断是否宽屏
            var winWide = window.screen.availWidth;
            // alert(winWide);
            var wideScreen = false;
            var zm = winWide / 1920;
            document.body.style.zoom = zm * 1.1;
        },
        //通用方法
        reset: function () {
            this.username = "";
            this.password = "";
        },
        changeLanguage: function () {
            window.location.href=baseUrl+'/templates/login.html';
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
        //     }
        // },
        changeForm: function (flag) {
            if (flag == 'loginFlag') {
            } else if (flag == 'regFlag') {
            } else if (flag == 'FUAFlag') {
                this.FUmail = "";
                this.FUmailCode = "";
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
                this.$refs.loginForm.submit();
            }
        },
        reloadCode: function () {
            this.src='/xfxhapi/imageCode?' + (new Date()).valueOf();
        },
        //注册
        mailCheck: function () {
            if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/.test(this.mail))) {
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
                this.mailBtnDisabled = true;
                axios.get('/xfxhapi/signin/getMailNumENG/' + this.mail + "/static").then(function (res) {
                    if (res.data.result !== 0) {
                        // 该邮箱已注册！
                        alert("The email is registered!");
                        this.mailCodeText = "Get Verification Code";
                        this.mailBtnDisabled = false;
                    } else {
                        axios.get('/xfxhapi/signin/sendMailEng?mail=' + this.mail).then(function (res) {
                            this.mailCodeReal = res.data.msg;
                            var count = this.time;
                            this.timer = setInterval(() => {
                                if (count == 0) {
                                    clearInterval(this.timer);
                                    this.timer = null;
                                    this.mailCodeText = "Get Verification Code";
                                    this.mailBtnDisabled = false;
                                } else {
                                    this.mailCodeText = count + "seconds later"
                                    count--;
                                    this.mailBtnDisabled = true;
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
            if (this.mailCheck() && this.mailCodeCheck() && this.password1Check() && this.password2Check() && this.mailCode == this.mailCodeReal) {

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
            if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/.test(this.FUmail))) {
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
                this.FUmailBtnDisabled = true;
                axios.get('/xfxhapi/signin/getMailNumENG/' + this.FUmail + "/static").then(function (res) {
                    if (res.data.result == 0) {
                        // 该邮箱未注册！
                        alert("The email is not registered!");
                        this.FUmailCodeText = "Get Verification Code";
                        this.FUmailBtnDisabled = false;
                    } else if (res.data.result == 1) {
                        axios.get('/xfxhapi/signin/sendMailEng?mail=' + this.FUmail).then(function (res) {
                            this.FUmailCodeReal = res.data.msg;
                            var count = this.time;
                            this.timer = setInterval(() => {
                                if (count == 0) {
                                    clearInterval(this.timer);
                                    this.timer = null;
                                    this.FUmailCodeText = "Get Verification Code";
                                    this.FUmailBtnDisabled = false;
                                } else {
                                    this.FUmailCodeText = count + "seconds later"
                                    count--;
                                    this.FUmailBtnDisabled = true;
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
                    axios.get('/xfxhapi/signin/getMailNumENG/' + this.FUmail + "/static").then(function (res) {
                        if (res.data.result == 0) {
                            alert("The email is not registered!");
                        } else if (res.data.result == 1) {
                            axios.get('/xfxhapi/signin/getUsernameByMail/' + this.FUmail + "/static").then(function (res) {
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
        //忘记密码
        //B
        FPBmailCheck: function () {
            if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/.test(this.FPBmail))) {
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
                this.FPBmailBtnDisabled = true;
                axios.get('/xfxhapi/signin/getUsernameNum/' + this.FPBmail + "/static").then(function (res) {
                    if (res.data.result == 0) {
                        //该邮箱未注册！
                        alert("The email is not registered!");
                        this.FPBmailCodeText = "Get Verification Code";
                        this.FPBmailBtnDisabled = false;
                    } else if (res.data.result == 1) {
                        axios.get('/xfxhapi/signin/sendMailEng?mail=' + this.FPBmail).then(function (res) {
                            this.FPBmailCodeReal = res.data.msg;
                            var count = this.time;
                            this.FPBtimer = setInterval(() => {
                                if (count == 0) {
                                    clearInterval(this.FPBtimer);
                                    this.FPBtimer = null;
                                    this.FPBmailCodeText = "Get Verification Code";
                                    this.FPBmailBtnDisabled = false;
                                } else {
                                    this.FPBmailCodeText = count + "seconds later"
                                    count--;
                                    this.FPBmailBtnDisabled = true;
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
                    axios.get('/xfxhapi/signin/findByUsername/' + this.FPBmail + "/static").then(function (res) {
                        this.changeForm('FPDFlag');
                        this.FPDregisterData = res.data.result;
                        this.FPDusername = this.FPDregisterData[0].username;
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