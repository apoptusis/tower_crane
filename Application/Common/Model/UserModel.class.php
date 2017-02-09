<?php
namespace Common\Model;
use Think\Model;
class UserModel extends Model{
    protected $_validate = array(
        array('newPwd','require','新密码不能为空！'),
        array('newPwd','6,16','新密码长度范围在6-16位！',0,'length',3),
        array('newPwdConfirm','require','确认密码不能为空！'),
        array('newPwdConfirm','6,16','确认密码范围在6-16位！',0,'length',3),
        array('newPwd','newPwdConfirm','两次密码不一致！',0,'confirm'),

        array('email','require','邮箱不能为空！'),
        array('email','email','请输入正确的邮箱地址！'),

        array('newPhone','require','手机号码不能为空！'),
        array('newPhone','/^1[3|4|5|8][0-9]\d{8}$/','手机号码格式错误！','0','regex',3),
        array('newPhoneConfirm','require','确认手机号码不能为空！'),
        array('newPhoneConfirm','/^1[3|4|5|8][0-9]\d{8}$/','确认手机号码格式错误！','0','regex',3),
        array('newPhone','newPhoneConfirm','两次密码输入的手机号码不一致！',0,'confirm'),

        array('newUsername','require','新用户名不能为空！'),
        array('newUsername','6,16','新用户名长度范围在6-16位！',0,'length',3),
        array('newUsernameConfirm','require','确认用户名不能为空！'),
        array('newUsernameConfirm','6,16','确认用户名长度范围在6-16位！',0,'length',3),
        array('newUsername','newUsernameConfirm','两次输入的用户名不一致！',0,'confirm'),
    );
}