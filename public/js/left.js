$(document).ready(function(){

	var vm = new Vue({
		el:".catSel",
		data:{
			data:"",
			sunData:"",
			sunData1:"",
			
		},
		mounted:function(){
			//console.log(this.header)
			var that = this;
			$.ajax({
					url:"http://localhost:8082/index",
					type:"GET",
					dataType:"json",
					success:function(data){
						if (data.status==200) {
							that.data = data.data
							//console.log(that.data)
						}
					}
				})
		},
		methods:{
			showSel:function(pid){
				var that = this
				
				$.ajax({
					url:"http://localhost:8082/sundata?pId="+pid,
					type:"GET",
					dataType:"json",
					success:function(data){
						if (data.status==200) {
							that.sunData = data.data
							//console.log(that.data)
						}
					}
				})
				//console.log(that.sunData)
				$("#popUpCatSel1").hide()
				$("#popUpCatSel").show()
			},
			hideSel:function(cid){
				//console.log(cid)
				window.location.href="http://localhost/shapping/item/item.html?cid="+cid
				$("#popUpCatSel").hide()
				$("#popUpCatSel1").hide()

			},
			showSel1:function(pId){
		
				var that = this
				
				$.ajax({
					url:"http://localhost:8082/sundata?pId="+pId,
					type:"GET",
					dataType:"json",
					success:function(data){
						if (data.status==200) {
							that.sunData1 = data.data
							//console.log(that.data)
						}
					}
				})
				//console.log(that.sunData1)
				$("#popUpCatSel1").show()
			},
			catSelHide:function(e){
				console.log("哈哈点到了")
				var target = $(e.target)
				if (!target.is('#popUpCatSel') && !target.is("#popUpCatSel")) {
					$('#popUpCatSel').hide();
					$("#popUpCatSel1").hide()

				}
			}

		}
	});
})