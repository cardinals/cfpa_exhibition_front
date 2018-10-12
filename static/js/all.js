//异步加载详情页
$(function () {
    //动态加载main
    var paramUrl = getQueryString("url");
    if(paramUrl == null){
        paramUrl="/home";
    }
    loadDiv(urlRewrite(paramUrl));
});
/**header-box by li.xue 20180628 */
var shiroGlobal = "";
var realname = "";
var permissions = [];
axios.get('/xfxhapi/shiro').then(function (res) {
    if(res.data.organizationVO == null || res.data.organizationVO == ""){
        res.data.organizationVO = {
            uuid: "",
            jgjc: ""
        }
    }
    shiroGlobal = res.data;
    //用户权限
    for(var i in res.data.permissions){
        permissions.push(res.data.permissions[i]);
    }
    realname = res.data.realName;
    if(realname == null || realname == ""){
        realname = "欢迎您！"
    }
    if(res.data.deptid == "GLYH"){
        document.getElementById("personal").style.display = "none";
    }
    document.querySelector("#realname").innerHTML = realname;
    if(res.data == null && realname == null && realname == ""){
        window.location.href = "login.html";
    }
}.bind(this), function (error) {
    console.log(error)
});

//axios默认设置cookie
axios.defaults.withCredentials = true;	
new Vue({
    el: '#app',
    data: function () {
        return {
            index: '',
            resourceinfo: '',
            url: '',
        }
    },
    created: function () {
        
    },
    methods: {
       
    },

})