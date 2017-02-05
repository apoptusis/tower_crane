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
    <title>塔机数据详情</title>
    <script src="http://localhost:8888/tower_crane/public//lib/echarts.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        body,html{
            /*background: #7dccc9;*/
            /*background: #20bd90;*/
        }
        #dashboard {
            width: 100%;
            height: 310px;
        }
    </style>
</head>
<body>
<div id="dashboard"></div>
<script>
var dashboard = echarts.init(document.getElementById('dashboard'));
var option = {
    tooltip : {
        formatter: "{a} <br/>{c} {b}"
    },
    series: [
        {
            name: '起重力矩',
            type: 'gauge',
            min:0,
            max:1300,
            splitNumber:13,
            radius: '90%',
            center: ['50%', '55%'],
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    width: 10,
                }
            },
            axisTick: {            // 坐标轴小标记
                length: 15,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto'
                }
            },
            splitLine: {           // 分隔线
                length: 20,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: 'auto'
                }
            },
            title : {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 20,
                    fontStyle: 'italic',
                    color: '#d0d1d2',
                }
            },
            detail : {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                }
            },
            data: [{value: 1300, name: 'x1000 N·M'}]
        }
    ]
};
//dashboard.showLoading();
//dashboard.hideLoading();
setInterval(function () {
    option.series[0].data[0].value = (Math.random() * 1300).toFixed(2) - 0;
    dashboard.setOption(option, true);
},2000);
    </script>
</body>
</html>