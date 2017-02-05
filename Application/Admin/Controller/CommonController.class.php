<?php
namespace Admin\Controller;
use Think\Controller;
class CommonController extends Controller {
    public function checkLogin(){
        if(!session('username') && !cookie('username')){
            $this->redirect('Admin/Error/e403');
        }
    }

    public function __construct(){
        parent::__construct();
        $this->checkLogin();
    }

}