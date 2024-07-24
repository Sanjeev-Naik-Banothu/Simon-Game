let level=0;
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer();
});


function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    setTimeout(function() {
      playSound(randomChosenColour);
    }, 300); // Adjust this timing if needed
    level++;
    $("#level-title").text(`Level ${level}`);
  }
  

function playSound(name){
    let audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(name){
    $("#" + name).addClass("pressed");
    setTimeout(function(){
        $("#" + name).removeClass("pressed");
    },100);
}

$(document).on('keydown', function(e) {
  if(level==0 && e.key=="a") nextSequence();
});

function startOver(){
  level=0;
  userClickedPattern=[];
  gamePattern=[];
  $(document).on('keydown', function() {
    if(level==0) nextSequence();
  });

}

function checkAnswer(){
  if(userClickedPattern[userClickedPattern.length-1]==gamePattern[userClickedPattern.length-1]){
    console.log("success");
    if(userClickedPattern.length==gamePattern.length){
      setTimeout(nextSequence(),200);
      userClickedPattern=[];
    }
  }
  else {
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over"),7000
    });
    let audio =new Audio("./sounds/wrong.mp3");
    audio.play();
    startOver();
    return ;
  }
}

