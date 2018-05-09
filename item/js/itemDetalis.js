$(document).ready(function(){
	$("#header").load("http://localhost/shapping/public/header.html")


	var itemDetalisVM = new Vue({
		el:"#body",
		data:{
			navBar:{
				'首页':'http://localhost/shapping/index/index.html',
				'商品列表':'',
				'商品详情':''
			},
			itemJson:"",
			itemParamGroupJson:"",
			itemParamKey:"",
			itemParamValue:"",
			flag:false
		},
		mounted:function(){
			//为面包屑导航赋值
			var url = location.search; //获取url中"?"符后的字串 
			var theRequest = new Object(); 
			if (url.indexOf("?") != -1) { 
				var str = url.substr(1); 
				strs = str.split("&"); 
				for(var i = 0; i < strs.length; i ++) { 
					theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
				} 
			} 
			var that = this
			that.navBar['商品列表'] = 'http://localhost/shapping/item/item.html?cid='+theRequest['cid']

			//ajax请求服务数据
			$.ajax({
				url:"http://localhost:8082/itemDetalis/"+theRequest['id'],
				dataType:"json",
				type:"GET",
				success:function(data){
					if (data.status==200) {
						that.itemJson = data.data
						//console.log(that.itemJson)
					}
			
				}
			})
			$.ajax({
				url:"http://localhost:8082/itemParamGroup/"+theRequest['cid'],
				dataType:"json",
				type:"GET",
				success:function(data){
					if (data.status==200) {
						that.itemParamGroupJson = data.data
						//console.log(that.itemParamGroupJson)
					}
				}
			})
		},
		methods:{
			getRequest:function(){
				//console.log("chufalewo")
				var url = location.search; //获取url中"?"符后的字串 
				var theRequest = new Object(); 
				if (url.indexOf("?") != -1) { 
					var str = url.substr(1); 
					strs = str.split("&"); 
					for(var i = 0; i < strs.length; i ++) { 
						theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]); 
					} 
				} 
					return theRequest; 
			},
			requestParamValue:function(id){
				$("#removee").empty();
				var that = this
				that.flag = true
				$.ajax({
					url:"http://localhost:8082/itemParamKey/"+id,
					dataType:"json",
					type:"GET",
					success:function(data){
						if (data.status==200) {
							that.itemParamKey = data.data
							
						}
					}
				})
			}
		}
	})
})