$(document).ready(function() {
	$( "#ss-form" ).submit(function( event ) {
	  $( ".registration-form" ).fadeOut();
	  $( ".registration-form" ).html('<center>Thanks for Registering!</center>').fadeIn();
	});
});
