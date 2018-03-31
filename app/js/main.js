$(document).ready(function() {
  "use strict";
  // MixItUp Start
  mixitup('#mix-wrapper', {
    controls: {
      toggleLogic: 'and'
    },
    animation: {
      effects: 'fade rotateZ(-180deg)', 
      duration: 700 
    },
    classNames: {
      block: 'programs',
      elementFilter: 'btn',
      elementSort: 'sort-btn'
    },
    selectors: {
      target: '.mix-target',
      control: '[data-mixitup-control]'
    },
  });
  // MixItUp End
  // Smooth Scroll Start
  var navInneer = $(".scroll-nav");
  navInneer.singlePageNav({
    updateHash: false,
    filter: ":not(.external)",
    offset: 61,
    speed: 1000,
    currentClass: "sdm-active",
    easing: "swing"
  });
  $(".scroll-nav li a[href^='#']").on('click', function(e) {
    e.preventDefault();
    $('.scroll-nav li a').removeClass('sdm-active');
    $(this).addClass('sdm-active');
  });
  // Smooth Scroll End
  // Add header class on scroll Start
  var win = $(window);
  win.on('scroll',function() {    
    var scroll = win.scrollTop();
    if (scroll >= 400) {
      $(".scroll-nav").addClass("scroll-down");
    } else {
      $(".scroll-nav").removeClass("scroll-down");
    }
  }); 
  // Add header class on scroll End
  // preloader
  win.on('load', function() { 
    $('.sk-wave').fadeOut();
    $('#preloader').delay(350).fadeOut('slow'); 
  }); 
  // preload end
});
