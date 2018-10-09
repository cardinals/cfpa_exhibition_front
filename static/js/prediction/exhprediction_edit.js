//axios默认设置cookie
axios.defaults.withCredentials = true;
new Vue({
    el: '#app',
    data: function () {
        return {
            //菜单编码
            activeIndex: '',
            //显示加载中样
            loading: false,
            //进度条
            active: 0,
            //基本信息表单
            baseInforForm: [],
            //开票信息表单
            kpxxForm: [],
            //问卷调查表单
            wjdcForm: [],
            //企业介绍表单
            qyjsForm: [],
            //产品介绍表单
            cpjsForm: {
                cpxxList:[],
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
            //行政区划tree
            xzqhDataTree:[],
            //树结构配置
            defaultProps: {
                children: 'children',
                label: 'codeName',
                value: 'codeValue'
            },
            //上传图片Data
            picList: [],
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
        }
    },
    
    created: function () {
        var type = getQueryString("type");
        if (type == "XZ") {
            loadBreadcrumb("九小场所管理", "九小场所新增");
        } else if (type == "BJ") {
            loadBreadcrumb("九小场所管理", "九小场所编辑");
        }
        this.shiroData = shiroGlobal;
        
    },
    mounted: function () {
        //this.getXzqhDataTree();
        this.getGsxz();//公司性质
        this.getGxjsjb();//高新技术级别
        this.getCplx();//产品类型
        this.getHyxydj();//行业信用等级
        this.getCpssfl();//产品所属分类
    },
    methods: {
        //行政区划级联选择数据
        getXzqhDataTree: function () {
            axios.get('/xfxhapi/codelist/getXzqhTreeByUser').then(function (res) {
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
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        //附件移除（图片）
        picRemove: function (file, fileList) {
            console.log(file, fileList);
            
        },
        //图片上传成功回调方法
        picSuccess: function (response, file, fileList) {
            console.log(file, fileList);
        },
        PicChange: function (file, fileList) {
            const isPng = file.name.endsWith("png");
            const isJpg = file.name.endsWith("jpg");
            const isBmp = file.name.endsWith("bmp");
            const isJpeg = file.name.endsWith("jpeg");
            if (isPng || isJpg || isBmp || isJpeg) {
                this.isPic = true;
            } else {
                this.$message.error('上传的图片只能是 png/jpg/bmp/jpeg 格式的文件!');
                fileList.splice(-1, 1);
            }
        },
        //基本信息提交（下一步）
        submitJbxx: function(){
            this.active = 1;
            this.isJbxxShow = false;
            this.isKpxxShow = true;
        },
        //开票信息提交（下一步）
        submitKpxx: function(){
            this.active = 2;
            this.isKpxxShow = false;
            this.isWjdcShow = true;
        },
        //问卷调查提交（下一步）
        submitWjdc: function(){
            this.active = 3;
            this.isWjdcShow = false;
            this.isCpjsShow = true;
        },
        //产品介绍提交（下一步）
        submitCpjs: function(){
            this.active = 4;
            this.isCpjsShow = false;
            this.isXqyxShow = true;
        },
        //需求意向提交
        submitXqyx: function(){
            this.active = 5;
            alert(666);
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
            this.cpjsForm.cpxxList.push({
                qyid:'',
                cptp:'',
                cplx:'',
                cpjj:'',
                key: Date.now()
            });
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
          },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
    
            if (!isJPG) {
              this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        
    },

})