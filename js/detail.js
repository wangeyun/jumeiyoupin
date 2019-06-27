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
	
var aa = location.search.split("=")[1];
		var str=""
		var srr=""
$.get("http://47.104.244.134:8080/goodsbyid.do",{id:aa},function(data){
	 var ali=$(".pop_new_main img").get()
	 //添加价格
	 for(var i=0;i<ali.length;i++){
		 ali[i].src=data.picurl
	}
	var pop=$(".pop img")[0]
	pop.src=data.picurl

	$(".breadcrumbs").html(data.name)
	$(".pop_detail_tit").html(data.name)
	$(".pop_detail_tita").html(data.info)
	str+=`
	<em class="yen" name="18.80">¥ </em>${data.price}
	`
	$(".price_now").html(str)
	$(".mall_koubei_rate").children("a").html(data.star)

//添加数量
 var inp=$(".buy_number").val()
 inp=Number(inp) 
 $(".number_reduce").click(function(){
	
	 if($(".buy_number").val()<=1){ 
	 	$(".buy_number").val(1)
		}
		else{
			inp-=1
			$(".buy_number").val(inp)
		}
 })
 $(".number_add").click(function(){
	 
 	 inp+=1
 	 if($(".buy_number").val()>=20){
		}
		else{
 	 	$(".buy_number").val(20)
 			$(".buy_number").val(inp)
 		}
 })
//添加购物车
console.log(data.id)
	var adc=$(".add_cart")
	srr+=`
	<input type="button" class="btn" data-id="${data.id}" value="加入购物车"/>
	`
	$(adc).html(srr)
	var abt=$(".btn")[0]
	var did=abt.getAttribute("data-id")
	$(".btn").click(function(){
	$.get("http://47.104.244.134:8080/cartsave.do",{gid:did,token:cooktk}).done(data=>{
		console.log(data)
		
		
})

//获取购物车列表

	$.get("http://47.104.244.134:8080/cartlist.do",{token:cooktk}).done(data=>{
		console.log(data)
		for(var i=0;i<data.length;i++){
			var odata=data[i]
			var odatag=odata.gid
			if(odatag==did){			
			var nums=$(".buy_number").val()
	$.get("http://47.104.244.134:8080/cartupdate.do",{id:odata.id,gid:did,num:0,token:cooktk}).done(data=>{
			
			console.log(data)
			
			})

 }
	}
})
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
	//放大镜
$(".mask").mouseover(function() {
    $(".float_layer").show()
    $(".big_box").show()
})
$(".mask").mouseout(function() {
    $(".float_layer").hide()
    $(".big_box").hide()
})

$(".mask").mousemove(function(e) {	
    var l = e.pageX - $(".small_box").offset().left - ($(".float_layer").width() / 2)
    var t = e.pageY - $(".small_box").offset().left -($(".float_layer").height())
    if (l < 0) {
        l = 0
    }
    if (l > $(this).width() - $(".float_layer").width()) {
        l = $(this).width() - $(".float_layer").width()
    }
    if (t < 0) {
        t = 0
    }
    if (t > $(this).height() - $(".float_layer").height()) {
        t = $(this).height() - $(".float_layer").height()
    }

    $(".float_layer").css({
        "left": l,
        "top": t
    })
    var pX = l / ($(".mask").width() - $(".float_layer").width())
    var pY = t / ($(".mask").height() - $(".float_layer").height())
    $(".big_box img").css({
        "left": -pX * ($(".big_box img").width() - $(".big_box").width()),
        "top": -pY * ($(".big_box img").height() - $(".big_box").height())
    })
})


		
	var aa = location.search.split("=")[1];
		var str=""
		var srr=""
$.get("http://47.104.244.134:8080/goodsbyid.do",{id:aa},function(data){
	 var ali=$(".pop_new_main img").get()
	 

//添加数量
 var inp=$(".buy_number").val()
 inp=Number(inp) 
 $(".number_reduce").click(function(){
	
	 if($(".buy_number").val()<=1){ 
	 	$(".buy_number").val(1)
		}
		else{
			inp-=1
			$(".buy_number").val(inp)
		}
 })
 $(".number_add").click(function(){
	 
 	 inp+=1
 	 if($(".buy_number").val()>=20){
		}
		else{
 	 	$(".buy_number").val(20)
 			$(".buy_number").val(inp)
 		}
 })

	

		})	

		
				
}) 
//底部 */
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
	

//放大镜
$(".mask").mouseover(function() {
    $(".float_layer").show()
    $(".big_box").show()
})
$(".mask").mouseout(function() {
    $(".float_layer").hide()
    $(".big_box").hide()
})

$(".mask").mousemove(function(e) {	
    var l = e.pageX - $(".small_box").offset().left - ($(".float_layer").width() / 2)
    var t = e.pageY - $(".small_box").offset().left -($(".float_layer").height())
    if (l < 0) {
        l = 0
    }
    if (l > $(this).width() - $(".float_layer").width()) {
        l = $(this).width() - $(".float_layer").width()
    }
    if (t < 0) {
        t = 0
    }
    if (t > $(this).height() - $(".float_layer").height()) {
        t = $(this).height() - $(".float_layer").height()
    }

    $(".float_layer").css({
        "left": l,
        "top": t
    })
    var pX = l / ($(".mask").width() - $(".float_layer").width())
    var pY = t / ($(".mask").height() - $(".float_layer").height())
    $(".big_box img").css({
        "left": -pX * ($(".big_box img").width() - $(".big_box").width()),
        "top": -pY * ($(".big_box img").height() - $(".big_box").height())
    })
var aa = location.search.split("=")[1];
		var str=""
		var srr=""
$.get("http://47.104.244.134:8080/goodsbyid.do",{id:aa},function(data){
	 var ali=$(".pop_new_main img").get()
	 //添加价格
	 for(var i=0;i<ali.length;i++){
		 ali[i].src=data.picurl
	}
	
	
//详情
	var pop=$(".pop img")[0]
	pop.src=data.picurl

	$(".breadcrumbs").html(data.name)
	$(".pop_detail_tit").html(data.name)
	$(".pop_detail_tita").html(data.info)
	str+=`
	<em class="yen" name="18.80">¥ </em>${data.price}
	`
	$(".price_now").html(str)
	$(".mall_koubei_rate").children("a").html(data.star)

//添加数量
 var inp=$(".buy_number").val()
 inp=Number(inp) 
 $(".number_reduce").click(function(){
	
	 if($(".buy_number").val()<=1){ 
	 	$(".buy_number").val(1)
		}
		else{
			inp-=1
			$(".buy_number").val(inp)
		}
 })
 $(".number_add").click(function(){
	 
 	 inp+=1
 	 if($(".buy_number").val()>=20){
		}
		else{
 	 	$(".buy_number").val(20)
 			$(".buy_number").val(inp)
 		}
 })

	var adc=$(".add_cart")
	srr+=`
	<input type="button" class="btn" data-id="${data.id}" value="加入购物车"/>
	`
	$(adc).html(srr)
})

})