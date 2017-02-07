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
    );
}