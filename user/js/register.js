$(document).ready(function(){

	var loginVM = new Vue({
		el:".register-container",
		data:{
			paramError:""

		},
		mounted:function(){

		},
		methods:{
			checkParam:function(type){
				var that = this
				if (type==1) {
					var param = $(".username input").val();
				}else if(type==2){
					var param = $(".phone input").val();
				}else if(type==3){
					var param = $(".email input").val();
				}
				if (param != "") {
					$.ajax({
						url:"http://localhost:8082/checkParam/"+param+"/"+type,
						dataType:"json",
						type:"GET",
						contentType: "application/json",
						success:function(data){
							if (data.status==400) {
								that.paramError =data.data
								//console.log(that.paramError)
							}
						}
					})
				}
			},
			submit:function(){
				var that = this
				if ($(".username input").val()=="" ||$(".phone input").val()=="" ||$(".email input").val()=="" ||$(".password input").val()=="" ||$(".password1 input").val()=="" ) {
					that.paramError = "请完善注册表单内容"
				}else{
					if ($(".password input").val() != $(".password1 input").val()) {
						that.paramError = "两次输入密码不一致"
					}else{
						console.log("进入AJAX")
						$.ajax({
							url:"http://localhost:8082/register",
							dataType:"json",
							type:"POST",
							data:{
								"username":$(".username input").val(),
								"password":$(".password input").val(),
								"phone":$(".phone input").val(),
								"email":$(".email input").val(),

							},
							success:function(data){
								if (data.status==200) {
									alert("注册完成")
									window.location.href="http://localhost/shapping/user/login.html"
								}else if (data.status==400) {
									that.paramError="注册失败请重试"
								}
							}
						})
					}
				}
			}
		
		}
	})
})