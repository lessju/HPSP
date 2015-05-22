$(document).ready(function() {
	menuHandler();
	$('.loader').on('webkitAnimationEnd animationend' , function(event){   
		$('.loader').hide();
	});	
	resizePage();
});

$( window ).resize(function() {
 	resizePage();

});

function resizePage(){
	// Check if navbox exists
	if ($('.nav-box').length)
		 $('.main-content').height($('.nav-box ul li:last-child').position().top + 200);
}

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