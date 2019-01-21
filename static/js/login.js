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
        //英文版登陆
        CNcomfrom: "CHN",
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
        messageCodeText: "获取验证码",
        password1: "",
        password2: "",
        mobileBtnDisabled: false,
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
        FUmailCodeText: "获取验证码",
        FUtimer: null,
        FUusername: "",
        FUmessageCode: "",
        FUmessageCodeReal: "",
        FUmessageCodeText: "获取验证码",
        FUpassword: "",
        FUsrc: "/xfxhapi/imageCode",
        FUvalidateCode: "",
        FUmailBtnDisabled: false,
        FUmobileBtnDisabled: false,
        //忘记密码
        FPBmail: "",
        FPBmailCode: "",
        FPBmailCodeReal: "",
        FPBmailCodeText: "获取验证码",
        FPBtimer: null,
        FPCmobile: "",
        FPCmessageCode: "",
        FPCmessageCodeReal: "",
        FPCmessageCodeText: "获取验证码",
        FPCtimer: null,
        FPDusername: "",
        FPDpassword1: "",
        FPDpassword2: "",
        FPDregisterData: "",
        FPBmailBtnDisabled: false,
        FPCmobileBtnDisabled: false,
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
        REAmessageCodeText: "获取验证码",
        REApassword1: "",
        REApassword2: "",
        REAregisterData: "",
        REAmobileBtnDisabled: false,
        //重置校验标识
        REAmobileAlertFlag: false,
        REAmessageCodeAlertFlag: false,
        REApassword1TipFlag: false,
        REApassword1AlertFlag: false,
        REApassword2AlertFlag: false,
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
            alert("账号不存在！");
        }else if(msg.indexOf("IncorrectCredentialsException") > -1){
            alert("密码不正确！");
        }else if(msg.indexOf("ExcessiveAttemptsException") > -1){
            alert("密码输入错误次数超过5次！");
        }else if(msg.indexOf("kaptchaValidateFailed") > -1){
            alert("验证码错误！");
        }
        if(msg != ""){
            history.replaceState(null, null, top.location.href.substr(0,top.location.href.indexOf("?")));
        }

        axios.get('/xfxhapi/shiro').then(function (res) {
            if (res.data != null && res.data.username != null && res.data.username != "") {
                var hrefUrl = "";
                if(res.data.deptid == "GLYH"){
                    hrefUrl = "../templates/all.html"
                }else if(res.data.deptid == "ZSYH"){
                    hrefUrl = "../templates/prediction/exhprediction_all.html";
                }else{
                    hrefUrl = "../templates/login.html";
                }
                window.location.href = hrefUrl;
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
            window.location.href=baseUrl+'/templates/login_ENG.html';
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
            } else if (flag == 'FUBFlag') {
                this.FUmessageCode = "";
                this.FUpassword = "";
                this.FUvalidateCode = "";
            } else if (flag == 'FPBFlag') {
                this.FPBmail = "";
                this.FPBmailCode = "";
                this.FPBmailCodeReal = "";
                this.FPBmailCodeText = "获取验证码";
                this.FPBtimer = null;
            } else if (flag == 'FPCFlag') {
                this.FPCmobile = "";
                this.FPCmessageCode = "";
                this.FPCmessageCodeReal = "";
                this.FPCmessageCodeText = "获取验证码";
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
                this.REAmessageCodeText = "获取验证码";
                this.REApassword1 = "";
                this.REApassword2 = "";
                this.REAmobileAlertFlag = false;
                this.REAmessageCodeAlertFlag = false;
                this.REApassword1TipFlag = false;
                this.REApassword1AlertFlag = false;
                this.REApassword2AlertFlag = false;
            } else if (flag == 'bakFlag') {
                if(this.formFlag !== 'FPAFlag'){
                    var r = confirm("未保存的数据将丢失，确定返回吗？");
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
                alert("用户名不能为空！")
            } else if (this.password == null || this.password == '') {
                alert("密码不能为空！")
            } else if (this.validateCode == null || this.validateCode == '') {
                alert("验证码不能为空！")
            } else {
                this.$refs.loginForm.submit();
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
                this.$refs.loginForm.submit();
                // window.location.href = "jxcsplan/jxcsplan_all.html?unscid=" + this.unscid;
            }

        },
        GLYlogin: function () {
            if (this.GLYusername == null || this.GLYusername == '') {
                alert("用户名不能为空！")
            } else if (this.GLYpassword == null || this.GLYpassword == '') {
                alert("密码不能为空！")
            } 
            /** 管理员登录不需要验证验证码 by li.xue 2018/10/24
            else if (this.GLYvalidateCode == null || this.GLYvalidateCode == '') {
                alert("验证码不能为空！")
            }  */
            else {
                this.$refs.GLYloginForm.submit();
            }
        },
        reloadCode: function () {
            this.src='/xfxhapi/imageCode?' + (new Date()).valueOf();
        },
        //管理员登录
        reloadGLYCode: function () {
            this.GLYsrc='/xfxhapi/imageCode?' + (new Date()).valueOf();
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
                this.messageCodeText = "发送中...";
                this.mobileBtnDisabled = true;
                axios.get('/xfxhapi/signin/getUsernameNum/' + this.mobile).then(function (res) {
                    if (res.data.result != 0) {
                        alert("用户名已存在！");
                        this.messageCodeText = "获取验证码";
                        this.mobileBtnDisabled = false;
                    } else {
                        axios.get('/xfxhapi/signin/sendMessage?phone=' + this.mobile).then(function (res) {
                            this.messageCodeReal = res.data.msg;
                            var count = this.time;
                            this.timer = setInterval(() => {
                                if (count == 0) {
                                    clearInterval(this.timer);
                                    this.timer = null;
                                    this.messageCodeText = "获取验证码";
                                    this.mobileBtnDisabled = false;
                                } else {
                                    this.messageCodeText = count + "秒后获取"
                                    count--;
                                    this.mobileBtnDisabled = true;
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
                    usertype: "CHN",
                    deptid: "ZSYH"
                }
                axios.post('/xfxhapi/signin/insertByVO', params).then(function (res) {

                    alert("注册成功！");
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
            if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/.test(this.FUmail))) {
                alert("邮箱格式不正确");
                return false;
            } else {
                return true;
            }
        },
        getFUMailCode: function () {
            this.FUmailCode = "";
            if (this.FUmailCheck()) {
                this.FUmailCodeText = "发送中...";
                this.FUmailBtnDisabled = true;
                axios.get('/xfxhapi/signin/getMailNum/' + this.FUmail.replace(".", "_")).then(function (res) {
                    if (res.data.result == 0) {
                        alert("该邮箱未注册！");
                        this.FUmailCodeText = "获取验证码";
                        this.FUmailBtnDisabled = false;
                    } else if (res.data.result == 1) {
                        axios.get('/xfxhapi/signin/sendMail?mail=' + this.FUmail).then(function (res) {
                            this.FUmailCodeReal = res.data.msg;
                            var count = this.time;
                            this.timer = setInterval(() => {
                                if (count == 0) {
                                    clearInterval(this.timer);
                                    this.timer = null;
                                    this.FUmailCodeText = "获取验证码";
                                    this.FUmailBtnDisabled = false;
                                } else {
                                    this.FUmailCodeText = count + "秒后获取"
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
                alert("邮箱不能为空！")
            } else if (this.FUmailCode == null || this.FUmailCode == '') {
                alert("验证码不能为空！")
            } else {
                if (this.FUmailCode == this.FUmailCodeReal) {
                    axios.get('/xfxhapi/signin/getMailNum/' + this.FUmail.replace(".", "_")).then(function (res) {
                        if (res.data.result == 0) {
                            alert("该邮箱未注册！");
                        } else if (res.data.result == 1) {
                            axios.get('/xfxhapi/signin/getUsernameByMail/' + this.FUmail.replace(".", "_")).then(function (res) {
                                alert("用户名找回成功！");
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
                    alert("验证码输入错误，请核对后再试");
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
                        this.FUmessageCodeText = "获取验证码";
                        this.FUmobileBtnDisabled = false;
                    } else {
                        this.FUmessageCodeText = count + "秒后获取"
                        count--;
                        this.FUmobileBtnDisabled = true;
                    }
                }, 1000)
            }.bind(this), function (error) {
                console.log(error);
            });
        },
        reloadFUCode: function () {
            this.FUsrc = '/xfxhapi/imageCode?' + ((new Date()).valueOf());
        },
        FUlogin: function () {
            if (this.FUusername == null || this.FUusername == '') {
                alert("用户名不能为空！")
            } else if (this.FUmessageCode == null || this.FUmessageCode == '') {
                alert("短信验证码不能为空！")
            } else if (this.FUpassword == null || this.FUpassword == '') {
                alert("密码不能为空！")
            } else if (this.FUvalidateCode == null || this.FUvalidateCode == '') {
                alert("验证码不能为空！")
            } else {
                this.username = this.FUusername;
                this.password = this.FUpassword;
                this.validateCode = this.FUvalidateCode;
                this.$refs.loginForm.submit();
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
            if (!(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@[0-9A-Za-z]+(?:\.[0-9A-Za-z]+)+$/.test(this.FPBmail))) {
                alert("邮箱格式不正确");
                return false;
            } else {
                return true;
            }
        },
        getFPBMailCode: function () {
            this.FPBmailCode = "";
            if (this.FPBmailCheck()) {
                this.FPBmailCodeText = "发送中...";
                this.FPBmailBtnDisabled = true;
                axios.get('/xfxhapi/signin/getMailNum/' + this.FPBmail.replace(".", "_")).then(function (res) {
                    if (res.data.result == 0) {
                        alert("该邮箱未注册！");
                        this.FPBmailCodeText = "获取验证码";
                        this.FPBmailBtnDisabled = false;
                    } else if (res.data.result == 1) {
                        axios.get('/xfxhapi/signin/sendMail?mail=' + this.FPBmail).then(function (res) {
                            this.FPBmailCodeReal = res.data.msg;
                            var count = this.time;
                            this.FPBtimer = setInterval(() => {
                                if (count == 0) {
                                    clearInterval(this.FPBtimer);
                                    this.FPBtimer = null;
                                    this.FPBmailCodeText = "获取验证码";
                                    this.FPBmailBtnDisabled = false;
                                } else {
                                    this.FPBmailCodeText = count + "秒后获取"
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
                alert("邮箱不能为空！")
            } else if (this.FPBmailCode == null || this.FPBmailCode == '') {
                alert("验证码不能为空！")
            } else {
                if (this.FPBmailCode == this.FPBmailCodeReal) {
                    axios.get('/xfxhapi/signin/findByMail/' + this.FPBmail.replace(".", "_")).then(function (res) {
                        this.changeForm('FPDFlag');
                        this.FPDregisterData = res.data.result;
                        this.FPDusername = this.FPDregisterData[0].username;
                        // alert("请输入新密码！");
                    }.bind(this), function (error) {
                        console.log(error);
                    });
                } else {
                    alert("验证码输入错误，请核对后再试");
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
                this.FPCmessageCodeText = "发送中...";
                this.FPCmobileBtnDisabled = true;
                axios.get('/xfxhapi/signin/getUsernameNum/' + this.FPCmobile).then(function (res) {
                    if (res.data.result == 0) {
                        alert("用户名不存在！");
                        this.FPCmessageCodeText = "获取验证码";
                        this.FPCmobileBtnDisabled = false;
                    } else {
                        axios.get('/xfxhapi/signin/sendMessage?phone=' + this.FPCmobile).then(function (res) {
                            this.FPCmessageCodeReal = res.data.msg;
                            var count = this.time;
                            this.FPCtimer = setInterval(() => {
                                if (count == 0) {
                                    clearInterval(this.FPCtimer);
                                    this.FPCtimer = null;
                                    this.FPCmessageCodeText = "获取验证码";
                                    this.FPCmobileBtnDisabled = false;
                                } else {
                                    this.FPCmessageCodeText = count + "秒后获取"
                                    count--;
                                    this.FPCmobileBtnDisabled = true;
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
                alert("验证码不能为空！")
            } else {
                if (this.FPCmessageCode == this.FPCmessageCodeReal) {
                    axios.get('/xfxhapi/signin/findByUsername/' + this.FPCmobile).then(function (res) {
                        this.changeForm('FPDFlag');
                        this.FPDregisterData = res.data.result;
                        this.FPDusername = this.FPDregisterData[0].username;
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

                        alert("密码修改成功！");
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
                this.REAmessageCodeText = "发送中...";
                this.REAmobileBtnDisabled = true;
                axios.get('/xfxhapi/signin/sendMessage?phone=' + this.REAmobile).then(function (res) {
                    this.REAmessageCodeReal = res.data.msg;
                    var count = this.time;
                    this.REAtimer = setInterval(() => {
                        if (count == 0) {
                            clearInterval(this.REAtimer);
                            this.REAtimer = null;
                            this.REAmessageCodeText = "获取验证码";
                            this.REAmobileBtnDisabled = false;
                        } else {
                            this.REAmessageCodeText = count + "秒后获取"
                            count--;
                            this.REAmobileBtnDisabled = true;
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

                        alert("重置成功！");
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