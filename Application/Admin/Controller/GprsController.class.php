<?php
namespace Admin\Controller;
use Think\Controller;
class GprsController extends CommonController {
    public function datain(){

        function randomDataInSQL($crane_id,$sim_num,$latitude,$longitude){
            // 生成随机数据
            $data = array(
                'crane_id' => $crane_id,
                'sim_num' => $sim_num,
                'latitude' => $latitude,
                'longitude' => $longitude,
                'update_time' => time(),
                'amplitude' => mt_rand(1000,5000)/100,
                'wind' => mt_rand(500,2000)/100,
                'height' => mt_rand(2000,3000)/100,
                'rotate' => mt_rand(-18000,18000)/100,
            );
            if(10<$data['amplitude'] && $data['amplitude']<20){
                $data['weight'] = mt_rand(700,900)/100;
            }
            if(20<$data['amplitude'] && $data['amplitude']<30){
                $data['weight'] = mt_rand(400,600)/100;
            }
            if(30<$data['amplitude'] && $data['amplitude']<40){
                $data['weight'] = mt_rand(300,400)/100;
            }
            if(40<$data['amplitude'] && $data['amplitude']<50){
                $data['weight'] = mt_rand(200,300)/100;
            }
            $data['force']=round($data['weight']*$data['amplitude']*9.8,2);
            // 10%的概率报警
            $warning = mt_rand(0,100);
            if($warning >= 97){
                $isWarning = 1;
            }else {
                $isWarning = 0;
            }
            $data['isWarning'] = $isWarning;
            // 插入数据库
            $res = D('Realinfo')->add($data);
            if(!$res) {
                echo  'GPRS连接失败！<br/>';
            }else {
                echo $data['crane_id']."号塔机GPRS连接成功！数据写入中...<br/>";
            }
        }

        //1001号塔机添加数据
        randomDataInSQL(1001,13877998855,112.92,27.90);
        //1002号塔机添加数据
        randomDataInSQL(1002,18673244444,112.85,27.85);
        //1003号塔机添加数据
        randomDataInSQL(1003,13577589542,112.85,27.90);
        //1004号塔机添加数据
        randomDataInSQL(1004,18777665599,112.80,28.00);
        //1005号塔机添加数据
        randomDataInSQL(1005,1897654287,112.91,27.91);

        // 10s刷新一次页面
        echo ("<script type=\"text/javascript\">");
        echo ("function fresh_page()");
        echo ("{");
        echo ("window.location.reload();");
        echo ("}");
        echo ("setTimeout('fresh_page()',10000);");
        echo ("</script>");
    }


}