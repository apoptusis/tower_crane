<?php
namespace Admin\Controller;
use Think\Controller;
import('Vendor.PHPExcel.PHPExcel');
class CraneAdminController extends CommonController {
    public function craneList(){
        $CraneregModel = D('Cranereg');
        $count = $CraneregModel->where('status=1')->count();
        $Page = new \Think\Page($count,10);
        $show = $Page->show();
        $list = $CraneregModel->where('status=1')->order('id')->limit($Page->firstRow.','.$Page->listRows)->select();
        $this->assign('list',$list);
        $this->assign('page',$show);
        $this->display();
    }

    public function craneAdd(){
        if(IS_POST){
            $crane_id = trim(I('post.crane_id'));
            $type = trim(I('post.type'));
            $model = trim(I('post.model'));
            $sim_num = trim(I('post.sim_num'));
            $term_num = trim(I('post.term_num'));
            $remarks = I('post.remarks');
            //验证数据
            $result = D('Cranereg')->create();
            $message = D('Cranereg')->getError();
            if(!$result){
                return show (0,$message);
            }
            $data = array(
                'crane_id' => $crane_id,
                'type' => $type,
                'model' => $model,
                'sim_num' => $sim_num,
                'term_num' => $term_num,
                'remarks' => $remarks,
            );
            //更新数据
            if($_POST['id']){
                $id =  intval(I('post.id'));
                $res = D('Cranereg')->where('id='.$id)->save($data);
                if(!$res){
                    return show(0,'修改失败！');
                }else{
                    return show(1,'修改成功！');
                }
            }else{//新增数据
                $res = D('Cranereg')->add($data);
                if(!$res){
                    return show(0,'添加失败！');
                }else{
                    return show(1,'添加成功！');
                }
            }
        }
        $this->display();
    }

    public function craneEdit(){
        if(!$_GET['id'] || !is_numeric($_GET['id'])){
            $this->redirect('Admin/Error/e404');
        }
        $id = (int) I('get.id');
        $data = D('Cranereg')->where('id='.$id)->find();
        $this->assign('data',$data);
        $this->display();
    }

    public function craneBan(){
        $id = (int) I('post.id');
        $status = (int) I('post.status');
        if(!$id || !is_numeric($id)){
            $this->redirect('Admin/Error/e404');
        }
        $data['status']= $status;
        $res = D('Cranereg')->where('id='.$id)->save($data);
        if(!$res) {
            return show(0, '删除失败');
        }else{
            return show(1,'删除成功');
        }
    }

    public function import(){
        // 实例化上传类
        if (IS_POST) {
            $upload = new \Think\Upload();
            $upload->maxSize = 3145728;
            $upload->exts = array('xls', 'xlt', 'xlsx', 'xlsm');
            $upload->rootPath = './Uploads/excel/CraneAdmin/'; // 设置附件上传根目录
            $upload->savePath = ''; // 设置附件上传（子）目录
            $info = $upload->upload();
            if(!$info) {
                $this->error($upload->getError());
            }
            //文件地址
            $file = './Uploads/excel/CraneAdmin/' . $info['excel']['savepath'] . $info['excel']['savename'];

            //实例化PHPExcel
            $Excel = new \PHPExcel();
            //载入文件，excel文件后缀名为.xlsx
            $PHPReader = new \PHPExcel_Reader_Excel2007();
            $Excel = $PHPReader -> load($file);
            //获取表中的第一个工作表
            $currentSheet = $Excel -> getSheet(0);
            //获取总列数和总行数
            $allColumn = $currentSheet -> getHighestColumn();
            $allRow = $currentSheet -> getHighestRow();
            //循环获取表中的数据，$currentRow表示当前行，从哪行开始读取数据，索引值从0开始
            for($currentRow = 1; $currentRow <= $allRow; $currentRow++) {
                //从哪列开始，A表示第一列
                for($currentColumn = 'A'; $currentColumn <= $allColumn; $currentColumn++) {
                    //数据坐标
                    $address = $currentColumn.$currentRow;
                    //读取到的数据，保存到数组$arr中
                    $arr[$currentRow][$currentColumn] = $currentSheet
                        -> getCell($address)
                        -> getValue();
                }
            }
//            print_r($arr);exit;
            //遍历数据并插入数据库
            $data = array();
            foreach ($arr as $key => $value){
                if($key != 1){
                    $data['crane_id'] = $value["A"];
                    $data['type'] = $value["B"];
                    $data['model'] = $value["C"];
                    $data['sim_num'] = $value["D"];
                    $data['term_num'] = $value["E"];
                    $data['remarks'] = $value["F"];
                    $result = D('Cranereg')->add($data);
                    if(!$result){
                        $this->error('导入数据库失败');
                    }
                }
            }$this->success('导入数据库成功');
        }
    }

    public function export(){
        //读取数据库中数据
        $data = D('Cranereg')->order('id')->select();
        //生成的Excel文件文件名
        $name = '注册塔机信息'.date("Y-m-d",time()) ;
        //实例化PHPExcel
        $Excel  = new\PHPExcel();
        //给当前活动sheet名
        $Excel -> getActiveSheet() -> setTitle('sheet1');
        //插入数据
        $i = 2;
        foreach($data as $key => $val) {
            $Excel -> setActiveSheetIndex(0)
                -> setCellValue('A1', '塔机编号')
                -> setCellValue('B1', '塔机类型')
                -> setCellValue('C1', '塔机型号')
                -> setCellValue('D1', 'SIM卡号')
                -> setCellValue('E1', '终端号')
                -> setCellValue('F1', '备注')
                -> setCellValue('A'.$i, $val['crane_id'])
                -> setCellValue('B'.$i, $val['type'])
                -> setCellValue('C'.$i, $val['model'])
                -> setCellValue('D'.$i, $val['sim_num'])
                -> setCellValue('E'.$i, $val['term_num'])
                -> setCellValue('F'.$i, $val['remarks']);
            $i++;
        }
        //生成指定文件
        $ExcelWriter = \PHPExcel_IOFactory::createWriter($Excel, 'Excel2007');
        //输出到浏览器
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment; filename='.$name.'.xlsx');
        header('Cache-Control: max-age=0');
        $ExcelWriter->save('php://output');
    }




}