//axios默认设置cookie
axios.defaults.withCredentials = true;
var viewerHandshake = null
var vue = new Vue({
    el: '#app',
    data: function () {
        return {
            currentArea: null,
            currentAreaStage: null,
            tableData: [],
            zguuid: '',
            ploter: {
                show: true
            },
            dialogVisible: false,
            currentUuid: '',
            isExportDisabled: true,
            yxzwData:[],
            //显示加载中样
            loading: false,
            lastEl:'',
            lastEvent:'',
            blnbzwsj:'2018-12-22 12:05:34', //显示内部展位时间
            now:''
        }
    },
    mounted: function () {
        this.init();
       //关闭左侧菜单
        this. closeleft();
    },
    computed: {
        ploterStyle() {
            return {
                display: this.ploter.show ? 'flex' : 'none'
            }
        }
    },
    created: function () {
        this.getNow()
        this.currentUuid = getQueryString("uuid");
        if(this.currentUuid){
            this.getStage(this.currentUuid)
        }
        this.getYxzwData()
        setInterval(() => {
            this.refresh()
        }, 30000)
    },
    methods: {
        getNow: function(){
            axios.post('/xfxhapi/zwjbxx/getNow').then(function (res) {
                this.now=res.data
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        refresh: function () {
            this.getStage(this.zguuid,this.lastEvent)
        },
        //已选展位
        getYxzwData: function () {
            axios.post('/xfxhapi/zwjbxx/getSelectedPos').then(function (res) {
                if (res.data.result.length > 0) {
                    this.yxzwData= res.data.result;
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        handlerDel : function(event,uuid){
            var el = event.currentTarget;
            this.$confirm('此操作将取消该展位选择, 是否继续?', '提示', {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning'
              }).then(() => {
                if(uuid){
                    var params = {
                        uuid: uuid
                    }
                    axios.post('/xfxhapi/zwjbxx/doCancelByVO', params).then(function (res) {
                        if(res.data.msg=='success'){
                            let bp = []
                            bp.push(res.data.result)
                            let businessData = this.back2plot(bp)[0]
                            //需要新增
                            viewerHandshake.call('updateBusinessRecord', businessData)
                            this.$message({
                                message: '展位取消成功',
                                type: 'success',
                                center: true
                            });
                            this.yxzwData=[]
                            this.getYxzwData()
                            el.style.display="none";
                        }else{
                            let msg=res.data.msg;
                            if(!msg){
                                msg="展位取消失败！"
                            }
                            this.$message({
                                message: msg,
                                type: 'error',
                                center: true
                            });
                        }
                    }.bind(this), function (error) {
                        console.log(error)
                    })
                }
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '展位取消成功'
                });          
              });
        },
        handlerExport : function(){
            if(this.zguuid){
                var params = {
                    uuid: this.zguuid
                }
                axios.post('/xfxhapi/zgjbxx/doExportTp',params).then(function (res) {
                    if(res.status==200){
                        this.$message({
                            message: '已将展馆图片发送到您当前账户绑定邮箱，请查收！',
                            type: 'success',
                            center: true
                        });
                        this.isExportDisabled = true
                    }
                }.bind(this), function (error) {
                    console.log(error)
                })
            }
        },
         //关闭左侧菜单
         closeleft:function(){
            document.getElementById("menu-toggle-btn").style.right="-26px";
            document.getElementById("menu-toggle-btn").style.transform="rotateY(180deg)";
            // if( history.previous != history.current ){
            //     window.location.reload();     
            //    };
            var left = $('.left-sidebar'),
                main = $('.main-box'),
                $this = $(this);
            if (left.hasClass('damin')) {
                left.removeClass('damin').css('left', '0');
                main.css('padding-left', '240px');
                setTimeout(function () {
                    $this.removeClass('menu-toggle-bg').css({ "right": "0", "transform": "rotateY(0)" });
                }, 300);
            } else {
                left.addClass('damin').css('left', '-240px');
                main.css('padding-left', 0);
                setTimeout(function () {
                    $this.addClass('menu-toggle-bg').css({ "right": "-26px", "transform": "rotateY(180deg)" });
                }, 300);
            }
            // location.reload();
        },
        init() {
            axios.post('/xfxhapi/zgjbxx/doSearchDataListByVO').then(function (res) {
                this.tableData = res.data.result;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        getStage(uuid,event) {
            if(event){
                this.lastEvent=event
                if(this.lastEl){
                    this.lastEl.style.background="#0684E5";
                    this.lastEl.disabled=false;
                }
                var el = event.currentTarget;
                this.lastEl=el
                el.style.background="#666666";
                el.disabled=true;
            }
            var params = {
                uuid: uuid
            }
            this.loading = true;
            this.zguuid = uuid
            axios.post('/xfxhapi/zgjbxx/doSearchHbListByVO', params).then(function (res) {
                this.currentAreaStage = res.data.result[0].zgzwhbStr
                this.initPlotArea()
                this.overData = res.data.result;
                this.isExportDisabled = false
            }.bind(this), function (error) {
                console.log(error)
            })

        },


        
        // 标绘工具
        initPlotArea() {
            if (viewerHandshake) {
                viewerHandshake.destroy()
                viewerHandshake = null
            }
            const me = this
            const ploterWrap = this.$refs.ploterWrap
            let postmate = new Postmate({
                container: ploterWrap,
                url: plotUrl,
                model: {
                    stageRecord: {
                        jsonData: this.currentAreaStage,
                        uuid: this.zguuid
                    },
                    config: {
                        readOnly: true,
                        businessShape: {
                            enable: true,
                            requestLoop: 0 // 0为不轮询
                        }
                    }
                }
            })
            postmate.then(handshake => {
                viewerHandshake = handshake
                handshake.frame.className = 'app-viewer-ploter-iframe'
                handshake.on('evtNeedBusinessData', me.getBusinessData.bind(me))
                handshake.on('evtBusinessShapeSelected', me.handlerBusinessShapeSelected.bind(me))
            })
            this.loading = false;
        },
        getBusinessData(stageUuid) {
            var params = {
                zgid: this.zguuid
            }
            axios.post('/xfxhapi/zwjbxx/doSearchListByVO', params).then(function (res) {
                let businessData = this.back2plot(res.data.result)
                viewerHandshake.call('updateBusinessData', businessData)
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        handlerBusinessShapeSelected(data) {
            var msg=''
            
            if(this.yxzwData.length>0){
                var yxzwxx=''
                for(let i=0;i<this.yxzwData.length;i++){
                    if(i==0){
                        yxzwxx+=this.yxzwData[i].zwh
                    }else{
                        yxzwxx+="，"+this.yxzwData[i].zwh
                    }
                }
                msg='您已选择展位'+yxzwxx+' 是否继续选择此展位？'
            }else{
                msg='是否确定选择此展位?'
            }    
            this.$confirm(msg, '提示', {
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning'
              }).then(() => {

                var params = {
                    uuid: data.uuid,
                    reserve2:1
                }
                axios.post('/xfxhapi/zwjbxx/doUpdateByVO', params).then(function (res) {
                    if(res.data.msg=='success'){
                        let bp = []
                        bp.push(res.data.result)
                        this.yxzwData.push(bp[0])
                        let businessData = this.back2plot(bp)[0]
                        //需要新增
                        viewerHandshake.call('updateBusinessRecord', businessData)
                        this.$message({
                            message: '展位选择成功',
                            type: 'success',
                            center: true
                        });
                    }else{
                        let msg=res.data.msg;
                        if(!msg){
                            msg="选择展位失败！"
                        }
                        let bp = []
                        bp.push(res.data.result)
                        let businessData = this.back2plot(bp)[0]
                        //需要新增
                        viewerHandshake.call('updateBusinessRecord', businessData)
                        this.$alert('<span style="color:red"><h3>'+msg+'</h3></span>', '注意', {
                            confirmButtonText: '确定',
                            type:'error',
                            dangerouslyUseHTMLString:true
                          });
                    }
                }.bind(this), function (error) {
                    console.log(error)
                })

              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消选择'
                });          
              });
        },
        back2plot(backData) {
            let plotData = []
            for (let i = 0; i < backData.length; i++) {
                let bd = backData[i]
                let pd = {}
                pd.uuid = bd.uuid
                pd.code = bd.zwh
                pd.codeFontSize = bd.bhzh
                pd.codeFontStyle = bd.bhzc
                pd.codeFontFamily = bd.bhzt
                pd.name = bd.zwmc
                pd.nameFontSize = bd.mczh
                pd.nameFontStyle = bd.mczc
                pd.nameFontFamily = bd.mczt
                //展位类型
                pd.boothType = bd.zwlb
                //出口类型
                pd.entryType = bd.cklx
                //企业名称
                pd.tenantName = bd.qymc
                pd.lateralLength = bd.zwcd
                pd.verticalLength = bd.zwkd
                pd.area = bd.zwmj
                pd.status = bd.zwzt
                pd.stageUuid = bd.zgid
                pd.shapeUuid = bd.reserve1
                pd.tenantId = bd.qyid
                if(pd.tenantName){
                    pd.name=pd.tenantName
                }
                // blnbzwsj 显示内部展位时间
                debugger
                if(this.compareDate(this.blnbzwsj,this.now)){
                    //如果展位状态为内部预留则展位显示初始状态
                    if(bd.reserve2){
                        if(backData.length>0){
                            pd.status='bespoke'
                        }
                        pd.name=''
                        pd.tenantName=''
                    }
                }
                //当前企业查看本公司展位为红色
                for(var j in this.yxzwData){
                    if(this.yxzwData[j].zwh==bd.zwh){
                        pd.status='allotted'
                        if(bd.qymc){
                            pd.name=bd.qymc
                        }
                    }
                }
                plotData.push(pd)
            }
            return plotData
        },
        compareDate (d1,d2){
            return ((new Date(d1.replace(/-/g,"\/"))) > (new Date(d2.replace(/-/g,"\/"))));
        },
        plot2back(plotData) {
            let backData = []
            for (let i = 0; i < plotData.length; i++) {
                let pd = plotData[i]
                let bd = {}
                bd.uuid = pd.uuid
                bd.zwh = pd.code
                bd.bhzh = pd.codeFontSize
                bd.bhzc = pd.codeFontStyle
                bd.bhzt = pd.codeFontFamily
                bd.zwmc = pd.name
                bd.mczh = pd.nameFontSize
                bd.mczc = pd.nameFontStyle
                bd.mczt = pd.nameFontFamily
                //展位类型
                bd.zwlb = pd.boothType
                //出口类型
                bd.cklx = pd.entryType
                //企业名称
                bd.qymc = pd.tenantName
                bd.zwcd = pd.lateralLength
                bd.zwkd = pd.verticalLength
                bd.zwmj = pd.area
                bd.zwzt = pd.status
                bd.zgid = pd.stageUuid
                bd.reserve1 = pd.shapeUuid
                bd.qyid = pd.tenantId
                backData.push(bd)
            }
            return backData
        }
    }
})
