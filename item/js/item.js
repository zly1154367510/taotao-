$(document).ready(function(){
	$("#popUpCatSel").css("top", $(document).scrollTop()+20 )
	$("#header").load("http://localhost/shapping/public/header.html")
	$("#left").load("http://localhost/shapping/public/left.html")

	var vm = new Vue({
		el:"#body",
		data:{
			navBar:{
				'首页':'http://localhost/shapping/index/index.html',
				'商品列表':''
			},
			json:'',
			page:1,
			flag:false
		},
		mounted:function(){
			window.addEventListener('scroll',this.lazyLoad)
			var cid = this.getRequest()['cid']
			console.log(cid)
			if (cid != undefined) {
				var that = this
				$.ajax({
					url:"http://localhost:8082/item/"+cid+"/"+that.page,
					type:"GET",
					dataType:"json",
					success:function(data){
						that.json = data.data
						console.log(that.json)
					}
				})
			} 
			
			
		
		},
		methods:{
			getRequest:function(){
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
			lazyLoad:function(){
				var that = 	this
				that.flag = true
				if($(document).height() - $(document).scrollTop() - window.innerHeight <5&&that.flag) {
					that.flag == false
					var cid = this.getRequest()['cid']
					that.page+=1 
            		//console.log("触发了")
            		$.ajax({
            		url:"http://localhost:8082/item/"+cid+"/"+that.page,
					type:"GET",
					dataType:"json",
					success:function(data){

							for (var i = 0 ; i < data.data.length; i++) {
								that.json.push(data.data[i])
								
							}
							that.json.push({'title':'<h1>第'+that.page+'页</h1>'})
							console.log(that.page)
						}
            		})
        		}

			},
			itemDetalis:function(cid,id){
				window.location.href="http://localhost/shapping/item/itemDetalis.html?id="+id+"&cid="+cid
			}
		}
	});
	// $(document).scroll(function(){  
 //        if($(document).height() - $(document).scrollTop() - window.innerHeight <50) {  
 //            alert("到底部了")
 //        }  
       
 //    });  

})