$(function(){
	$("#header").load("http://localhost:8082/shapping/public/header.html")

	var orderVM = new Vue({
		el:"#body",
		data:{
			navBar:{
				'首页':'http://localhost:8082/shapping/index/index.html',
				'订单':'',
			},
			noLoginImg:"",
			orderJson:""
		},
		mounted:function(){
			var that = this
			var token = localStorage.getItem("token");
			var username = localStorage.getItem("username")
			if (token == undefined || username == undefined) {
				that.noLoginImg = "http://localhost:8082/shapping/shappingCar/images/noLoginImg.png"
				return;
			}
			$.ajax({
				url:"http://localhost:8082/mi/getOrder",
				dataType:"json",
				type:"GET",
				headers:{
					token:token+"&&"+username
				},
				data:{
					"username":username
				},
				success:function(data){
					console.log(data)
					if (data.status==200) {
						that.orderJson = data.data
						
					}else{
						that.noLoginImg = "http://localhost:8082/shapping/shappingCar/images/noLoginImg.png"
						return;
					}
				}
			})
		}
	})
})