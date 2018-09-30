//axios默认设置cookie
axios.defaults.withCredentials = true;
var vm = new Vue({        
    el: '#app',
    data() {
        return {
          //表数据
          tableData: [],//Grid中数据
          defaultProps: {
            children: 'children',
            label: 'resourceinfo'
          },
          resourceForm:"",
          //全部资源列表
          allPermissionList:[],
          //资源权限列表
          permissionDetailList: [],
          permissionDetailSelect:[],
          addVisible:false,
          addForm: {
            parentid:"",
            resourcename:"",
            resourceinfo:"",
            icon:"",
            type:"",
            permissions:[],
          },
          addFormRules: {
            resourcename: [
                { required: true, message: '请输入资源名称', trigger: 'blur' },
            ],
            resourceinfo: [
                { required: true, message: '请输入资源描述', trigger: 'blur' },
            ],
            /** 
            seqno: [
                { required: true, message: '请输入顺序', trigger: 'blur' }
               
            ],
            */
          },
        };
      },
      mounted:function(){
        axios.get(baseUrl+'/api/resource/getAll').then(function(res){
            this.tableData = res.data.result;
        }.bind(this),function(error){
            console.log(error)
        }),
        this.total = this.tableData.length;
        
        // axios.get('http://localhost:80/api/role/getRole/{userid}').then(function(res){
        //     console.log(res.data.result);
        //     this.tableData = res.data.result;
        // }.bind(this),function(error){
        //     console.log(error)
        // }),
        // this.total = this.tableData.length;
        //  this.resourceList=val;
        //  var _self = this;
        //  _self.resourceVisible=true;
        this.getAllPermissions();
      } ,
    created: function () {
      /**菜单选中 by li.xue 20180628*/
		  // $("#activeIndex").val(getQueryString("index"));
      /**面包屑 by li.xue 20180628*/
      loadBreadcrumb("资源管理", "-1");
    }, 
    methods: {
      //左侧树点击事件
      handleNodeClick(data,node) {
        this.findResourceById(data.resourceid);
        this.permissionDetailSelect = [],
        this.permissionDetails(data.resourceid);
      //  var tree = document.getElementById('tree').childNodes[0];
      },
      //更新
      update: function(){
        var permission = new Array();
        for(var i in this.permissionDetailSelect){
          var params = {
            permissionid:this.permissionDetailSelect[i]
          }
          permission.push(params);
        }
        var params = {
          resourceid : this.resourceForm.resourceid,
          resourcename : this.resourceForm.resourcename,
          resourceinfo:this.resourceForm.resourceinfo,
          parentid:this.resourceForm.parentid,
          seqno:this.resourceForm.seqno,
          icon:this.resourceForm.icon,
          type:this.resourceForm.type,
          permissions:permission
        }
        axios.post('/api/resource/updateByVO', params).then(function(res){
          this.resourceForm = res.data.result;
          this.changeTreeLable(this.tableData,this.resourceForm.resourceid);
          this.$message({
            showClose: true,
            message: '更新成功',
            type: 'success'
          });
          }.bind(this),function(error){
            this.$message({
              showClose: true,
              message: '更新失败',
              type: 'error'
            });
            console.log(error)
          })
      },
      //新增
      append(store, data) {
        this.addVisible = true;
        this.addForm.parentid = data.resourceid;
        //store.append({ id: id++, label: 'testtest', children: [] }, data);
      },
      //新增父级资源
      appendParent:function(){
        this.addVisible = true;
        this.addForm.parentid = '-1';
      },
      //删除
      remove(store, data) {
        this.$confirm('此操作将删除该资源, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var id = data.resourceid;
          axios.get('/api/resource/deleteOneById/'+ id).then(function(res){
            store.remove(data);
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
            }.bind(this),function(error){
              console.log(error)
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      //获取权限列表
      getAllPermissions: function(){
        axios.get('/api/permission/getAll').then(function(res){
          this.allPermissionList = res.data.result;
        }.bind(this),function (error) {
          console.log(error);
        })
      },
      //资源详情
      findResourceById:function(resourceid){
        axios.get('/api/resource/'+resourceid).then(function(res){
          this.resourceForm = res.data.result;
        }.bind(this),function (error) {
            console.log(error);
        })
      },
      //根据资源ID查询其权限
      permissionDetails: function(id){
        axios.get('/api/permission/getPermission/' + id).then(function(res){
            this.permissionDetailList = res.data.result;
            if(this.permissionDetailList.length>0){
              for(var i=0;i<this.permissionDetailList.length;i++){
                  this.permissionDetailSelect.push(this.permissionDetailList[i].permissionid);
              }
            }
        }.bind(this),function(error){
            console.log(error)
        })
      },
      //取消
      cancel:function(){
        this.findResourceById(this.resourceForm.resourceid);
        this.permissionDetailSelect = [],
        this.permissionDetails(this.resourceForm.resourceid);
      },
    //左侧树显示的label
    renderContent(createElement, { node, data, store }) {
        // if(data.parentId == -1){
          return createElement(
            'span',
            {},
            [
              createElement('span',{},[createElement('span',node.label)]),
              createElement('span',{},[
                createElement('el-button',{
                                          style:{'font-size':' 14px','float':'right','margin-right':'10px'},
                                          attrs:{'type':'text'},
                                          on:{click:function(){vm.remove(store, data);}},
                                          domProps: {innerHTML: '-'}}),
                createElement('el-button',{
                                        style:{'font-size':' 14px','float':'right','margin-right':'20px'},
                                        attrs:{'type':'text'},
                                        on:{click:function(){vm.append(store, data);}},
                                        domProps: {innerHTML: '+'}})
              ])
            ]
          );
        // }else{
        //   return createElement(
        //     'span',
        //     {},
        //     [
        //       createElement('span',{},[createElement('span',node.label)]),
        //       createElement('span',{},[
        //         createElement('el-button',{style:{'font-size':' 14px','float':'right',
        //                                     'margin-right':'10px'},attrs:{'type':'text'},on:{click:function(){
        //                                       vm.remove(store, data);}},domProps: {innerHTML: '-'}})
        //       ])
        //     ]
        //   );
        // }
        
      },
    //新增事件
    checkAdd:function(val) {
      if(val.resourcename==""||val.resourceinfo==""){
        this.$message({
          showClose: true,
          message: '请完整输入必填项',
          type: 'error'
        });
      }
      else{
        var params = {
          resourcename:this.addForm.resourcename,
        }
        axios.post('/api/resource/list', params).then(function(res){
          var addData = res.data.result;
          if(addData.length != 0){
            this.$message({
              showClose: true,
              message: '资源名称已存在',
              type: 'error'
            });
          }else{
            this.addSubmit(val);
          }
          }.bind(this),function(error){
            console.log(error)
          })
      }
    },
    addSubmit: function(val){
      var permission = new Array();
        for(var i in this.addForm.permissions){
          var param = {
            permissionid:this.addForm.permissions[i]
          }
          permission.push(param);
        }
      var params = {
        resourcename:this.addForm.resourcename,
        resourceinfo:this.addForm.resourceinfo,
        parentid:val.parentid,
        icon:this.addForm.icon,
        type:this.addForm.type,
        permissions:permission
      }
      axios.post('/api/resource/insertByVO', params).then(function(res){
        this.$message({
          showClose: true,
          message: '新增成功',
          type: 'success'
        });
        location.reload();
      }.bind(this),function(error){
        console.log(error)
      })
    },
    closeDialog: function (val) {
      this.addVisible = false;
      this.$refs["addForm"].resetFields();
    },

    changeTreeLable: function(parentNode,searchKey){
      for(var i in parentNode){
        if(parentNode[i].resourceid == searchKey){
          parentNode[i].resourceinfo = this.resourceForm.resourceinfo;
        } 
        else if(parentNode[i].children != null ){
          var children = parentNode[i].children;
          this.changeTreeLable(children,searchKey);
        }
      }
    },
  },
    
})