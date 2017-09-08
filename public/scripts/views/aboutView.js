'use strict';

/************
/* running .gif resize on page .resize(); perhaps after the img.css...
/*    function needs to reset on page resize
/* fixed, full-page height boxes on the carousel section for clicking faces
/*    position: relative or absolute inside the carousel section
************/

// hide Back button on page load
$( '#backButton' ).hide();
$( '#face1Data' ).hide();
$( '#face2Data' ).hide();
$( '#face3Data' ).hide();

$('#backButton' ).on('click', function(e) {
  console.log('Home clicked');
  e.preventDefault();
  //
  $( '.carousel img' ).show('fast');
  $( '#faceClick1' ).show('fast');
  $( '#faceClick2' ).show('fast');
  $( '#faceClick3' ).show('fast');
  $( '#homeButton' ).show('fast');
  $( '.container' ).show('fast');

  $( '#backButton' ).hide('fast');
  $( '#face1Data' ).hide('fast');
  $( '#face2Data' ).hide('fast');
  $( '#face3Data' ).hide('fast');
});

$('#faceClick1' ).on('click', function(e) {
  console.log('Face 1 clicked');
  e.preventDefault();
  //
  $( '.carousel img' ).hide('fast');
  $( '#faceClick2' ).hide('fast');
  $( '#faceClick3' ).hide('fast');
  $( '.carousel p' ).hide('fast');
  $( '#homeButton' ).hide('fast');
  $( '.container' ).hide('fast');

  $( '#backButton' ).show('fast');
  $( '#face1Data' ).show('fast');
});

$('#faceClick2' ).on('click', function(e) {
  console.log('Face 2 clicked');
  e.preventDefault();
  //
  $( '.carousel img' ).hide('fast');
  $( '#faceClick1' ).hide('fast');
  $( '#faceClick3' ).hide('fast');
  $( '.carousel p' ).hide('fast');
  $( '#homeButton' ).hide('fast');
  $( '.container' ).hide('fast');

  $( '#backButton' ).show('fast');
  $( '#face2Data' ).show('fast');
});

$('#faceClick3' ).on('click', function(e) {
  console.log('Face 3 clicked');
  e.preventDefault();
  //
  $( '.carousel img' ).hide('fast');
  $( '#faceClick2' ).hide('fast');
  $( '#faceClick1' ).hide('fast');
  $( '.carousel p' ).hide('fast');
  $( '#homeButton' ).hide('fast');
  $( '.container' ).hide('fast');

  $( '#backButton' ).show('fast');
  $( '#face3Data' ).show('fast');
});

$(function() {
  var img = $("#animate"),
  width = img.get(0).width,
  screenWidth = $(window).width(),
  duration = 9000;

  function animatePlane() {
    img.css("left", -width).animate({
      "left": screenWidth
    }, duration, animatePlane);
  }
  animatePlane();
});
