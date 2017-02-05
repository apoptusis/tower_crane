<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>江麓 塔机监控系统</title>
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="stylesheet" type="text/css" href="/tower_crane/Public/lib/bootstrap/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="/tower_crane/Public/stylesheets/theme.css">
    <link rel="stylesheet" href="/tower_crane/Public/lib/font-awesome/css/font-awesome.css">
    <link rel="stylesheet" href="/tower_crane/Public/stylesheets/page.css">

    <script src="/tower_crane/Public/lib/jquery-1.7.2.min.js" type="text/javascript"></script>
      <!--原本是用1.7的jquery，我改成1.8的了-->
      <!--<script src="/tower_crane/Public/lib/jquery-1.8.1.min.js" type="text/javascript"></script>-->

    <!--高德地图API-->
    <script type="text/javascript" src="http://webapi.amap.com/maps?v=1.3&key=eaf401a9420bae96eab086ccf8f4ff9a"></script>
      <!-- Demo page code -->
    <style type="text/css">
        #line-chart {
            height:300px;
            width:800px;
            margin: 0px auto;
            margin-top: 1em;
        }
        .brand { font-family: georgia, serif; }
        .brand .first {
            color: #ccc;
            font-style: italic;
        }
        .brand .second {
            color: #fff;
            font-weight: bold;
        }
    </style>

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="/tower_crane/Public/lib/html5.js"></script>
    <![endif]-->

    <!-- Le fav and touch icons -->
    <link rel="shortcut icon" href="../assets/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="../assets/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="../assets/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="../assets/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="../assets/ico/apple-touch-icon-57-precomposed.png">
  </head>

  <!--[if lt IE 7 ]> <body class="ie ie6"> <![endif]-->
  <!--[if IE 7 ]> <body class="ie ie7 "> <![endif]-->
  <!--[if IE 8 ]> <body class="ie ie8 "> <![endif]-->
  <!--[if IE 9 ]> <body class="ie ie9 "> <![endif]-->
  <!--[if (gt IE 9)|!(IE)]><!--> 
  <body class=""> 
  <!--<![endif]-->
    
	<!--顶 部 导 航-->
    <div class="navbar">
        <div class="navbar-inner">
                <ul class="nav pull-right">
                    
                    <li><a href="#" class="hidden-phone visible-tablet visible-desktop" role="button">设置</a></li>
                    <li id="fat-menu" class="dropdown">
                        <a href="#" role="button" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="icon-user"></i> 管理员 <?php echo ($username); ?>
                            <i class="icon-caret-down"></i>
                        </a>

                        <ul class="dropdown-menu">
                            <li><a tabindex="-1" href="#">我的账号</a></li>
                            <li class="divider"></li>
                            <li><a tabindex="-1" class="visible-phone" href="#">设置</a></li>
                            <li class="divider visible-phone"></li>
                            <li><a tabindex="-1" href="<?php echo U('Admin/Login/logout');?>">退出登录</a></li>
                        </ul>
                    </li>
                    
                </ul>
                <a class="brand" href="<?php echo U('Admin/Index/index');?>"><span class="first">江麓</span> <span class="second">塔机监控系统</span></a>
        </div>
    </div>
    


    <!--侧 边 导 航-->
    <div class="sidebar-nav">

        <a href="#common-menu" class="nav-header" data-toggle="collapse"><i class="icon-dashboard"></i>公共模块<i class="icon-chevron-up"></i></a>
        <ul id="common-menu" class="nav nav-list collapse in">
            <li ><a href="#">塔机搜索</a></li>
            <li ><a href="<?php echo U('Admin/Map/map');?>">塔机分布</a></li>
        </ul>

        <a href="#manage-menu" class="nav-header" data-toggle="collapse"><i class="icon-random"></i>生产制造管理<i class="icon-chevron-up"></i></a>
        <ul id="manage-menu" class="nav nav-list collapse">
            <li ><a href="#">SIM卡池管理</a></li>
            <li ><a href="#">终端池管理</a></li>
            <li ><a href="<?php echo U('Admin/CraneAdmin/craneList');?>">塔机管理</a></li>
            <li ><a href="#">服务开通管理</a></li>
            <li ><a href="#">客户信息管理</a></li>

        </ul>

        <a href="#manufacture-menu" class="nav-header" data-toggle="collapse"><i class="icon-legal"></i>远程控制<i class="icon-chevron-up"></i></a>
        <ul id="manufacture-menu" class="nav nav-list collapse">
            <li ><a href="#">塔机锁机</a></li>
            <li ><a href="#">塔机解锁</a></li>
            <li ><a href="#">锁解机上线提醒</a></li>
            <li ><a href="#">锁解机日志</a></li>
            <li ><a href="#">报警查询</a></li>
            <li ><a href="#">不在线跟踪</a></li>
            <li ><a href="#">指令透传</a></li>
        </ul>

        <a href="#sales-menu" class="nav-header" data-toggle="collapse"><i class="icon-briefcase"></i>塔机监控<span class="label label-info">+3</span></a>
        <ul id="sales-menu" class="nav nav-list collapse">
            <li ><a href="#">巡检查询</a></li>
            <li ><a href="#">塔机工况监控</a></li>
            <li ><a href="#">服务转移</a></li>
        </ul>

        <a href="#service-menu" class="nav-header" data-toggle="collapse"><i class="icon-wrench"></i>系统管理<i class="icon-chevron-up"></i></a>
        <ul id="service-menu" class="nav nav-list collapse">
            <li ><a href="<?php echo U('Admin/User/userlist');?>">用户管理</a></li>
            <li ><a href="#">操作日志</a></li>
            <li ><a href="#">通讯日志</a></li>
            <li ><a href="#">字典项管理</a></li>
            <li ><a href="#">功能集管理</a></li>
            <li ><a href="#">塔机类型管理</a></li>
            <li ><a href="#">塔机型号管理</a></li>
            <li ><a href="#">塔机组管理</a></li>
            <li ><a href="#">短信报警开关</a></li>
        </ul>

        <a href="../faq.html" class="nav-header" ><i class="icon-comment"></i>研发设计管理</a>

        <a href="../faq.html" class="nav-header" ><i class="icon-comment"></i>系统配置</a>
    </div>
    

    <!--右 侧 内 容-->
    <div class="content">

        <div class="header">
            <div class="stats">
    		<p class="stat"><span class="number">53</span>tickets</p>
    		<p class="stat"><span class="number">27</span>tasks</p>
    		<p class="stat"><span class="number">15</span>waiting</p>
		</div>
            <h1 class="page-title">塔机分布</h1>
        </div>
        
        <ul class="breadcrumb">
            <li><a href="index.html">首页</a> <span class="divider">/</span></li>
            <li class="active">塔机分布</li>
        </ul>

