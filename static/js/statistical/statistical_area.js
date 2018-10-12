var vue = new Vue({
	el: "#app",
	data: function () {
		return {
			//页面获取的uuid
			uuid: "",
			//搜索表单
			searchForm: {
				dateStart: "",
				dateEnd: "",
			},
			tjfxbarData:"",
			//tabledata
			tjfxtabledata:[],
			//展位面积范围
			zwmjfwmc:[],
			zwmjfwmcsl:[],

			//pieTitle
			pieTitle: '',
			pieTitle0: '按光地展位面积范围统计展会预报名情况比例图',
			pieTitle1: '24-50 m² 产品类型统计占比',
			pieTitle2: '50-100 m² 产品类型统计占比',
			pieTitle3: '100-200 m² 产品类型统计占比',
			pieTitle4: '200 m² 以上面积 产品类型统计占比',
			//pieData
			pieDataz0: [],
			pieDataz1: [],
			pieDataz2: [],
			pieDataz3: [],
			pieDataz4: [],
			//bardata
			tjfxname:[],
			tjfxs1:[],
			tjfxs2:[],
			tjfxs3:[],
			tjfxs4:[],
			tjfxs:[],	
			tabledata: [],
			//表高度变量
			tableheight: 482,//多选值
			multipleSelection: [],
			//当前页
			currentPage: 1,
			//分页大小
			pageSize: 10,
			//总记录数
			total: 31,
			//行数据保存
			rowdata: {

			},
			//序号
			indexData: 0,
			//显示加载中样
			loading: false,
			labelPosition: 'right',
			//表高度变量
            tableheight: 360,
		}
	},
	mounted: function () {
		this.getCPLX();
	},
	created: function () {
		/**菜单选中 by li.xue 20180628*/
		//$("#activeIndex").val(getQueryString("index"));
		/**面包屑 by li.xue 20180628*/
		var type = getQueryString("type");
		if (type == "MJFW") {
			loadBreadcrumb("统计分析", "按面积范围");
		} else {
			loadBreadcrumb("按面积范围", '按产品类型统计');
		}
	},
	methods: {
		//获取产品类型
		getCPLX: function () {
			var params = {};
			axios.post('/zhapi/qyzwyx/dofindtjfxsj',params).then(function (res) {	
				this.tjfxtabledata = res.data.result;
				for(var i=0; i<this.tjfxtabledata.length;i++){
					this.zwmjfwmc.push(this.tjfxtabledata[i].zwmjfwmc)				
					this.zwmjfwmcsl.push(this.tjfxtabledata[i].sl)
				}
				//画柱状图
				this.barChart();
				//画饼图
				this.pieTitle=this.pieTitle0;
			    this.pieDataz=this.zwmjfwmcsl;
			    this.pieChart();
				this.loading = false;			
			}.bind(this), function (error) {
				console.log(error)
			})

		},

		// 左侧柱状图
		barChart: function () {
			var myChart = echarts.init(document.getElementById('bar'));
			option = {
				title: {
					text: '按光地展位面积范围统计展会预报名情况柱状图',
					x: 'center',
					// y: '-15'
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {            // 坐标轴指示器，坐标轴触发有效
						type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				grid: {
					top: '30',
					bottom: '10',
					left: '15',
					right: '40',
					containLabel: true
				},
				xAxis: [
					{
						type: 'category',
						
						data: this.zwmjfwmc,
						axisLabel: {
							interval: 0,
						},
					}
				],
				yAxis: [
					{ 
						name:'数量',
						type: 'value',
						splitLine: {
							show: false
						},
					}
				],
				
				series: [
					{
						name: '数量',
						type: 'bar',
						barWidth: '100%',
						stack: '面积',
						barWidth: '45',
						//柱状图
						data:this.zwmjfwmcsl,
						smooth: true,
						itemStyle: {
							normal: {
								// 绿+蓝
								color: function (params) {
									var colorList = ['#fdc107'];
									return colorList[params.dataIndex];
								}
							}
						}
					}
					
				]
			};
			myChart.setOption(option);
		},

		// 右侧玫瑰图
		pieChart: function () {
			var myChart = echarts.init(document.getElementById('pie'));
			var option = {
				title: {
					text: this.pieTitle,
					left: 'center',
					// top: -15,
				},
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient: 'vertical',
					x: '68%',
					y: 'center',
					itemGap: 16,
					itemWidth: 18,
					// data:this.tjfxname,
					data: this.zwmjfwmc,
					align: 'left',
					itemGap: 8,
				},
				series: [
					{
						name: this.pieTitle,
						type: 'pie',
						radius: '55%',
						center: ['35%', '50%'],
						data:this.pieDataz,
						// data: this.pieDataz
						// 	.sort(function (a, b) { return a.value - b.value; }),
						// data:this.tjfxs1,
						roseType: 'radius',
						label: {
							show: true,
							// position: 'inside',
							formatter: '{d}%',
						},
						labelLine: {
							show: true,
							length: 5
						},
						animationType: 'scale',
						animationEasing: 'elasticOut',
						animationDelay: function (idx) {
							return Math.random() * 200;
						}
					}
				]
			};
			
			myChart.setOption(option);
		},
		//表格重新加载数据
		loadingData: function () {
			var _self = this;
			_self.loading = true;
			setTimeout(function () {
				console.info("加载数据成功");
				_self.loading = false;
			}, 300);
		},
		//当前页修改事件
		currentPageChange: function (val) {
			this.currentPage = val;
			var _self = this;
			_self.loadingData(); //重新加载数据
		},
		//根据参数部分和参数名来获取参数值 
		GetQueryString: function (name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]); return null;
		},
	}
})
