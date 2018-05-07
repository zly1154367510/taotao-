$(document).ready(function(){
	$("#header").load("http://localhost/shapping/public/header.html")
	var vm = new Vue({
		el:".container-fluid",
		data:{
		},
		methods:{
			showSel:function(){
				//console.log('sss')
				$("#popUpCatSel").show()
			},
			hideSel:function(){
				$("#popUpCatSel").hide()
			}
		}
	});
})