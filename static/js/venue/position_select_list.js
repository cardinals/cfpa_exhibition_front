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
            yxzwData:[]
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
        this.currentUuid = getQueryString("uuid");
        if(this.currentUuid){
            this.getStage(this.currentUuid)
        }
        this.getYxzwData()
    },
    methods: {
        //已选展位
        getYxzwData: function () {
            axios.post('/xfxhapi/zwjbxx/getSelectedPos').then(function (res) {
                debugger
                if (res.data.result.length > 0) {
                    this.yxzwData= res.data.result;
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        handlerDel : function(event,uuid){
            var el = event.currentTarget;
            this.$confirm('此操作将删除该展位选择, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
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
                            debugger
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
                  message: '已取消删除'
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
        getStage(uuid,e) {
            var params = {
                uuid: uuid
            }
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
            var params = {
                uuid: data.uuid
            }
            axios.post('/xfxhapi/zwjbxx/doUpdateByVO', params).then(function (res) {
                if(res.data.msg=='success'){
                    let bp = []
                    bp.push(res.data.result)
                    let businessData = this.back2plot(bp)[0]
                    //需要新增
                    viewerHandshake.call('updateBusinessRecord', businessData)
                    this.$message({
                        message: '展位选择成功',
                        type: 'success',
                        center: true
                    });
                    this.yxzwData.push(businessData)
                }else{
                    let msg=res.data.msg;
                    if(!msg){
                        msg="选择展位失败！"
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
                plotData.push(pd)
            }
            return plotData
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
