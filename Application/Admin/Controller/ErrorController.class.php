<?php
namespace Admin\Controller;
use Think\Controller;
class ErrorController extends Controller {
    public function e403(){
        $this->display();
    }
    public function e404(){
        $this->display();
    }
    public function e500(){
        $this->display();
    }
    public function e503(){
        $this->display();
    }
}