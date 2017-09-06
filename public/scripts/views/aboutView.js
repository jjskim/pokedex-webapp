'use strict';

// hide Back button on page load
$( '#backButton' ).hide(10);

$('header a' ).on('click', function(e) {
  console.log('Home clicked');
  e.preventDefault();
  //
  $( '.carousel img' ).show('fast');
  $( '#faceClick1' ).show('fast');
  $( '#faceClick2' ).show('fast');
  $( '#faceClick3' ).show('fast');
  $( '#homeButton' ).show('fast');

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

  $( '#backButton' ).show('fast');
  $( '#face3Data' ).show('fast');
});
