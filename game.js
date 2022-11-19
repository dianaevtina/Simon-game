var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = []; // array of computer's sequence
var userClickedPattern = []; // array of user's clicks sequence
var level = 0;

// Function generates next button in computer sequence
function nextSequence(){
  var randomNumber = Math.round(Math.random()*3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
}

function animatePress(currentColour){
  $("." + currentColour).addClass("pressed");
  setTimeout(function(){
    $("." + currentColour).removeClass("pressed");
  },100);
}

function playSound(name){
  var name = new Audio('sounds/' + name + '.mp3');
  name.play();
}

// Detecting the keypress in the beginning and refreshing of the game
$(document).keypress(function() {
    if(level === 0) {
      nextSequence();
    }
});

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}

// Checking if user's clicked sequence is equal to computer's and no longer
function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
        userClickedPattern = [];
      },1000);
    }
  }
  else{
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },1000);
    startOver();
  }
}

// Detecting clicks on colored square buttons on the screen
$(".btn").click(function(event){
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
