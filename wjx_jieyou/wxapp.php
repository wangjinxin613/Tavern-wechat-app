<?php
/**
 * 解忧小酒馆模块小程序接口定义
 *
 * @author 18841692393
 * @url http://youzhis.cn
 */
defined('IN_IA') or exit('Access Denied');

class Wjx_jieyouModuleWxapp extends WeModuleWxapp {
	public function doPageTest(){
		global $_GPC, $_W;
		$errno = 0;
		$message = '返回消息';
		$data = array();
		return $this->result($errno, $message, $data);
	}
	function test(){
	global $_GPC, $_W;
		$errno = 0;
		$message = '返回消息';
		$data = array();
		return $this->result($errno, $message, $data);
	}
	//检验是否登录
	private function checkLogin() {
        global $_W;
        if (empty($_W['fans'])) {
            return error(1, '请先登录');
        }
        return true;
    }
	//注册，登录的新用户添加到数据库
	public function doPageLogin(){
		global $_W;
		  $message='预约成功,我们恭候您的光临！';
		 return json_encode(['message'=> $message,'code'=>'0']);
	}
	public function login(){
	  $message='预约成功,我们恭候您的光临！';
		 return json_encode(['message'=> $message,'code'=>'0']);
	}
	//写信
	public function doPageAdd(){
		global $_GPC, $_W;
		$uniacid=$_W['uniacid'];
		$data = [
			'uniacid'=>$uniacid,
			'uid' =>$_GPC['uid'],
			'title' =>$_GPC['title'],
			'time'=>$_W['timestamp'],
			'body' =>$_GPC['body'],
			'avatar' =>$_GPC['avatar'],
			'fid' =>$_GPC['fid']
		];
		$uid = $_GPC['uid'];
		if($uid == 0 || $uid == null) {
			return false;
		}
		$result = pdo_insert('wjx_jieyou_xin', $data);
		$message='写信成功';
		 return json_encode(['message'=> $message,'code'=>'1']);
	}
	//信列表
	public function dopageList(){
		global $_GPC, $_W;
		$uid = $_GPC['uid'];
		$uniacid=$_W['uniacid'];
		$list = pdo_fetchall("select a.*,b.nickname nickname from ".tablename('wjx_jieyou_xin')." a inner join  ".tablename('mc_mapping_fans')." b on a.uid = b.uid where a.uid = '$uid' order by a.time asc");
		foreach($list as $key=>$value){
			$list[$key]['xie_date'] = date("Y-m-d",$list[$key]['time']);
			$list[$key]['xie_time'] = date("H:i",$list[$key]['time']);
			$list[$key]['hui_data'] = date("Y-m-d",$list[$key]['hui_time']);
			$list[$key]['hui_time'] = date("H:i",$list[$key]['hui_time']);
			//这封信的回信列表
            $list[$key]['huixinList'] = pdo_fetchall("select a.*,b.nickname nickname from ".tablename('wjx_jieyou_huixin')." a inner join  ".tablename('mc_mapping_fans')." b on a.uid = b.uid where a.xinId = ". $list[$key]['id'] ." order by a.time asc");
                //回信时间
                foreach($list[$key]['huixinList'] as $k => $va) {
                    $list[$key]['huixinList'][$k]['hui_data'] = date("Y-m-d",$list[$key]['huixinList'][$k]['time']);
                    $list[$key]['huixinList'][$k]['hui_time'] = date("H:i",$list[$key]['huixinList'][$k]['time']);
                }

        }
		return json_encode($list);
	}
	//信详情
	public function dopageDetail(){
		global $_GPC, $_W;
		$id = $_GPC['id'];
        $uniacid=$_W['uniacid'];
        $type = $_GPC['type'];

        if($type == "2") {
            $list = pdo_fetch("select a.*,b.nickname nickname from ".tablename('wjx_jieyou_huixin')." a inner join  ".tablename('mc_mapping_fans')." b on a.uid = b.uid where a.id = '$id' ");
            $list['body'] = $list['content'];
            $list['avatar'] = "http://jy.youzhis.cn/img/headimg.jpg";
        }else {
            $list = pdo_fetch("select a.*,b.nickname nickname from " . tablename('wjx_jieyou_xin') . " a inner join  " . tablename('mc_mapping_fans') . " b on a.uid = b.uid where a.id = '$id' ");
        }
		return json_encode($list);
	}
	//首页信件的列表
	public function dopageIndexlist(){
		global $_GPC, $_W;
		$uid = $_GPC['uid'];
		$uniacid=$_W['uniacid'];
        $max = pdo_fetchcolumn("select max(id) from ".tablename('wjx_jieyou_xin')." where `uniacid`=".$uniacid);
        $min = pdo_fetchcolumn("select min(id) from ".tablename('wjx_jieyou_xin')." where `uniacid`=".$uniacid);
        $re = rand($min,$max);

		$list = pdo_fetchall("select a.body msg,a.id xinId,b.nickname nickname from ".tablename('wjx_jieyou_xin')." a inner join  ".tablename('mc_mapping_fans')." b on a.uid = b.uid where a.uid <> '$uid' and length(a.body) >= 60 and a.id >= '$re' limit 5");

		// foreach($list as $key=>$value){
		// 	$list[$key]['xie_date'] = date("Y-m-d",$list[$key]['time']);
		// 	$list[$key]['xie_time'] = date("H:i",$list[$key]['time']);
		// 	$list[$key]['hui_data'] = date("Y-m-d",$list[$key]['hui_time']);
		// 	$list[$key]['hui_time'] = date("H:i",$list[$key]['hui_time']);
		// }
		return json_encode($list);
	}

	//回信
	public function dopageHuixin(){
		global $_GPC, $_W;
		$uniacid=$_W['uniacid'];
		$data = [
			'uniacid'=>$uniacid,
			'uid' =>$_GPC['uid'],
			'time'=>$_W['timestamp'],
			'content' =>$_GPC['content'],
			'xinId' =>$_GPC['xinId']
		];

		$uid = $_GPC['uid'];
		if($uid == 0 || $uid == null) {
			return false;
		}
		$result = pdo_insert('wjx_jieyou_huixin', $data);
		$message='回信成功';
		return json_encode(['message'=> $message,'code'=>'1']);
	}
	
}