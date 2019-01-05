//axios默认设置cookie
axios.defaults.withCredentials = true;
var vue = new Vue({
    el: '#app',
    data: function () {
        return {
            
        }
    },
    created: function () {
        loadBreadcrumb("展馆平面图", "-1");
    },
    mounted: function () {
        
    },
    computed: {
        
    },
    methods: {
        planClick(uuid) {
            var params = {
                uuid: uuid
            }
            loadDivParam("venue/position_select_list", params);
        }
    }
})
