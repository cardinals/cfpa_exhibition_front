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
            //显示加载中样
            loading: false,
            lastEl:'',
            lastEvent:'',
        }
    },
    mounted: function () {
        this.init();
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
        // setInterval(() => {
        //     this.refresh()
        // }, 120000)
    },
    methods: {
        refresh: function () {
            this.getStage(this.zguuid,this.lastEvent)
        },
        init() {
            axios.post('/xfxhapi/zgjbxx/doSearchDataListByVO').then(function (res) {
                this.tableData = res.data.result;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        getStage(uuid,event) {
            if (viewerHandshake) {
                viewerHandshake.destroy()
                viewerHandshake = null
            }
            if(event){
                this.lastEvent=event
                if(this.lastEl){
                    this.lastEl.style.background="#0684E5";
                    this.lastEl.disabled=false;
                }
                var el = event.currentTarget;
                if(el){
                    this.lastEl=el
                    el.style.background="#666666";
                    el.disabled=true;
                }
            }
            var params = {
                uuid: uuid
            }
            this.loading = true;
            this.zguuid = uuid
            axios.post('/xfxhapi/zgjbxx/doSearchHbListByVO', params).then(function (res) {
                this.currentAreaStage = res.data.result[0].zgzwhbStr
                this.initPlotArea()
                //this.overData = res.data.result;
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
            var postmate = new Postmate({
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
            })
        },
        getBusinessData(stageUuid) {
            var params = {
                zgid: this.zguuid
            }
            axios.post('/xfxhapi/zwjbxx/doSearchListByVO', params).then(function (res) {
                var businessData = this.back2plot(res.data.result)
                viewerHandshake.call('updateBusinessData', businessData)
                this.loading = false;
            }.bind(this), function (error) {
                console.log(error)
            })
        },
        back2plot(backData) {
            var plotData = []
            for (var i = 0; i < backData.length; i++) {
                var bd = backData[i]
                var pd = {}
                pd.uuid = bd.uuid
                pd.code = bd.zwh
                pd.codeFontSize = parseInt(bd.bhzh)
                pd.codeFontStyle = bd.bhzc
                pd.codeFontFamily = bd.bhzt
                pd.name = bd.zwmc
                pd.nameFontSize = parseInt(bd.mczh)
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
                plotData.push(pd)
            }
            return plotData
        }
    }
})
