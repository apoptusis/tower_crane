<?php
namespace Home\Controller;
use Think\Controller;
class towerCraneController extends Controller {
    public function login(){
        if(IS_POST){
            $username = trim(I('post.username'));
            $password = trim(getMd5(I('post.password')));
            if(!$username){
                return show(0,'用户名不能为空');
            }
            if(!$password){
                return show(0,'密码不能为空');
            }
            $cond = array(
                'username' => $username,
                'password' => $password,
            );
            $res = D('User')->where($cond)->find();
            if(!$res){
                return show(0,'密码错误');
            }else{
                // 发给客户端的登录token
                $token = getMd5($username+time());
                cookie('username',$username);
                cookie('tokenId',$token);
                return show(1,'登录成功',$token);
            }
        }
    }

    public function map(){
        if(IS_POST){
            // TODO：测试代码
//            $username = 'admin';
            $username = cookie('username');
            $cond = array(
                'username' => $username,
            );
            // 查找用户的授权码
            $res = D('User')->where($cond)->select();
            $auth_code = $res[0]["auth_code"];
            // 查找授权码对应的塔机sim卡号
            $res = D('Cranereg')->where('auth_code='.$auth_code)->select();
            foreach ($res as $k => $v) {
                $list[$k]['sim_num'] = $v['sim_num'];
            }
            // 根据sim卡号，查询塔机经纬度信息
            for ($n = 0; $n < count($list); $n++) {
                $sim_num[$n] = $list[$n]['sim_num'];
                $res[$n] = D('Realinfo')->where('sim_num='.$sim_num[$n])->order('update_time desc')->limit(1)->select();
                $data[$n] = $res[$n][0];
            }
            return show(1, '查询成功', $data);
        }

        $this->display();
    }

    public function dataList(){
        if(IS_POST && I('post.action')=='getDataList'){
            $username = cookie('username');
            $cond = array(
                'username' => $username,
            );
            // 查找用户的授权码
            $res = D('User')->where($cond)->select();
            $auth_code = $res[0]["auth_code"];
            // 查找授权码对应的塔机
            $res = D('Cranereg')->where('auth_code='.$auth_code)->select();
            foreach ($res as $k => $v) {
                $list[$k]['type'] = $v['type'];
                $list[$k]['model'] = $v['model'];
                $list[$k]['sim_num'] = $v['sim_num'];
            }
            if ($list) {
                return show(1, '查询成功', $list);
            } else {
                return show(0, '请联系工作人员进行用户信息和塔机信息的绑定');
            }
        }else{
            return show(0, '非法请求');
        }
    }

    public function realData(){
        if(IS_POST) {
            $sim_num = I('post.sim_num');
            $res = D('Realinfo')->where('sim_num='.$sim_num)->order('update_time desc')->limit(1)->select();
            if($res){
                return show(1, '查询成功', $res[0]);
            }else{
                return show(0, '数据查询失败');
            }
        }
        $this->display();

    }

    public function historyData(){
        if(IS_POST){
            $sim_num = I('post.sim_num');
            $res = D('Realinfo')->where('sim_num='.$sim_num)->order('update_time')->limit(100)->select();
            foreach ($res as $k => $v) {
                $data[$k]['update_time'] = $v['update_time'];
                $data[$k]['weight'] = $v['weight'];
                $data[$k]['force'] = $v['force'];
                $data[$k]['height'] = $v['height'];
                $data[$k]['amplitude'] = $v['amplitude'];
                $data[$k]['rotate'] = $v['rotate'];
                $data[$k]['wind'] = $v['wind'];
            }
            if($data){
                return show(1, '查询成功', $data);
            }else{
                return show(0, '数据查询失败');
            }
        }
        $this->display();
    }
}
