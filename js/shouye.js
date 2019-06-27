window.onload=function(){
$(function(){
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
				 
	//购物车结算		
				var  zong=0
				if(data.length>=1){
					for(var i=0;i<data.length;i++){
						var did=data[i]

					$(did).each(function(i){	
					 $.get("http://47.104.244.134:8080/goodsbyid.do",{id:did.gid}).done(data=>{	
						
						 zong+=(data.price*did.count)
						  $(".total_price").html(zong)
							  console.log(zong)
					})
					})
					}
				
					$(".num_all").html(num)
					$(".cart_content_all").css({"display":"block"})
	
				}else{
					$(".cart_content_zero").css({"display":"block"})
				}
				})
				 
//今日上新
	$.get("http://47.104.244.134:8080/goodsbytid.do",{tid:13,page:1,limit:9}).done(data=>{
		
	var  data=data.data
	
		var str=""
		for(var i=0;i<data.length;i++){
		
		str+=`
		<li class="newdeal_box">
		
			<div class="img_box">
				<a href="detail.html?id=${data[i].id}"  class="img_box_href">
					<img alt="" src="http://p3.jmstatic.com/product/000/068/68578_std/68578_dx_1000_400.jpg" class="img_w1000"/>
				</a>
			</div>
			<a herf="#" target="_blank">
				<div class="today_new_detail">
					<p class="title"> 
						<span class="pink">【官方授权】</span>
						${data[i].name}
					</p>
					<div class="add_cart_box" style="display:none">
					<a  class="add_cart all_cart"  data-id="${data[i].id}"}>加入购物车</a>
				</div>
				</div>
			</a>
		</li>
		`
		}
		
		
				})
//今日必看
		$.get("http://47.104.244.134:8080/goodsbytid.do",{tid:"13",page:"1",limit:"5"}).done(data=>{
			var arr=$(".till")
			var agou=$(".goto_cart_wrap")
			var tul=$(".today_tab_link")
			var str=""
			var srr=""
			$(data.data).each(function(i){	
			
			str=`
			<a href="detail.html?id=${data.data[i].id}" target="_blank" class="product_short_title">
			${data.data[i].name}
				</a>
			`
			srr=`
			<input class="goto_btn goto_cart all_cart" data-id="${data.data[i].id}" value="加入购物车">
			`
			
			tul[i].href="detail.html?id="+(data.data[i].id)
			$(agou[i]).html(srr)
			$(arr[i]).html(str)
			
			
			})


			
		})
}else{
				str+=`
				<a href="login.html" rel="nofollow" >请登录</a>
				`
				$(".login").html(str)
				$(".cart_content_zero").html("还没有登录    请先登录哦！")
				$(".cart_content_zero").css({"display":"block"})
}	
//tab案例
$("li").click(function(e){
	
	$(this).addClass("current")
	
	$(this).siblings().removeClass("current")
	$(".tab_content").children().eq($(this).index()).css({"display":"block"}).siblings().css({"display":"none"})
	e.stopPropagation()
})
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


			

		
	
//今日必看
		$.get("http://47.104.244.134:8080/goodsbytid.do",{tid:"13",page:"1",limit:"5"}).done(data=>{
			var arr=$(".till")
			var agou=$(".goto_cart_wrap")
			var tul=$(".today_tab_link")
			var str=""
			var srr=""
			$(data.data).each(function(i){	
			
			str=`
			<a href="detail.html?id=${data.data[i].id}" target="_blank" class="product_short_title">
			${data.data[i].name}
				</a>
			`
			srr=`
			<input class="goto_btn goto_cart all_cart" data-id="${data.data[i].id}" value="加入购物车">
			`
			
			tul[i].href="detail.html?id="+(data.data[i].id)
			$(agou[i]).html(srr)
			$(arr[i]).html(str)
			
			})
			
		})	
//划过购物车显示
 $(".all_cart_wrap").css({"display":"none"})
$(".tab_box").children().mouseover(function(){
	$(this).find(".all_cart_wrap").css({"display":"block"})
})
$(".tab_box").children().mouseout(function(){
	$(this).find(".all_cart_wrap").css({"display":"none"})
}) 


