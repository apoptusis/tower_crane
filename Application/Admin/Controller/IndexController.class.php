<?php
namespace Admin\Controller;
use Think\Controller;
class IndexController extends CommonController {
    public function index(){
        $username = cookie('username');
        $this->assign('username',$username);
        $this->display();
    }
}