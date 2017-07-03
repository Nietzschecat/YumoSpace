/* thank-etc-ok.com */

$(document).ready(function() {
  /* Pop out if in iframe */
  if (window.location != window.parent.location) {
    top.location = self.location.href;
  }
  
  var isiOS = isItiOS();
  
  /* iOS CSS */
  if (isiOS) {
    $('body').addClass('ios');
  }
  
  /* Menu scroll animation */
  $('a').click(function() {
    var offset = 50;
    if ($(this).hasClass('no-offset')) offset = 0;
    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top - offset
    }, 1300, 'easeInOutExpo');
    return false;
  });
  
  var menuFixed = false;
  var currentSection = '';
  
  $(document).scroll(function() {
    /* Affix menu */
    var secondMenuY = $('div#title-container').offset().top + $('div#title-container').height();
  
    if ($(document).scrollTop() >= secondMenuY) {
      if (!menuFixed) {
        $('div#second-menu-container').addClass('fixed');
        $('div#second-menu-container').fadeIn();
        menuFixed = true;
      }
    } else {
      if (menuFixed) {
        $('div#second-menu-container').fadeOut(function() {
          $('div#second-menu-container').removeClass('fixed');
        });
        menuFixed = false;
      }
    }
    
    /* Parallax */
    if (!isiOS) {
      var y = -($(window).scrollTop() / 10);
      var coords = 'center '+ y + 'px';

      $('div#title-container').css({ backgroundPosition: 'center ' + y + 'px' });
      $('div#focus-container').css({ backgroundPosition: getFocusBackgroundReposition() + 'px ' + y + 'px' });
    }
    
    /* Menu highlight (TODO refactor (use data-* or class)) */
    if ($(document).scrollTop() < $('div#focus-container').offset().top - 50) {
      $('.focus').removeClass('focus');
    } else if ($(document).scrollTop() >= $('div#focus-container').offset().top - 50 && $(document).scrollTop() < $('div#story-container').offset().top - 50) {
      $('.focus').removeClass('focus');
      $('li#menu-focus a').addClass('focus');
    } else if ($(document).scrollTop() >= $('div#story-container').offset().top - 50 && $(document).scrollTop() < $('div#offer-container').offset().top - 50) {
      $('.focus').removeClass('focus');
      $('li#menu-offer a').addClass('focus');
    } else if ($(document).scrollTop() >= $('div#offer-container').offset().top - 50 && $(document).scrollTop() < $('div#team-top-container').offset().top - 50) {
      $('.focus').removeClass('focus');
      $('li#menu-story a').addClass('focus');
    } else if ($(document).scrollTop() >= $('div#contact-container').offset().top - 50 || $(window).scrollTop() + $(window).height() == $(document).height()  )  {
      $('.focus').removeClass('focus');
      $('li#menu-contact a').addClass('focus');
    } else if ($(document).scrollTop() >= $('div#team-top-container').offset().top - 50 && $(document).scrollTop() < $('div#contact-container').offset().top - 50) {
      $('.focus').removeClass('focus');
      $('li#menu-team a').addClass('focus');
    }
    
    /* Section highlight (TODO refactor (use data-* or class)) */
    if ($(document).scrollTop() < $('div#focus-container').offset().top - 50 && 
        currentSection !== '') {
      $('div#header-mobile-section span').fadeOut(function() {
        $('div#header-mobile-section span').html('Intro');
        $('div#header-mobile-section span').fadeIn();
      });
      currentSection = '';
    } else if ($(document).scrollTop() >= $('div#focus-container').offset().top - 50 && 
        $(document).scrollTop() < $('div#story-container').offset().top - 50 && 
        currentSection !== 'Focus') {
      $('div#header-mobile-section span').fadeOut(function() {
        $('div#header-mobile-section span').html('Focus');
        $('div#header-mobile-section span').fadeIn();
      });

      currentSection = 'Focus';
    } else if ($(document).scrollTop() >= $('div#story-container').offset().top - 50 && 
    $(document).scrollTop() < $('div#offer-container').offset().top - 50 && 
        currentSection !== 'Offer') {
      $('div#header-mobile-section span').fadeOut(function() {
        $('div#header-mobile-section span').html('Offer');
        $('div#header-mobile-section span').fadeIn();
      });
      currentSection = 'Offer';
    } else if ($(document).scrollTop() >= $('div#offer-container').offset().top - 50 && 
    $(document).scrollTop() < $('div#team-top-container').offset().top - 50 && 
        currentSection !== 'Story') {
      $('div#header-mobile-section span').fadeOut(function() {
        $('div#header-mobile-section span').html('Story');
        $('div#header-mobile-section span').fadeIn();
      });
      currentSection = 'Story';
    } else if ($(document).scrollTop() >= $('div#contact-container').offset().top - 50 || 
    $(window).scrollTop() + $(window).height() == $(document).height() && 
        currentSection !== 'Contact') {
      $('div#header-mobile-section span').fadeOut(function() {
        $('div#header-mobile-section span').html('Contact');
        $('div#header-mobile-section span').fadeIn();
      });
      currentSection = 'Contact';
    } else if ($(document).scrollTop() >= $('div#team-top-container').offset().top - 50 && 
    $(document).scrollTop() < $('div#contact-container').offset().top - 50 && 
        currentSection !== 'Team') {
      $('div#header-mobile-section span').fadeOut(function() {
        $('div#header-mobile-section span').html('Chiefs');
        $('div#header-mobile-section span').fadeIn();
      });
      currentSection = 'Team';
    }

  });
  
  /* Title digital effect */
  $('h1#title-text').digital('Yumo Space');
  $('h1#title-text-mobile-1').digital('Yumo');
  $('h1#title-text-mobile-2').digital('Space');
  
  /* Focus background fix */
  $(window).resize(function() {
    focusBackgroundReposition();
  });
  
  focusBackgroundReposition();
});

function focusBackgroundReposition() {
  var offset = -295;
  var newPosition = ($(window).width() / 2) + offset;
  $('div#focus-container').css({'background-position': newPosition + 'px top'});
}

function getFocusBackgroundReposition() {
  return ($(window).width() / 2) - 295;
}

function isItiOS(){
  return (
    /* Detect iPhone */
    (navigator.platform.indexOf("iPhone") != -1) ||
    /* Detect iPod */
    (navigator.platform.indexOf("iPod") != -1) ||
    /* Detect iPad */
    (navigator.platform.indexOf("iPad") != -1)
  );
}
