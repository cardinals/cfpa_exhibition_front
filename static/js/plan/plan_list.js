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
            dialogVisible: false
        }
    },
    created: function () {
        loadBreadcrumb("展馆平面图", "-1");
    },
    mounted: function () {
        
    },
    computed: {
        ploterStyle() {
            return {
                display: this.ploter.show ? 'flex' : 'none'
            }
        }
    },
    methods: {
        planClick(uuid) {
            var params = {
                uuid: uuid
            }
            debugger
            //loadDivParam("all.html?url=/venue/position_select", params);
            loadDivParam("venue/position_select_list", params);
        }
    }
})
