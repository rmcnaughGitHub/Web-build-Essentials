/* jshint browser: true, jquery: true, unused: false, devel: true */
/* globals TweenLite, Power4, Quint, Expo */
var run = (function (){
  'use strict';

	//DEFINE MODULE GLOBAL VARIABLES
	var time = 1,
	scrollerOffset = 0;
  var $scrolloc = $(window).scrollTop();
  var $scrollTop = $('.header, .desktop').height();
  //for anchor scroll, Adjusted when header becomes fixed in mobile view


  //INTITIALIZE
  var init = function(){
    setupElements();
  };


  //FADE ANIMATION FDOR BANNER BOXES
  function fade() {
      $('.banner-box, .line').each(function() {
          /* Check the location of each desired element */
          var objectBottom = $(this).offset().top + $(this).outerHeight();
          var windowBottom = $(window).scrollTop() + $(window).innerHeight();

          if (objectBottom < windowBottom) { //object comes into view (scrolling down)
              $(this).animate({ marginTop: '0', opacity: 1}, 1200);
          }
          //console.log($(this).name + ' ' + $(this).css('opacity') );
      });
  }

  //SETUP ELEMENTS
  var setupElements = function(){
    var $bannerBox = $('.banner-box');
    $('.banner-box, .line').css
    ({'opacity':'0', 'marginTop':'+20px', 'display':'block'});
    fade(); //Fade in completely visible elements during page-load
  };


  ///MOUSE EVENTS////
  var mouseEvents = function(){

  };



  ////DETECT USER SCROLL POSITION AND FIRE EVENTS////
  $(window).scroll(function(d, h){
    fade();
  });


  return {
    init: init
  };

})();

run.init(); //Run object
