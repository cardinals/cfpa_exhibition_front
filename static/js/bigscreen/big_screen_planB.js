var vm = new Vue({
    el: "#app",
    data: {
        t1data:[
            {value:204, name:'大中队级预案'},       
            {value:310, name:'支队级预案'},
            {value:400, name:'总队级预案'}
        ],
        b1data:[
            {value:540, name:'灭火预案单位'},
            {value:300, name:'消防保卫警卫'},
            {value:154, name:'其他'}
        ],
       zdData:[
           '北京','天津','河北','山西','内蒙古','辽宁','吉林','黑龙江','上海','江苏','浙江','安徽','福建','江西','山东',
           '河南','湖北','湖南','广东','广西','海南','重庆','四川','贵州','云南','西藏','陕西','甘肃','青海','宁夏','新疆'
       ],
    },
    methods: {  
        t1PieChart:function () {
            var b1PieChart = echarts.init(document.getElementById('t1'));
            var b1option = {
                // backgroundColor:'rgba(255, 255, 255, 0.1)',
                title : {
                    text: '按预案种类统计预案数量',
                    x:'center',
                    top: 2,
                    textStyle: {
                        color: '#ccc'
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    y: 'center',
                    textStyle: {
                        color: '#ccc'
                    },
                    data: ['大中队级预案','支队级预案','总队级预案']
                },
                series : [
                    {
                        name: '按预案种类统计预案数量',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data: this.t1data,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
                
                
            };
            b1PieChart.setOption(b1option);
        },
        b1PieChart:function () {
            var b1PieChart = echarts.init(document.getElementById('b1'));
            var b1PieChartoption = {
                // backgroundColor:'rgba(255, 255, 255, 0.1)',
                title : {
                    text: '按预案对象统计预案数量',
                    x:'center',
                    top: 2,
                    textStyle: {
                        color: '#ccc'
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    y: 'center',
                    textStyle: {
                        color: '#ccc'
                    },
                    data: ['灭火预案单位','消防保卫警卫','其他']
                },
                series : [
                    {
                        name: '按预案对象统计预案数量',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data: this.b1data,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
                
            };
            b1PieChart.setOption(b1PieChartoption);
        },
        t2BarChart: function () {
            var t2BarChart = echarts.init(document.getElementById('t2'));
            t2BarChartOption = {
                // backgroundColor:'rgba(255, 255, 255, 0.1)',
                title: {
                    text: '按总队统计灭火预案情况',
                    left: 'center',
                    top: 2,
                    textStyle: {
                        color: '#ccc'
                    }   
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    x: 'center',
                    y: '15%',
                    itemWidth: 18,
                    textStyle: {
                        color: 'white'
                    },
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    top: '25%',
                    bottom: '0%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.zdData,
                        axisLine: {
                            lineStyle: {
                                color: 'white'
                            }
                        },
                        axisLabel : {
                            interval:0,
                            rotate:"45"
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: 'white'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    }
                ],
                series: [
                    {
                        name: '大中队级预案',
                        type: 'bar',
                        barWidth: '60%',
                        stack: 'sum',
                        data: [756,1321,856,746,987,365,335,555,134,753,877,333,234,653,127,756,379,468,952,234,1212,234,653,127,756,379,468,952,234,333,234]
                    },
                    {
                        name: '支队级预案',
                        type: 'bar',
                        barWidth: '60%',
                        stack: 'sum',
                        data: [756,1321,856,746,987,365,468,952,234,1212,756,1321,856,746,987,365,468,952,234,1212,756,1321,856,746,987,365,468,952,234,1212,546]
                    },
                    {
                        name: '总队级预案',
                        type: 'bar',
                        barWidth: '60%',
                        stack: 'sum',
                        data: [1335,335,555,134,753,877,333,234,653,127,756,1321,856,746,987,365,468,952,234,1212,753,877,333,234,653,756,1321,856,746,987,365]
                    }
                ]
            };
        
            t2BarChart.setOption(t2BarChartOption);
        },
        b2BarChart: function () {
            var b2BarChart = echarts.init(document.getElementById('b2'));
            b2BarChartOption = {
                // backgroundColor:'rgba(255, 255, 255, 0.1)',
                title: {
                    text: '按总队统计灭火预案对象情况',
                    left: 'center',
                    top: 2,
                    textStyle: {
                        color: '#ccc'
                    }   
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    x: 'center',
                    y: '15%',
                    itemWidth: 18,
                    textStyle: {
                        color: 'white'
                    },
                },
                grid: {
                    left: '5%',
                    right: '5%',
                    top: '25%',
                    bottom: '0%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.zdData,
                        axisLine: {
                            lineStyle: {
                                color: 'white'
                            }
                        },
                        axisLabel : {
                            interval:0,
                            rotate:"45"
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: 'white'
                            }
                        },
                        splitLine: {
                            show: false
                        },
                    }
                ],
                series: [
                    {
                        name: '灭火预案单位',
                        type: 'bar',
                        barWidth: '60%',
                        stack: 'sum',
                        data: [756,1321,856,746,987,365,335,555,134,753,877,333,234,653,127,756,379,468,952,234,1212,234,653,127,756,379,468,952,234,333,234]
                    },
                    {
                        name: '消防保卫警卫',
                        type: 'bar',
                        barWidth: '60%',
                        stack: 'sum',
                        data: [756,1321,856,746,987,365,468,952,234,1212,756,1321,856,746,987,365,468,952,234,1212,756,1321,856,746,987,365,468,952,234,1212,546]
                    },
                    {
                        name: '其他',
                        type: 'bar',
                        barWidth: '60%',
                        stack: 'sum',
                        data: [1335,335,555,134,753,877,333,234,653,127,756,1321,856,746,987,365,468,952,234,1212,753,877,333,234,653,756,1321,856,746,987,365]
                    }
                ]
            };
        
            b2BarChart.setOption(b2BarChartOption);
        },
    },
    mounted: function () {
        this.t1PieChart();
        this.b1PieChart();
        this.t2BarChart();
        this.b2BarChart();
    }

})