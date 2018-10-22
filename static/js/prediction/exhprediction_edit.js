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
           // childrenCpflSelect:[],
            //进度条
            active: 0,
            //基本信息表单
            baseInforForm: {
                zwgsmc:'',
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
                yyzzBase64: '',
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
                logo:'',
                logoBase64:'',
                qyjj:'',
                qycpjsVOList:[],
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
            //增值税专用发票flag
            isZyfp: false,
            //代理海外产品flag
            ishwdlcp: false,
            //是否高新技术企业flag
            isgxjsqy: false,
            //是否行业信用等级flag
            isSfhyxydj: false,
            //问卷调查产品类型选择标识
            isCplxSelect: false,
            //手机验证表单显示标识
            dialogSjFormVisible:false,
            //邮箱表单显示标识
            dialogYxFormVisible:false,
            //邮箱验证flag
            mailCheck: false,
            //上传的文件为pdf标识
            isPdf:false,
            //通过验证的邮箱地址（记录以防验证后修改邮箱）
            checkedMailAddress:'',
            //短信验证按钮文字
            messageCodeText: "获取验证码",
            //短信验证码
            messageCodeReal:"",
            //邮箱验证码
            mailCodeReal:"",
            //邮箱验证按钮文字
            mailCodeText:"验证",
            time: 60,
            timer: null,
            //产品index
            index:0,

            //行政区划tree
            xzqhDataTree:[],
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
            },
            //公司logo
            imageUrl: '',
            //公司性质data
            gsxz_data: [],
            //高新技术级别data
            gxjsjb_data: [],
            //公司主营产品
            zycp_data: [],
            //行业信用等级
            hyxydj_data: [],
            //产品所属分类
            cpssfl_data: [],
            //手机验证表单
            sjform:{
                sjh:'',
                yzm:''
            },
            yxform:{
                yzm:''
            },
            baseInforRules: {
                zwgsmc: [
                  { required: true, message: '请输入中文公司名称', trigger: 'blur' }
                ],
                xzqh: [
                    { required: true, message: '请选择邮寄地址省市', trigger: 'change' }
                ],
                yjdzxx: [
                  { required: true, message: '请输入详细地址', trigger: 'blur' }
                ],
                bgdh: [
                    { required: true, message: '请输入办公电话', trigger: 'blur' }
                  ],
                frdb: [
                    { required: true, message: '请输入法人代表', trigger: 'blur' }
                  ],
                frdbdh: [
                    { required: true, message: '请输入法人代表电话', trigger: 'blur' }
                  ],
                lxr: [
                    { required: true, message: '请输入联系人', trigger: 'blur' }
                  ],
                lxrsj: [
                    { required: true, message: '请输入联系人手机号码', trigger: 'blur' }
                  ],
                wz: [
                    { required: true, message: '请输入网址', trigger: 'blur' }
                  ],
                dzyx1: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                  ]
              },
            kpxxRules: {
                kplx: [
                    { required: true, message: '请选择开票类型', trigger: 'change' }
                  ],
                kpgsmc: [
                  { required: true, message: '请输入开票公司名称', trigger: 'blur' }
                ],
                tyshxydm: [
                    { required: true, message: '请输入统一社会信用代码', trigger: 'blur' },
                    { min: 18, max: 18, message: '请输入18位统一社会信用代码', trigger: 'blur' }
                ],
                gsdz: [
                  { required: true, message: '请输入公司地址', trigger: 'blur' }
                ],
                dhhm: [
                  { required: true, message: '请输入电话号码', trigger: 'blur' }
                ],
                khyh: [
                  { required: true, message: '请输入开户银行', trigger: 'blur' }
                ],
                yhzh: [
                  { required: true, message: '请输入银行账号', trigger: 'blur' }
                ]
            },
            wjdcRules: {
                gsxz: [
                    { required: true, message: '请选择公司性质', trigger: 'change' }
                ],
                sfhwdlcp: [
                    { required: true, message: '请选择是否代理海外产品', trigger: 'change' }
                ],
                hwdlcppp: [
                    { required: true, message: '请输入产品品牌', trigger: 'blur' }
                ],
                fmzl: [
                  { required: true, message: '请输入发明专利(项)', trigger: 'blur' }
                ],
                syxxzl: [
                  { required: true, message: '请输入实用新型专利(项)', trigger: 'blur' }
                ],
                wgsjzl: [
                  { required: true, message: '请输入外观设计专利(项)', trigger: 'blur' }
                ],
                sfgxjsqy: [
                    { required: true, message: '请选择是否为高新技术企业', trigger: 'change' }
                ],
                gxjsjb: [
                    { required: true, message: '请选择高新技术级别', trigger: 'change' }
                ],
                sfhyxydj: [
                    { required: true, message: '请选择是否在2018年参与中国消防协会消防行业信用等级评价', trigger: 'change' }
                ],
                hyxydj: [
                    { required: true, message: '请选择行业信用等级', trigger: 'change' }
                ],
                zycpList: [
                    { required: true, message: '请选择主营产品类型号', trigger: 'change' }
                ],
            },
            qyjsRules: {
                qyjj: [
                  { required: true, message: '请输入企业简介', trigger: 'blur' }
                ]
            },
            cpjsRules: {
                cplx: [
                  { required: true, message: '请选择产品所属分类', trigger: 'change' }
                ],
                cpjj: [
                  { required: true, message: '请输入产品简介', trigger: 'blur' }
                ]
            },
            sjformRules:{
                sjh:[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '请输入正确格式的手机号',trigger: 'blur' }
                ],
                yzm:[{ required: true, message: '请输入验证码', trigger: 'blur' }],
            },
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
        this.getXzqhDataTree();
        this.getGsxz();//公司性质
        this.getGxjsjb();//高新技术级别
        this.getCplx();//产品类型
        this.getHyxydj();//行业信用等级
        this.getCpssfl();//产品所属分类
    },
    methods: {
        //行政区划级联选择数据
        getXzqhDataTree: function () {
            var params = {
                codetype: "XZQH",
                list: [2,4]
            };
            axios.post('/xfxhapi/codelist/getCodelisttree2',params).then(function (res) {
                this.xzqhDataTree = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //根据代码集获取公司性质
        getGsxz: function(){
            axios.get('/xfxhapi/codelist/getCodetype/GSXZ').then(function (res) {
                this.gsxz_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //根据代码集获取高新技术级别
        getGxjsjb: function(){
            axios.get('/xfxhapi/codelist/getCodetype/GXJSJB').then(function (res) {
                this.gxjsjb_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //根据代码集获取公司主营产品tree
        getCplx: function(){
            axios.post('/xfxhapi/codelist/getZycpTree/CPLX').then(function(res){
                this.zycp_data = res.data.result;
            }.bind(this),function(error){
                console.log(error);
            })
        },
        //根据代码集获取行业信用等级
        getHyxydj: function(){
            axios.get('/xfxhapi/codelist/getCodetype/HYXYDJ').then(function (res) {
                this.hyxydj_data = res.data.result;
            }.bind(this), function (error) {
                console.log(error);
            })
        },
        //根据代码集获取产品所属分类
        getCpssfl: function(){
            axios.get('/xfxhapi/codelist/getDzlxTree/CPLX').then(function (res) {
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
            axios.post('/zhapi/qyjbxx/doFindByUserid', params).then(function (res) {
                if(res.data.result != null && res.data.result != ""){
                    if(this.shiroData.deptid == "GLYH"||res.data.result.sjzt == '01' || res.data.result.sjzt == '04'){//编辑中，已驳回
                        this.baseInforForm = res.data.result;
                        this.baseInforForm.yyzzBase64 = 'data:image/png;base64,'+ this.baseInforForm.yyzzBase64;
                        //行政区划级联下拉处理
                        var xzqhArray = [];
                        xzqhArray.push(res.data.result.yjdzsheng);
                        xzqhArray.push(res.data.result.yjdzshi);
                        this.baseInforForm.xzqh = xzqhArray;
                        this.baseInforForm.dzyx1 = this.baseInforForm.dzyx;
                        this.jbxxStatus = 1;//修改
                        this.qyid = res.data.result.qyid;
                    }else{//已提交，已审核 直接跳转到确认页
                        var params = {
                            userid: this.shiroData.userid,
                            type: "BJ"
                        }
                        loadDivParam("prediction/exhprediction_confirm", params);
                    }
                }else{
                    this.jbxxStatus = 0;//新增
                    this.baseInforForm.lxrsj = this.shiroData.username;
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
            axios.post('/zhapi/qykpxx/list', params).then(function (res) {
                if(res.data.result.length>0){
                    this.kpxxForm = res.data.result[0];
                    if(this.kpxxForm.kplx == '1'){//专票
                        this.isZyfp = true;
                    }
                    this.kpxxStatus = 1;//修改
                    this.kpUuid = res.data.result[0].uuid;
                }else{
                    this.kpxxStatus = 0;//新增
                     //开票公司名称：必填，把企业基本信息中的“中文公司名称“带到文本框中，文本框可修改
                    this.kpxxForm.kpgsmc = this.baseInforForm.zwgsmc;
                     //把企业基本信息中的“邮寄地址“带到文本框中，可修改
                    var obj = document.getElementById("ShengShiCascader");
                    var text = obj.textContent.replace(/\s/ig,''); // 选中文本
                    this.kpxxForm.gsdz = text+this.baseInforForm.yjdzxx;
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
            axios.post('/zhapi/qywjdc/list', params).then(function (res) {
                if(res.data.result.length>0){
                    this.wjdcForm = res.data.result[0];
                    this.wjdcForm.zycpList = [];
                    if(this.wjdcForm.sfhwdlcp == '1'){//海外产品代理
                        this.ishwdlcp = true;
                    }
                    if(this.wjdcForm.sfgxjsqy == '1'){//是否为高新技术企业
                        this.isgxjsqy = true;
                    }
                    if(this.wjdcForm.sfhyxydj == '1'){//是否在2018年参与中国消防协会消防行业信用等级评价
                        this.isSfhyxydj = true;
                    }
                //    this.wjdcForm.zycpList = this.wjdcForm.reserve1.split(",");
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
            axios.post('/zhapi/qyjs/list', params).then(function (res) {
                if(res.data.result.length>0){
                    var resultForm = res.data.result[0];
                    var params = {
                        qyid: qyid,
                        deleteFlag : 'N'
                    }
                    axios.post('/zhapi/qycpjs/list', params).then(function (res) {
                        var result = res.data.result;
                        for(var i in result){
                            var cplxArray = [];
                            cplxArray.push(result[i].cplx.substr(0, 1) + "000");
                            cplxArray.push(result[i].cplx);
                            result[i].cplx = cplxArray;
                            result[i].cptpBase64 = 'data:image/png;base64,'+ result[i].cptp;
                        }
                        resultForm.qycpjsVOList = result;
                        this.qyjsForm = resultForm;
                        this.qyjsForm.logoBase64 = 'data:image/png;base64,'+ this.qyjsForm.logo;
                    }.bind(this), function (error) {
                        console.log(error)
                    })
                    this.cpjsStatus = 1;//修改
                    this.qyUuid = res.data.result[0].uuid;
                }else{
                    this.cpjsStatus = 0;//新增
                    if(this.qyjsForm.qycpjsVOList.length == 0){
                        this.qyjsForm.qycpjsVOList.push({
                            qyid:this.qyid,
                            cptp:'',
                            cplx:[],
                            cpjj:'',
                            cptpBase64:'',
                            key: Date.now()
                        });
                    }
                    
                }
                this.loading = false;
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
            axios.post('/zhapi/qyzwyx/list', params).then(function (res) {
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
            for(var i in this.zycp_data){
                if(this.zycp_data[i].codeValue == codeValue){
                    this.childrenCpfl = this.zycp_data[i].children;
                }
            }
            //document.getElementById("childrenRow").innerHTML="";
        },
       
        //关闭标签
        handleTagClose:function(tag){
            this.wjdcForm.zycpList.splice(this.wjdcForm.zycpList.indexOf(tag), 1);
        },
        //图片上传成功回调方法
        picSuccess: function (res, file) {
            console.log(file);
        },
        //营业执照change
        PicChange: function (file,fileList) {
            const isPng = file.name.endsWith("png");
            const isJpg = file.name.endsWith("jpg");
            this.isPdf = file.name.endsWith("pdf");
            const isLt200K = file.size / 1024 < 200;
            if (!isLt200K) {
                this.$message.error('上传图片大小不能超过200KB!');
                fileList.splice(-1, 1);
            }else{
                if (isPng || isJpg) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file.raw);
                    reader.onload = function(e){
                        vm.baseInforForm.yyzzBase64 = reader.result;
                    }
                } else {
                    this.$message.error('只能上传jpg、png格式的文件');
                    fileList.splice(-1, 1);
                }
            }
            
        },
        //企业logo
        LogoChange: function (file,fileList) {
            const isPng = file.name.endsWith("png");
            const isJpg = file.name.endsWith("jpg");
            const isLt100K = file.size / 1024 < 100;
            if (!isLt100K) {
                this.$message.error('上传图片大小不能超过100KB!');
                fileList.splice(-1, 1);
            }else{
                if (isPng || isJpg) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file.raw);
                    reader.onload = function(e){
                        vm.qyjsForm.logoBase64 = reader.result;
                    }
                } else {
                    this.$message.error('只能上传jpg、png格式的图片');
                    fileList.splice(-1, 1);
                }
            }
        },
        //产品图片
        CpPicsChange: function (file,fileList) {
            const isPng = file.name.endsWith("png");
            const isJpg = file.name.endsWith("jpg");
            const isLt100K = file.size / 1024 < 100;
            if (!isLt100K) {
                this.$message.error('上传图片大小不能超过100KB!');
                fileList.splice(-1, 1);
            }else{
                if (isPng || isJpg) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file.raw);
                    reader.onload = function(e){
                    //vm.qyjsForm.logoBase64 = reader.result;
                    vm.qyjsForm.qycpjsVOList[vm.index].cptpBase64 = reader.result;
                    }
                } else {
                    this.$message.error('只能上传jpg、png格式的图片');
                    fileList.splice(-1, 1);
                }
            }
        },
        //获取点击上传的产品图片位于第几个card，用于回显base64图片
        getIndex: function(index){
            this.index = index;
            //console.log(index);
        },
        //基本信息提交（下一步）
        submitJbxx: function(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.jbxxStatus == 0){//新增
                        if(this.mailCheck == false){
                            this.$message({
                                message: '请对修改后的邮箱进行验证',
                                type: 'warning'
                            });
                            console.log('error submit!!');
                            return false;
                        }else if(this.baseInforForm.yyzzBase64 == null || this.baseInforForm.yyzzBase64 == ""){
                            this.$message({
                                message: '请上传企业营业执照',
                                type: 'warning'
                            });
                            console.log('error submit!!');
                            return false;
                        }
                        else{
                            var params = {
                                userid: this.shiroData.userid,
                                zwgsmc: this.baseInforForm.zwgsmc,
                                ywgsmc: this.baseInforForm.ywgsmc,
                                frdb: this.baseInforForm.frdb,
                                frdbdh: this.baseInforForm.frdbdh,
                                yjdzsheng: this.baseInforForm.xzqh[0],
                                yjdzshi: this.baseInforForm.xzqh[1],
                                yjdzxx: this.baseInforForm.yjdzxx,
                                bgdh: this.baseInforForm.bgdh,
                                cz: this.baseInforForm.cz,
                                lxr: this.baseInforForm.lxr,
                                lxrsj: this.baseInforForm.lxrsj,
                                wz: this.baseInforForm.wz,
                                dzyx: this.baseInforForm.dzyx1,
                                yyzz:this.baseInforForm.yyzz,
                                sjzt:'01',//编辑中
                                deleteFlag: 'N',
                                cjrid: this.shiroData.userid,
                                cjrmc: this.shiroData.username
                            }
                            axios.post('/zhapi/qyjbxx/doInsertByVo', params).then(function (res) {
                                this.upLoadData.qyid = res.data.result.qyid;
                                this.$refs.uploadPics.submit();
                                this.$message({
                                    message: '企业基本信息暂存成功',
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
                                message: '请对修改后的邮箱进行验证',
                                type: 'warning'
                            });
                            console.log('error submit!!');
                            return false;
                        }else{
                            var params = {
                                qyid: this.baseInforForm.qyid,
                                zwgsmc: this.baseInforForm.zwgsmc,
                                ywgsmc: this.baseInforForm.ywgsmc,
                                frdb: this.baseInforForm.frdb,
                                frdbdh: this.baseInforForm.frdbdh,
                                yjdzsheng: this.baseInforForm.xzqh[0],
                                yjdzshi: this.baseInforForm.xzqh[1],
                                yjdzxx: this.baseInforForm.yjdzxx,
                                bgdh: this.baseInforForm.bgdh,
                                cz: this.baseInforForm.cz,
                                lxr: this.baseInforForm.lxr,
                                lxrsj: this.baseInforForm.lxrsj,
                                wz: this.baseInforForm.wz,
                                dzyx: this.baseInforForm.dzyx1,
                                yyzz:this.baseInforForm.yyzz,
                                xgrid: this.shiroData.userid,
                                xgrmc: this.shiroData.username
                            }
                            axios.post('/zhapi/qyjbxx/doUpdateByVO', params).then(function (res) {
                                this.upLoadData.qyid = this.baseInforForm.qyid;
                                this.$refs.uploadPics.submit();
                                this.$message({
                                    message: '企业基本信息暂存成功',
                                    type: 'success'
                                });
                                this.active = 1;
                                this.isJbxxShow = false;
                                this.isKpxxShow = true;
                                //console.log(this.qyid);
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
                            kplx: this.kpxxForm.kplx,
                            kpgsmc: this.kpxxForm.kpgsmc,
                            tyshxydm: this.kpxxForm.tyshxydm,
                            gsdz: this.kpxxForm.gsdz,
                            dhhm: this.kpxxForm.dhhm,
                            khyh: this.kpxxForm.khyh,
                            yhzh: this.kpxxForm.yhzh,
                            deleteFlag: 'N',
                            cjrid: this.shiroData.userid,
                            cjrmc: this.shiroData.username
                        }
                        axios.post('/zhapi/qykpxx/doInsertByVo', params).then(function (res) {
                            this.$message({
                                message: '企业开票信息暂存成功',
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
                            kplx: this.kpxxForm.kplx,
                            kpgsmc: this.kpxxForm.kpgsmc,
                            tyshxydm: this.kpxxForm.tyshxydm,
                            gsdz: this.kpxxForm.gsdz,
                            dhhm: this.kpxxForm.dhhm,
                            khyh: this.kpxxForm.khyh,
                            yhzh: this.kpxxForm.yhzh,
                            xgrid: this.shiroData.userid,
                            xgrmc: this.shiroData.username
                        }
                        axios.post('/zhapi/qykpxx/doUpdateByVO', params).then(function (res) {
                            this.$message({
                                message: '企业开票信息暂存成功',
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
                            gsxz: this.wjdcForm.gsxz,
                            sfhwdlcp: this.wjdcForm.sfhwdlcp,
                            hwdlcppp: this.wjdcForm.hwdlcppp,
                            fmzl: this.wjdcForm.fmzl,
                            syxxzl: this.wjdcForm.syxxzl,
                            wgsjzl: this.wjdcForm.wgsjzl,
                            sfgxjsqy: this.wjdcForm.sfgxjsqy,
                            gxjsjb: this.wjdcForm.gxjsjb,
                            zycp: zycp.substr(0,zycp.length-1),//eg.1001,1002,1003
                            sfhyxydj: this.wjdcForm.sfhyxydj,
                            hyxydj: this.wjdcForm.hyxydj,
                            deleteFlag: 'N',
                            cjrid: this.shiroData.userid,
                            cjrmc: this.shiroData.username,
                            reserve1: reserve1.substr(0,reserve1.length-1),//eg.1001消防车
                        }
                        axios.post('/zhapi/qywjdc/doInsertByVo', params).then(function (res) {
                            this.$message({
                                message: '企业问卷调查暂存成功',
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
                            gsxz: this.wjdcForm.gsxz,
                            sfhwdlcp: this.wjdcForm.sfhwdlcp,
                            hwdlcppp: this.wjdcForm.hwdlcppp,
                            fmzl: this.wjdcForm.fmzl,
                            syxxzl: this.wjdcForm.syxxzl,
                            wgsjzl: this.wjdcForm.wgsjzl,
                            sfgxjsqy: this.wjdcForm.sfgxjsqy,
                            gxjsjb: this.wjdcForm.gxjsjb,
                            zycp: zycp.substr(0,zycp.length-1),//eg.1001,1002,1003
                            sfhyxydj: this.wjdcForm.sfhyxydj,
                            hyxydj: this.wjdcForm.hyxydj,
                            xgrid: this.shiroData.userid,
                            xgrmc: this.shiroData.username,
                            reserve1: reserve1.substr(0,reserve1.length-1),//eg.1001消防车
                        }
                        axios.post('/zhapi/qywjdc/doUpdateByVO', params).then(function (res) {
                            this.$message({
                                message: '企业问卷调查暂存成功',
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
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //判断最后一个card产品信息是否填全
                    var cp = this.qyjsForm.qycpjsVOList[this.qyjsForm.qycpjsVOList.length - 1];
                    if(cp.cplx==''||cp.cpjj==''||cp.cptpBase64 ==''){
                        this.$message({
                            message: '请完整填写产品信息',
                            type: 'warning'
                        });
                        return false;
                    }else{//信息填写完整
                        //var tempList = this.qyjsForm.qycpjsVOList;
                        var tempList = [];
                        for(var i in this.qyjsForm.qycpjsVOList){
                            var cpjj_temp = this.qyjsForm.qycpjsVOList[i].cpjj;
                            //产品类型级联下拉处理
                            if((typeof this.qyjsForm.qycpjsVOList[i].cplx=='object')&&this.qyjsForm.qycpjsVOList[i].cplx.constructor==Array&&this.qyjsForm.qycpjsVOList[i].cplx.length>0){
                                var length = this.qyjsForm.qycpjsVOList[i].cplx.length;
                                var cplx_temp = this.qyjsForm.qycpjsVOList[i].cplx[length-1];
                            }
                            //产品图片base64切成byte
                            var temp_str = this.qyjsForm.qycpjsVOList[i].cptpBase64.split(",");
                            var obj_temp = {
                                uuid:this.qyjsForm.qycpjsVOList[i].uuid,
                                qyid: this.qyid,
                                cptp: temp_str[1],
                                cplx: cplx_temp,
                                cpjj: cpjj_temp
                            }
                            tempList.push(obj_temp);
                        }
                        if(this.cpjsStatus == 0){//新增
                            if(this.qyjsForm.logoBase64 == null || this.qyjsForm.logoBase64 == ""){
                                this.$message({
                                    message: '请上传企业logo',
                                    type: 'warning'
                                });
                                console.log('error submit!!');
                                return false;
                            }else{
                                var params = {
                                    qyid: this.qyid,
                                //    logo: this.qyjsForm.logoBase64,
                                    qyjj: this.qyjsForm.qyjj,
                                    qycpjsVOList: tempList,
                                    deleteFlag: 'N',
                                    cjrid: this.shiroData.userid,
                                    cjrmc: this.shiroData.username
                                }
                                axios.post('/zhapi/qyjs/doInsertByVo', params).then(function (res) {
                                    this.upLoadLogoData.uuid = res.data.result.uuid;
                                    this.$refs.uploadLogo.submit();
                                    this.$message({
                                        message: '企业产品介绍暂存成功',
                                        type: 'success'
                                    });
                                    this.active = 4;
                                    this.isCpjsShow = false;
                                    this.isXqyxShow = true;
                                    this.cpjsStatus = 1;
                                    if(this.qyid != null && this.qyid != ''){
                                        this.findXqyxByQyid(this.qyid);
                                    }
                                }.bind(this), function (error) {
                                    console.log(error);
                                })
                            }
                            
                        }else{//修改
                            var params = {
                                uuid: this.qyUuid,
                                qyid: this.qyid,
                            //   logo: this.qyjsForm.logo,
                                qyjj: this.qyjsForm.qyjj,
                                qycpjsVOList: tempList,
                                xgrid: this.shiroData.userid,
                                xgrmc: this.shiroData.username
                            }
                            axios.post('/zhapi/qyjs/doUpdateQyCpByVO', params).then(function (res) {
                                this.upLoadLogoData.uuid = res.data.result.uuid;
                                this.$refs.uploadLogo.submit();
                                this.$message({
                                    message: '企业产品介绍暂存成功',
                                    type: 'success'
                                });
                                this.active = 4;
                                this.isCpjsShow = false;
                                this.isXqyxShow = true;
                                this.cpjsStatus = 1;
                                if(this.qyid != null && this.qyid != ''){
                                    this.findXqyxByQyid(this.qyid);
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
                    axios.post('/zhapi/qyzwyx/doInsertByVo', params).then(function (res) {
                        this.$message({
                            message: '企业参展展位需求意向暂存成功',
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
                    axios.post('/zhapi/qyzwyx/doUpdateByVO', params).then(function (res) {
                        this.$message({
                            message: '企业参展展位需求意向暂存成功',
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
                    message: '请至少填写一种展位需求意向',
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
                loadDivParam("prediction/exhprediction_confirm", params);
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
            this.isCpjsShow = false;
            this.isWjdcShow = true;
        },
        //需求意向上一步
        cancelXqyx: function(){
            this.active = 4;
            this.isXqyxShow = false;
            this.isCpjsShow = true;
        },
        //发票类型change
        fplxChange: function(){
            if(this.kpxxForm.kplx == "1"){//增值税专用发票
                this.isZyfp = true;
            }else{
                this.isZyfp = false;
                this.kpxxForm.dhhm = "";
                this.kpxxForm.khyh = "";
                this.kpxxForm.yhzh = "";
            }
        },
        //是否代理海外产品change
        sfhwdlcpChange: function(){
            if(this.wjdcForm.sfhwdlcp == "1"){//是
                this.ishwdlcp = true;
            }else{
                this.ishwdlcp = false;
                this.wjdcForm.hwdlcppp = "";
            }
        },
        //是否高新技术企业change
        sfgxjsqyChange: function(){
            if(this.wjdcForm.sfgxjsqy == "1"){//是
                this.isgxjsqy = true;
            }else{
                this.isgxjsqy = false;
                this.wjdcForm.gxjsjb = "";
            }
        },
        //是否行业信用等级change
        sfhyxydjChange: function(){
            if(this.wjdcForm.sfhyxydj == "1"){//是
                this.isSfhyxydj = true;
            }else{
                this.isSfhyxydj = false;
                this.wjdcForm.hyxydj = "";
            }
        },
        //新增产品card
        addDomain:function(){
            //判断最后一个card产品信息是否填全
            var cp = this.qyjsForm.qycpjsVOList[this.qyjsForm.qycpjsVOList.length - 1];
            if(cp.cplx==''||cp.cpjj==''){
                this.$message({
                    message: '请完整填写产品信息中的全部内容',
                    type: 'warning'
                });
                return false;
            }else{
                this.qyjsForm.qycpjsVOList.push({
                    qyid:this.qyid,
                    cptp:'',
                    cplx:[],
                    cpjj:'',
                    cptpBase64:'',
                    key: Date.now()
                });
            }
            
        },
        //删除产品card
        removeDomain: function (item) {
            if(this.qyjsForm.qycpjsVOList.length > 1){
                var index = this.qyjsForm.qycpjsVOList.indexOf(item)
                if (index !== -1) {
                    this.qyjsForm.qycpjsVOList.splice(index, 1)
                }
            }
           
        },
        //手机修改验证
        openSjYz: function(){
            this.dialogSjFormVisible = true;
        },
        //关闭手机验证对话
        closeDialog:function(){
            this.dialogSjFormVisible = false;
            this.sjform.sjh = "";
            this.sjform.yzm = "";
        },
        //获取短信验证码
        getMessageCode: function () {
            this.sjform.yzm = "";
            if(/^1[34578]\d{9}$/.test(this.sjform.sjh)){
                this.messageCodeText = "发送中...";
                $('#mobile-btn').attr('disabled', 'disabled');
                axios.get('/xfxhapi/signin/sendMessage?phone=' + this.sjform.sjh).then(function (res) {
                    this.messageCodeReal = res.data.msg;
                    var count = this.time;
                    this.timer = setInterval(() => {
                        if (count == 0) {
                            clearInterval(this.timer);
                            this.timer = null;
                            this.messageCodeText = "获取验证码";
                            $('#mobile-btn').removeAttr("disabled");
                        } else {
                            this.messageCodeText = count + "秒后获取"
                            count--;
                            $('#mobile-btn').attr('disabled', 'disabled');
                        }
                    }, 1000)
                }.bind(this), function (error) {
                    console.log(error);
                });
            }
        },
        //手机验证码form提交
        sjformSubmit: function(formName){
            if(this.sjform.sjh != null && this.sjform.sjh != ""){
                if(this.sjform.yzm == this.messageCodeReal && this.messageCodeReal != ""){
                    this.baseInforForm.lxrsj = this.sjform.sjh;
                    this.dialogSjFormVisible = false;
                }else{
                    this.$message({
                        message: '验证码错误',
                        type: 'error'
                    });
                }
            }else{
                this.$message({
                    message: '请输入手机号',
                    type: 'error'
                });
            }
        },
        //邮箱验证表单提交
        yxformSubmit: function(){
            if(this.yxform.yzm == this.mailCodeReal){
                this.mailCheck = true;
                this.checkedMailAddress = this.baseInforForm.dzyx1;
                this.dialogYxFormVisible = false;
                this.$message({
                    message: '邮箱验证成功',
                    type: 'success'
                });
            }else{
                this.$message({
                    message: '验证码错误',
                    type: 'error'
                });
            }
        },
        //邮箱修改验证
        openYxYz: function(){
            if (!(/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/.test(this.baseInforForm.dzyx1))) {
                this.$message({
                    message: '邮箱格式不正确',
                    type: 'warning'
                });
                return false;
            } else {
                //查询邮箱是否注册
                axios.get('/zhapi/qyjbxx/getMailNum/' + this.baseInforForm.dzyx1.replace(".", "_")).then(function (res) {
                    if (res.data.result == 0) {
                        this.mailCodeText = "发送中...";
                        $('#mail-btn').attr('disabled', 'disabled');
                        axios.get('/xfxhapi/signin/sendMail?mail=' + this.baseInforForm.dzyx1).then(function (res) {
                            this.mailCodeReal = res.data.msg;
                            var count = this.time;
                            this.timer = setInterval(() => {
                                if (count == 0) {
                                    clearInterval(this.timer);
                                    this.timer = null;
                                    this.mailCodeText = "验证";
                                    $('#mail-btn').removeAttr("disabled");
                                } else {
                                    this.mailCodeText = count + "秒后获取"
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
                            message: '此邮箱已通过验证',
                            type: 'success'
                        });
                        return false;
                    }
                    else{
                        this.$message({
                            message: '此邮箱已被注册,请更换邮箱',
                            type: 'warning'
                        });
                        return false;
                    }
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
        //邮箱change判断需不需要重新验证
        dzyxChange: function(){
            if(this.checkedMailAddress != this.baseInforForm.dzyx1 && this.checkedMailAddress != ""){
                this.mailCheck = false;
            }
        },
       
    },

})