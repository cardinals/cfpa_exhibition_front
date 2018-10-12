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
		    pieDataz:[],
			//bardata
			tjfxname:[],

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
					var arr1={};
					arr1.value=this.tjfxtabledata[i].sl
					arr1.name=this.tjfxtabledata[i].zwmjfwmc	
					//饼状图数据
					this.pieDataz.push(arr1)
				}
				//画柱状图
				this.barChart();
				//画饼图
				this.pieTitle=this.pieTitle0;
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
					y: '-3'
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
						minInterval : 1,
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
						// color: ['#ff6364', '#fdc107', '#29bb9d'],
						itemStyle: {
							normal: {
								color: function(params) {
									// build a color map as your need.
									var colorList = [
									  '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
									   '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
									   '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
									];
									return colorList[params.dataIndex]
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
					top: -3,
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
					data:this.pieDataz.name,
					align: 'right',
					itemGap: 8,
				},
				series: [
					{
						name: this.pieTitle,
						type: 'pie',
						radius: '55%',
						center: ['35%', '50%'],
						data:this.pieDataz.sort(function (a, b) { return a.value - b.value; }),
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
				],
				color: ['#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
				'#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
				'#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0']
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
