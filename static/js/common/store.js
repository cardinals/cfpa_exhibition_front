/**
const key = "user";
const isLogin = "isLogin";
const store = new Vuex.Store({
    state: {
        user: null,
        isLogin: false,
    },
    getters: {
        getStorage: function(state) {
            if(!state.user){
                state.user = JSON.parse(localStorage.getItem(key));
                state.isLogin = localStorage.getItem(isLogin);
            }
            return state.user;
        }
    },
    mutations: {
        $_setLogin(state, value){
            state.isLogin = value;
            localStorage.setItem(isLogin, value);
        },
        $_setStorage(state, value){
            state.user = value;
            localStorage.setItem(key, JSON.stringify(value));
        },
        $_removeStorage(state){
            state.user = null;
            localStorage.removeItem(key);
        }
    }
});
*/
axios.interceptors.request.use(
    config => {
        if(config.url != '/xfxhapi/login' && config.url != '/xfxhapi/getSession' && config.url != "/xfxhapi/shiro"){
            axios.get('/xfxhapi/getSession').then(function (res) {
                if(res.data == '0'){
                    alert("用户超时，请重新登陆");
                    window.location.href = "/templates/login.html"; 
                }
            }.bind(this), function (error) {
                console.log(error)
            })
        }
        return config;
    },
    err => {
        return Promise.reject(err);
});