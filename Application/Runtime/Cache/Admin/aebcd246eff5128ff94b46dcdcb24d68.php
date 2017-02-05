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
    
    
    <div class="navbar">
        <div class="navbar-inner">
                <ul class="nav pull-right">
                    
                </ul>
                <a class="brand" href="#"><span class="first">江麓</span> <span class="second">塔机监控系统</span></a>
        </div>
    </div>

        <div class="row-fluid">
    <div class="dialog">
        <div class="block">
            <p class="block-heading">重 置 密 码</p>
            <div class="block-body">
                <form id="tower-form">
                    <label>真实姓名</label>
                    <input type="text" name="realname" class="span12" placeholder="请输入注册时的填写的真实姓名"/>
                    <label>邮箱地址</label>
                    <input type="text" name="email" class="span12" placeholder="请输入注册时的填写的邮箱地址"/>
                    <label>授权码</label>
                    <input type="text" name="auth_code" class="span12" placeholder="请输入注册时的填写的授权码"/>
                    <label>输入新密码</label>
                    <input name="newPwd" type="password" class="span12" placeholder="请输入新密码"/>
                    <label>确认新密码</label>
                    <input name="newPwdConfirm" type="password" class="span12" placeholder="请再次输入密码"/>
                    <button id="button-submit" type="button" class="btn btn-primary pull-right">确认</button>
                    <div class="clearfix"></div>
                </form>
            </div>
        </div>
        <a href="<?php echo U('Admin/Login/login');?>">返回登录页面</a>
    </div>
</div>
<script src="/tower_crane/Public/lib/bootstrap/js/bootstrap.js"></script>
<script src="/tower_crane/Public/lib/jquery-1.8.1.min.js"></script>
<script src="/tower_crane/Public/lib/layer/layer.js"></script>
<script src="/tower_crane/Public/js/dialog.js"></script>
<script src="/tower_crane/Public/js/admin/common.js"></script>
<script>
    var SCOPE = {
        'post_url' : "<?php echo U('Admin/Login/forget');?>",
        'jump_url' : "<?php echo U('Admin/Login/login');?>",
    }
</script>

    
  </body>
</html>