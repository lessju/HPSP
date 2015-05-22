$('.form-row').position().top
$(function() {
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top)
        }, 1500, 'easeInOutExpo', function(){
            window.location.hash = $anchor.attr('href');
        });
        event.preventDefault();
    });
    
    mapPage();
});

function mapPage(){
  var height = $(window).height() - 80;
    $('section').css("min-height", (height+85) + "px");

    $('header').css("min-height", (height+80) + "px");

    if ($('.visible-xs').is(":visible") )
      $('.intro-text').css("margin-top", ((height-475)/2) + "px");
    else
      $('.intro-text').css("margin-top", ((height-590)/2) + "px");

    $('.contact-top').css("margin-top", ((height-530)/2) + "px");

    $('.overlay-reg').css("top", $('.form-row').position().top-100 + "px");
    $('.overlay-reg').width($('.form-row').width());
    $('.overlay-reg').height($('.form-row').height() + 10);
    
    
}

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

$( window ).resize(function() {
  mapPage();
});

$( document ).ready(function() {
  var hash = document.location.hash;

  if (hash === '#programme' || hash === '#register' || hash === '#contact')
    $(".module").addClass( "come-in" );

  $("#googleForm").submit(function(event) {
    // Cancels the form's submit action.
    
  });
});

function googleDone(){
   $('.overlay-reg').fadeIn();
  setTimeout(
    function() 
    {
      $('#entry_770927021').val('');
      $('#entry_505266734').val('');
      $('#entry_1978610795').val('');
      $('#entry_1160166267').val('');
      $('.btn-success').text('Thanks!');
      $('.overlay-reg').fadeOut();
    }, 5000);
  
}

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top',
    offset: 200
})

$(function(){
 $.fn.visible = function(partial) {

  var $t            = $(this),
  $w            = $(window),
  viewTop       = $w.scrollTop(),
  viewBottom    = viewTop + $w.height(),
  _top          = $t.offset().top,
  _bottom       = _top + $t.height(),
  compareTop    = partial === true ? _bottom : _top,
  compareBottom = partial === true ? _top : _bottom;

  return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

};

var win = $(window);

var allMods = $(".module");

allMods.each(function(i, el) {
  var el = $(el);
  if (el.visible(true)) {
    el.addClass("already-visible"); 
} 
});

win.scroll(function(event) {

  allMods.each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("come-in"); 
  } 
});

});
    //@ sourceURL=pen.js
});





