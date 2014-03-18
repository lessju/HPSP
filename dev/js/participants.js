$(document).ready(function() {
	$.ajax({
		type: "GET",
		url: "https://docs.google.com/spreadsheet/pub?key=0AldfGE7a-kvPdFlHQjFEdjdIbmJtdWZuX050M2tjVFE&single=true&gid=0&output=csv",
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
			lines.push(tarr);
			$(".gridtable").append('<tr><td>'+tarr[2]+' '+tarr[3]+' '+tarr[4]+'</td><td>'+tarr[28]+'</td><td>'+tarr[13]+'</td></tr>');		
		}
	}
 }