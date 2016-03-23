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

  ////DETECT WINDOW SIZE////
  var mobileSize = $(window).width() <= 667,
  tabletSize = $(window).width() >= 728,
  desktopSize = $(window).width() >= 1200;


  //INTITIALIZE
  var init = function(){
    setupElements();
  };


  //FADE ANIMATION FDOR BANNER BOXES
  function fade() {
      $('.Any Class').each(function() {
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
    //FIRE FUCTIONS
    detectBrowser();//detect Mobile browser
    mouseEvents();//mouse events
    activatePhoneNumber();//activate phone numbers if mobile
    safariFix();//fix for safari hero header text crashing
    runAnimation()//runs aniomation
  };

  //LOCATE AND DETECT PAGES
  var pages = [
    'home',
    'about-veltassa',
    'about-high-potassium',
    'terms-of-use'
  ],
  somethingObj = {
    'home': 'Yo, I\'m home',
    'terms-of-use': 'No one reads this.'
  }
  determinePage = function(path) {
    var pieces = path.split('/'),
        l = pieces.length,
        // @NOTE: Hardcoding -2 seems a little magic.
        idx = pages.indexOf(pieces[l - 2]),
        ret = pages[0];
    console.log(pieces[l -1]);
    if (idx !== -1) {
      ret = pages[idx];
    }
    return ret;
  },
  page = determinePage(document.location.pathname);
  console.log(somethingObj[page]);

  ////DETECT USER AGENT
  var ua = navigator.userAgent,
  is_native_android = ((ua.indexOf('Mozilla/5.0') > -1 && ua.indexOf('Android ') > -1 && ua.indexOf('AppleWebKit') > -1) && (ua.indexOf('Version') > -1)),
  isChrome =  /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
  is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  ////SAFARI
  safariFix = function(){
    if( is_safari && desktopSize){
      //Do something
    }else{
      //Do something else
    }
  }

  ////Utility functions////
  smoothScroll = function(target, opts) {
    'use strict';
    var time = (opts && opts.time) ? opts.time : 800,
      easing = (opts && opts.easing) ? opts.easing : 'swing';
    if(target.constructor === jQuery) {
      $('body, html').animate({
        scrollTop: target.offset().top + scrollerOffset
      }, time, easing);
    }
  };

  ////SCROLL TO TOP OR ANYWHERE ELSE////
  function scrollToThere(target, Position){
    TweenLite.to(target, time - .3, {delay: 0, scrollTo: {y: Position}, ease:Expo.easeOut}, 0.2);
  }


  ////DETECT BROWSER AND RUN CODE ACCORDINGLY////
  function detectBrowser(){
    if( is_native_android ) {
      $veltassaTopNavText.css({'margin-top':'2px','font-size':'15px', 'line-height': '17px'});
      $veltassaTopNavTextHD.css({'font-size':'15px', 'line-height': '20px'});
      //if (isAndroid) alert("You are using Android!");
    }
    else if (isChrome){
      $veltassaTopNavText.css({'padding-top':'2px','font-size':'12px', 'line-height': '15px'});
      $veltassaTopNavTextHD.css({'font-size':'12px', 'line-height': '15px'});
      //if (isChrome) alert("You are using Chrome!");
    }
  }


  ////DETECT PHONE NUMBER AND ACTIVATE WHEN IN ANDROID MOBILE////
  function activatePhoneNumber(){
    if( is_native_android ) {
      $phoneNumber.each(function(){
        var number = $(this);

        var num = "<a href=tel:" + number.html() + ">"+ number.html()+"</a>";
        //alert(num);
        number.html(num);
      });

    }
  }


  ////MOUSE EVENTS////
  var mouseEvents = function(){

  };


  ////FOR VIDEO////
  /*/video timer detects progress -- sends to analytics
  vid.addEventListener('timeupdate', function() {
    var percent = Math.floor((100 / vid.duration) * vid.currentTime),
        currTime = Math.floor(vid.currentTime);

    console.log(currTime);
    if( percent in vidTrackingData && !vidTrackingData[percent + 'flag'] ){
      ga('send', 'event', 'Video', 'How to take VELTASSA', vidTrackingData[percent]);
      vidTrackingData[percent + 'flag'] = true;
      console.log(vidTrackingData[percent]);
    }
    if (currTime in vidTrackingDataDuration && !vidTrackingDataDuration[currTime + 'flag']) {
      ga('send', 'event', 'Video', 'How to take VELTASSA', 'Video Complete');
      console.log(vidTrackingDataDuration[currTime] + '2:01 FIRED');
      vidTrackingDataDuration[currTime + 'flag'] = true;
    }

  }, false);

  //Event listener to fire reset video function after end to show poster image
  vid.addEventListener("ended", resetVideo, false);

  ///VIDEO KEYS TO DETECT PROGRESS -- SEND TO ANALYTICS////
  var vidTrackingData = {
    '0' : '0%',
    '25' : '25%',
    '50' : '50%',
    '75' : '75%',
    '100' : '100%',

    '0flag' : false,
    '25flag' : false,
    '50flag' : false,
    '75flag' : false,
    '100flag' : false
  },
  vidTrackingDataDuration = {
    '121' : 'ISI',
    '121flag' : false
  };

  ///for Html
  <div class="veltassa-phase2-layout-vid">
    <video id="veltassa-video" controls poster="/patient/video/IFU_Screenshot.jpg" style="width:100%;height:100%;background-color:#000;" preload="auto">
      <source src="/patient/video/FINAL_PATIENT_1080p.mp4" type="video/mp4">
      <source src="/patient/video/FINAL_PATIENT_1080p_WEB.webm" type="video/webm">
    </video>
  </div>
///for Html End
  */


  ////DETECT USER SCROLL POSITION AND FIRE EVENTS////
  $(window).scroll(function(d, h){
    fade();
  });


  return {
    init: init
  };

})();

run.init(); //Run object
