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
			}
		}
	})
		
	
})