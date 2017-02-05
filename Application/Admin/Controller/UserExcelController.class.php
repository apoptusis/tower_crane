<?php
namespace Admin\Controller;
use Think\Controller;
import('Vendor.PHPExcel.PHPExcel');
class UserExcelController extends Controller{
    
    public function import(){
        // 实例化上传类
        if (IS_POST) {
            $upload = new \Think\Upload();
            $upload->maxSize = 3145728;
            $upload->exts = array('xls', 'xlt', 'xlsx', 'xlsm');
            $upload->rootPath = './Uploads/excel/User/'; // 设置附件上传根目录
            $upload->savePath = ''; // 设置附件上传（子）目录
            $info = $upload->upload();
            if(!$info) {
                $this->error($upload->getError());
            }
            //文件地址
            $file = './Uploads/excel/User/' . $info['excel']['savepath'] . $info['excel']['savename'];

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
                    $data['username'] = $value["A"];
                    $data['email'] = $value["B"];
                    $data['realname'] = $value["C"];
                    $data['company'] = $value["D"];
                    $data['phone'] = $value["E"];
                    $data['address'] = $value["F"];
                    $result = D('Admin')->add($data);
                    if(!$result){
                        $this->error('导入数据库失败');
                    }
                }
            }$this->success('导入数据库成功');
        }
    }

    public function export(){
        //读取数据库中数据
        $cond = array('status' => array('neq', '2'));
        $data = D('admin')->where($cond)->order('id')->select();
        //生成的Excel文件文件名
        $name = '操作员信息'.date("Y-m-d",time()) ;
        //实例化PHPExcel
        $Excel  = new\PHPExcel();
        //给当前活动sheet名
        $Excel -> getActiveSheet() -> setTitle('sheet1');
        //插入数据
        $i = 2;
        foreach($data as $key => $val) {
            $Excel -> setActiveSheetIndex(0)
                -> setCellValue('A1', '用户名')
                -> setCellValue('B1', '邮箱')
                -> setCellValue('C1', '真实姓名')
                -> setCellValue('D1', '公司')
                -> setCellValue('E1', '手机号')
                -> setCellValue('F1', '地址')
                -> setCellValue('G1', '状态')
                -> setCellValue('A'.$i, $val['username'])
                -> setCellValue('B'.$i, $val['email'])
                -> setCellValue('C'.$i, $val['realname'])
                -> setCellValue('D'.$i, $val['company'])
                -> setCellValue('E'.$i, $val['phone'])
                -> setCellValue('F'.$i, $val['address'])
                -> setCellValue('G'.$i, $val['status']);
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