<div class="container-fluid">

    <div class="search-well">
        <form class="form-inline">
            <input class="input-xlarge" placeholder="输入SIM卡号或塔机编号" id="appendedInputButton" type="text">
            <button class="btn" type="button"><i class="icon-search"></i> 搜索塔机</button>
        </form>
    </div>

    <div class="row-fluid">
        <div class="block span12">
            <a href="#widget1container" class="block-heading" data-toggle="collapse">在线塔机地图监控 </a>
            <div id="widget1container" class="block-body collapse in">
                <div id="container" style="width:auto; height: 400px;"></div>
            </div>
        </div>
    </div>


    <div class="row-fluid">
        <div class="block span3">
            <a href="#a" class="block-heading" data-toggle="collapse">塔机信息</a>
            <div id="a" class="block-body collapse in">
                <h3>塔机信息</h3>
                <p>塔机编号：</p>
                <p>塔机类型：</p>
                <p>塔机型号：</p>
                <p>SIM卡号：</p>
                <p>终端号：</p>
            </div>
        </div>


    <div class="block span3">
        <a href="#b" class="block-heading" data-toggle="collapse">运行时间</a>
        <div id="b" class="block-body collapse in">
            <div id="getting-started">
                <span>00</span>
                <span class="start-min">:</span>
                <span class="start-min">00</span>
            </div>
        </div>
    </div>

    <div class="block span3">
        <a href="#c" class="block-heading" data-toggle="collapse">当前风速</a>
        <div id="c" class="block-body collapse in">
            起重重量：<br>
            起重力矩：<br>
            起重重量：<br>
            起重力矩：<br>
            起重力矩：<br>
        </div>
    </div>

    <div class="block span3">
        <a href="#d" class="block-heading" data-toggle="collapse">回转角度</a>
        <div id="d" class="block-body collapse in">
            起重重量：<br>
            起重力矩：<br>
            起重重量：<br>
            起重力矩：<br>
            起重力矩：<br>
        </div>
    </div>
</div>








                    <footer>
                        <hr>
                    </footer>
                    
            </div>
        </div>
    </div>



<script src="/tower_crane/Public/lib/bootstrap/js/bootstrap.js"></script>
<script type="text/javascript">
    //实例化地图类
    var map = new AMap.Map('container');
    map.setZoom(12);
    map.setCenter([112.90,27.87]);

    // 清除地图覆盖物
    map.clearMap();
    //设定标记点
    var markers = [
        {position: [112.8945,27.8708]},
        {position: [112.92,27.90]},
        {position: [112.85,27.85]},
        {position: [112.87,27.90]},
        {position: [112.86,27.88]},
        {position: [112.92,27.90]},
    ];
    //循环遍历
    markers.forEach(function(marker) {
        new AMap.Marker({
            map: map,
            icon: marker.icon,
            position: [marker.position[0], marker.position[1]],
            offset: new AMap.Pixel(-12, -36)
        });
    });

    //设定信息窗口
    var infowindow = new AMap.InfoWindow({
        content: '<h4>1号塔机</h4><div>当前力矩百分比：50%，起重高度：50m</div>',
        offset: new AMap.Pixel(0, -30),
        size:new AMap.Size(230,0)
    });

    //打开信息窗口
    //infowindow.open(map,new AMap.LngLat(112.902213,27.876797));
    var clickHandle = AMap.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker.getPosition())
    });

    //添加控件
    AMap.plugin(['AMap.ToolBar','AMap.Scale'],function(){
        var toolBar = new AMap.ToolBar();
        var scale = new AMap.Scale();
        map.addControl(toolBar);
        map.addControl(scale);
    })









</script>

</body>
</html>