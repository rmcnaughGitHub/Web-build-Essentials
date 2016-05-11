$(function (){

  'use strict';


	//DEFINE MODULE GLOBAL VARIABLES
	var time = 1,
  	scrollerOffset = 0,
    $scrolloc = $(window).scrollTop(),
    vid = $('.main-video'),
    thumbs = $('.thumbs'),
    overlay = $('.overlay'),
    fullImage = $('.full-image'),
    imageContainer = $('.image-container'),
    thumbsClose = $('.thumbs-close');

  ////DETECT WINDOW SIZE////
  var mobileSize = $(window).width() <= 667,
    tabletSize = $(window).width() >= 728,
    desktopSize = $(window).width() >= 900;


  //INTITIALIZE
  var init = function(){
    setupElements();
    console.log('RUNNNING ok');
  };


  //SETUP ELEMENTS
  var setupElements = function(){
    //FIRE FUCTIONS
    vidOne();//load iframe
  };


  ////VIDEOS////
  function vidOne() {
    if( mobileSize ){
      vid.html('<iframe src="https://player.vimeo.com/video/165614720" width="100%" height="310" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
    }else{
      vid.html('<iframe src="https://player.vimeo.com/video/165614720" width="100%" height="510" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
    }
  };
   

  function vidTwo() {
    if( mobileSize ){
     //
    }else{
      //
    }
  };

  ////LIGHTBOX////
  /**
   * Give each thumb its own index value (for next/prev functionality).
   */
  var idx = 0;
  thumbs.each(function() {
    $(this).data('idx', idx);
    idx++;
  });

  var showLightbox = function showLightbox(imgUrl, idx) {
    fullImage.css({
      'display': 'block',
      'background-image': 'url("' + imgUrl + '")'
    }).animate({opacity: 1}, 400);
    fullImage.data('idx', idx);
    //
    thumbsClose.css({
      'display': 'block'
    });
  };

  /**
   * Show lightbox when we click a thumbnail.
   */
  thumbs.click(function(e){
    var $this = $(this),
        imgUrl = $this.data('rel'),
        idx = $this.data('idx');
    overlay.css({
      'display': 'block'
    }).animate({opacity: .5}, 300);
    showLightbox(imgUrl, idx);
  });

  thumbs.mouseover(function(){
    $(this).stop().animate({opacity: .5}, 300);
  });
  thumbs.mouseout(function(){
    $(this).stop().animate({opacity: 1}, 300);
  });

  /**
   * Show next full image when we click lightbox image.
   */
  fullImage.click(function() {
    var idx = $(this).data('idx'),
        imgUrl;
    idx++;
    if (idx === thumbs.length) {
      idx = 0;
    }
    imgUrl = $(thumbs[idx]).data('rel');
    showLightbox(imgUrl, idx);
    console.log('LIGHTBOX CLICKED');
  });

  /**
   * Hide overlay and lighbox on click of overlay.
   */
   function closeLightBox(){
    overlay.css({
      'display': 'none',
      'opacity': '0'
    });
    fullImage.css({
      'display': 'none',
      'opacity': '0'
    });
    thumbsClose.css({
      'display': 'none'
    });
   };

  overlay.click(function() {
    closeLightBox();
  });
  thumbsClose.click(function() {
    closeLightBox();
    console.log('LIGHTBOX CLOSED ' + thumbsClose.css('z-index'));
  });

  ////DETECT USER SCROLL POSITION AND FIRE EVENTS////
  $(window).scroll(function(d, h){
  });

  init(); 

});

