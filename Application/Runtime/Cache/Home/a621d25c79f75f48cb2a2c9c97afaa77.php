<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="content-language" content="zh-CN" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
    <meta name="screen-orientation" content="portrait">
    <meta name="x5-orientation" content="portrait">
    <meta name="full-screen" content="yes">
    <meta name="x5-fullscreen" content="true">
    <meta name="browsermode" content="application">
    <meta name="x5-page-mode" content="app">
    <meta name="msapplication-tap-highlight" content="no">
    <title>历史数据</title>
    <script src="http://localhost:8888/tower_crane/public/lib/echarts.min.js"></script>
    <script src="http://localhost:8888/tower_crane/Public/lib/jquery-1.7.2.min.js" type="text/javascript"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        html,body {
            margin-top: -10px;
        }
        #charts1 {
            width: 100%;
            height: 600px;
        }
    </style>
</head>
<body>
<div id="charts1"></div>
<script>
    document.addEventListener("message", function(event) {
        var sim_num = event.data;
        var url = "http://localhost:8888/tower_crane/index.php/Home/towerCrane/historyData";
        var postData = {};
        postData['sim_num'] = sim_num;
         //AjaxPOST方法获得数据
        $.post(url,postData,function (result) {
            // 得到数据
            var dataList = result['data'];
            var data = {
                amplitude : [],
                force : [],
                height : [],
                rotate : [],
                weight : [],
                wind : [],
            };
            var date = [];
            var time = [];

            // 添加数据
            for (var i=0; i<dataList.length; i++){
                data.amplitude.push(dataList[i].amplitude);
                data.force.push(dataList[i].force);
                data.height.push(dataList[i].height);
                data.rotate.push(dataList[i].rotate);
                data.weight.push(dataList[i].weight);
                data.wind.push(dataList[i].wind);
                time[i] = new Date(dataList[i].update_time*1000);
                date.push(time[i].getFullYear()+'年'
                        +(time[i].getMonth()+1)+'月'
                        +time[i].getDate()+'日 '
                        +time[i].getHours()+':'
                        +time[i].getMinutes());
            }

            // 绘制eCharts表格
            var charts1 = echarts.init(document.getElementById('charts1'));
            option = {
                tooltip: {
                    trigger: 'axis',
                    position: function (pt) {
                        return [pt[0], '10%'];
                    }
                },
    //        title: {
    //            left: 'center',
    //            text: '历史数据',
    //        },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: date
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '10%']
                },
                dataZoom: [{
                    type: 'inside',
                    start: 0,
                    end: 10
                }, {
                    start: 0,
                    end: 10,
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }],
                series: [
                    {
                        name:'力矩',
                        type:'line',
                        smooth:true,
                        symbol: 'none',
                        sampling: 'average',
                        itemStyle: {
                            normal: {
                                color: '#ff5670'
                            }
                        },
                        areaStyle: {
                            normal: {}
                        },
                        data: data.force
                    },
                    {
                        name:'角度',
                        type:'line',
                        smooth:true,
                        symbol: 'none',
                        sampling: 'average',
                        itemStyle: {
                            normal: {
                                color: '#fca7a5'
                            }
                        },
                        areaStyle: {
                            normal: {}
                        },
                        data: data.rotate
                    },

                    {
                        name:'高度',
                        type:'line',
                        smooth:true,
                        symbol: 'none',
                        sampling: 'average',
                        itemStyle: {
                            normal: {
                                color: '#fad1b5'
                            }
                        },
                        areaStyle: {
                            normal: {}
                        },
                        data: data.height
                    },

                    {
                        name:'幅度',
                        type:'line',
                        smooth:true,
                        symbol: 'none',
                        sampling: 'average',
                        itemStyle: {
                            normal: {
                                color: '#cdceb1'
                            }
                        },
                        areaStyle: {
                            normal: {}
                        },
                        data: data.amplitude
                    },
                    {
                        name:'风速',
                        type:'line',
                        smooth:true,
                        symbol: 'none',
                        sampling: 'average',
                        itemStyle: {
                            normal: {
                                color: '#90b7a5'
                            }
                        },
                        areaStyle: {
                            normal: {}
                        },
                        data: data.wind
                    },
                    {
                        name:'重量',
                        type:'line',
                        smooth:true,
                        symbol: 'none',
                        sampling: 'average',
                        itemStyle: {
                            normal: {
                                color: '#97adab'
                            }
                        },
                        areaStyle: {
                            normal: {}
                        },
                        data: data.weight
                    },
                ]
            };
            charts1.setOption(option, true);
        },"JSON");
    });

</script>

</body>
</html>