var sessionLength = 25;
var breakLength = 5;
var audio = $("#clickSound")[0];
var alarm = $("#alarmSound")[0];
var startTime;
var currentTime;
var timeLeft;
var endTime;

$(document).ready(function() {
  $('button').on('click', function() {
    var buttonVal = $(this).attr("id");
    switch (buttonVal) {
      case "break-subtract":
        if (breakLength > 1) {
          breakLength--;
          $('#breakLength').text(breakLength + ':00');
        }
        break;
      case "break-add":
        breakLength++;
        $('#breakLength').text(breakLength + ':00');
        break;
      case "session-subtract":
        if (sessionLength > 1) {
          sessionLength--;
          $('#sessionLength').text(sessionLength + ':00');
        }
        break;
      case "session-add":
        sessionLength++;
        $('#sessionLength').text(sessionLength + ':00');
        break;
      case "begin-wrapper":
        beginSession();
      }
    });
});

function beginSession() {
  startTime = new Date();
  startTime = startTime.getTime();
  endTime = startTime + (sessionLength * 60000);
  var sessionInterval = setInterval(function() {
    currentTime = new Date ();
    currentTime = currentTime.getTime();
    timeLeft = endTime - currentTime;
    var minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    var seconds = Math.round((timeLeft / 1000) % 60);
    if (minutes < 1) {
      minutes = 0;
    }
    if (seconds == 0 && minutes < 1) {
      clearInterval(sessionInterval);
      seconds = "0" + seconds;
      alarmSound.play();
      beginBreak();
    } else if (seconds < 10 && minutes < 1) {
      audio.play();
      seconds = "0" + seconds;
    } else if (seconds < 10) {
      seconds = "0" + seconds; 
    }
    $('#bottom-text').text(minutes + ":" + seconds);
    $('#top-text').text("Break in: ")
  },1000);
}

function beginBreak() {
  startTime = new Date();
  startTime = startTime.getTime();
  endTime = startTime + (breakLength * 60000);
  
  var breakInterval = setInterval(function() {
    currentTime = new Date();
    currentTime = currentTime.getTime();
    timeLeft = endTime - currentTime;
    var minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    var seconds = Math.round((timeLeft / 1000) % 60);
    if (seconds < 1 && minutes < 1) {
      clearInterval(breakInterval);
      $('#top-text').text("Click to Begin");
      $('#bottom-text').text("0:00");
      alarm.play();
      return;
    } else if (seconds < 10) {
      seconds = "0" + seconds;
    }
    $('#bottom-text').text(minutes + ":" + seconds);
    $('#top-text').text("Break!");
  },1000);
}