<?php
namespace Home\Controller;
use Think\Controller;
import('Vendor.PHPMailer.PHPMailer');
import('Vendor.PHPMailer.Smtp');
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
                $data = array(
                    'token' => $token,
                    'username' => $username,
                );
                cookie('username',$username);
                cookie('tokenId',$token);
                return show(1,'登录成功',$data);
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
//            $sim_num = 18673244444;
            // 查询塔机最新实时数据
            $realData = D('Realinfo')->where('sim_num='.$sim_num)->order('update_time desc')->limit(1)->select();
            // 统计总报警次数
            $allData = D('Realinfo')->where('sim_num='.$sim_num)->order('update_time desc')->select();
            foreach ($allData as $k => $v) {
                $warning[$k] = $v['iswarning'];
                $updateTime[$k] = $v['update_time'];
            }
            $warningTime = array_count_values($warning)[1];
            $warn = array('warningTime' => $warningTime);
            // 查询塔机基本信息，如额定力矩
            $modelData = D('Cranereg')->where('sim_num='.$sim_num)->select();
            $model = $modelData[0]['model'];
            $baseData = D('Baseinfo')->where("model='".$model."'")->select();
            // 计算在线时间
            for($i = 0; $i < count($updateTime); $i++){
                $diff = $updateTime[$i-1] - $updateTime[$i];
                if($diff > 10){
                    $startTime = $updateTime[$i-1];
                    break;
                }
            };
            $endTime = $updateTime[0];
            $duration = $endTime -  $startTime;
            $workTime = array(
                'startTime' => $startTime,
                'endTime' => $endTime,
                'duration' => $duration,
            );
            // 拼接数组
            $data = array_merge($realData[0],$baseData[0],$warn,$workTime);
            // 返回数据
            if($realData && $modelData && $baseData){
                return show(1, '查询成功', $data);
            }else{
                return show(0, '数据查询失败');
            }
        }
        $this->display();
    }

    public function historyData(){
        if(IS_POST){
            $sim_num = I('post.sim_num');
            $res = D('Realinfo')->where('sim_num='.$sim_num)->order('update_time desc')->limit(100)->select();
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


    public function findUserInfo(){
        if(IS_POST) {
            $username = I('post.username');
            $res = D('User')->where('username="' . $username . '"')->select();
            if ($res) {
                return show(1, '查询成功', $res[0]);
            } else {
                return show(0, '数据查询失败');
            }
        }
    }

    public function sendEmail(){
        if(IS_POST) {
            // 获取用户名和邮箱
            $username = I('post.username');
            $userEmail = I('post.email');
            $username = 'admin';
            $userEmail = '364567043@qq.com';
            // 生成验证码
            $identifyNum = mt_rand(100000, 999999);
            $data = array(
                'identifyNum' => $identifyNum,
            );
            // 存入cookie
            $identifyString = $username.$identifyNum;
            cookie('identifyString',$identifyString,30);
            // 发送验证码邮件
            try{
                $mail = new \PHPMailer(true);
                $mail->IsSMTP();
                $mail->CharSet = 'UTF-8';
                $mail->SMTPAuth = true;
                $mail->Port = 25;
                $mail->Host = "smtp.163.com";
                // 发送邮箱
                $mail->Username = "18673244876@163.com";
                // 这里是STMP服务的密码
                $mail->Password = "Letmegofuck123";
                // 回复地址
                $mail->AddReplyTo("18673244876@163.com", "Hwasin");
                // 寄信人
                $mail->From = "18673244876@163.com";
                $mail->FromName = "塔机监控系统APP";
                $mail->AddAddress($userEmail);
                // 邮件内容
                $mail->Subject = "你更改帐号信息的验证码是:" . $identifyNum;
                $mail->Body = "
                    <h2>" . $username . "，你好，<h2>
                    <p>此次帐号信息变更需要的验证码如下，请在 30 分钟内输入验证码进行下一步操作。</p>
                    <p style='font-size:32px;font-weight:700;color:#ff545b;'>" . $identifyNum . "</p>
                    <p>如果非你本人操作，你的帐号可能存在安全风险，请立即修改密码!</p>
                    ";
                $mail->WordWrap = 80; // 设置每行字符串的长度
                $mail->IsHTML(true);
                $mail->Send();
                return show(1, '验证码发送成功,请注意查收', $data);
            } catch (phpmailerException $e) {
                return show(0, '验证码发送失败,请联系客服');
            }
        }
    }

    public function checkIdentifyNum(){
        if(IS_POST){
            $username = I('post.username');
            $identifyNum = I('post.identifyNum');
            $userIdentifyString = $username.$identifyNum;
            if(cookie('identifyString') == $userIdentifyString){
                return show(1, '验证成功');
            }else{
                return show(0, '验证码错误');
            }
        }
    }


    public function showPassword(){
        echo getMd5('admin1');
    }
}
