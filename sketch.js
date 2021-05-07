var balloon,balloonImage1,balloonImage2;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(900, 600);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value",readPosition, showError)

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    rightPosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    rightPosition(1, 0);
    }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    rightPosition(0,-1);
    balloon.scale = 0.5;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    rightPosition(0, 1);
    balloon.scale = 0.2;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**USE ARROW KEYS TO MOVE HOT AIR BALLOON!**",40,40);
}

function rightPosition(x,y){
  database.ref('balloon/height').set({
      'x': height.x + x,
      'y': height.y + y,
  })
}

function readPosition(data){
  height = data.val();
  balloon.x = height.x
  balloon.y = height.y
}

function showError(){
  console.log("their is an error in the code")
}
