$(function(){
	//点击切换
	$("#radiotwo").change(function(){
		$("#login-user-form").css("display","block");
		$("#login-user-light").css("display","none");
		
	})
	$("#radioone").change(function(){
		$("#login-user-form").css("display","none");
		$("#login-user-light").css("display","block");
		
	})
	 
	//点击显示提示
	$("input").each(function(){
		$(this).click(function(){
			$(this).next().show();
		});
	});
	//滑块验证
	$(".sliding > span").on("mousedown", function(ev) {
		//获取鼠标按下的位置
		var down_X = ev.clientX;
		//获取p,span的宽度
		var p_W = $(".sliding > p").get(0).offsetWidth;
		var span_X = $(".sliding > span").get(0).offsetLeft;
		$(document).get(0).onmousemove = function(ev) {
			//获取鼠标移动的位置
			var move_X = ev.clientX;
			//用移动过后的位置减去鼠标摁下的位置加上p的宽度或者 span 的left 值 因为俩者是同步的 所以 减去 其中一个就好
			var size = move_X - down_X + p_W;
			if (size > 0) { // 移动的时候判断size>0的时候执行，Math.min选取最小值，让拖动过程中不至于超出
				size = Math.min(($(".sliding").get(0).offsetWidth - $(".sliding > span").get(0).offsetWidth), size);
			} else {
				//小于0的时候 size =0； 防止有无聊的用户拖回 超出边界
				size = 0;
			}
			$(".sliding > p").css("width", size + "px");
			$(".sliding > span").css("left", size + "px");
			//防止拖拽过程中选中文字
			return false;
		}
		$(document).get(0).onmouseup = function() {
			//鼠标松开执行,判段span到达边界时候执行
			if (($(".sliding > span").get(0).offsetLeft) >= ($(".sliding").get(0).offsetWidth - $(".sliding > span").get(
					0).offsetWidth)) {
				//更改span的背景图片
				$(".sliding > span").attr("class", "span2_back");
				//更改p标签中的内容
				$(".sliding > p").text("验证通过");
				//验证成功之后执行的方法
				$(".sliding").fadeOut("slow")
				$(".verityWrap").css("display","block");
				$(".invalids").text(randomnumber());
				//删除鼠标摁下方法防止用户 无聊往回 推拽
				$(".sliding > span").off("mousedown");
			} else {
				//判断没到达边界让它再回到起点
				//利用jquery让p 和 span 回到起始状态
				$(".sliding > span").animate({
					left: "0px"
				}, 300);
				$(".sliding > p").animate({
					width: "0px"
				}, 300);
			}
			$(document).get(0).onmousemove = null; //最后让 鼠标移动 和 鼠标松开 事件停止 
			$(document).get(0).onmouseup = null;
		}
	});
	//随机验证码
	function randomnumber(){  //随机生成
			var  arr=[]
			for(var i=0;i<5;i++){
				var  irandom=parseInt(Math.random()*10);
				//语法： Math.random  返回值：0.0 ~ 1.0 之间的一个伪随机数。
				//这里*10是变成随机一个整数
				arr.unshift(irandom);//往arr数组中实参
			}
			var arrt =arr.join("")
			return arrt;
			};
	//点击切换验证码
	$("#change_verify_code").click(function(){
		$(".invalids").text(randomnumber());
	});
	$("#getPhoneCode").click(function(){
		$("#dynamic_password").val(randomnumber());
	})
	//点击更多
	$(".iconAccout P span").click(function(){
		$(".icon-p").slideToggle("normal");
		if($(".iconAccout P span i").attr("class") == "puls"){
			$(".iconAccout P span i").css({"background-position":"-274px -1px","display":"block"})
			.addClass("minus").removeClass("puls")
		}else{
			$(".iconAccout P span i").css({"background-position":"-274px -23px","display":"block"}).addClass("puls").removeClass("minus")
		};
		return false;
	});

	//登陆
	$(".loginbtn").click(function() {
		var name = $("#username").val();
		var password = $("login_password").val();
		$.post("http://47.104.244.134:8080/userlogin.do",{
			name:name,
			password:password}).done(function(data){
			if(data.code == 0){
				window.location.href = "index.html"
			}else{
				alert("登陆失败");
				return false;
			}
			});
		});
});