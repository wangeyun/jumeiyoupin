window.onload=function(){
	
	
	
	
	
	
	
	
	
 	//回到顶部
 $(function(){
 	$.get("http://47.104.244.134:8080/goodstypelist.do",{l:2}).done(data=>{
		console.log(data);
 	})
 	$.get("http://47.104.244.134:8080/goodsbytid.do",{
 		tid:13,
		page:1,
 		limit:10
 	}).done(data=>{
 		console.log(data);
 	})
 	$.get("http://47.104.244.134:8080/goodsbyid.do",{
 		id:5,
 	}).done(data=>{
 		console.log(data)
 	});
	
	
	
	
	
	
	
	
	
	
	
	})
}