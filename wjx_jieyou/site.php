<?php
/**
 * 解忧小酒馆模块微站定义
 *
 * @author 18841692393
 * @url http://youzhis.cn
 */
defined('IN_IA') or exit('Access Denied');

class Wjx_jieyouModuleSite extends WeModuleSite {
	 public function doWebMemberList(){
		global $_W,$_GPC;
		$uniacid=$_W['uniacid'];
		$pindex = max(1, intval($_GPC['page']));
        $psize = 20;
		$all = pdo_fetchcolumn("select count(*) from ".tablename('mc_mapping_fans')." where `uniacid`=".$uniacid);
		$list=pdo_fetchall("select * from ".tablename('mc_mapping_fans')." where `uniacid`='$uniacid' LIMIT " . ($pindex - 1) * $psize . ",{$psize}");
		$total = pdo_fetchcolumn("select count(*) from ".tablename('mc_mapping_fans')." where `uniacid`=".$uniacid);
        $pager = pagination($total, $pindex, $psize);
		include $this->template('MemberList');
	 }
	 public function doWebXinList(){
		global $_W,$_GPC;
		$uniacid=$_W['uniacid'];
		$pindex = max(1, intval($_GPC['page']));
        $psize = 10;
		$all = pdo_fetchcolumn("select count(*) from ".tablename('wjx_jieyou_xin')." where `uniacid`=".$uniacid);
		$no_xin = pdo_fetchcolumn("select count(*) from ".tablename('wjx_jieyou_xin')." where `uniacid`=".$uniacid ." and huixin is null and uid <> 'undefined'");
		$list=pdo_fetchall("select * from ".tablename('wjx_jieyou_xin')." a left join  ".tablename('mc_mapping_fans')." b on a.uid = b.uid order by time desc LIMIT " . ($pindex - 1) * $psize . ",{$psize}");
		$total = pdo_fetchcolumn("select count(*) from ".tablename('wjx_jieyou_xin')." where `uniacid`=".$uniacid);
        $pager = pagination($total, $pindex, $psize);
		include $this->template('XinList');
	 }
	 public function doWebHuixin(){

        global $_W,$_GPC;
        $uniacid=$_W['uniacid'];
        load()->func('tpl');
        $id = $_GPC['id'];
		$list = pdo_fetch("select * from ".tablename('wjx_jieyou_xin')." a inner join  ".tablename('mc_mapping_fans')." b on a.uid = b.uid where a.id = '$id'");
		$avatar = $list['avatar'];
		//回信
		if(checksubmit()){
			$xin = $this->fwb_del_font($_GPC['xin']);
			pdo_update('wjx_jieyou_xin',array('huixin'=>$xin,'hui_time'=>$_W['timestamp']),array('id'=>$id));
			$l = pdo_fetch("select * from ".tablename('wjx_jieyou_xin')." a inner join  ".tablename('mc_mapping_fans')." b on a.uid = b.uid where a.id = '$id'");
			$account_api = WeAccount::create();
			$token = $account_api->getAccessToken();
			
			//回信提示用户模板消息
			$openId = $l['openid'];
			$formId = $l['fid'];//获取formId
			$access_token = $token;
		
				if($access_token){
			$templateData = $this->create_template($openId,$formId,$l);//拼接模板数据
			$res = json_decode($this->https_curl_json('https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token='.$access_token,$templateData));
		
	
			}
		    message("回信成功");
		}
		include $this->template('Huixin');
	 }
	 //历史信件
	 function doWebHistory(){
		global $_W,$_GPC;
		$uid = $_GPC['uid'];
		$list=pdo_fetchall("select * from ".tablename('wjx_jieyou_xin')." a inner join  ".tablename('mc_mapping_fans')." b on a.uid = b.uid and a.uid = '$uid' order by time asc");
		include $this->template('History');
	 }
	 function doWebdelxin(){
		global $_W,$_GPC;
        $uniacid=$_W['uniacid'];
        load()->func('tpl');
        $id = $_GPC['id'];
		 $res=pdo_delete('wjx_jieyou_xin',array('id'=>$id,'uniacid'=>$uniacid));
		 message("删除成功",$this->createWebUrl('XinList'));

		
	 }
	  public function fwb_del_font($str)
    {
        $str = htmlspecialchars_decode($str);
        $re = preg_replace("/font-family:.*;/i",'',$str);
        $re = preg_replace("/font-family:.*\"/i",'"',$re);
        return $re;
    }
		//2.拼装模板，创建通知内容
private function create_template($openId,$formId,$content){
    $templateData['keyword1']['value'] = strip_tags($content['huixin']);
    $templateData['keyword1']['color'] = '#d81e06';
    $templateData['keyword2']['value'] = date("Y-m-d H:i",$content['hui_time']);
    $templateData['keyword2']['color'] = '#1aaba8';
    $templateData['keyword3']['value'] = '醉翁儿先生';
    $templateData['keyword4']['value'] = '#1aaba8';
    $data['touser'] = $openId;
    $data['template_id'] = '26H3SEOWSZfwKyWCc-acTbJL91vmzKejmMqkEO8CbDM';
    $data['page'] = '/wjx_jieyou/my/index';//用户点击模板消息后的跳转页面
    $data['form_id'] = $formId;
    $data['data'] = $templateData;
    return json_encode($data);
}

//3.执行模板消息发布
public function send_notice($key){
    $openId = '用户openId';
    $formId = $this -> getFormId($openId);//获取formId
    $access_token = '获取access_token';
    $content='通知内容';//可通过$key作为键来获取对应的通知数据
    if($access_token){
        $templateData = $this->create_template($openId,$formId,$content);//拼接模板数据
        $res = json_decode($this->http_post('https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token='.$access_token,$templateData));
        if($res->errcode == 0){
            return $res;
        }else{
            return false;
        }
    }
}
 function https_curl_json($url,$data){
      
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_POST, 1); // 发送一个常规的Post请求
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        if (!empty($data)){
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS,$data);
        }
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
       // curl_setopt($curl, CURLOPT_HTTPHEADER, $headers );
        $output = curl_exec($curl);
        if (curl_errno($curl)) {
            echo 'Errno'.curl_error($curl);//捕抓异常
        }
        curl_close($curl);
        return $output;
    }
    public function doWebHuilist(){
        global $_W,$_GPC;
        $uniacid=$_W['uniacid'];
        $pindex = max(1, intval($_GPC['page']));
        $psize = 10;
        $all = pdo_fetchcolumn("select count(*) from ".tablename('wjx_jieyou_huixin')." where `uniacid`=".$uniacid);

        $list=pdo_fetchall("select a.*,b.*,c.body from ".tablename('wjx_jieyou_huixin')." a left join  ".tablename('mc_mapping_fans')." b on a.uid = b.uid join ".tablename('wjx_jieyou_xin')." c on a.xinId = c.id order by time desc LIMIT " . ($pindex - 1) * $psize . ",{$psize}");
        $total = pdo_fetchcolumn("select count(*) from ".tablename('wjx_jieyou_huixin')." where `uniacid`=".$uniacid);
        $pager = pagination($total, $pindex, $psize);
        include $this->template('HuiList');
    }
}