<?php
/**
 * 解忧小酒馆模块定义
 *
 * @author 18841692393
 * @url http://youzhis.cn
 */
defined('IN_IA') or exit('Access Denied');

class Wjx_jieyouModule extends WeModule {


	public function welcomeDisplay($menus = array()) {
		//这里来展示DIY管理界面
		include $this->template('welcome');
	}
}