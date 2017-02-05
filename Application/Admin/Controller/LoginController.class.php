<?php
namespace Admin\Controller;
use Think\Controller;
class LoginController extends Controller {
    public function login(){
        if(IS_POST){
            $username = trim(I('post.username'));
            $password = trim(getMd5(I('post.password')));
            $remember = trim(I('post.remember'));
            if(!$username){
                return show(0,'用户名不能为空！');
            }
            if(!$password){
                return show(0,'密码不能为空！');
            }
            $cond = array(
                'username' => $username,
                'password' => $password,
            );
            $res = D('Admin')->where($cond)->find();
            if(!$res){
                return show(0,'密码错误！');
            }else{
                if($remember == 1){
                    cookie('username',$username,24*60*60);
                }else{
                    cookie('username',$username);
                }
                return show(1,'登录成功！');
            }
        }
        $this->display();
    }

    public function logout(){
        cookie('username',null);
        $this->redirect('Admin/Login/login');
    }

    public function forget(){
        if(IS_POST){
            $realname = trim(I('post.realname'));
            $email = trim(I('post.email'));
            $auth_code = trim(I('post.auth_code'));
            $newPwd =  trim(I('post.newPwd'));
            $newPwdConfirm = trim(I('post.newPwdConfirm'));
            $result = D('Admin')->create();
            $message = D('Admin')->getError();
            if(!$result){
                return show(0,$message);
            }
            $cond = array(
                'realname' => $realname,
                'email' => $email,
                'auth_code' => $auth_code,
            );
            $res = D('Admin')->where($cond)->find();
            if(!$res){
                return show(0,'该用户不存在！');
            }
//            if(!$newPwd){
//                return show(0,'必须填写新密码！');
//            }
//            if(!$newPwdConfirm){
//                return show(0,'必须填写确认密码！');
//            }
//            if($newPwd != $newPwdConfirm){
//                return show(0,'两次密码填写不一致！');
//            }
            $id = (int) $res['id'];
            $data['password'] = getMd5($newPwd);
            $res2 = D('Admin')->where('id='.$id)->save($data);
            if(!$res2){
                return show(0,'修改失败');
            }else{
                return show(1,'修改成功');
            }
        }
        $this->display();
    }


}