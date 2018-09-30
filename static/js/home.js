//axios默认设置cookie
axios.defaults.withCredentials = true;	
new Vue({
    el: '#app',
    data: function () {
        return {
        }
    },
    created: function () {
        //菜单选中
        var index = getQueryString("index");
        if(index=="" || index == ""){
            index = "1";
        }
        $("#activeIndex").val(index);
        this.activeIndex = index;
    },
    methods: {

    },

})