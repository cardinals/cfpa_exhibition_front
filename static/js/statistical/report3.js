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
			//
			tjfxbarData:"",
			//tabledata
			tjfxtabledata:[],
			
			barData: {
				name: ['24-50 m²', '50-100 m²', '100-200 m²', '200 m²以上'],
				value: [935, 535, 814, 232, 851],
			},

			//pieTitle
			pieTitle: '',
			pieTitle0: '按光地展位面积范围统计展会预报名情况比例图',
			pieTitle1: '24-50 m² 产品类型统计占比',
			pieTitle2: '50-100 m² 产品类型统计占比',
			pieTitle3: '100-200 m² 产品类型统计占比',
			pieTitle4: '200 m² 以上面积 产品类型统计占比',
			
			//pieData
			pieData0: [
				{ value: 190, name: '24-50 m²' },
				{ value: 290, name: '50-100 m²' },
				{ value: 350, name: '100-200 m²' },
				{ value: 400, name: '200 m²以上' }
			 ],
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

			// pieData1: [
			// 	{ value: 400},
			// 	{ value: 215},
			// 	{ value: 124},
			// 	{ value: 524},
			// 	{ value: 221},
			// 	{ value: 321}
			// ],
			// pieData2: [
			// 	{ value: 400},
			// 	{ value: 310},
			// 	{ value: 204},
			// 	{ value: 175},
			// 	{ value: 221},
			// 	{ value: 124}
			// ],
			// pieData3: [
			// 	{ value: 400},
			// 	{ value: 310},
			// 	{ value: 204},
			// 	{ value: 175},
			// 	{ value: 221},
			// 	{ value: 120}
			// ],
			// pieData4: [
			// 	{ value: 400},
			// 	{ value: 310},
			// 	{ value: 204},
			// 	{ value: 175},
			// 	{ value: 221},
			// 	{ value: 120}
			// ],
			
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
		}
	},
	mounted: function () {
	
		this.barChart();
		this.pieData=this.pieData0;
		this.pieTitle=this.pieTitle0;
		this.pieChart();
		this.getCPLX();
	},
	created: function () {
		/**菜单选中 by li.xue 20180628*/
		//$("#activeIndex").val(getQueryString("index"));
		/**面包屑 by li.xue 20180628*/
		var type = getQueryString("type");
		if (type == "DPYL") {
			loadBreadcrumb("统计分析", "按面积范围");
		} else {
			loadBreadcrumb("按面积范围", '-1');
		}
	},
	methods: {
		//获取产品类型
		getCPLX: function () {
			var params = {};
			axios.post('/zhapi/qyzwyx/dofindtjfxsj',params).then(function (res) {
				debugger;
				this.tjfxtabledata = res.data.result;
				var a=0;
				var b=0;
				var c=0;
				var d=0;
				for(var i=0; i<this.tjfxtabledata.length;i++){
					//数据的和
					a += parseInt(this.tjfxtabledata[i].s1)
					b += parseInt(this.tjfxtabledata[i].s2)
					c += parseInt(this.tjfxtabledata[i].s3)
					d += parseInt(this.tjfxtabledata[i].s4) 

                    //饼状图数据
					this.tjfxname.push(this.tjfxtabledata[i].cplxmc)
					this.pieDataz1.push(this.tjfxtabledata[i].s1)
					this.pieDataz2.push(this.tjfxtabledata[i].s2)
					this.pieDataz3.push(this.tjfxtabledata[i].s3)
					this.pieDataz4.push(this.tjfxtabledata[i].s4)

				}
				//柱状图
				this.tjfxs1.push(a)
				this.tjfxs2.push(b)
				this.tjfxs3.push(c)
				this.tjfxs4.push(d)
				//饼图
			 
				this.loading = false;
				this.barChart();
                this.pieChart();				

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
					x: 'center'
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
						
						data: this.barData.name,
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
						// data: this.tjfxs1,

						data:this.tjfxs1,

						smooth: true,
						itemStyle: {
							normal: {
								// 绿+蓝
								color: function (params) {
									var colorList = ['#29bb9d', '#556ca6', '#29bb9d', '#556ca6', '#29bb9d', '#556ca6', '#29bb9d', '#556ca6', '#29bb9d', '#556ca6'];
									return colorList[params.dataIndex];
								}
							}
						}
					}
				]
			};
			myChart.on('click', function (param) {
				var index = param.dataIndex + 1;
				// vue.pieData = eval("vue.pieData" + index);
				vue.pieDataz = eval("vue.pieDataz" + index);
				vue.pieTitle = eval("vue.pieTitle" + index);

				var pieChart = echarts.getInstanceByDom(document.getElementById("pie"));
				if (pieChart != null && pieChart != "" && pieChart != undefined) {
					pieChart.dispose();
				}
				vue.pieChart();
			});
			// 此外param参数包含的内容有：
			// param.seriesIndex：系列序号（series中当前图形是第几个图形第几个，从0开始计数）
			// param.dataIndex：数值序列（X轴上当前点是第几个点，从0开始计数）
			// param.seriesName：legend名称
			// param.name：X轴值
			// param.data：Y轴值
			// param.value：Y轴值
			// param.type：点击事件均为click
			myChart.setOption(option);
		},
		// 右侧玫瑰图
		pieChart: function () {
			var myChart = echarts.init(document.getElementById('pie'));
			var option = {
				title: {
					text: this.pieTitle,
					left: 'center',
					top: 2,
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
					data: this.pieData.name,
					align: 'left',
					itemGap: 8,
				},
				series: [
					{
						name: this.pieTitle,
						type: 'pie',
						radius: '55%',
						center: ['35%', '50%'],
						// data:this.pieDataz,
						data: this.pieData
							.sort(function (a, b) { return a.value - b.value; }),
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
		refresh: function () {
			this.pieData=this.pieData0;
			this.pieTitle=this.pieTitle0;
			var pieChart = echarts.getInstanceByDom(document.getElementById("pie"));
			pieChart.dispose();
			this.pieChart();
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
