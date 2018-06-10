$(document).ready(function(){

	new Vue({
		el:".login",
		data:{

		},
		methods:{
			login:function(){
				$.ajax({
					url:"http://localhost:8082/login",
					dataType:"json",
					type:"POST",
					data:{
						"username":$(".username input").val(),
						"password":$(".password input").val(),
					},
					success:function(data){
					
						if (data.status==200) {
							if(data.data=="尚未激活"){
								alert("用户名未激活")
								return ;
							}
							localStorage.setItem('token', data.data);
							localStorage.setItem("username",$(".username input").val())
							window.location.href="http://localhost/shapping/index/index.html"
						}else if (data.status==400) {
							console.log(data.data)
							alert(data.msg)
						}
					}
				})
			},
			test:function(){
				
				var token = localStorage.getItem("token");
				var username = localStorage.getItem("username")
				if (token==undefined||username==undefined) {
					alert("你还未登录")
					return;
				}
				//console.log(token)
				$.ajax({
					url:"http://localhost:8082/mi/token",
					dataType:"json",
					type:"GET",
					headers:{
						token:token+"&&"+username
					},
					success:function(data){
						console.log(data)
					}
				})
			}
		}
	})
})