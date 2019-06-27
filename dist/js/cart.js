window.onload = function(){
	$(function(){
		var cook=document.cookie
		var cookn=cook.split(";")[0]
		var cookie=cookn.split("=")[1]
		var cookt=cook.split(";")[1]
		var cooktk=cookt.split("=")[1]
		console.log(cooktk)
		//获取购物车
		$.get("http://47.104.244.134:8080/cartlist.do",{token:cooktk}).done(function(data){
			console.log(data)
			var str="";
			$.each(data,function(i){
				str = `
				<li id ="${data[i].id}" class= "${data[i].gid}">
					<input class="chk" type = "checkbox"/>
					<img src = "${data[i].goods.picurl}"/>
					<span >${data[i].goods.name}价格:</span>
					<span class = "price">${data[i].goods.price}</span>
					<span  class= "banana">-</span>
					<input type="text" class="num" value="${data[i].count}"/>
					<span class= "ice">+</span>
					<span  class="perPrice">合计: <em class="heji"> ${data[i].count*data[i].goods.price} </em></span>
					<span  class="del">删除</span>	
				</li>
				`
				$("#cartlist").append(str);
			})
			
			
			//输入框数量
	
	var ainp=$(".num")
	var fpt=0
	for(var i=0;i<ainp.length;i++){
	var ap=ainp[i]
	
	$(ap).focus(function(){
		var inpt=$(this).val()
		fqt=inpt
	})
	
	$(ap).blur(function(){
		var heji=$(this).parent().children(".perPrice").children()
		var inpu=$(this).val()
		var nums=inpu-fqt
		if(nums!==0){
		var Id=parseInt($(this).parent().attr('id')) ;
		var Gid=parseInt($(this).parent().attr('class'));
		console.log(Id)
		$.get("http://47.104.244.134:8080/cartupdate.do",{id:Id,gid:Gid,num:nums,token:cooktk}).done(function(data){	
			})
		$.get("http://47.104.244.134:8080/cartlist.do",{token:cooktk}).done(function(data){
			$(data).each(function(i){
				var idd=data[i].gid
				var ID=data[i].id
			if(Id==ID){
				
				var a=i
				var zong=(data[a].goods.price*data[a].count)
				console.log(zong)
			   $(heji).html(zong)
			   
		}
			})
		})
		}
	})

}
//减号减少
 var jian=$(".banana")
 for(var i=0;i<jian.length;i++){
	 var aj=jian[i]
		$(aj).click(function(){
		var inpu=$(this).parent().children(".num")
		var heji=$(this).parent().children(".perPrice").children().text()
		var danjia=$(this).parent().children(".price").text()
		console.log(danjia)
		console.log(heji)
		var  inpt=$(inpu).val()
		inp=Number(inpt)
	 if($(inpu).val()<=1){ 
	 	$(inpu).val(1)
		$(this).parent().children(".perPrice").children().html(danjia)
		}
		else{
			inp-=1
			$(inpu).val(inp)
			console.log(inp*danjia)
			$(this).parent().children(".perPrice").children().html(inp*danjia)
		}
		var Id=parseInt($(this).parent().attr('id')) ;
		var Gid=parseInt($(this).parent().attr('class'));
	$.get("http://47.104.244.134:8080/cartupdate.do",{id:Id,gid:Gid,num:-1,token:cooktk}).done(function(data){
				console.log(data)
		})
		
 })
 }
 //加号添加
		  var jia=$(".ice")
		 for(var i=0;i<jia.length;i++){ 
			 var ajia=jia[i]
		 $(ajia).click(function(){
		
			 var heji=$(this).parent().children(".perPrice").children().text()
			 var danjia=$(this).parent().children(".price").text()
			 var inpu=$(this).parent().children(".num")
			 var  inpt=$(inpu).val()
			 inp=Number(inpt)
			 if($(inpu).val()>=20){
				}
				else{			
					inp+=1
				$(inpu).val(inp)
				$(this).parent().children(".perPrice").children().html(inp*danjia)
				}
				var Id=parseInt($(this).parent().attr('id')) ;
				var Gid=parseInt($(this).parent().attr('class'));
		 	$.get("http://47.104.244.134:8080/cartupdate.do",{id:Id,gid:Gid,num:1,token:cooktk}).done(function(data){
		 	
		 				console.log(data)
		 				
		 				
		 		})
				 })
		}	
			//
		//删除
			$(".del").click(function(){
				var Id=parseInt($(this).parent().attr('id')) ;
				var Gid=parseInt($(this).parent().attr('class'));
				$(this).parent().remove();
				$.get("http://47.104.244.134:8080/cartupdate.do",{id:Id,gid:Gid,num:0,token:cooktk}).done(function(data){
					console.log(data)
					
				})
				
				
			})
	//总价
			 $.get("http://47.104.244.134:8080/cartlist.do",{token:cooktk}).done(data=>{
				 var num=data.length
				 
	//购物车结算		
				var  zong=0
				if(data.length>=1){
					for(var i=0;i<data.length;i++){
						var did=data[i]

					$(did).each(function(i){	
					 $.get("http://47.104.244.134:8080/goodsbyid.do",{id:did.gid}).done(data=>{	
						
						 zong+=(data.price*did.count)
						
						  $("#totalPrice").html(zong)
					})
					})
					}
					$(".num_all").html(num)
					$(".cart_content_all").css({"display":"block"})
	
				}else{
					$(".cart_content_zero").css({"display":"block"})
				}
		
				})
				
				
				
				
			 $("#cart li").click(function(){
			 	var num = 0;
			 	$("input:checked").each(function(){
			 		num += Number($(this).next().next().next().next().next().next().next().children().text());
					console.log(num)
			 	})
			 	$("#totalPrice").text(num);
			 });
			 
			 
		});
		
		//正选反选 
		$("#checkAll").click(function(){
			$("li	 input").prop("checked",$(this).prop("checked"))
		})
		$("#checkOther").click(function(){
			$("li input").each(function(){
				$(this).prop("checked",!$(this).prop("checked"))
			})
		})
		$("li input").click(function(){
				
			if($("li input:checked").length == $("li input").length){
				$("#checkAll").prop("checked",true);
			}else{
				$("#checkAll").prop("checked",false);
			}
			
			
		});
		
		
		
		
		
		
		
		
		
		
		
		
		
	});
}