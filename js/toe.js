var board = [null, null, null, null, null, null, null, null, null];
var winningMoves = [[0,1,2],[0,4,8],[0,3,6],[1,4,7],[2,4,6],[2,5,8],[3,4,5],[6,7,8]];
var player = "X";
var cpu = "O";

$(document).ready(function() {
  $("button").on("click", function() {
    if ($(this).attr("id") == "O") {
      player = "O";
      cpu = "X"
    }
    $("#splash").css("visibility", "hidden");
    $("#status").css("visibility", "hidden");
  });
  $(".block").on("click", function() {
    var blockValue = $(this).attr("id");
    if (board[blockValue] == null) {
      $(this).text(player);
      board[blockValue] = player;
      console.log(board);
      testForDraw();
      if (gameOver()) {
        $("#status").html("You Win");
        $("#status").css('visibility', 'visible');
        setTimeout(function() {reset();}, 2000);
      } else {
        cpuTurn();
        if (gameOver()) {
          $("#status").html("CPU Wins");
          $("#status").css('visibility', 'visible');
          setTimeout(function() {reset();}, 2000);
        }
      }
    }
  });
});

function cpuTurn() {
  var openSlots = [];
  for (var i in board) {
    if (board[i] == null) {
      openSlots.push(i);
    }
  }
  var randomBlock = openSlots[Math.floor(Math.random() * openSlots.length)];
  board[randomBlock] = "cpu";
  $("#" + randomBlock).text(cpu);
}

function gameOver() {
  for (var i in winningMoves) {
    var testSelection = [];
    for (var j in winningMoves[i]) {
      testSelection.push(board[winningMoves[i][j]]);
    }
    if (testSelection[0] == testSelection[1] && testSelection[1] == testSelection[2] && testSelection[2] != null) {
      return true;
    }
  }
  testForDraw();
  return false;
}

function testForDraw() {
    var counter = 0;
    for (var i in board) {
      if (board[i] == null){
        counter++;
     }
    }
    if (counter == 0) {
      $("#status").html("Draw");
      $("#status").css('visibility', 'visible');
      setTimeout(function() {reset();}, 2000);
    } 
}

function reset() {
  board = [null, null, null, null, null, null, null, null, null];
  $(".block").text("");
  $("#status").text("Pick your poison");
  $("#splash").css("visibility", "");
}

Array.prototype.allValuesSame = function() {
  for(var i = 1; i < this.length; i++)
  {
    if(this[i] !== this[0])
      return false;
  }
  return true;
}