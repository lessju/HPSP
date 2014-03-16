	$(document).ready(function() {
		$.ajax({
			type: "GET",
			url: "https://docs.google.com/spreadsheet/pub?key=0Ap-gZOfxt1nodE9pc3ZLXzFKbVhSUmFfS3VseC1Cdmc&single=true&gid=0&output=csv",
			dataType: "text",
			success: function(data) {
				processData(data);
			}
		});

		$( ".menu" ).click(function() {
		  $( ".nav ul" ).toggleClass('nav-open');
		});
	});

	$(function() {
		setCountDown(0);
		$('.chart').easyPieChart({
			animate: 800,
			scaleColor: false,
			trackColor: 'rgba(116, 182, 64, 0.3)',
			barColor: 'rgba(116, 182, 64, 0.8)',
			lineWidth: 6,
			lineCap: 'butt',
			size: 95
		});

		window.setInterval(function() {
			setCountDown(1);
		}, 1000);
	});

	function setCountDown(update) {
		var date_future = new Date(2014, 09, 28, 08, 00, 00, 00);

			//set fixed time zone.
			var _userOffset = date_future.getTimezoneOffset()*60*1000; 
			var _centralOffset = -1*60*60*1000; 
			date_future = new Date(date_future.getTime() - _userOffset + _centralOffset);

			//get todays date.
			var date_now = new Date();

			// get total seconds between the times
			var delta = Math.abs(date_future - date_now) / 1000;

			// calculate (and subtract) whole days
			var days = Math.floor(delta / 86400);
			delta -= days * 86400;

			// calculate (and subtract) whole hours
			var hours = Math.floor(delta / 3600) % 24;
			delta -= hours * 3600;

			// calculate (and subtract) whole minutes
			var minutes = Math.floor(delta / 60) % 60;
			delta -= minutes * 60;

			// what's left is seconds
			var seconds = Math.floor(delta % 60);

			$('#days').html(days);
			var daysPercent = Math.round((360-days)/360 * 100);

			$('#hours').html(hours);
			var hoursPercent = Math.round((24-hours)/24 * 100);

			$('#minutes').html(minutes);
			var minutesPercent = Math.round((60-minutes)/60 * 100);

			$('#seconds').html(seconds);
			var secondsPercent = Math.round((60-seconds)/60 * 100);

			if (update){
				$('.days').data('easyPieChart').update(daysPercent);
				$('.hours').data('easyPieChart').update(hoursPercent);
				$('.mins').data('easyPieChart').update(minutesPercent);
				$('.secs').data('easyPieChart').update(secondsPercent);
			}else {
				$('.days').attr('data-percent', daysPercent);
				$('.hours').attr('data-percent', hoursPercent);
				$('.mins').attr('data-percent', minutesPercent);
				$('.secs').attr('data-percent', secondsPercent);
			}
		}

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
				}
			}
		    //alert(lines[lines.length-1]);
		}