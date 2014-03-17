$(document).ready(function() {
	menuHandler();
	$('.loader').on('webkitAnimationEnd animationend' , function(event){   
		$('.loader').hide();
	});
});

function menuHandler(){
	$( ".menu" ).click(function() {
		$( ".nav ul" ).toggleClass('nav-open');
	});

	$('html').click(function() {
		$( ".nav ul" ).removeClass('nav-open');
	});

	$('.nav').click(function(event){
		event.stopPropagation();
	});
}