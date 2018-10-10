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
			pieTitle4: '200 m² 产品类型统计占比',
			pieTitle5: '以上面积 产品类型统计占比',
			
			//pieData
			pieData: [],
			pieData0: [],
			pieData1: [],
			pieData2: [],
			pieData3: [],
			pieData4: [],
			pieData5: [],

			pieData0: [
				{ value: 190, name: '24-50 m²' },
				{ value: 290, name: '50-100 m²' },
				{ value: 350, name: '100-200 m²' },
				{ value: 400, name: '200 m²以上' }
			 ],
			pieData1: [
				{ value: 400, name: '产品类型1' },
				{ value: 215, name: '产品类型2' },
				{ value: 124, name: '产品类型3' },
				{ value: 524, name: '产品类型4' },
				{ value: 221, name: '产品类型5' },
				{ value: 321, name: '产品类型6' }
			],
			pieData2: [
				{ value: 400, name: '产品类型1' },
				{ value: 310, name: '产品类型2' },
				{ value: 204, name: '产品类型3' },
				{ value: 175, name: '产品类型4' },
				{ value: 221, name: '产品类型5' },
				{ value: 124, name: '产品类型6' }
			],
			pieData3: [
				{ value: 400, name: '产品类型1' },
				{ value: 310, name: '产品类型2' },
				{ value: 204, name: '产品类型3' },
				{ value: 175, name: '产品类型4' },
				{ value: 221, name: '产品类型5' },
				{ value: 120, name: '产品类型6' }
			],
			pieData4: [
				{ value: 400, name: '产品类型1' },
				{ value: 310, name: '产品类型2' },
				{ value: 204, name: '产品类型3' },
				{ value: 175, name: '产品类型4' },
				{ value: 221, name: '产品类型5' },
				{ value: 120, name: '产品类型6' }
			],
			pieData5: [
				{ value: 400, name: '产品类型1' },
				{ value: 310, name: '产品类型2' },
				{ value: 204, name: '产品类型3' },
				{ value: 175, name: '产品类型4' },
				{ value: 221, name: '产品类型5' },
				{ value: 120, name: '产品类型6' }
			],
			
			//tabledata
			tjfxtabledata:[],

			tabledata: [
				{ name: '化危品火灾爆炸', childrenName: '爆炸', count: '2999', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '化危品火灾爆炸', childrenName: '可燃气体', count: '1142', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '化危品火灾爆炸', childrenName: '易燃液体', count: '1218', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '化危品火灾爆炸', childrenName: '易燃固体、自燃物品和遇湿易燃物品', count: '1021', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '化危品火灾爆炸', childrenName: '氧化剂和有机过氧化物', count: '1455', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '建筑堆场类', childrenName: '高层建筑', count: '2751', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '建筑堆场类', childrenName: '人员密集场所', count: '2751', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '建筑堆场类', childrenName: '地下建筑、隧道', count: '2751', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '建筑堆场类', childrenName: '古建筑', count: '2751', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '建筑堆场类', childrenName: '堆垛仓库', count: '2751', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '交通运输类', childrenName: '机动车', count: '1313', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '交通运输类', childrenName: '列车', count: '2999', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '交通运输类', childrenName: '船舶', count: '1142', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '交通运输类', childrenName: '飞行器', count: '1218', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '交通运输类', childrenName: '城市轨道交通工具', count: '1218', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '危化品泄露事故', childrenName: '危险化学品泄漏事故', count: '1021', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '交通事故', childrenName: '交通事故', count: '1455', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '建筑物坍塌事故', childrenName: '建筑物垮塌事故', count: '2751', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '自然灾害事故', childrenName: '洪涝', count: '2999', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '自然灾害事故', childrenName: '地震', count: '1142', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '自然灾害事故', childrenName: '台风', count: '1218', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '自然灾害事故', childrenName: '海啸', count: '1021', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '自然灾害事故', childrenName: '雪灾', count: '1455', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '自然灾害事故', childrenName: '地质灾害', count: '1455', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '公共突发事件', childrenName: '恐怖袭击', count: '1919', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '公共突发事件', childrenName: '群体性治安事件', count: '1299', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '公共突发事件', childrenName: '重大环境污染', count: '1299', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '公共突发事件', childrenName: '公共卫生事件', count: '1299', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '公共突发事件', childrenName: '城市给水管网爆裂', count: '1999', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '群众遇险事件', childrenName: '群众遇险事件', count: '2751', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' },
				{ name: '群众求助救援', childrenName: '群众求助救援', count: '1313', buju: '99', zongdui: '400', zhidui: '500', dazhongdui: '2000' }
			],
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
				
				this.tjfxtabledata = res.data.result;
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
						//data: this.tjfxbarData.name,
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
						// data: this.tjfxbarData.name,
						data: this.barData.value,
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
				vue.pieData = eval("vue.pieData" + index);
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
					// padding: [
					// 	0,  // 上
					// 	40, // 右
					// 	0,  // 下
					// 	0, // 左
					// ],
					itemGap: 16,
					itemWidth: 18,
					// data: this.pieData.cplx,
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
						data: this.pieData
							.sort(function (a, b) { return a.value - b.value; }),
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
