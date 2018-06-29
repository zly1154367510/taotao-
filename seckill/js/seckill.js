$(document).ready(function(){
	$("#popUpCatSel").css("top", $(document).scrollTop()+20 )
	$("#header").load("http://localhost:8082/shapping/public/header.html")
	var indexVM = new Vue({
		el:"#body",
		data:{
			navBar:{
				'首页':'http://localhost:8082/shapping/index/index.html',
				"秒杀":""
			},
			seckill:"",
			tbSeckiilItems:"",
			msg:"",
			serviceTime:"",
			submitData:""
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
					console.log(res.data)
					if(res.status==200){
						if(res.data=="今天没有秒杀活动"){
							alert("今天没有秒杀活动")
							history.go(-1);
						}
						that.seckill = res.data
						//console.log(that.tbSeckiilItems)
					}
				}
			})

			//请服务器系统时间
			$.ajax({
				url:"http://localhost:8082/getServiceTime",
				dataType:"json",
				type:"GET",
				async:false, 
				success:function(res){
					if(res.status==200){
						that.serviceTime = res.data
					}
				}
			})

			this.seckill = this.$options.methods.seckillStartJudgment(that.seckill,that.serviceTime)
		},
		methods:{
			seckillStartJudgment:function(seckill,serviceTime){
				for(var i =0;i<seckill.length;i++){
					seckill[i].flag = (seckill[i].startTime<serviceTime&&seckill[i].endTime>serviceTime)
				}
				return seckill
			},
			purchase:function(id,price){
				console.log(price)
				var token = localStorage.getItem("token");
				var username = localStorage.getItem("username")
				if (token == undefined || username == undefined) {
					alert("尚未登陆")
					return;
				}
				$("#orderInput").toggle();
				$("[name='price']").attr("value",price)
				$("[name='id']").attr("value",id)
			},
			purchaseDo:function(){
				var token = localStorage.getItem("token");
				var username = localStorage.getItem("username")
				var name = $("#name").val()
				var address = $("#adderss").val()
				$.ajax({
					url:"http://localhost:8082/mi/submitOrder",
					dataType:"json00",
					type:"POST",
					headers:{
						token:token+"&&"+username
					},
					data:{
						"username":username,
						"id":$("[name='id']").attr("value"),
						"price":$("[name='price']").attr("value"),
						"name":name,
						"address":address
					},
					success:function(res){
						console.log(res)
						history.go(-1);
					},
					error:function(res){
						alert($.parseJSON(res.responseText).data)
					}
				})
			}
		}
	})
})