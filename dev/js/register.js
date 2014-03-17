$(document).ready(function() {
	$( "#ss-form" ).submit(function( event ) {
	  $( ".registration-form" ).fadeOut();
	  $( ".registration-form" ).html('Thanks for Registering!').fadeIn();
	});
});
