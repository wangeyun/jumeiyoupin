$(function() {
	$("#closemaskbox").on("click",function(){
		$(".alert-box-mask").css("display","none");
	});
	$("#btn-register").click(function(){
			$("input").each(function(){
				if($(this).val()==""){
					alert("不能为空")
				}
			})
	});
	$("input").each(function(){
		$(this).change(function(){
			var index = $(this).index();
			$(this).next().show();
		})
	})
	// $("input").change(function(){
	// 	
	// })
})
