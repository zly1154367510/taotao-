$(document).ready(function(){
	$("#header").load("http://localhost/shapping/public/header.html")

	$('.nav').on("click",".paramKey",function(){
		console.log("我是变色方法")
		this.style.background="#CCCCCC"
	})
	
	
	var itemLeftVM = new Vue({
		el:"#left",
		data:{
			itemSimilarJson:""
		},
		mounted:function(){
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
			//ajax 请求相似推荐
			$.ajax({
				url:"http://localhost:8082/itemSimilar/"+theRequest['id'],
				dataType:'json',
				type:'GET',
				success:function(data){
					if (data.status==200) {
						that.itemSimilarJson = data.data
						//console.log(that.itemSimilarJson)
					}
				}
			})
		}
	})

	var itembodyVM = new Vue({
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
			itemSimilarJson:'',
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

			//ajax请求商品详情数据
			$.ajax({
				url:"http://localhost:8082/itemDetalis/"+theRequest['id'],
				dataType:"json",
				type:"GET",
				success:function(data){
					if (data.status==200) {
						that.itemJson = data.data
						console.log(that.itemJson)
					}
			
				}
			})
			//ajax请求商品属性分组数据
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
			},
			addShappingCar:function(){
				var that = this
				var token = localStorage.getItem("token");
				var username = localStorage.getItem("username")
				if (username == undefined) {
					alert("您还没有登录")
					return;
				}
				var num = parseInt($("#addShappingCarNum").val())
				if (num>parseInt($("#num").text())) {
					alert("加入购物车数量超过库存数量")
					return
				}
				
				if(num==undefined||num==""||isNaN(num)){
					num = 1
				}
				//console.log(num)
				var iId = that.getRequest()['id']
				$.ajax({
					url:"http://localhost:8082/mi/addShappingCar",
					dataType:"json",
					type:"POST",
					headers:{
						token:token+"&&"+username
					},
					data:{
						"username":username,
						"iId":iId,
						"num":num						
					},
					success:function(data){
						console.log(data)
						if (data.status==200) {
							alert("添加购物车成功")
						}else{
							alert("添加购物车失败")
						}
					}
				})
				//console.log(requests)
			}
		}
	})
})