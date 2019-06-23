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
	$("input").change(function(){
		$("input+div").css("display","block");
	})
})
