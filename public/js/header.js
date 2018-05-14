$(document).ready(function(){
	new Vue({
		el:".body",
		data:{
			username:""
		},
		mounted:function(){
			var token = localStorage.getItem("token");
			var username = localStorage.getItem("username")
			if (token==undefined||username==undefined) {
				return;
			}else{
				
				var that = this
				//console.log(token)
				$.ajax({
					url:"http://localhost:8082/mi/token",
					dataType:"json",
					type:"GET",
					headers:{
						token:token+"&&"+username
					},
					success:function(data){

						if (data.status==200) {
							that.username = username
							//console.log(that.username)
						}
					}
				})	
			}	
		}


	})

})