//今日疯抢。明日预告
$(".home_ad_list").children().mouseover(function(){
	$(this).css({"opacity":".6"})
	
})
$(".home_ad_list").children().mouseout(function(){
	$(this).css({"opacity":"1"})
	
})
//楼梯
			
			var ali=[]
			ali.push(".nav_mustsee")
			ali.push(".nav_today_deals")
			if($(document).scrollTop()<=1700){
				$(".home_nav_bar").css({"display":"none"})
			}
			$(ali).each(function(a){
			$(ali[a]).click(function(){
			$(document).scrollTop(($(this).index()*770)+1000)
			$(this).children().css({"background":"#fe6397"}).end().siblings().children().css({"background":"#fff"})
			$(this).children().children().css({"color":"#fff"}).end().siblings().children().children().css({"color":"#939393"})
			})
			})
			$(window).scroll(function(){
				$(".home_nav_bar").css({"display":"none"})
				if($(document).scrollTop()>=1700&&$(document).scrollTop()<=3100){
				$(".home_nav_bar").css({"display":"block"})
				$(".home_nav_list").children().eq(0).children().css({"background":"#fe6397"}).end().siblings().children().css({"background":"#fff"})
				$(".home_nav_list").children().eq(0).children().css({"color":"#fff"})
				$(".home_nav_list").children().eq(1).children().children().css({"color":"#939393"})
				}
				else if($(document).scrollTop()>=3100&&$(document).scrollTop()<=5000){
				$(".home_nav_bar").css({"display":"block"})
				$(".home_nav_list").children().eq(1).children().css({"background":"#fe6397"}).end().siblings().children().css({"background":"#fff"})
				$(".home_nav_list").children().eq(1).children().children().css({"color":"#fff"})
				$(".home_nav_list").children().eq(0).children().children().css({"color":"#939393"})
				}
			})
			$(".btn_gotop").click(function(){
					$("body,html").animate({"scrollTop":0},1000)
					
					})

			
			
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

//倒计时
			var timer =setInterval(function dao(){
			var oDate1 = new Date()
			var oDate2=new Date("2019-9-15,19:59:00")
			 a=Math.abs(oDate1-oDate2)
			var s=a/1000
			var day=Math.floor(s/24/60/60)
			var hour=Math.floor(s/60/60%24)
			var minute=Math.floor(s/60%60)//			
			var seconds=Math.floor(s%60)
			$(".today_time").html(hour+":"+minute+":"+seconds)
			if(oDate2-oDate1<=0){
				box.innerHTML="停止"
				clearInterval(timer)
			}	
			},1000)

//今日上新
	$.get("http://47.104.244.134:8080/goodsbytid.do",{tid:13,page:1,limit:9}).done(data=>{
		console.log(data)
	var  data=data.data
	
		var str=""
		$(data).each(function(i){	
		
		str+=`
		<li class="newdeal_box">
		
			<div class="img_box">
				<a href="detail.html?id=${data[i].id}"  class="img_box_href">
					<img alt="" src="http://p3.jmstatic.com/product/000/068/68578_std/68578_dx_1000_400.jpg" class="img_w1000"/>
				</a>
			</div>
			<a herf="#" target="_blank">
				<div class="today_new_detail">
					<p class="title"> 
						<span class="pink">【官方授权】</span>
						${data[i].name}
					</p>
					<div class="add_cart_box" style="display:none">
					<a  class="add_cart all_cart"  data-id="${data[i].id}"}>加入购物车</a>
				</div>
				</div>
			</a>
		</li>
		`
		})
		
		$(".today_new_ul").html(str)

		

//购物车按钮显示
		var  lie=$(".today_new_ul").children()
		$(lie).each(function(){
		$(this).mouseover(function(){
			
			$(".add_cart_box").eq($(this).index()).css({"display":"block"})
		})
		$(this).mouseout(function(){
			$(".add_cart_box").eq($(this).index()).css({"display":"none"})
		})
		}) 
		
		
		var cook=document.cookie
		var cookn=cook.split(";")[0]
		var cookie=cookn.split("=")[1]
		var cookt=cook.split(";")[1]
		var cooktk=cookt.split("=")[1]

//添加购物车	
					var hgou=$(".goto_cart_wrap")
							
					for(let i=0;i<hgou.length;i++){
						var aa=hgou[i]
					
						$(aa).click(function(){
							
							var aa=$(this).children()[0]
							var did=aa.getAttribute("data-id")
								
							$.get("http://47.104.244.134:8080/cartsave.do",{gid:did,token:cooktk}).done(data=>{
								console.log(data)
							
								
								})
					
						})
					}
//添加购物车		
			var addg=$(".add_cart")
			console.log(addg)
			for(let i=0;i<addg.length;i++){
					var aa=addg[i]
					$(aa).click(function(){
						var did=this.getAttribute("data-id")
						$.get("http://47.104.244.134:8080/cartsave.do",{gid:did,token:cooktk}).done(data=>{
							console.log(data)
							
							})
					})
				}					
					

	})
	
})
}

