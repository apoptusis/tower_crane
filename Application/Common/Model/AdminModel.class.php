<?php
namespace Common\Model;
use Think\Model;
class AdminModel extends Model{
    protected $_validate = array(
        array('username','require','用户名不能为空！'),
        array('username','','用户名已存在！',0,'unique',1),
        array('username','6,16','用户名长度范围在6-16位！',0,'length',3),
        array('password','require','密码不能为空！'),
        array('password','6,16','密码长度范围在6-16位！',0,'length',3),
        array('realname','require','真实姓名不能为空！'),
        array('email','require','邮箱不能为空！'),
        array('email','email','请输入正确的邮箱地址！'),
        array('auth_code','require','授权码不能为空！'),
        array('newPwd','require','新密码不能为空！'),
        array('newPwd','6,16','新密码长度范围在6-16位！',0,'length',3),
        array('newPwdConfirm','require','确认密码不能为空！'),
        array('newPwdConfirm','6,16','确认密码范围在6-16位！',0,'length',3),
        array('newPwd','newPwdConfirm','两次密码不一致！',0,'confirm'),

    );
}