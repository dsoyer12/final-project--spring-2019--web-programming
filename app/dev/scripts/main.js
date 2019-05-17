$(document).ready(function($) {
  // INITIATE THE FOOTER
siteFooter();
$('body').addClass('') ;
 $('footer').addClass("gif");
if(!is_touch_device() || $(window).width() > 700){
  $(".showcase-section-text a").addClass("black");
    $(window).on("scroll touchmove", function() {
      if ($(window).scrollTop() + $(window).height()-1 > $('.wrapper_main').outerHeight()) {
      $('body').addClass('tight');
      $('.arrow').hide();
    }
    else {
      $('body').removeClass('tight');
      $('.arrow').show();
    }

    if ($(document).scrollTop() > $("#scroll-point").position().top) {
              $(".skill").addClass("anima");
    }
      var navbar = $('.navbar');
      if($(window).scrollTop() <= 40){
        navbar.removeClass('navbar-scroll');
        $('.navbar').css('background', 'rgba(255, 255, 255, 0.0)')
      } else {
        navbar.addClass('navbar-scroll');
        $('.navbar').css('background', '#fff')
      }
        if ($(document).scrollTop() > $("#contact").position().top- 500) {
            $('.zind').css('background', $("#about").attr("data-color"));
            $('.border-change').css('border', '4px solid #fff');
            $('.navbar-scroll').css('background', $("#showcase").attr("data-color"))
            $('.nav-link').css('color', $("#about").attr("data-color"))
            $('.navbar-brand').css('color', $("#about").attr("data-color"))
            if($("nav ul li a").hasClass("white"))
              $("nav ul li a").removeClass("white");
            $("nav ul li a").addClass("black");
        }
        else if ($(document).scrollTop() > $("#showcase").position().top-500) {
            $('.zind').css('background', $("#showcase").attr("data-color"));
            $('.border-change').css('border', '4px solid #2b2b2b');
            $('.navbar-scroll').css('background', $("#about").attr("data-color"));
            $('.nav-link').css('color', $("#showcase").attr("data-color"))
            $('.navbar-brand').css('color', $("#showcase").attr("data-color"))
            if($("nav ul li a").hasClass("black"))
              $("nav ul li a").removeClass("black");
            $("nav ul li a").addClass("white");
        }
        else if ($(document).scrollTop() >= $("#about").position().top-500) {
            $('.zind').css('background', $("#about").attr("data-color"));
            $('.border-change').css('border', '4px solid #fff');
            $('.navbar-scroll').css('background', $("#showcase").attr("data-color"))
            $('.nav-link').css('color', $("#about").attr("data-color"))
            $('.navbar-brand').css('color', $("#about").attr("data-color"))
            if($("nav ul li a").hasClass("white"))
              $("nav ul li a").removeClass("white");
            $("nav ul li a").addClass("black");
        }
  
  });
}
else{
  $(window).on("scroll touchmove", function(){
       if($(document).scrollTop()  > $('body').height() - $("footer").position().top - 300) {
        $('footer').addClass("gif");
      }
      else
        $('footer').removeClass("gif");
  });
  var navbar = $('.navbar');
  navbar.addClass('navbar-scroll');
  $('.navbar').css('background', '#fff')
  $('.navbar a').css('color', '#000')
  $('.showcase-section-text h3').css('color', '#fff')
  $('.showcase-section-text a').css('color', '#fff')
  $(".showcase-section-text a").addClass("white");
}


function is_touch_device() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function(query) {
    return window.matchMedia(query).matches;
  }

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}


$(".navbar a").on('click', function(event) {
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();
      var hash = this.hash;
      $('html, body').animate({
        scrollTop: $(hash).offset().top-100
      }, 1200, function(){
      });
    }  // End if
  });

  //BACK TO PRESENTATION MODE
$("html").on("click", "body.tight .wrapper_main", function() {
    $('html, body').animate({
      scrollTop: $('.wrapper_main').outerHeight() - $(window).height()
    }, 1200);
  });
});


$('.arrow').click(function(){
   $("html").animate({ scrollTop: $('.wrapper_main').outerHeight()}, 1200);
});

$(window).on('load', function(){
  preloaderFadeOutTime = 500;
  function hidePreloader() {
    var preloader = $('.wrapper_pre');
      preloader.fadeOut(preloaderFadeOutTime,function() {
        $(this).remove();
      });
      $('body').css('overflow', 'auto')
    }
    hidePreloader();
});
  
function siteFooter() {
    var siteContent = $('.zind');
    var siteFooter = $('footer');
    var siteFooterHeight = siteFooter.height();
    siteContent.css({
      "margin-bottom" : siteFooterHeight + 49
    });
}

