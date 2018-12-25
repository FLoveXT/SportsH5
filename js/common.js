var BaseUrl = "https://www.hg885599.com/";
var SysteLoginUrl = 'http://admin.hg885599.com/';
var SUCCESS_CODE = "00";
var UNLOGIN = "02";
var CAPITALDETAI_TYPE= {
		"0": "下注扣款",	
		"1": "反水优惠",	
		"2": "派奖",	
		"3": "提现",	
		"4": "彩金赠送",	
		"5": "系统扣款",
		"6":"上分",
		"7":"下分",
		"8":"订单取消",
		"9":"危险订单取消",
		"10":"充值",
	};
var ORDER_STATUS= {
		"0": "未结算",	
		"1": "全赢",	
		"2": "赢半",	
		"3": "全输",	
		"4": "输半",	
		"5": "走盘",
		"6":"确认中",
		"7":"取消",
		"8":"危险取消",
};
$(function(){
	
})

/**
 * 登录
 * @returns {Boolean}
 */
function BetLogin() {
	var login_accout = $.trim($("#login_accout").val());
	var login_pwd = $.trim($("#login_pwd").val());
	var verify_code = $.trim($("#verify_code").val());
	if (!login_accout) {
		layer.alert('请输入账号！');
		return false;
	}
	if (!login_pwd) {
		layer.alert('请输入密码！');
		return false;
	}
	if (!verify_code) {
		layer.alert('请输入验证码！');
		return false;
	}

	var reqData = {
			account: login_accout,
			password: login_pwd,
			captcha: verify_code,
	};
	$.ajax({
		type : "POST",
		url : BaseUrl + "user/login?timestamp=" +  (new Date()).getTime(),
		data : reqData,
		dataType : "json",
		cach : false,
		success : function(result) {
			if (result.code == SUCCESS_CODE) {
				var user = result.result.user;
				$("#member_name").html(user.realName);
				$("#no_login").hide();
				$("#logined").show();
				$("#login_accout").val("");
				$("#login_pwd").val("");
				$("#verify_code").val("");
				
				var registerType = user.registerType;
				if(registerType == 1){
					$("#onlineRecharge").remove();
				}
				
				sessionStorage.setItem("userInfo", JSON.stringify(user));
				sessionStorage.setItem("token", result.result.token);
			} else {
				layer.alert(result.msg, {title : '错误信息'});
			}
		}
	});

	
}

/**
 * 退出登录
 */
function EixtLogin() {
	$.ajax({
		type : "GET",
		url : BaseUrl + "user/logout?timestamp=" +  (new Date()).getTime(),
		dataType : "json",
		cach : false,
		success : function(result) {
			if (result.code == SUCCESS_CODE) {
				sessionStorage.removeItem("userInfo");
				window.location.href='login/login.html'
			} else {
				alert(result.msg);
			}
		}
	});
}

//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	if (r != null) return unescape(r[2]); return null; //返回参数值
}

/*
 * 获取Storage的用户信息
 */
function getStorageUser(){
	var userStr = {};
	if(userStr){
		return JSON.parse(userStr);
	} else {
		return {};
	}
}

function unLogin(){
	sessionStorage.removeItem("userInfo");
	window.location.href = BaseUrl + "h5/login/login.html";
}


function formatterDouble(number){
	if(!number)
		number = 0;
	var numberStr = number.toString();
	if(numberStr.indexOf(".") > -1){
		numberStr += "00";
		numberStr = numberStr.substring(0, numberStr.indexOf(".") + 3);
	}else{
		numberStr += ".00";
	}
	return numberStr;
}



