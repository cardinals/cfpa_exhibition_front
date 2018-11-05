//axios默认设置cookie
axios.defaults.withCredentials = true;
var vm = new Vue({
    el: '#app',
    data: function () {
        return {
            //菜单编码
            activeIndex: '',
            //显示加载中样
            loading: false,
            //状态 0新增
            jbxxStatus: 0,
            kpxxStatus: 0,
            wjdcStatus: 0,
            qyjsStatus: 0,
            cpjsStatus: 0,
            xqyxStatus: 0,
            //企业id
            qyid: '',
            //开票信息uuid
            kpUuid: '',
            //问卷调查uuid
            wjUuid: '',
            //企业介绍uuid
            qyUuid:'',
            //需求意向uuid
            xqUuid:'',
            //问卷调查产品分类子类
            childrenCpfl:[],
            //进度条
            active: 0,
            //要删除的图片路径list
            delPicList:[],
            delPicSrc:'',
            //上传后未保存的图片list
            unsavedPicList:[],
            //基本信息表单
            baseInforForm: {
                ywgsmc:'',
                frdb:'',
                frdbdh:'',
                yjdzsheng:'',
                yjdzshi:'',
                yjdzxx:'',
                bgdh:'',
                cz:'',
                lxr:'',
                lxrsj:'',
                wz:'',
                dzyx:'',
                dzyx1:'',
                yyzz:'',
                email:''
            },
            //开票信息表单
            kpxxForm: [],
            //问卷调查表单
            wjdcForm: {
                zycpList:[],
            },
            //企业介绍表单
            qyjsForm: {
                qyid:'',
                //logo:'',
                qyjj:'',
                qycpjsVOList:[{
                    qyid:'',
                    src:'',
                    cplx:'',
                    cpjj:''
                }],
                src:'',
                imageUrl:'',
            },
            
            //需求意向表单
            xqyxForm: [],
            //基本信息显示标识
            isJbxxShow: true,
            //开票信息显示标识
            isKpxxShow: false,
            //问卷调查显示标识
            isWjdcShow: false,
            //企业和产品介绍显示标识
            isCpjsShow: false,
            //企业参展展位需求意向
            isXqyxShow: false,
            //问卷调查产品类型选择标识
            isCplxSelect: false,
            //手机验证表单显示标识
            //dialogSjFormVisible:false,
            //邮箱表单显示标识
            dialogYxFormVisible:false,
            //email表单显示标识
            dialogEmailFormVisible:false,
            //邮箱验证flag
            mailCheck: false,
            //手机验证flag
            //phoneCheck:false,
            //checkedPhoneNum:'',
            //上传的文件为pdf标识
            //isPdf:false,

            //有无网址flag
            noWebsit: false,
            //是否为已驳回的申请
            isYbh:false,
            //通过验证的邮箱地址（记录以防验证后修改邮箱）
            checkedMailAddress:'',
            //短信验证按钮文字
            //messageCodeText: "check",
            //短信验证码
            //messageCodeReal:"",
            
            //邮箱验证码
            mailCodeReal:"",
            //email邮箱验证码
            emailCodeReal:"",
            //邮箱验证按钮文字
            mailCodeText:"verify",
            //email验证按钮
            emailCodeText:"verify",
            emailCodeText1:"change",
            time: 60,
            timer: null,
            time2: 60,
            timer2: null,
            //产品index
            index:0,

            //树结构配置
            defaultProps: {
                children: 'children',
                label: 'codeName',
                value: 'codeValue'
            },
            //上传图片Data
            fileList: [],
            //上传加参数
            upLoadData:{
                qyid:'',
            },
            //上传logo加参数
            upLoadLogoData:{
                uuid:'',
                qyid:'',
            },
            //产品图片上传参数
            CpjsUpLoadData:{
                qyid:'',
            },
            //公司logo
            imageUrl: '',
            //公司主营产品
            //zycp_data: [],
            //产品所属分类
            cpssfl_data: [],
            //手机验证表单
            /*
            sjform:{
                //sjh:'',
                yzm:''
            },*/
            yxform:{
                yzm:''
            },
            emailform:{
                email:'',
                yzm:''
            },
            baseInforRules: {
                ywgsmc: [
                  { required: true, message: 'Company name is required', trigger: 'blur' },
                  { pattern: /^[A-Za-z0-9 ]+$/, message: 'Characters and number and blank only',trigger: 'blur' },
                  { min: 1, max: 100, message: 'less than 100 characters', trigger: 'blur' }
                ],
                yjdzxx: [
                  { required: true, message: 'Company address is required', trigger: 'blur' },
                  { pattern: /^[A-Za-z0-9 ]+$/, message: 'Characters and number and blank only',trigger: 'blur' },
                  { min: 1, max: 200, message: 'less than 200 characters', trigger: 'blur' }
                ],
                bgdh: [
                    { required: true, message: 'Phone number is required', trigger: 'blur' },
                    { pattern: /^[A-Za-z0-9 ]+$/, message: 'Characters and number and blank only',trigger: 'blur' },
                  ],
                frdb: [
                    { required: true, message: 'Legal Representative is required', trigger: 'blur' },
                    { pattern: /^[A-Za-z ]+$/, message: 'Characters and blank only',trigger: 'blur' },
                    { min: 1, max: 50, message: 'less than 50 characters', trigger: 'blur' }
                  ],
                frdbdh: [
                    { required: true, message: "Legal Representative's Phone is required", trigger: 'blur' },
                    { pattern: /^[\d\-]+$/, message: 'Number and hyphen only',trigger: 'blur' },
                    { min: 1, max: 30, message: 'less than 30 characters', trigger: 'blur' }
                  ],
                lxr: [
                    { required: true, message: 'Contact Person is required', trigger: 'blur' },
                    { pattern: /^[A-Za-z ]+$/, message: 'Characters and blank only',trigger: 'blur' },
                    { min: 1, max: 50, message: 'less than 50 characters', trigger: 'blur' }
                  ],
                lxrsj: [
                    { required: true, message: "Contact Person's Phone is required", trigger: 'blur' },
                    { pattern: /^[\d\-]+$/, message: 'Number and hyphen only',trigger: 'blur' },
                    { min: 1, max: 30, message: 'less than 30 characters', trigger: 'blur' }
                  ],
                wz: [
                    { required: false, message: 'Company Website is required', trigger: 'blur' },
                    { min: 1, max: 100, message: 'less than 100 characters', trigger: 'blur' }
                  ],
                dzyx1: [
                    { required: false, message: 'Standby Email is required', trigger: 'blur' },
                    { type: 'email', message: 'Error Email', trigger: ['blur', 'change'] }
                  ],
                email: [
                    { required: true, message: 'Email is required', trigger: 'blur' },
                    { type: 'email', message: 'Error Email', trigger: ['blur', 'change'] }
                  ],
                reserve2: [
                    { required: false, message: 'Postal Code is required', trigger: 'blur' },
                    { pattern: /^[0-9]*$/, message: 'Number only',trigger: 'blur' },
                    { min: 1, max: 36, message: 'less than 36 characters', trigger: 'blur' }
                  ],
                cz: [
                    { required: false, message: 'Postal Code is required', trigger: 'blur' },
                    { pattern: /^[0-9]*$/, message: 'Number only',trigger: 'blur' },
                    { min: 1, max: 30, message: 'less than 30 characters', trigger: 'blur' }
                  ]
              },
            kpxxRules: {
                kpgsmc: [
                  { required: true, message: 'Company Name on the Invoice is required', trigger: 'blur' },
                  { pattern: /^[A-Za-z0-9 ]+$/, message: 'Characters and number and blank only',trigger: 'blur' },
                  { min: 1, max: 100, message: 'less than 100 characters', trigger: 'blur' }
                ],
                gsdz: [
                  { required: true, message: 'Customer Contact is required', trigger: 'blur' },
                  { pattern: /^[A-Za-z0-9 ]+$/, message: 'Characters and number and blank only',trigger: 'blur' },
                  { min: 1, max: 300, message: 'less than 300 characters', trigger: 'blur' }
                ],
                dhhm: [
                  { required: true, message: 'Phone Number is required', trigger: 'blur' },
                  { pattern: /^[\d\-]+$/, message: 'Number and hyphen only',trigger: 'blur' },
                  { min: 1, max: 30, message: 'less than 30 characters', trigger: 'blur' }
                ],
                yhzh: [
                  { required: true, message: 'Fax is required', trigger: 'blur' },
                  { pattern: /^[0-9 ]*$/, message: 'Number and blank only',trigger: 'blur' },
                  { min: 1, max: 16, message: 'less than 16 characters', trigger: 'blur' }
                ]
            },
            wjdcRules: {
                zycpList: [
                    { required: true, message: 'Category of Your Major Products is required', trigger: 'change' }
                ],
            },
            qyjsRules: {
                qyjj: [
                  { required: true, message: 'Company Introduction is required', trigger: 'blur' },
                  { pattern: /^[A-Za-z0-9 ]+$/, message: 'Characters and number and blank only',trigger: 'blur' },
                  { min: 1, max: 400, message: 'less than 400 characters', trigger: 'blur' }
                ],
            },
            cpjsRules: {
                cplx: [
                  { required: true, message: 'Category of the Product is required', trigger: 'change' }
                ],
                cpjj: [
                  { required: true, message: 'Product Introduction is required', trigger: 'blur' },
                  { pattern: /^[A-Za-z0-9 ]+$/, message: 'Characters and number and blank only',trigger: 'blur' },
                  { min: 1, max: 300, message: 'less than 300 characters', trigger: 'blur' }
                ]
            },
            /*
            sjformRules:{
                sjh:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '请输入正确格式的手机号',trigger: 'blur' }
                ],
                yzm:[{ required: true, message: '请输入验证码', trigger: 'blur' }],
            },
            */
        }
    },
    
    created: function () {
        this.shiroData = shiroGlobal;
        if(this.shiroData.deptid == "ZSYH"){//展商
            this.findInfoByUserid(this.shiroData.userid);
        }else{//管理员
            this.findInfoByUserid(getQueryString("userid"));
            var type = getQueryString("type");
            if(type == "BJ"){
                loadBreadcrumb("展会报名管理","报名信息编辑");
            }else{
                loadBreadcrumb("展会报名管理","报名信息新增");
            }
            
        }
        
    },
    mounted: function () {
        this.getCpssfl();//产品所属分类
    },
    methods: {
        //根据代码集获取产品所属分类
        getCpssfl: function(){
            axios.get('/xfxhapi/codelist/getDzlxTree/CPLX_EN').then(function (res) {
                this.cpssfl_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //通过userid查询基本信息数据
        findInfoByUserid: function(userid){
            this.loading = true;
            var params = {
                userid: userid,
                deleteFlag : 'N'
            }
            axios.post('/xfxhapi/qyjbxx/doFindByUserid', params).then(function (res) {
                if(res.data.result != null && res.data.result != ""){
                    if(this.shiroData.deptid == "GLYH"||res.data.result.sjzt == '01' || res.data.result.sjzt == '04'){//编辑中，已驳回
                        if(res.data.result.sjzt == '04'){
                            this.isYbh = true;
                        }
                        this.baseInforForm = res.data.result;
                        this.baseInforForm.dzyx1 = this.baseInforForm.dzyx;
                        if(this.baseInforForm.wz == ''||this.baseInforForm.wz == null){
                            this.noWebsit = true;
                        }
                        this.jbxxStatus = 1;//修改
                        this.qyid = res.data.result.qyid;
                    }else{//已提交，已审核 直接跳转到确认页
                        var params = {
                            userid: this.shiroData.userid,
                            type: "BJ"
                        }
                        loadDivParam("prediction/exhprediction_confirm_ENG", params);
                    }
                }else{
                    this.jbxxStatus = 0;//新增
                    this.baseInforForm.email = this.shiroData.username;
                }
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //通过企业id查找开票信息
        findKpxxByQyid:function(qyid){
            this.loading = true;
            var params = {
                qyid: qyid,
                deleteFlag : 'N'
            }
            axios.post('/xfxhapi/qykpxx/list', params).then(function (res) {
                if(res.data.result.length>0){
                    this.kpxxForm = res.data.result[0];
                    this.kpxxStatus = 1;//修改
                    this.kpUuid = res.data.result[0].uuid;
                }else{
                    this.kpxxStatus = 0;//新增
                     //开票公司名称：必填，把企业基本信息中的“英文公司名称“带到文本框中，文本框可修改
                    this.kpxxForm.kpgsmc = this.baseInforForm.ywgsmc;
                    //是否与上面填的联系人一致，否则需要填写
                    this.kpxxForm.gsdz = this.baseInforForm.lxr;
                    //与上面填的联系人电话一致，否则需要填写
                    this.kpxxForm.dhhm = this.baseInforForm.lxrsj;
                    //与上面填的传真一致，否则需要填写
                    this.kpxxForm.yhzh = this.baseInforForm.cz;
                }
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //通过企业id查找问卷调查信息
        findWjdcByQyid:function(qyid){
            this.loading = true;
            var params = {
                qyid: qyid,
                deleteFlag : 'N'
            }
            axios.post('/xfxhapi/qywjdc/list', params).then(function (res) {
                if(res.data.result.length>0){
                    this.wjdcForm = res.data.result[0];
                    this.wjdcForm.zycpList = [];
                    var tempList = this.wjdcForm.reserve1.split(",");
                    for(var i in tempList){
                        this.wjdcForm.zycpList.push(tempList[i]);
                    }
                    this.wjdcStatus = 1;//修改
                    this.wjUuid = res.data.result[0].uuid;
                }else{
                    this.wjdcStatus = 0;//新增
                }
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //通过企业id查找企业和产品介绍
        findQyjsByQyid:function(qyid){
            this.loading = true;
            var params = {
                qyid: qyid,
                deleteFlag : 'N'
            }
            axios.post('/xfxhapi/qyjs/list', params).then(function (res) {
                if(res.data.result.length>0){
                    var resultForm = res.data.result[0];
                    var params = {
                        qyid: qyid,
                        deleteFlag : 'N'
                    }
                    axios.post('/xfxhapi/qycpjs/list', params).then(function (res) {
                        var result = res.data.result;
                        var qycpjsList = [];
                        for(var i in result){
                            var cplxArray = [];
                            cplxArray.push(result[i].cplx.substr(0, 1) + "000");
                            cplxArray.push(result[i].cplx);
                            //result[i].cplx = cplxArray;
                            qycpjsList.push({
                                uuid:result[i].uuid,
                                qyid:result[i].qyid,
                                cpjj:result[i].cpjj,
                                cplx:cplxArray,
                                src:result[i].src,
                                imageUrl:baseUrl + "/upload/" + result[i].src
                            });
                        }
                        resultForm.qycpjsVOList = qycpjsList;
                        this.qyjsForm = resultForm;
                        this.qyjsForm.imageUrl = baseUrl + "/upload/" + this.qyjsForm.src;
                        this.loading = false;
                    }.bind(this), function (error) {
                        console.log(error)
                    })
                    this.cpjsStatus = 1;//修改
                    this.qyUuid = res.data.result[0].uuid;
                    this.CpjsUpLoadData.qyid = this.qyid;
                    this.upLoadLogoData.qyid = this.qyid;
                }else{
                    this.cpjsStatus = 0;//新增
                    this.CpjsUpLoadData.qyid = this.qyid;
                    this.upLoadLogoData.qyid = this.qyid;
                    if(this.qyjsForm.qycpjsVOList.length == 0){
                        this.qyjsForm.qycpjsVOList.push({
                            qyid:this.qyid,
                            cplx:[],
                            cpjj:'',
                            src:'',
                            imageUrl:'',
                            key: Date.now()
                        });
                    }
                    this.loading = false;
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //通过企业id查找企业参展展位需求意向
        findXqyxByQyid:function(qyid){
            this.loading = true;
            var params = {
                qyid: qyid,
                deleteFlag : 'N'
            }
            axios.post('/xfxhapi/qyzwyx/list', params).then(function (res) {
                if(res.data.result.length>0){
                    //this.xqyxForm = res.data.result[0];
                    //返回null时不自动带入min值
                    if(res.data.result[0].bzzwgs != null)
                        this.xqyxForm.bzzwgs = res.data.result[0].bzzwgs;
                    if(res.data.result[0].sngdzw != null)
                        this.xqyxForm.sngdzw = res.data.result[0].sngdzw;
                    if(res.data.result[0].swgdzw != null)
                        this.xqyxForm.swgdzw = res.data.result[0].swgdzw;
                    this.xqyxStatus = 1;//修改
                    this.xqUuid = res.data.result[0].uuid;
                }else{
                    this.xqyxStatus = 0;//新增
                }
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        //选择产品分类，显示子类
        selectCpfl:function(codeValue){
            for(var i in this.cpssfl_data){
                if(this.cpssfl_data[i].codeValue == codeValue){
                    this.childrenCpfl = this.cpssfl_data[i].children;
                }
            }
            //document.getElementById("childrenRow").innerHTML="";
        },
       
        //关闭标签
        handleTagClose:function(tag){
            this.wjdcForm.zycpList.splice(this.wjdcForm.zycpList.indexOf(tag), 1);
        },
        //图片上传成功回调方法
        picSuccess: function (res, file, fileList) {
            console.log(file, fileList);
        },
        //产品图片上传成功回调方法
        cpjsPicSuccess: function (res, file) {
            this.qyjsForm.qycpjsVOList[this.index].src = res.src;
            this.qyjsForm.qycpjsVOList[this.index].imageUrl = URL.createObjectURL(file.raw);
            this.unsavedPicList.push(res.src);
        },
        logoPicSuccess: function (res, file) {
            this.qyjsForm.src = res.src;
            this.qyjsForm.imageUrl = URL.createObjectURL(file.raw);
            this.unsavedPicList.push(res.src);
        },
        //企业logochange
        LogoChange: function (file, fileList) {
            var fileName = file.name.lastIndexOf(".");//取到文件名开始到最后一个点的长度
            var fileNameLength = file.name.length;//取到文件名长度
            var fileFormat = file.name.substring(fileName + 1, fileNameLength);
            const isPng = fileFormat.toLowerCase() == "png";
            const isJpg = fileFormat.toLowerCase() == "jpg";
            const isLt1M = file.size / 1024 /1024 < 1;
            if(!isPng && !isJpg){
                this.$message.error('只能上传jpg、png格式的图片');
                fileList.splice(-1, 1);
            }else if(!isLt1M){
                this.$message.error('上传图片大小不能超过1MB!');
                fileList.splice(-1, 1);
            }else{
                this.delPicList.push(this.qyjsForm.src);
            }
        },
        //产品图片change
        CpPicsChange: function (file, fileList) {
            var fileName = file.name.lastIndexOf(".");//取到文件名开始到最后一个点的长度
            var fileNameLength = file.name.length;//取到文件名长度
            var fileFormat = file.name.substring(fileName + 1, fileNameLength);
            const isPng = fileFormat.toLowerCase() == "png";
            const isJpg = fileFormat.toLowerCase() == "jpg";
            const isLt2M = file.size / 1024 /1024 < 2;
            if(!isPng && !isJpg){
                this.$message.error('Picture has to be endswith png or jpg');
                fileList.splice(-1, 1);
            }else if(!isLt2M){
                this.$message.error('Picture has to be less than 2MB!');
                fileList.splice(-1, 1);
            }else{
                this.delPicList.push(this.delPicSrc);
            }
        },
        //获取点击上传的产品图片位于第几个card，用于赋src值
        getIndex: function(index,src){
            this.index = index;
            if(src!=null && src!=undefined && src!=''){
                //this.delPicList.push(src);
                this.delPicSrc = src;
            }
        },
        //基本信息提交（下一步）
        submitJbxx: function(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.jbxxStatus == 0){//新增
                        if(this.mailCheck == false){
                            this.$message({
                                message: 'Please verify the Standby Email',
                                type: 'warning'
                            });
                            console.log('error submit!!');
                            return false;
                        }
                        else{
                            var params = {
                                userid: this.shiroData.userid,
                                ywgsmc: this.baseInforForm.ywgsmc,
                                frdb: this.baseInforForm.frdb,
                                frdbdh: this.baseInforForm.frdbdh,
                                yjdzxx: this.baseInforForm.yjdzxx,
                                bgdh: this.baseInforForm.bgdh,
                                cz: this.baseInforForm.cz,
                                lxr: this.baseInforForm.lxr,
                                lxrsj: this.baseInforForm.lxrsj,
                                wz: this.baseInforForm.wz,
                                dzyx: this.baseInforForm.dzyx1,
                                email:this.baseInforForm.email,
                                sjzt:'01',//编辑中
                                deleteFlag: 'N',
                                cjrid: this.shiroData.userid,
                                cjrmc: this.shiroData.username,
                                reserve2:this.baseInforForm.reserve2//邮政编码
                            }
                            axios.post('/xfxhapi/qyjbxx/doInsertByVo', params).then(function (res) {
                                //this.upLoadData.qyid = res.data.result.qyid;
                                //this.$refs.uploadPics.submit();
                                this.$message({
                                    message: 'Brief Company Information has been saved!',
                                    type: 'success'
                                });
                                this.active = 1;
                                this.isJbxxShow = false;
                                this.isKpxxShow = true;
                                this.jbxxStatus = 1;
                                this.qyid = res.data.result.qyid;
                                if(this.qyid != null && this.qyid != ''){
                                    this.findKpxxByQyid(this.qyid);
                                }
                            }.bind(this), function (error) {
                                console.log(error);
                            })
                        }

                    }else{//修改
                        //邮箱修改且邮箱验证通过flag为false
                        if(this.baseInforForm.dzyx != this.baseInforForm.dzyx1 && this.mailCheck == false){
                            this.$message({
                                message: 'Please verify the Standby Email',
                                type: 'warning'
                            });
                            console.log('error submit!!');
                            return false;
                        }else{
                            var params = {
                                qyid: this.baseInforForm.qyid,
                                ywgsmc: this.baseInforForm.ywgsmc,
                                frdb: this.baseInforForm.frdb,
                                frdbdh: this.baseInforForm.frdbdh,
                                yjdzxx: this.baseInforForm.yjdzxx,
                                bgdh: this.baseInforForm.bgdh,
                                cz: this.baseInforForm.cz,
                                lxr: this.baseInforForm.lxr,
                                lxrsj: this.baseInforForm.lxrsj,
                                wz: this.baseInforForm.wz,
                                dzyx: this.baseInforForm.dzyx1,
                                email:this.baseInforForm.email,
                                reserve2:this.baseInforForm.reserve2,
                                xgrid: this.shiroData.userid,
                                xgrmc: this.shiroData.username
                            }
                            axios.post('/xfxhapi/qyjbxx/doUpdateByVO', params).then(function (res) {
                                this.upLoadData.qyid = this.baseInforForm.qyid;
                                this.$message({
                                    message: 'Brief Company Information has been saved!',
                                    type: 'success'
                                });
                                this.active = 1;
                                this.isJbxxShow = false;
                                this.isKpxxShow = true;
                                if(this.qyid != null && this.qyid != ''){
                                    this.findKpxxByQyid(this.qyid);
                                }
                            }.bind(this), function (error) {
                                console.log(error);
                            })
                        }
                        
                    }
                   
                } else {
                  console.log('error submit!!');
                  return false;
                }
            });
            
        },
        //开票信息提交（下一步）
        submitKpxx: function(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.kpxxStatus == 0){//新增
                        var params={
                            qyid: this.qyid,
                            kpgsmc: this.kpxxForm.kpgsmc,
                            gsdz: this.kpxxForm.gsdz,
                            dhhm: this.kpxxForm.dhhm,
                            yhzh: this.kpxxForm.yhzh,
                            deleteFlag: 'N',
                            cjrid: this.shiroData.userid,
                            cjrmc: this.shiroData.username
                        }
                        axios.post('/xfxhapi/qykpxx/doInsertByVo', params).then(function (res) {
                            this.$message({
                                message: 'Invoice Information has been saved!',
                                type: 'success'
                            });
                            this.active = 2;
                            this.isKpxxShow = false;
                            this.isWjdcShow = true;
                            this.kpxxStatus = 1;
                            if(this.qyid != null && this.qyid != ''){
                                this.findWjdcByQyid(this.qyid);
                            }
                        }.bind(this), function (error) {
                            console.log(error);
                        })

                    }else{//修改
                        var params={
                            uuid: this.kpUuid,
                            kpgsmc: this.kpxxForm.kpgsmc,
                            gsdz: this.kpxxForm.gsdz,
                            dhhm: this.kpxxForm.dhhm,
                            yhzh: this.kpxxForm.yhzh,
                            xgrid: this.shiroData.userid,
                            xgrmc: this.shiroData.username
                        }
                        axios.post('/xfxhapi/qykpxx/doUpdateByVO', params).then(function (res) {
                            this.$message({
                                message: 'Invoice Information has been saved!',
                                type: 'success'
                            });
                            this.active = 2;
                            this.isKpxxShow = false;
                            this.isWjdcShow = true;
                            if(this.qyid != null && this.qyid != ''){
                                this.findWjdcByQyid(this.qyid);
                            }
                        }.bind(this), function (error) {
                            console.log(error);
                        })
                    }
                } else {
                  console.log('error submit!!');
                  return false;
                }
            });
        },
        //问卷调查提交（下一步）
        submitWjdc: function(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.wjdcStatus == 0){//新增
                        var zycp = "";
                        var reserve1 = "";
                        for(var i in this.wjdcForm.zycpList){
                            var str = this.wjdcForm.zycpList[i].substr(0,4) + ',';
                            zycp += str;
                            reserve1 += this.wjdcForm.zycpList[i] + ',';
                        }
                        var params={
                            qyid: this.qyid,
                            zycp: zycp.substr(0,zycp.length-1),//eg.1001,1002,1003
                            deleteFlag: 'N',
                            cjrid: this.shiroData.userid,
                            cjrmc: this.shiroData.username,
                            reserve1: reserve1.substr(0,reserve1.length-1),//eg.1001消防车
                        }
                        axios.post('/xfxhapi/qywjdc/doInsertByVo', params).then(function (res) {
                            this.$message({
                                message: 'Major Product Information has been saved!',
                                type: 'success'
                            });
                            this.active = 3;
                            this.isWjdcShow = false;
                            this.isCpjsShow = true;
                            this.wjdcStatus = 1;
                            if(this.qyid != null && this.qyid != ''){
                                this.findQyjsByQyid(this.qyid);
                            }
                        }.bind(this), function (error) {
                            console.log(error);
                        })

                    }else{//修改
                        var zycp = "";
                        var reserve1 = "";
                        for(var i in this.wjdcForm.zycpList){
                            var str = this.wjdcForm.zycpList[i].substr(0,4) + ',';
                            zycp += str;
                            reserve1 += this.wjdcForm.zycpList[i] + ',';
                        }
                        var params={
                            uuid: this.wjUuid,
                            qyid: this.qyid,
                            zycp: zycp.substr(0,zycp.length-1),//eg.1001,1002,1003
                            xgrid: this.shiroData.userid,
                            xgrmc: this.shiroData.username,
                            reserve1: reserve1.substr(0,reserve1.length-1),//eg.1001消防车
                        }
                        axios.post('/xfxhapi/qywjdc/doUpdateByVO', params).then(function (res) {
                            this.$message({
                                message: 'Major Product Information has been saved!',
                                type: 'success'
                            });
                            this.active = 3;
                            this.isWjdcShow = false;
                            this.isCpjsShow = true;
                            if(this.qyid != null && this.qyid != ''){
                                this.findQyjsByQyid(this.qyid);
                            }
                        }.bind(this), function (error) {
                            console.log(error);
                        })
                    }

                } else {
                  console.log('error submit!!');
                  return false;
                }
            });
        },
        //产品介绍提交（下一步）
        submitCpjs: function(formName){
            this.loading = true;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    var cp = this.qyjsForm.qycpjsVOList[this.qyjsForm.qycpjsVOList.length - 1];
                    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
                    if(this.qyjsForm.imageUrl == null || this.qyjsForm.imageUrl == ""){//判断企业logo是否上传
                        this.$message({
                            message: 'Please upload your Company Logo',
                            type: 'warning'
                        });
                        this.loading = false;
                        return false;
                    }else if(cp.cplx==''||cp.cpjj==''||cp.src ==''){//判断最后一个card产品信息是否填全
                        this.$message({
                            message: 'Please fill out the Product Examples form',
                            type: 'warning'
                        });
                        this.loading = false;
                        return false;
                    }else if(reg.test(cp.cpjj)){
                        this.$message({
                            message: 'Unable to input Chinese',
                            type: 'warning'
                        });
                        this.loading = false;
                        return false;
                    }
                    else{//信息填写完整
                        //var tempList = this.qyjsForm.qycpjsVOList;
                        var tempList = [];
                        for(var i in this.qyjsForm.qycpjsVOList){
                            var cpjj_temp = this.qyjsForm.qycpjsVOList[i].cpjj;
                            //产品类型级联下拉处理
                            if((typeof this.qyjsForm.qycpjsVOList[i].cplx=='object')&&this.qyjsForm.qycpjsVOList[i].cplx.constructor==Array&&this.qyjsForm.qycpjsVOList[i].cplx.length>0){
                                var length = this.qyjsForm.qycpjsVOList[i].cplx.length;
                                var cplx_temp = this.qyjsForm.qycpjsVOList[i].cplx[length-1];
                            }
                            var obj_temp = {
                                uuid:this.qyjsForm.qycpjsVOList[i].uuid,
                                qyid: this.qyid,
                                src: this.qyjsForm.qycpjsVOList[i].src,
                                cplx:cplx_temp,
                                cpjj:cpjj_temp
                            }
                            tempList.push(obj_temp);
                        }
                        if(this.cpjsStatus == 0){//新增
                            var params = {
                                qyid: this.qyid,
                                qyjj: this.qyjsForm.qyjj,
                                qycpjsVOList: tempList,
                                deleteFlag: 'N',
                                src:this.qyjsForm.src,
                                cjrid: this.shiroData.userid,
                                cjrmc: this.shiroData.username
                            }
                            axios.post('/xfxhapi/qyjs/doInsertByVo', params).then(function (res) {
                                //this.upLoadLogoData.uuid = res.data.result.uuid;
                                //this.$refs.uploadLogo.submit();
                                this.$message({
                                    message: 'Company Information Details and Product Examples has been saved!',
                                    type: 'success'
                                });
                                this.loading = false;
                                this.active = 4;
                                this.isCpjsShow = false;
                                this.isXqyxShow = true;
                                this.cpjsStatus = 1;
                                if(this.qyid != null && this.qyid != ''){
                                    this.findXqyxByQyid(this.qyid);
                                }
                                if(this.delPicList.length>0){
                                    axios.post('/xfxhapi/qycpjs/delPic',this.delPicList).then(function (res) {
                                        this.delPicList = [];
                                    }.bind(this), function (error) {
                                        console.log(error);
                                    })
                                }
                                this.unsavedPicList = [];
                            }.bind(this), function (error) {
                                console.log(error);
                            })
                        }else{//修改
                            var params = {
                                uuid: this.qyUuid,
                                qyid: this.qyid,
                                src:this.qyjsForm.src,
                                qyjj: this.qyjsForm.qyjj,
                                qycpjsVOList: tempList,
                                xgrid: this.shiroData.userid,
                                xgrmc: this.shiroData.username
                            }
                            axios.post('/xfxhapi/qyjs/doUpdateQyCpByVO', params).then(function (res) {
                                //this.upLoadLogoData.uuid = res.data.result.uuid;
                                //this.$refs.uploadLogo.submit();
                                this.$message({
                                    message: 'Company Information Details and Product Examples has been saved!',
                                    type: 'success'
                                });
                                this.loading = false;
                                this.active = 4;
                                this.isCpjsShow = false;
                                this.isXqyxShow = true;
                                this.cpjsStatus = 1;
                                if(this.qyid != null && this.qyid != ''){
                                    this.findXqyxByQyid(this.qyid);
                                }
                                if(this.delPicList.length>0){
                                    axios.post('/xfxhapi/qycpjs/delPic',this.delPicList).then(function (res) {
                                        this.delPicList = [];
                                    }.bind(this), function (error) {
                                        console.log(error);
                                    })
                                }
                                this.unsavedPicList = [];
                            }.bind(this), function (error) {
                                console.log(error);
                            })
                        }
                    }
                } else {
                  console.log('error submit!!');
                  return false;
                }
            });
        },
        //需求意向提交
        submitXqyx: function(){
            if(this.xqyxForm.bzzwgs >0 || this.xqyxForm.sngdzw >0|| this.xqyxForm.swgdzw >0){
                if(this.xqyxStatus == 0){//新增
                    var params = {
                        qyid: this.qyid,
                        bzzwgs: this.xqyxForm.bzzwgs,
                        sngdzw: this.xqyxForm.sngdzw,
                        swgdzw: this.xqyxForm.swgdzw,
                        deleteFlag: 'N',
                        cjrid: this.shiroData.userid,
                        cjrmc: this.shiroData.username
                    }
                    axios.post('/xfxhapi/qyzwyx/doInsertByVo', params).then(function (res) {
                        this.$message({
                            message: 'Questionnaire on your Booth Requirement has been saved!',
                            type: 'success'
                        });
                        this.active = 5;
                        this.xqyxStatus = 1;
                        this.submit();
                    }.bind(this), function (error) {
                        console.log(error);
                    })
                }else{//修改
                    var params = {
                        uuid: this.xqUuid,
                        qyid: this.qyid,
                        bzzwgs: this.xqyxForm.bzzwgs,
                        sngdzw: this.xqyxForm.sngdzw,
                        swgdzw: this.xqyxForm.swgdzw,
                        xgrid: this.shiroData.userid,
                        xgrmc: this.shiroData.username
                    }
                    axios.post('/xfxhapi/qyzwyx/doUpdateByVO', params).then(function (res) {
                        this.$message({
                            message: 'Questionnaire on your Booth Requirement has been saved!',
                            type: 'success'
                        });
                        this.active = 5;
                        //提交展位预报名信息
                        this.submit();
                    }.bind(this), function (error) {
                        console.log(error);
                    })
                }
                
            }else{
                this.$message({
                    message: 'Please choose at least one kind of booth!',
                    type: 'warning'
                });
                console.log('error submit!!');
                return false;
            }
            
        },
        //提交
        submit: function(){
            if(this.shiroData.deptid == "ZSYH"){//如果是展商用户跳转到确认页
                var params = {
                    userid: this.shiroData.userid,
                    type: "BJ"
                }
                loadDivParam("prediction/exhprediction_confirm_ENG", params);
            }else{//如果是管理员跳转到列表页
                loadDivParam("prediction/exhprediction_list");
            }
           
        },
        //开票信息上一步
        cancelKpxx: function(){
            this.active = 1;
            this.isKpxxShow = false;
            this.isJbxxShow = true;
        },
        //问卷调查上一步
        cancelWjdc: function(){
            this.active = 2;
            this.isWjdcShow = false;
            this.isKpxxShow = true;
        },
        //产品介绍上一步
        cancelCpjs: function(){
            this.active = 3;
            this.delPicList = [];
            if(this.unsavedPicList.length>0){
                axios.post('/xfxhapi/qycpjs/delPic',this.unsavedPicList).then(function (res) {
                    this.unsavedPicList = [];
                }.bind(this), function (error) {
                    console.log(error);
                })
            }
            this.isCpjsShow = false;
            this.isWjdcShow = true;
        },
        //需求意向上一步
        cancelXqyx: function(){
            this.active = 4;
            this.isXqyxShow = false;
            this.isCpjsShow = true;
        },
        
        //新增产品card
        addDomain:function(){
            //判断最后一个card产品信息是否填全
            var cp = this.qyjsForm.qycpjsVOList[this.qyjsForm.qycpjsVOList.length - 1];
            var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
            if(cp.cplx==''||cp.cpjj==''||cp.src ==''){
                this.$message({
                    message: 'Please fill out the Product Examples form',
                    type: 'warning'
                });
                return false;
            }else if(reg.test(cp.cpjj)){
                this.$message({
                    message: 'Unable to input Chinese',
                    type: 'warning'
                });
                return false;
            }else{
                if(this.qyjsForm.qycpjsVOList.length < 6){
                    this.qyjsForm.qycpjsVOList.push({
                        qyid:this.qyid,
                        cplx:[],
                        cpjj:'',
                        src:'',
                        imageUrl:'',
                        key: Date.now()
                    });
                }else{
                    this.$message({
                        message: 'You can add at most 6 product Examples',
                        type: 'warning'
                    });
                }
            }
            
        },
        //删除产品card
        removeDomain: function (item) {
            if(this.qyjsForm.qycpjsVOList.length > 1){
                var index = this.qyjsForm.qycpjsVOList.indexOf(item);
                if (index !== -1) {
                    if(this.qyjsForm.qycpjsVOList[index].src != ''
                    && this.qyjsForm.qycpjsVOList[index].src != null 
                    && this.qyjsForm.qycpjsVOList[index].src != undefined){
                        this.delPicList.push(this.qyjsForm.qycpjsVOList[index].src);
                    }
                    this.qyjsForm.qycpjsVOList.splice(index, 1);
                }
            }else{
                this.$message({
                    message: 'Please fill out at least one product example',
                    type: 'warning'
                });
            }
           
        },
       /*
        //关闭手机验证对话
        closeDialog:function(){
            this.dialogSjFormVisible = false;
           // this.sjform.sjh = "";
            this.sjform.yzm = "";
        },
        //获取短信验证码
        getMessageCode: function () {
            this.sjform.yzm = "";
            if(/^1[34578]\d{9}$/.test(this.baseInforForm.lxrsj)){
                this.dialogSjFormVisible = true;
                this.messageCodeText = "sending...";
                $('#mobile-btn').attr('disabled', 'disabled');
                axios.get('/xfxhapi/signin/sendMessage?phone=' + this.baseInforForm.lxrsj).then(function (res) {
                    this.messageCodeReal = res.data.msg;
                    var count = this.time;
                    this.timer = setInterval(() => {
                        if (count == 0) {
                            clearInterval(this.timer);
                            this.timer = null;
                            this.messageCodeText = "check";
                            $('#mobile-btn').removeAttr("disabled");
                        } else {
                            this.messageCodeText = count + "s"
                            count--;
                            $('#mobile-btn').attr('disabled', 'disabled');
                        }
                    }, 1000)
                }.bind(this), function (error) {
                    console.log(error);
                });
            }else{
                this.$message({
                    message: 'Error Phone Number',
                    type: 'error'
                });
            }
        },
        //手机验证码form提交
        sjformSubmit: function(formName){
            if(this.sjform.yzm == this.messageCodeReal && this.messageCodeReal != ""){
            //    this.baseInforForm.lxrsj = this.sjform.sjh;
                this.dialogSjFormVisible = false;
                this.checkedPhoneNum = this.baseInforForm.lxrsj_new;
                this.phoneCheck = true;
            }else{
                this.$message({
                    message: 'Verification Code Error',
                    type: 'error'
                });
            }
            
        },*/
        //邮箱验证表单提交
        yxformSubmit: function(){
            if(this.yxform.yzm == this.mailCodeReal){
                this.mailCheck = true;
                this.checkedMailAddress = this.baseInforForm.dzyx1;
                this.dialogYxFormVisible = false;
                this.$message({
                    message: 'success',
                    type: 'success'
                });
                this.mailCodeText = "verify";
            }else{
                this.$message({
                    message: 'Error Verification Code',
                    type: 'error'
                });
            }
        },
        //修改邮箱，默认是登录名
        openEmail:function(){
            this.dialogEmailFormVisible = true;
            $('#email-btn').attr('disabled', 'disabled');
            //$('#email-btn2').attr('disabled', 'disabled');
        },
        //email提交
        emailformSubmit:function(){
            if(this.emailform.email != null && this.emailform.email != ""){
                if(this.emailform.yzm == this.emailCodeReal && this.emailCodeReal != ""){
                    this.baseInforForm.email = this.emailform.email;
                    this.dialogEmailFormVisible = false;
                    $('#email-btn').removeAttr("disabled");
                    $('#email-btn2').removeAttr("disabled");
                    this.$message({
                        message: 'success',
                        type: 'success'
                    });
                }else{
                    this.$message({
                        message: 'Error Verification Code',
                        type: 'warning'
                    });
                }
            }else{
                this.$message({
                    message: 'Email is required',
                    type: 'warning'
                });
            }
        },
        //邮箱修改验证
        openYxYz: function(){
            if (!(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/.test(this.baseInforForm.dzyx1))) {
                this.$message({
                    message: 'error email',
                    type: 'warning'
                });
                return false;
            } else {
                //查询邮箱是否注册
                axios.get('/xfxhapi/qyjbxx/getMailNum/' + this.baseInforForm.dzyx1.replace(".", "_")).then(function (res) {
                    if (res.data.result == 0) {
                        this.mailCodeText = "sending...";
                        $('#mail-btn').attr('disabled', 'disabled');
                        axios.get('/xfxhapi/signin/sendMailEng?mail=' + this.baseInforForm.dzyx1).then(function (res) {
                            this.mailCodeReal = res.data.msg;
                            var count = this.time;
                            this.timer = setInterval(() => {
                                if (count == 0) {
                                    clearInterval(this.timer);
                                    this.timer = null;
                                    this.mailCodeText = "verify";
                                    $('#mail-btn').removeAttr("disabled");
                                } else {
                                    this.mailCodeText = count + "s"
                                    count--;
                                    $('#mail-btn').attr('disabled', 'disabled');
                                }
                            }, 1000);
                            this.dialogYxFormVisible = true;
                        }.bind(this), function (error) {
                            console.log(error);
                        });
                    }else if(this.baseInforForm.dzyx1 == this.baseInforForm.dzyx){
                        this.$message({
                            message: 'success!',
                            type: 'success'
                        });
                        return false;
                    }
                    else{
                        this.$message({
                            message: 'This email address has been used!',
                            type: 'warning'
                        });
                        return false;
                    }
                }.bind(this), function (error) {
                    console.log(error);
                });
            }
        },
        getEMessageCode:function(){
            if (!(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/.test(this.emailform.email))) {
                this.$message({
                    message: 'Error Email',
                    type: 'warning'
                });
                return false;
            } else {
                this.emailCodeText = "sending...";
                this.emailCodeText1 = "sending...";
                $('#email-btn').attr('disabled', 'disabled');
                $('#email-btn2').attr('disabled', 'disabled');
                axios.get('/xfxhapi/signin/sendMailEng?mail=' + this.emailform.email).then(function (res) {
                    this.emailCodeReal = res.data.msg;
                    var count = this.time2;
                    this.timer2 = setInterval(() => {
                    if (count == 0) {
                            clearInterval(this.timer2);
                            this.timer2 = null;
                            this.emailCodeText = "verify";
                            this.emailCodeText1 = "change";
                            $('#email-btn').removeAttr("disabled");
                            $('#email-btn2').removeAttr("disabled");
                    }else{
                            this.emailCodeText = count + "s"
                            this.emailCodeText1 = count + "s"
                            count--;
                            $('#email-btn').attr('disabled', 'disabled');
                            $('#email-btn2').attr('disabled', 'disabled');
                        }
                    }, 1000);
                    }.bind(this), function (error) {
                        console.log(error);
                    });
            }
        },
        //关闭邮箱验证对话
        closeYxDialog:function(){
            this.dialogYxFormVisible = false;
            //this.yxform.yx = "";
            this.yxform.yzm = "";
        },
        //关闭email
        closeEmailDialog:function(){
            this.dialogEmailFormVisible = false;
            this.emailform.email = "";
            this.emailform.yzm = "";
            $('#email-btn').removeAttr("disabled");
            $('#email-btn2').removeAttr("disabled");
        },
        //邮箱change判断需不需要重新验证
        dzyxChange: function(){
            if(this.checkedMailAddress != this.baseInforForm.dzyx1 && this.checkedMailAddress != ""){
                this.mailCheck = false;
            }
        },
        /*
        //联系人手机change
        lxrsjChange: function(){
            if(this.baseInforForm.lxrsj_new != this.checkedPhoneNum && this.checkedPhoneNum !=""){
                this.phoneCheck = false;
            }
        },*/
    },

})