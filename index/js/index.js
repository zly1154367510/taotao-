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
			bigContentJson:""
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
						console.log(that.bigContentJson)
					}
				}
			})

		},
		methods:{
			searhKeyword:function(){
				var keyword = $("#keyword").val();
				window.location.href="http://localhost/shapping/item/item.html?cid="+keyword
			}
		}
	})
		
	
})