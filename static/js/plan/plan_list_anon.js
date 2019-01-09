//axios默认设置cookie
axios.defaults.withCredentials = true;
var vue = new Vue({
    el: '#app',
    data: function () {
        return {
            
        }
    },
    created: function () {
        
    },
    mounted: function () {
        
    },
    computed: {
        
    },
    methods: {
        planClick(uuid) {
            location.href="/templates/venue/position_select_list_anon.html?uuid="+uuid
        }
    }
})
