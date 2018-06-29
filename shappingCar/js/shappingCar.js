$(function(){
	$("#header").load("http://193.112.37.64/shapping/public/header.html")



	// function actionAjax(id,num){
	// 	var token = localStorage.getItem("token");
	// 	var username = localStorage.getItem("username")
	// 	if (token == undefined || username == undefined) {
	// 		that.noLoginImg = "http://193.112.37.64/usertaotao/shapping/shappingCar/images/noLoginImg.png"
	// 		return;
	// 	}
 //    	$.ajax({
 //    		url:"http://193.112.37.64/usertaotao/mi/changShappingCarNum",
 //    		dataType:"json",
	// 		type:"GET",
	// 		headers:{
	// 				token:token+"&&"+username
	// 		},
	// 		data:{
	// 			"id":id,
	// 			"num":num
	// 		},
	// 		success:function(data){
	// 			console.log(data)
	// 		}
 //    	})
	// }
	

	var bodyVM = new Vue({
		el:"#body",
		data:{
			navBar:{
				'首页':'http://193.112.37.64/shapping/index/index.html',
				'购物车':'',
			},
			noLoginImg:"",
			shappingCarJson:"",
			payData:{},
			payItemNum:0,
			payPrice:"",
			payPrice1:"",
			couponJson:"",
			useCouponNum:0,
			index:0
		},
		mounted:function(){
			var that = this
			var token = localStorage.getItem("token");
			var username = localStorage.getItem("username")
			if (token == undefined || username == undefined) {
				that.noLoginImg = "http://193.112.37.64/shapping/shappingCar/images/noLoginImg.png"
				return;
			}
			that.noLoginImg = ""
			$.ajax({
				url:"http://193.112.37.64/usertaotao/mi/getShappingCar",
				dataType:"json",
				type:"GET",
				headers:{
						token:token+"&&"+username
				},
				data:{
					"username":username
				},
				success:function(data){
				//	console.log(data)
					if (data.data!=null) {
						that.shappingCarJson = data.data
					}else if(data.status==401){
						that.noLoginImg = "http://193.112.37.64/shapping/shappingCar/images/noLoginImg.png"
					}
				},
				error:function(){
					console.log("错误了")
				}
			})
			$.ajax({
				url:"http://193.112.37.64/usertaotao/mi/getCoupon",
				dataType:"json",
				type:"GET",
				headers:{
					token:token+"&&"+username
				},
				data:{
					"username":username
				},
				success:function(data){
					console.log(data)
					if(data.status == 200){
						that.couponJson = data.data
					}
				}
			})
			$(document).on("click",".redocu",function(){
				var startNum = parseInt($(this).prev().val())
				var id = $(this).attr("name")
				$(this).prev().val(startNum-1)
				that.actionAjax(id,startNum-1)
			})
			$(document).on("click",".add",function(){
				var startNum = parseInt($(this).next().val())
				$(this).next().val(startNum+1)
				var id = $(this).attr("name")
				that.actionAjax(id,startNum+1)
			})
		},
		methods:{
			addItem:function(num,price,id,e){
				
				var that = this
				if (e.currentTarget.checked==true) {
					var totalPrice = parseInt(num)*parseInt(price)
					that.payData[id] = totalPrice
					that.payItemNum += 1
				}
				else if(e.currentTarget.checked==false){
					that.payData[id] = null
					that.payItemNum -=1
				}
				var priceNum = 0
				for(var item in that.payData){
					if(that.payData[item]!=null){
						priceNum += parseInt(that.payData[item])
					}
				} 
				console.log(that.payData)
				that.payPrice = priceNum
				
			
			},
			actionAjax:function(id,num){
				var that = this
				var token = localStorage.getItem("token");
				var username = localStorage.getItem("username")
				if (token == undefined || username == undefined) {
					that.noLoginImg = "http://193.112.37.64/shapping/shappingCar/images/noLoginImg.png"
					return;
				}
		    	$.ajax({
		    		url:"http://193.112.37.64/usertaotao/mi/changShappingCarNum",
		    		dataType:"json",
					type:"GET",
					headers:{
							token:token+"&&"+username
					},
					data:{
						"id":id,
						"num":num
					},
					success:function(data){
						for(var i = 0;i<that.shappingCarJson.length;i++){
							if (that.shappingCarJson[i].id==id){
								that.shappingCarJson[i].num=num
								that.payData[that.shappingCarJson[i].id] = num *that.shappingCarJson[i].tbItem.price
								var priceNum = 0
								for(var item in that.payData){
									if(that.payData[item]!=null){
										priceNum += parseInt(that.payData[item])
										console.log(that.payData)
									}
								} 
								that.payPrice = priceNum
							}
						}
						//console.log(that.shappingCarJson)
					}
		    	})
			},
			subOrder:function(){
				$("#orderInput").toggle()
			},
			subOrderDo:function(){
				
				var that = this
				console.log(that.payData)
				var token = localStorage.getItem("token");
				var username = localStorage.getItem("username")
				var name = $("#name").val()
				var address = $("#adderss").val()
				var index = that.index
				console.log(that.index)
				if (name==undefined||address==undefined) {
					alert("请完善订单内容")
					return;
				}

				//that.payData
				$.ajax({
					url:"http://193.112.37.64/usertaotao/mi/addOrder",
					type:"POST",
					dataType:"json",
					data:{
						"patment":that.payPrice,
						"payData":JSON.stringify(that.payData),
						"name":name,
						"address":address,
						"username":username,
						"index":index
					},
					headers:{
						token:token+"&&"+username
					},
					success:function(data){
						if (data.status==200) {
							if (data.data!=0) {
								$("#orderInput").hide()
								alert("提交订单成功")
							}
						}else{
							alert("提交订单失败")
						}
					}
				})
			},
			useCoupon:function(index){
				console.log(this.couponJson[index])
				if(this.useCouponNum == 0){
					if(this.payPrice<this.couponJson[index].tbCoupon.condition){
						alert("未达到使用优惠券的条件")
						return ;
					}
					this.payPrice1 = this.payPrice
					this.payPrice -= this.couponJson[index].tbCoupon.discount
					this.useCouponNum += 1 
					this.index = this.couponJson[index].cId
					//console.log(this.payPrice)
				}else{
					this.payPrice = this.payPrice1
					this.payPrice -= this.couponJson[index].tbCoupon.discount
					this.index = this.couponJson[index].cId
					//console.log(this.payPrice)
				}
				
			}
		}
		
	})
})