$(function() {
	//弹框显示隐藏
	$("#closemaskbox").on("click",function(){
		$(".alert-box-mask").css("display","none");
	});
	//判断input text 不能为空
	$("#btn-register").click(function(){
			$("input").each(function(){
				if($(this).val()==""){
					alert("不能为空");
					return false;
				}
			})
	});
	// 点击提示显示
	$("input").each(function(){
		$(this).click(function(){
			$(this).next().show();
		})
		// $(this).focusout(function(){
		// 	$(this).next().css("display","none");
		// })
	})	;
	//随机验证码
	$("#getCHeckCode").click(function(){
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
			}
			$("input:nth-of-type(2)").val(randomnumber());
	});
	//判断密码
	$("input:nth-of-type(4)").change(function(){
		var tet = $("input:nth-of-type(4)").val();
		var reg= /^(\w){6,12}$/;
		var jc = reg.test(tet)
			if(jc == false){
			$("input:nth-of-type(4)").next().show();
			}
		});
	// 再次判断密码
	$("input:nth-of-type(5)").change(function(){
		var pss1 = $("input:nth-of-type(4)").val();
		var pas1 = $("input:nth-of-type(5)").val();
			if(pss1 != pas1){
				$("input:nth-of-type(5)").next().show();
			}
		});
		var uesrname =$("input:nth-of-type(1)").val();
		console.log(uesrname)
		var password =$("input:nth-of-type(5)").val();
		console.log(password)
	//提交注册，先验证数据库中是是否有相同的
	$("#btn-register").click(function(){
		var uesrname =$("input:nth-of-type(1)").val();
		var password =$("input:nth-of-type(5)").val();
		$.get("http://47.104.244.134:8080/username.do",{username:uesrname}).done(function(data){
			if(data.code == 0){
				console.log("aaa")
				alert("用户名已经注册");
			}else{
				//等待动画
				$("#loginitemone").show();
				$("#loginimg_one").show();
				$(".footer").hide();
			//没有重复，提交注册 
			$.post("http://47.104.244.134:8080/usersave.do",{
				username:uesrname,
				password:password,
				email:uesrname+"@163.com",
				sex:"女"
				},function(data){
					data = data.code;
					if(data == 0){
						window.location.href="login.html"
					}
				})
			};	
		});
	});	
})
//注册结束