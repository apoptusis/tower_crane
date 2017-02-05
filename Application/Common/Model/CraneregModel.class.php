<?php
namespace Common\Model;
use Think\Model;
class CraneregModel extends Model{
    protected $_validate = array(
        array('crane_id','require','塔机编号不能为空！'),
        array('crane_id','','塔机编号已经存在！',0,'unique',1),
        array('type','require','塔机类型不能为空！'),
        array('model','require','塔机型号不能为空！'),
        array('sim_num','require','SIM卡号不能为空！'),
        array('sim_num','','SIM卡号已经存在！',0,'unique',1),
        array('term_num','require','终端号不能为空！'),
        array('term_num','','终端号已经存在！',0,'unique',1),
    );
}