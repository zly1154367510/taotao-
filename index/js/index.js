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
			tbSeckiilItems:""
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

			//请求秒杀活动
			$.ajax({
				url:"http://localhost:8082/getSameDays",
				dataType:"json",
				type:"GET",
				data:{
					"position":"0"
				},
				async:false, 
				success:function(res){
					//console.log(res)
					if(res.status==200){
						that.seckill = res.data
						that.tbSeckiilItems = res.data.tbSeckiilItems
						console.log(that.tbSeckiilItems)
					}
				}
			})

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
			}
		}
	})
		
	
})