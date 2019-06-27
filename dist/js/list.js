window.onload = function() {
	$(function() {
//登录
var str=""
if(document.cookie){
	var cook=document.cookie
	var cookn=cook.split(";")[0]
	var cookie=cookn.split("=")[1]
	var cookt=cook.split(";")[1]
	var cooktk=cookt.split("=")[1]

		str+=`
		<a href="#" rel="nofollow" >${cookie}</a>
		`
		$(".login").html(str)
		$(".login").children().css({"color":"#ed155b"})
	
	
//购物车数量
			 $.get("http://47.104.244.134:8080/cartlist.do",{token:cooktk}).done(data=>{
				 var num=data.length
				 $(".cart_num").html(num)
				 console.log(data)
	//购物车结算		
				var  zong=0
				if(data.length>=1){
					for(var i=0;i<data.length;i++){
						var did=data[i]
						
					$(did).each(function(i){	
					 $.get("http://47.104.244.134:8080/goodsbyid.do",{id:did.gid}).done(data=>{	
						
						zong+=(data.price*did.count)
						  $(".total_price").html(zong)
					})
					})
					}
					$(".num_all").html(num)
					$(".cart_content_all").css({"display":"block"})
	
				}else{
					$(".cart_content_zero").css({"display":"block"})
				}
		
				})





	
	}else{	
				str+=`
				<a href="login.html" rel="nofollow" >请登录</a>
				`	
				$(".login").html(str)
				$(".cart_content_zero").css({"display":"block"})
				$(".cart_content_zero").html("还没有登录    请先登录哦！")
				
}	
//nav

		var aa=$(".channel_nav_list").children().children("a")
		$.get("http://47.104.244.134:8080/goodstypelist.do",{l:2}).done(data=>{
			for(let i=0;i<data.length;i++){	
				$(aa[i+1]).html(data[i].name)
	
			}	
		})
		

//二级
$.get("http://47.104.244.134:8080/goodsbytid.do",{tid:"13",page:"1",limit:"6"}).done(data=>{
		var aer=$(".mz_inner ").children().children("dt")
		for(let i=0;i<aer.length;i++){	
			$(aer[i]).html(data.data[i].typename)
		}	
		})
		
//三级
	$.get("http://47.104.244.134:8080/goodsbytid.do",{tid:"13",page:"1",limit:"10"}).done(data=>{
		var aar=$(".mz_inner ").children().eq(0)
		var aao=$(".mz_inner ").children().eq(1)
		var data=data.data
		var str=""
		for(let i=0;i<data.length;i++){	
			str+=`
			<dd>
			<a href="detail.html?id=${data[i].id}" target="_blank">${data[i].typename}</a>
			</dd>
			`
			
			}
			$(aar).html($(aar).html()+str)
			$(aao).html($(aao).html()+str)
			
	})



		//轮播
		$(".new_admall_content li").eq(0).fadeIn();
		clearInterval(timer);
		var i = 0;
		var timer = setInterval(function() {
			i++
			if (i == $(".new_admall_content li").length) {
				i = 0;
			};
			$(".new_admall_content li").eq(i).fadeIn().siblings().fadeOut();
			//左右角
			$(".new_admall_content").mouseenter(function(e) {
				e.stopPropagation();
				$("#bannerlist span").show();
				$("#bannerlist span:nth-of-type(1)").click(function(e) {
					e.stopPropagation();
					
				});
				$("#bannerlist span:nth-of-type(2)").click(function(e) {
					e.stopPropagation();
					
				})

			})
			$(".new_admall_content").mouseleave(function(e) {
				e.stopPropagation();
				$("#bannerlist span").hide();
			})



			//右下角边角	
			$(".new_admall_nav li").eq(i).addClass("select").siblings().removeClass("select");
		}, 2000);

		//获取1级菜单
		$.get("http://47.104.244.134:8080/goodstypelist.do", {
			l: 1
		}).done(data => {
			var aa = $(".new_admall_menu_li0")
			var str = "";
			for (let i = 0; i < 4; i++) {
				str =
					`
				<h3 class="new_admall_menu_title">
					<a href="#">${data[i].name}</a>
				</h3>
				<div  class="huadongliang" style="display:none">
					
				</div>
				`
				$(aa[i]).append(str);
			}


		});
		//	获取2级菜单
		$.get("http://47.104.244.134:8080/goodsbytid.do", {
			tid: 13,
			page: 1,
			limit: 5
		}).done(data => {
			
			var data = data.data;
			var str = "";
			$.each(data, function(sum) {
				str =
					`<p class="new_admall_menu_cont">
				<a href="#" data-id="${data[sum].id}" id = "${sum}">${data[sum].name}></a>
				</p>`
				$("#0").append(str);
			});
		});
		$.get("http://47.104.244.134:8080/goodsbytid.do", {
			tid: 13,
			page: 2,
			limit: 5
		}).done(data => {
			
			var data = data.data;
			var str = "";
			$.each(data, function(sum) {
				str =
					`<p class="new_admall_menu_cont">
				<a href="#" data-id="${data[sum].id} id = "${sum}">${data[sum].name}></a>
				</p>`
				$("#1").append(str);
			});
		});
		$.get("http://47.104.244.134:8080/goodsbytid.do", {
			tid: 13,
			page: 3,
			limit: 5
		}).done(data => {
			
			var data = data.data;
			var str = "";
			$.each(data, function(sum) {
				str =
					`<p class="new_admall_menu_cont">
				<a href="#" data-id="${data[sum].id} id = "${sum}">${data[sum].name}></a>
				</p>`
				$("#2").append(str);
			});
		});
		$.get("http://47.104.244.134:8080/goodsbytid.do", {
			tid: 13,
			page: 4,
			limit: 5
		}).done(data => {
			
			var data = data.data;
			var str = "";
			$.each(data, function(sum) {
				str =
					`<p class="new_admall_menu_cont">
				<a href="#" data-id="${data[sum].id} id = "${sum}">${data[sum].name}></a>
				</p>`
				$("#3").append(str);
			});
		});
		//二级显示 1
		$.get("http://47.104.244.134:8080/goodsbytid.do", {
			tid: 13,
			page: 1,
			limit: 5
		}).done(data => {
			var data = data.data;
			var str = "";
			$.each(data, function(sum) {
				str =
				`
				<h3 class="new_admall_menu_cont">
				<a href="#" data-id="${data[sum].id} id = "${sum}">${data[sum].name}></a>
				</h3>
				<p><a href="detail.html" data-id="${data[sum].id} id = "${sum}">
				 <img src="${data[sum].picurl}">
				</a></p>
				`
				$("#leftberrya").append(str);
			});
		});
		//二级显示 2
		$.get("http://47.104.244.134:8080/goodsbytid.do", {
			tid: 13,
			page: 2,
			limit: 5
		}).done(data => {
			var data = data.data;
			var str = "";
			$.each(data, function(sum) {
				str =
				`
				<h3 class="new_admall_menu_cont">
				<a href="#" data-id="${data[sum].id} id = "${sum}">${data[sum].name}></a>
				</h3>
				<p><a href="detail.html" data-id="${data[sum].id} id = "${sum}">
				 <img src="${data[sum].picurl}">
				</a></p>
					`
				$("#leftberryb").append(str);
			});
		});
		//二级显示 3
		$.get("http://47.104.244.134:8080/goodsbytid.do", {
			tid: 13,
			page: 3,
			limit: 5
		}).done(data => {
			var data = data.data;
			var str = "";
			$.each(data, function(sum) {
				str =
				`
				<h3 class="new_admall_menu_cont">
				<a href="#" data-id="${data[sum].id} id = "${sum}">${data[sum].name}></a>
				</h3>
				<p><a href="detail.html" data-id="${data[sum].id} id = "${sum}">
				 <img src="${data[sum].picurl}">
				</a></p>
					`
				$("#leftberryc").append(str);
			});
		});
		//二级显示 4	
		$.get("http://47.104.244.134:8080/goodsbytid.do", {
			tid: 13,
			page: 4,
			limit: 5
		}).done(data => {
			var data = data.data;
			var str = "";
			$.each(data, function(sum) {
				str =
				`
				<h3 class="new_admall_menu_cont">
				<a href="#" data-id="${data[sum].id} id = "${sum}">${data[sum].name}></a>
				</h3>
				<p><a href="detail.html" data-id="${data[sum].id} id = "${sum}">
				 <img src="${data[sum].picurl}">
				</a></p>
					`
				$("#leftberryd").append(str);
			});
		});
		// 滑动显示
		$(".mc_content").mousemove(function(e) {
			e.stopPropagation();
		});
		$(".new_admall_menu_content").find("li").mouseenter(function(e){
			e.stopPropagation();
			$(this).find("div").css("display","block").end().siblings().find("div").css("display","none")
		});
		$("body,html").mousemove(function(){
			$(".new_admall_menu_content").find("div").css("display","none");
		})
		
		//滑块下面图片
		$.get("http://47.104.244.134:8080/goodsbytid.do", {
			tid: 13,
			page: 1,
			limit:11,
		}).done(data => {
			console.log(data.data)
			var data = data.data;
			data.shift()
			console.log(data)
			var str = "";
			$.each(data, function(sum) {
				
					str =`
					<li><a href="detail.html?id=${data[sum].id}"  id = "${sum}">
					 <img src="${data[sum].picurl}">
					</a></li>
					`
					$("#tanxingbox ul").append(str);
				});
			
			$("#tanxingbox").find("img").mouseenter(function(e){
				e.stopPropagation()
				$(this).animate({height:'150px',width:'170px'},300).animate({height:'142px',width:'162px'},300)
				.end().siblings().stop().animate({height:'142px',width:'162px'},300)
			});
		});
			



		//导航
	
		$(".new_admall_menu_li0").mouseover(function() {
	
			$("#leftberrya").css("dispaly", "block");
		})
		$(".mc_content").mouseout(function() {
			// console.log("aa")
			$("#leftberrya").hide();
		});
		
		//图片晃动
		$(".left_tuijianAd").mouseenter(function(){
			$(".left_tuijianAd").animate({left:'10px'},300).animate({left:'-10px'},300)
		});
		
		$(".tuijianAd").mouseenter(function(){
			
			$(this).animate({left:'10px'},300).animate({left:'0px'},300)
		});
		//点击图片进入详情
		
//底部 
 	var $ali=$("#footer_links").children().children().has("a")
	$ali.mouseover(function(){
		$(this).children().stop()
		$(this).stop().animate({"padding-left":"20px"},500).siblings().stop().animate({"padding-left":"0px"},500);
		$(this).children().css({"color":"#fe6397"})
	})
	$ali.mouseout(function(){	
		$(this).animate({"padding-left":"0px"},500);
		$(this).children().css({"color":"#666"})
	})
		


	});
}
