<?php
namespace Admin\Controller;
use Think\Controller;
class UserController extends CommonController {
    public function userList(){
        $AdminModel = D('Admin');
        $count = $AdminModel->where('status=1')->count();
        $Page = new \Think\Page($count,10);
        $show = $Page->show();
        $list = $AdminModel->where('status=1')->order('id')->limit($Page->firstRow.','.$Page->listRows)->select();
        $this->assign('list',$list);
        $this->assign('page',$show);
        $this->display();
    }

    public function userAdd(){
        if(IS_POST){
            $username = trim(I('post.username'));
            $password = trim(I('post.password'));
            $realname = trim(I('post.realname'));
            $email = trim(I('post.email'));
            $auth_code = trim(I('post.auth_code'));
            $company = trim(I('post.company'));
            $phone = trim(I('post.phone'));
            $address = trim(I('post.address'));
            //验证post数据
            $result = D('Admin')->create();
            $message = D('Admin')->getError();
            if(!$result){
                return show(0,$message);
            }
            $data = array(
                'username' => $username,
                'password' => getMd5($password),
                'realname' => $realname,
                'email' => $email,
                'auth_code' => $auth_code,
                'company' => $company,
                'phone' => $phone,
                'address' => $address,
            );
            //更新数据
            if($_POST['id']){
                $id =  intval(I('post.id'));
                $res = D('Admin')->where('id='.$id)->save($data);
                if(!$res){
                    return show(0,'修改失败！');
                }else{
                    return show(1,'修改成功！');
                }
            }else{//新增数据
                $res = D('Admin')->add($data);
                if(!$res){
                    return show(0,'添加失败！');
                }else{
                    return show(1,'添加成功！');
                }
            }
        }
        $this->display();
    }

    public function userEdit(){
        if(!$_GET['id'] || !is_numeric($_GET['id'])){
            $this->redirect('Admin/Error/e404');
        }
        $id = (int) I('get.id');
        $data = D('Admin')->where('id='.$id)->find();
        $this->assign('data',$data);
        $this->display();
    }

    public function userBan(){
        $id = (int) I('post.id');
        $status = (int) I('post.status');
        if(!$id || !is_numeric($id)){
            $this->redirect('Admin/Error/e404');
        }
        $data['status']= $status;
        $res = D('Admin')->where('id='.$id)->save($data);
        if(!$res) {
            return show(0, '删除失败');
        }else{
            return show(1,'删除成功');
        }


    }



}