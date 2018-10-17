//异步加载详情页
var shiroGlobal = "";
var realname = "";
var permissions = [];
//异步加载详情页
$(function () {
    axios.get('/xfxhapi/shiro').then(function (res) {
        shiroGlobal = res.data;
        if(res.data != null && res.data != ""){
            //动态加载main
            loadDiv("prediction/exhprediction_edit");

            //用户权限
            for(var i in res.data.permissions){
                permissions.push(res.data.permissions[i]);
            }
            realname = res.data.username;
            if(realname == null || realname == ""){
                realname = "欢迎您！"
            }
            document.querySelector("#realname").innerHTML = realname;
        }else{
            window.location.href = "/templates/login.html";
        }
    }.bind(this), function (error) {
        console.log(error)
    });
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