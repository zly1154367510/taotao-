$(document).ready(function(){
	$("#popUpCatSel").css("top", $(document).scrollTop()+20 )
	$("#header").load("http://localhost/shapping/public/header.html")
	$("#left").load("http://localhost/shapping/public/left.html")
	//vm.header.put("首页","http://localhost:8082/shapping/index/index.html")
	var indexVM = new Vue({
		el:"#body",
		data:{
			navBar:{
				'首页':'http://localhost:8082/shapping/index/index.html'
			},
			bigContentJson:"",
			miniContentJson:"",
			seckill:"",
			tbSeckiilItems:"",
			flag:false,
			serviceTime:'',
			userPosition:"",
			weather:""
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
				type:"get",
				data:{
					"position":"0"
				},
				success:function(res){
				//	console.log(res)
					if(res.status==200){
						that.seckill = res.data
						that.tbSeckiilItems = res.data.tbSeckiilItems
						//console.log(that.tbSeckiilItems)
					}
				}
			})

			$.ajax({
				url:"http://api.map.baidu.com/location/ip?ak=8FBYBsGUIWYhleaueG1ItNiyZ1iXMra6",
				dataType:"jsonp",
				type:"GET",
				async:false, 
				success:(res)=>{
					that.userPosition = res
					var city = that.userPosition.content.address_detail.city
					//var city = that.$options.methods.cityHandle(that.userPosition.content.address)
					url = "http://localhost:8082/weather/"+city
					$.ajax({
						url:url,
						dataType:"json",
						type:"GET",
						success:(res)=>{
							if(res.status == 200){
								that.weather = res.data
								console.log(that.weather)
							}else if(res.status == 401){
								alert(res.data)
							}
						},
						error:(data)=>{
							console.log("data")
						}
					})
					
				}
			})
			//console.log(that.userPosition)
			//alert("aaa")
			// var city = this.$options.methods.cityHandle(that.userPosition.content.address)
			// alert(city)
			
			this.flag = this.$options.methods.seckillStartJudgment(that.seckill,that.serviceTime)
		
			//console.log(this.$options.methods.seckillStartJudgment(that.seckill,that.serviceTime))

		},
		methods:{
			searhKeyword:function(){
				var keyword = $("#keyword").val();
				window.location.href="http://localhost:8082/shapping/item/item.html?cid="+keyword
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

			},
			initMap:function(){
				console.log("hahah")
				console.log(this.data.userPosition)
		
				var map = new BMap.Map("allmap");            // 创建Map实例
				var point = new BMap.Point(116.404, 39.915); // 创建点坐标
				map.centerAndZoom(point,15);                 
				map.enableScrollWheelZoom();   
			},
			cityHandle:function(position){
				var startIndex = position.indexOf("省")
				if(startIndex != -1){
					return position.slice(startIndex,len(position))
				}
			}
		}
	})
	
	
})