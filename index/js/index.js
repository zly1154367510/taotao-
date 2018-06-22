$(document).ready(function(){
	$("#popUpCatSel").css("top", $(document).scrollTop()+20 )
	$("#header").load("http://localhost/shapping/public/header.html")
	$("#left").load("http://localhost/shapping/public/left.html")
	//vm.header.put("首页","http://localhost/shapping/index/index.html")
	var indexVM = new Vue({
		el:"#body",
		data:{
			navBar:{
				'首页':'http://localhost/shapping/index/index.html'
			},
			bigContentJson:"",
			miniContentJson:"",
			seckill:"",
			tbSeckiilItems:"",
			flag:false,
			serviceTime:''
		},
		mounted:function(){
			var that = this
			//AJAX请求巨屏轮番广告
			$.ajax({
				url:"http://localhost:8082/Content?cId=89",
				dataType:"json",
				type:"GET",
				success:function(data){
					//console.log(data)
					if (data.status==200) {
						that.bigContentJson = data.data
						//console.log(that.bigContentJson)
					}
				}
			})

			//ajxa请求小屏广告
			$.ajax({
				url:"http://localhost:8082/Content?cId=90",
				dataType:"json",
				type:"GET",
				success:function(data){
					//console.log(data)
					if (data.status==200) {
						that.miniContentJson = data.data
						//console.log(that.miniContentJson)
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

			//请求秒杀活动
			$.ajax({
				url:"http://localhost:8082/getSameDays",
				dataType:"json",
				type:"jsonp",
				data:{
					"position":"0"
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

			$.ajax({
				url:"http://api.map.baidu.com/location/ip?ak=8FBYBsGUIWYhleaueG1ItNiyZ1iXMra6",
				dataType:"json",
				type:"GET",
				success:(res)=>{
					console.log(res)
				}
			})
			this.flag = this.$options.methods.seckillStartJudgment(that.seckill,that.serviceTime)
			//console.log(this.$options.methods.seckillStartJudgment(that.seckill,that.serviceTime))

		},
		methods:{
			searhKeyword:function(){
				var keyword = $("#keyword").val();
				window.location.href="http://localhost/shapping/item/item.html?cid="+keyword
			},
			upMiniContent:function(){
				var top = $("#mini").offset().top-160
				var left = $("#mini").offset().left
				$("#mini").offset({top:top,left:left})
				console.log($("#mini").offset().top)
			},
			downMiniContent:function(){
				var top = $("#mini").offset().top+160
				var left = $("#mini").offset().left
				$("#mini").offset({top:top,left:left})
			},
			seckillStartJudgment:function(seckill,serviceTime){
				if(seckill.startTime<serviceTime && seckill.endTime>serviceTime){
					return true;
				}else{
					return false;
				}

			}
		}
	})
	
	
})