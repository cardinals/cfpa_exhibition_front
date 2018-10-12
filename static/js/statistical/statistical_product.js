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
			//tjfx
			tjfxdata:[],
			tjfxname: [],
			tjfxczqysl: [],
			tjfxgdzwmj: [],
			tjfxbwzwgssl: [],
			//tabledata
			tabledata: [],
			//表高度变量
			tableheight: 360,
			//显示加载中样
			loading: false,
			labelPosition: 'right',
		}
	},
	mounted: function () {
		//图标数据
		this.getCPLX();
		
	},
	created: function () {
		/**菜单选中 by li.xue 20180628*/
		// $("#activeIndex").val(getQueryString("index"));
		/**面包屑 by li.xue 20180628*/
		var type = getQueryString("type");
		if (type == "CPFL") {
			loadBreadcrumb("按产品类型统计", "-1");
		} else {
			loadBreadcrumb("按产品类型统计", "-1");
		}
	},
	methods: {
		//获取统计分析图表数据
		getCPLX: function () {
			var params = {};
			axios.post('/zhapi/qyzwyx/dofindtjfx',params).then(function (res) {
				this.tjfxdata = res.data.result;
				for(var i=0; i<this.tjfxdata.length;i++){
					this.tjfxname.push(this.tjfxdata[i].cplxmc)
					this.tjfxczqysl.push(this.tjfxdata[i].czqysl)
					this.tjfxgdzwmj.push(this.tjfxdata[i].gdzwmj)
					this.tjfxbwzwgssl.push(this.tjfxdata[i].bwzwgssl)
				}
				
				this.loading = false;
				//var myBarChart = echarts.init(document.getElementById('bar'));
			
				// myBarChart.setOption({
				// 	legend: {
				// 		data: res.data.result
				// 	}
				// })
				this.echarts1();

			}.bind(this), function (error) {
				console.log(error)
			})
			
		},

		// 中央下部按产品分类柱状图
		echarts1: function () {
			

			var myBarChart = echarts.init(document.getElementById('bar'));
			BarmaxOption = {
				title: {
					text: '按产品类型统计展会报名情况',
					x: 'center',
					y: '-3',
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {            // 坐标轴指示器，坐标轴触发有效
						type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				legend: {
					orient: 'horizontal',
					x: 'right',
					y: '-3',
					iGap: 16,
					iWidth: 18,
					// data:this.tjfxdata.cplxmc,
					//  data: this.tabledata.name,
					align: 'left',
					iGap: 8,
					
				},
				color: ['#C1232B','#B5C334','#FCCE10'],
				grid: {
					top: '50',
					bottom: '10',
					left: '15',
					right: '20',
					containLabel: true
				},
				xAxis: [
					{
						type: 'category',
						data: this.tjfxname,//this.getList('name'),
						axisLabel: {
							interval: 0,
							// rotate: "15"
						},
					}
				],
			
				yAxis: [
					{
						type: 'value',
						name: '企业',
						position: 'left',
						offset: 28,
						minInterval : 1,
						axisLine: {
							lineStyle: {
								color: '#C1232B'
							}
						},
						splitLine: {
							show: false
						}
					},
					{
						type: 'value',
						name: '展位',
						position: 'left',
						minInterval : 1,//设置为整数的刻度值
						axisLine: {
							lineStyle: {
								color: '#B5C334'
							}
						},
						splitLine: {
							show: false
						}
					},
					{
						type: 'value',
						name: '光地展位面积m²',
						axisLine: {
							lineStyle: {
								color: '#FCCE10'
							}
						},
						splitLine: {
							show: false
						}
					}
				],
				series: [
					
					{
						name: '参展企业数量',
						type: 'bar',
						barWidth: '100%',
						barWidth: '45',
						data: this.tjfxczqysl,
						// data: this.getList('zongdui'),
					},
					{
						name: '标准展位数量',
						type: 'bar',
						barWidth: '100%',
						barWidth: '45',
						yAxisIndex: 1,
						data: this.tjfxbwzwgssl,
						// data: this.getList('zhidui'),
					},
					{
						name: '光地展位面积m²',
						type: 'bar',
						barWidth: '100%',
						barWidth: '45',
						yAxisIndex: 2,
						data: this.tjfxgdzwmj,
						// data: this.getList('dazhongdui'),
					}
				
				]
			};

			myBarChart.setOption(BarmaxOption);
		},
		//数据为空时显示‘-’
		dataFormat: function (row, column) {
			var rowDate = row[column.property];
			if (rowDate == null || rowDate == "") {
				return '-';
			} else {
				return rowDate;
			}
		},
		getList: function (column) {
			var list = new Array();
			if ('name' == column) {
				for (var i in this.tabledata) {
					list.push(this.tabledata[i].name.replace('总队',''));
				}
			} else if ('buju' == column) {
				for (var i in this.tabledata) {
					if ('公安部消防局' == this.tabledata[i].name) {
						list.push(this.tabledata[i].count)
					}
				}
			} else if ('zongdui' == column) {
				for (var i in this.tabledata) {
					list.push(this.tabledata[i].zongdui)
				}
			} else if ('zhidui' == column) {
				for (var i in this.tabledata) {
					list.push(this.tabledata[i].zhidui)
				}
			} else if ('dazhongdui' == column) {
				for (var i in this.tabledata) {
					list.push(this.tabledata[i].dazhongdui)
				}
			}
			return list;
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
