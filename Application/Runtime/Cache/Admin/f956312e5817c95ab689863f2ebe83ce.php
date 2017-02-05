<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
        <h1><?php echo ($mes); ?></h1>
        <form action="<?php echo U('Admin/Gprs/datain');?>" method="post">
            <input type="hidden" value="1" name="on"/>
            <input type="button" value="开启GPRS信号输入">
        </form>
        <form action="<?php echo U('Admin/Gprs/datain');?>" method="post">
            <input type="hidden" value="0" name="off"/>
            <input type="button" value="关闭GPRS信号输入">
        </form>

</body>
</html>