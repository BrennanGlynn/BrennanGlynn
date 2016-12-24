
var possibleChannels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "summit1g", "brunofin", "brennanglyrn", "TheYungGuac", "ClintStevens"];

$(document).ready(function() {
  checkStatus(possibleChannels);
  $('#add').keydown(function(event) {
    if (event.keyCode == 13) {
      possibleChannels.push($("#add").val());
      checkStatus(possibleChannels);
      return false;
    }
  });
})

function checkStatus(array) {
  $(".twitchList").html("<div id=\"online\"></div><div id=\"offline\"></div><div id=\"404\"></div>");
  array.forEach(function(element) {
    $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + element + '?callback=?', function(json) {
    var url = "https://www.twitch.tv/" + element;
    
    if (json.status == 404) {
      $("#404").append('<a class=\"btn twitch offline\" href=\"https://www.twitch.tv/' + element + '\" target=\"_blank\">' + element + ' was not found</a><br>');
    } else if (json.stream == null) {
      $("#offline").append('<a class=\"btn twitch offline\" href=\"https://www.twitch.tv/' + element + '\" target=\"_blank\">' + element + ' is offline</a><br>');
    } else {
      //Add to online
      $("#online").append('<a class=\"btn twitch online\" href=\"https://www.twitch.tv/' + element + '\" target=\"_blank\">' + element + ' is streaming ' + json.stream.game + '</a><br>');
    }
  });
});
}

$("p").html(json);