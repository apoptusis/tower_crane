<?php
function getMd5($password){
    $salt = C('PWD_SALT');
    return md5($password.$salt);
}

function show($status,$message,$data=array()){
    $result = array(
        'status' => $status,
        'message' => $message,
        'data' => $data,
    );
    exit(json_encode($result));
}

function IsOnline($time){
    if($time > time()-60*10 ){
        return "<b>在线</b>";
    }else{
        return "<b style='color: darkred'>离线</b>";
    }
}