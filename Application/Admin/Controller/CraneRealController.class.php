<?php
namespace Admin\Controller;
use Think\Controller;
class CraneRealController extends CommonController {
    public function craneList(){
        //搜索功能
        $cond = array();
        $search=I('post.search');
        if($search && is_numeric($search)){
            $cond['sim_num'] = array('like','%'.$search.'%');
        }
        if($search && !is_numeric($search)){
            $this->error('请输入正确的SIM卡号');
            exit;
        }

        //查找有监控历史数据的塔机编号crane_id
        $res = D('Realinfo')->where($cond)->select();
        if(!$res){
            $this->assign('error',1);
            $this->assign('mes','暂时没有该塔机监控历史数据');
            $this->display();
        }else{
            $realed_id = array();
            foreach ($res as $k => $v){
                $realed_id[$k] = $v['crane_id'];
            }
            $realed_id = array_unique($realed_id);
            //在塔机注册表(Cranereg)中查找塔机编号(crane_id)
            $cond['crane_id'] = array('IN',$realed_id);
            $cond['status'] = '1';
            $CraneregModel = D('Cranereg');
            $count = $CraneregModel->where($cond)->count();
            $Page = new \Think\Page($count,10);
            $show = $Page->show();
            $list = $CraneregModel->where($cond)->order('crane_id')->limit($Page->firstRow.','.$Page->listRows)->select();
            //在塔机监控数据表中，查找出每台塔机最新的数据
            $data = D('Realinfo')->query
            ("select * from realinfo as a
            where update_time=
            (select max(b.update_time) from realinfo as b
            where a.crane_id = b.crane_id
            )AND sim_num Like" . "'%".$search."%'" . " ORDER BY crane_id;");
            //这里暂时无法解决地图上显示与搜索条件的对应关系

//        print_r($search);
//        print_r($data);echo '<hr>';
//        print_r($list);
            foreach ($data as $k=>$v){
                $list[$k]['update_time'] = $v['update_time'];
                $list[$k]['latitude'] = $v['latitude'];
                $list[$k]['longitude'] = $v['longitude'];
            }

            $this->assign('list',$list);
            $this->assign('page',$show);

            //Ajax返回塔机数据给地图API
            if($_POST['action']=='map'){
                return show(1,'返回塔机坐标信息',$data);
            }

            $this->display();
        }
    }


    public function craneDetail(){
        if(!$_GET['crane_id'] || !is_numeric($_GET['crane_id'])){
            $this->redirect('Admin/Error/e404');
        }
        $id = (int) I('get.crane_id');
        $data = D('Realinfo')->where('crane_id='.$id)->order('update_time desc')->limit(1)->select();
        $info = D('Cranereg')->where('crane_id='.$id)->find();
        $this->assign('data',$data);
        $this->assign('info',$info);
        $this->display();



    }
}