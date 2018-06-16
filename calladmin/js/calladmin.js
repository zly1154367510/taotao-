$(document).ready(function(){
	$("#header").load("http://localhost/shapping/public/header.html")


	var vm = new Vue({
		el:"#body",
		data:{
			navBar:{
				'首页':'http://localhost/shapping/index/index.html',
				'联系卖家':''
			},
			json:'',
			page:1,
			flag:false
		},
		mounted:function(){
		
		    var websocket = null;

		    //判断当前浏览器是否支持WebSocket
		    if ('WebSocket' in window) {
		        websocket = new WebSocket("ws://127.0.0.1:8089/sss/marco");
		        console.log(websocket)
		    }
		    else {
		        alert("对不起！你的浏览器不支持webSocket")
		    }

				    //连接发生错误的回调方法
		    websocket.onerror = function () {
		        
		        alert("error")
		    };

		    //连接成功建立的回调方法
		    websocket.onopen = function (event) {
		       
		        alert("successs")
		    };

		    //接收到消息的回调方法
		    websocket.onmessage = function (event) {
		        
		    };

		    //连接关闭的回调方法
		    websocket.onclose = function () {
		       
		    };

		    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，
		    // 防止连接还没断开就关闭窗口，server端会抛异常。
		    window.onbeforeunload = function () {
		        var is = confirm("确定关闭窗口？");
		        if (is){
		            websocket.close();
		        }
		    };


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
			}
		}
	});

})