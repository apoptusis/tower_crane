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
    <link rel="stylesheet" href="/tower_crane/Public/lib/font-awesome/css/font-awesome.css">
    <link rel="stylesheet" type="text/css" href="/tower_crane/Public/stylesheets/theme.css">
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

        <a href="#common-menu" class="nav-header" data-toggle="collapse"><i class="icon-dashboard"></i>塔机监控<i class="icon-chevron-up"></i></a>
        <ul id="common-menu" class="nav nav-list collapse in">
            <li ><a href="<?php echo U('Admin/CraneReal/CraneList');?>">塔机工况监控</a></li>
            <li ><a href="#">服务转移</a></li>
            <li ><a href="#">报警查询</a></li>
            <li ><a href="#">不在线跟踪</a></li>
        </ul>

        <a href="#manufacture-menu" class="nav-header" data-toggle="collapse"><i class="icon-legal"></i>远程控制<i class="icon-chevron-up"></i></a>
        <ul id="manufacture-menu" class="nav nav-list collapse">
            <li ><a href="<?php echo U('Admin/CraneAdmin/craneList');?>">塔机注册</a></li>
            <li ><a href="#">塔机锁机、解锁、上线提醒</a></li>
            <li ><a href="#">锁解机日志</a></li>
            <li ><a href="#">指令透传</a></li>
            <li ><a href="#">短信报警开关</a></li>
            <li ><a href="#">参数设置</a></li>

        </ul>

        <a href="#manage-menu" class="nav-header" data-toggle="collapse"><i class="icon-random"></i>生产制造管理<i class="icon-chevron-up"></i></a>
        <ul id="manage-menu" class="nav nav-list collapse">
            <li ><a href="#">SIM卡池管理</a></li>
            <li ><a href="#">终端池管理</a></li>
            <li ><a href="#">服务开通管理</a></li>
            <li ><a href="#">客户信息管理</a></li>

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
        </ul>

        <a href="../faq.html" class="nav-header" ><i class="icon-comment"></i>系统配置</a>
    </div>
    



<!--用户管理内容-->
    <div class="content">
        
        <div class="header">
            
            <h1 class="page-title">塔机管理</h1>
        </div>
        
                <ul class="breadcrumb">
            <li><a href="<?php echo U('Admin/Index/index');?>">生产制造管理</a> <span class="divider">/</span></li>
            <li class="active">塔机管理</li>
        </ul>

        <div class="container-fluid">
            <div class="row-fluid">
                    
<div class="btn-toolbar">


    <form id="tower-form" enctype="multipart/form-data" method="post" action="<?php echo U('Admin/CraneAdmin/import');?>">
        <button id="button-export" type="button" class="btn btn-primary" style="margin:10px 20px 10px 0px">
            <i class="icon-download"></i> 导出Excel</button>
        <button id="button-import" type="submit" class="btn btn-primary" style="margin:10px 20px 10px 0px">
            <i class="icon-upload"></i> 导入Excel</button>
        <input id="file_upload" type="file" name="excel"  class="filestyle" data-input="false" />
    </form>
    <button id="button-add" class="btn btn-primary"><i class="icon-plus"></i> 快速注册</button>

</div>
<div class="well">
    <table class="table table-hover" >
      <thead>
        <tr>
          <th>#</th>
          <th>塔机编号</th>
          <th>塔机类型</th>
          <th>塔机型号</th>
          <th>SIM卡号</th>
          <th>终端号</th>
          <th>备注</th>

            <th style="width: 26px;">操作</th>
        </tr>
      </thead>
      <tbody>
            <?php $i=1 ?>
        <?php if(is_array($list)): foreach($list as $key=>$list): ?><tr>
                <td><?php echo $i;?></td>
                <td><?php echo ($list["crane_id"]); ?></td>
                <td><?php echo ($list["type"]); ?></td>
                <td><?php echo ($list["model"]); ?></td>
                <td><?php echo ($list["sim_num"]); ?></td>
                <td><?php echo ($list["term_num"]); ?></td>
                <td><?php echo ($list["remarks"]); ?></td>
                <td>
                    <a href="/tower_crane/index.php/Admin/CraneAdmin/craneEdit/id/<?php echo ($list["id"]); ?>"><i class="icon-pencil"></i></a>
                    <a href="#"><i class="icon-remove" attr-id="<?php echo ($list["id"]); ?>"></i></a>
                </td>
                <?php $i++?>
            </tr><?php endforeach; endif; ?>

      </tbody>
    </table>
</div>

<!--分页-->
<div class="manu"><?php echo ($page); ?></div>

                    <footer>
                        <hr>
                    </footer>
                    
            </div>
        </div>
    </div>



<script src="/tower_crane/Public/lib/bootstrap/js/bootstrap.js"></script>
<script src="/tower_crane/Public/lib/jquery-1.8.1.min.js"></script>
<script src="/tower_crane/Public/lib/layer/layer.js"></script>
<script src="/tower_crane/Public/js/dialog.js"></script>
<script src="/tower_crane/Public/js/admin/common.js"></script>



<script>
    var SCOPE = {
        'add_url' : "<?php echo U('Admin/CraneAdmin/craneAdd');?>",
        'changeStatus_url' : "<?php echo U('Admin/CraneAdmin/craneBan');?>",
        'export_url' : "<?php echo U('Admin/CraneAdmin/export');?>",
        'ajax_upload_swf' : "/tower_crane/Public/lib/uploadify/uploadify.swf",
        'ajax_upload_url' : "<?php echo U('Admin/Excel/import');?>",
    };
</script>
</body>
</html>