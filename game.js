
var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];
// randomChosenColour = buttonColours[nextSequence()];
// gamePattern.push(randomChosenColour);

var game_start = false;
var level = 0;

function nextSequence(){
  var randomNumber = Math.floor((Math.random() * 4));
  return randomNumber;
}

function playSequence(sequence){
  for (let i in sequence) {
    console.log(sequence[i]);
    setTimeout(function(){
      playSound(sequence[i]);
      animatePress(sequence[i]);
    }, (1000 * i) + 1000);
  }
}

function nextLevel(){
  userClickedPattern = [];
  randomChosenColour = buttonColours[nextSequence()];
  gamePattern.push(randomChosenColour);
  level += 1;
  $("#level-title").text("Level " + level);
  console.log("gamePattern")
  console.log(gamePattern)
  playSequence(gamePattern);

}
function endGame(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  $("#level-title").text("GAME OVER, press A to restart");
  game_start = false;
  console.log("END GAME")
}

$("#level-title").click(function(){
  buttonTap();
	if (!game_start){
      $("#level-title").text("Level " + level);
      game_start = true;
      console.log("Game started");
      nextLevel();
      setTimeout(function(){animatePress(randomChosenColour);}, 1000);
  };
})

$(document).on("keypress", function(event){
  if (!game_start){
    if (event.key == "a"){
      $("#level-title").text("Level " + level);
      game_start = true;
      console.log("Game started");
      nextLevel();
      setTimeout(function(){animatePress(randomChosenColour);}, 1000);
      ;
    }
  }
})

function checkAnsver(currentLevel){
  numberOfUnswer = userClickedPattern.length
  console.log("level " + currentLevel + " " + "numberOfUnswer " + numberOfUnswer)
  if (currentLevel > numberOfUnswer){
    console.log(gamePattern[numberOfUnswer - 1] + " " + userClickedPattern[numberOfUnswer - 1])
    console.log(currentLevel + " " + numberOfUnswer)
    if (gamePattern[numberOfUnswer - 1] == userClickedPattern[numberOfUnswer - 1]){
      console.log("Succes")
      // nextLevel();
      // return true;
    } else {
      console.log("Wrong")
      wrongAnswer();
      endGame();
      // return false;
    }
  } else if (gamePattern[numberOfUnswer - 1] != userClickedPattern[numberOfUnswer - 1]) {
    wrongAnswer();
    endGame();
  } else {
    nextLevel();
  }
}

function animatePress(currentColour){
  $("." + currentColour).addClass("pressed");
  // .removeClass("pressed");
  // .delay(3000).removeClass("pressed");
  setTimeout(function(){$("." + currentColour).removeClass("pressed");}, 100);
}

function playSound(name) {
  var sound = new Audio("sounds/"+name+".mp3");
  sound.play();
}

// $(".btn").hover(function(){
//   console.log("HOVER IN");
// }, function(){
//   console.log("OUT");
// })

$(".btn").click(function(){
  if (game_start){
    animatePress(this.id);
    var userChosenColor=this.id;
    userClickedPattern.push(userChosenColor);
    console.log("userClickedPattern")
    console.log(userClickedPattern)
    // console.log(userChosenColor);
    // $("#level-title").text("Level " + level);
    checkAnsver(level)

    switch (this.id) {
      case "green":
        playSound("green")
        break;
      case "red":
        // console.log("sounds/"+this.id+"mp3");
        var sound = new Audio("sounds/"+this.id+".mp3");
        sound.play();
        break;
      case "yellow":
        // console.log("sounds/"+this.id+"mp3");
        var sound = new Audio("sounds/"+this.id+".mp3");
        sound.play();
        break;
      case "blue":
        // console.log("sounds/"+this.id+".mp3");
        var sound = new Audio("sounds/"+this.id+".mp3");
        sound.play();
        break;
      default:
        console.log("Not sound")
    }
  }
});



function wrongAnswer() {
  var sound = new Audio("sounds/wrong.mp3");
  $("body").addClass("wrong");
  setTimeout(function(){$("body").removeClass("wrong");}, 500);
  sound.play();
}

function buttonTap() {
  tg = window.Telegram.WebApp;
  tg.showScanQrPopup((scanText) => {
    console.log(scanText)
    return true;
  });
}
