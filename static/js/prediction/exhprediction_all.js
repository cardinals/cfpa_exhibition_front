//异步加载详情页
$(function () {
    loadDiv("prediction/exhprediction_edit");
});

//退出登录
function logout(){
    $('#login-out-form')[0].submit();
}

//axios默认设置cookie
axios.defaults.withCredentials = true;	
new Vue({
    el: '#app',
    data: function () {
        return {
        }
    },
    created: function () {
    
    },
    methods: {
        
    },

})