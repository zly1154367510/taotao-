$(document).ready(function(){
	$("#popUpCatSel").css("top", $(document).scrollTop()+20 )
	$("#header").load("http://localhost/shapping/public/header.html")
	var indexVM = new Vue({
		el:"#body",
		data:{
			navBar:{
				'首页':'http://localhost/shapping/index/index.html',
				"秒杀":""
			},
			seckill:"",
			tbSeckiilItems:""
		},
		mounted:function(){
			var that = this
			//请求秒杀活动
			$.ajax({
				url:"http://localhost:8082/getSameDays",
				dataType:"json",
				type:"GET",
				data:{
					"position":"1"
				},
				async:false, 
				success:function(res){
					console.log(res)
					if(res.status==200){
						that.seckill = res.data
						that.tbSeckiilItems = res.data.tbSeckiilItems
						//console.log(that.tbSeckiilItems)
					}
				}
			})

		}
	})
})