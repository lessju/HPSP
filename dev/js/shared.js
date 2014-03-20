$(document).ready(function() {
	menuHandler();
	$('.loader').on('webkitAnimationEnd animationend' , function(event){   
		$('.loader').hide();
	});
});

function menuHandler(){
	$( ".menu" ).click(function() {
		$( ".nav ul" ).toggleClass('nav-open');
		$( ".overlay" ).toggle();
	});

	$('html').click(function() {
		$( ".nav ul" ).removeClass('nav-open');
		$( ".overlay" ).hide();
	});

	$('.nav').click(function(event){
		event.stopPropagation();
	});
}