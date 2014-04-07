$(document).ready(function() {
	$.ajax({
		type: "GET",
		url: "https://docs.google.com/spreadsheet/pub?key=0AldfGE7a-kvPdGZBVnE5dlRYT056YS1wbEI2bmpqYkE&output=csv",
		dataType: "text",
		success: function(data) {
			var results = processData(data);
			setTimeout(function(){
				$(".spinner").hide();
				$(".gridtable").fadeIn();
			},3000);
			
		}
	});
});


function processData(allText) {
	var allTextLines = allText.split(/\r\n|\n/);
	var headers = allTextLines[0].split(',');
	var lines = [];

	for (var i=1; i<allTextLines.length; i++) {
		var data = allTextLines[i].split(',');
		if (data.length == headers.length) {

			var tarr = [];
			for (var j=0; j<headers.length; j++) {
				tarr.push(data[j]);
			}
			var published = true;
			if (tarr[14] == ''){
				published = false;
			}
			lines.push(tarr);
			if(published == true){
				$(".gridtable").append('<tr><td>'+tarr[2]+' '+tarr[3]+ '</td><td>'+tarr[5]+'</td><td>'+tarr[9]+'</td></tr>');		
			}
		}
	}
 }