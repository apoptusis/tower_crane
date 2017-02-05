<?php
namespace Admin\Controller;
use Think\Controller;
class GprsController extends CommonController {

    public function datain(){

                //1001号塔机添加数据
                $data1 = array(
                    'crane_id' => '1001',
                    'sim_num' => '13877998855',
                    'update_time' => time(),
                    'latitude' => '112.92',
                    'longitude' => '27.90',
                    'height' => mt_rand(30,50),
                    'rotate' => mt_rand(-360,360),
                    'wind' => mt_rand(0,10),
                );
                $data1['weight']=mt_rand(8,32);
                $data1['amplitude']=mt_rand(30,50);
                $data1['force']=$data1['weight']*$data1['amplitude'];
                $res1 = D('Realinfo')->add($data1);
                if(!$res1) {
                    echo  '1号塔机GPRS连接失败！';
                }

                //1002号塔机添加数据
                $data2 = array(
                    'crane_id' => '1002',
                    'sim_num' => '18673244444',
                    'update_time' => time(),
                    'latitude' => '112.85',
                    'longitude' => '27.85',
                    'height' => mt_rand(30,50),
                    'rotate' => mt_rand(-360,360),
                    'wind' => mt_rand(0,10),
                );
                $data2['weight']=mt_rand(8,32);
                $data2['amplitude']=mt_rand(30,50);
                $data2['force']=$data2['weight']*$data2['amplitude'];
                $res2 = D('Realinfo')->add($data2);
                if(!$res2) {
                    echo  '2号塔机GPRS连接失败！';
                }

                //1003号塔机添加数据
                $data3 = array(
                    'crane_id' => '1003',
                    'sim_num' => '13577589542',
                    'update_time' => time(),
                    'latitude' => '112.87',
                    'longitude' => '27.90',
                    'height' => mt_rand(30,50),
                    'rotate' => mt_rand(-360,360),
                    'wind' => mt_rand(0,10),
                );
                $data3['weight']=mt_rand(8,32);
                $data3['amplitude']=mt_rand(30,50);
                $data3['force']=$data3['weight']*$data3['amplitude'];
                $res3 = D('Realinfo')->add($data3);
                if(!$res3) {
                    echo '3号塔机GPRS连接失败！';
                }

                //1004号塔机添加数据
                $data4 = array(
                    'crane_id' => '1004',
                    'sim_num' => '18777665599',
                    'update_time' => time(),
                    'latitude' => '112.80',
                    'longitude' => '28.00',
                    'height' => mt_rand(30,50),
                    'rotate' => mt_rand(-360,360),
                    'wind' => mt_rand(0,10),
                );
                $data4['weight']=mt_rand(8,32);
                $data4['amplitude']=mt_rand(30,50);
                $data4['force']=$data4['weight']*$data4['amplitude'];
                $res4 = D('Realinfo')->add($data4);
                if(!$res4) {
                    echo '4号塔机GPRS连接失败！';
                }

                if($res1 && $res2 && $res3){
                    echo 'GPRS连接成功！数据写入中...';
                }

        echo ("<script type=\"text/javascript\">");
        echo ("function fresh_page()");
        echo ("{");
        echo ("window.location.reload();");
        echo ("}");
        echo ("setTimeout('fresh_page()',10000);");
        echo ("</script>");


    }


}