// To create for all the objects.
var trex, trex_image, ground, ground_image, invisible_ground;
var cloud_image, cloud;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gamestate ;
var cloud_group, obstacle_group;
var gameover, gameover_image;
var reset, reset_image;
var Jumpsound, CheckpointSound, Diesound;
var score=0;

//We are preloading the images and animation into computer's memory.
function preload(){
 trex_image=loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_image=loadImage("ground2.png");
  cloud_image=loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  gameover_image=loadImage("gameOver.png");
  reset_image=loadImage("restart.png");
  Jumpsound=loadSound("jump.mp3");
  CheckpointSound=loadSound("checkPoint.mp3");
  Diesound=loadSound("die.mp3")
  
}

//The executed the statement ones. 
function setup(){
  
  //var x=0;
  //x++
  
  //Canvas is created 
  createCanvas (600,400)
  
  //Creates trex in the canvas
  trex=createSprite(50,300,10,10);
  trex.addAnimation("Trex_running",trex_image);
  trex.scale=0.7; 
  trex.debug=false;
  trex.setCollider("circle",0,0,20);
  
  //Creates ground in the canvas
  ground=createSprite(200,325,10,10);
  ground.addImage("ground_running",ground_image);
  
  
  //The trex is standing on the invisible ground
  invisible_ground=createSprite(200,340,400,10);
  invisible_ground.visible=false;
  
   gamestate="start";
  cloud_group=new Group();
  obstacle_group=new Group();
  
  gameover=createSprite(300,200,10,0);
  gameover.addImage("gameover_running",gameover_image);
  gameover.scale=0.5;
  
  reset=createSprite(300,250,10,0);
  reset.addImage("reset_running",reset_image);
  reset.scale=0.5;
  
 }
 
//It executes the function everytime
function draw(){
  
  var quo =Math.round(score/500);
    console.log(quo)
    
    if(quo%2==0){
       background("white");
       }
    
    if(quo%2!=0){
       background("black");
      }
  
  if(gamestate=="start"){
     trex.pause();
    trex.x=50;
    trex.y=300;
    gameover.visible=false;
    reset.visible=false;
     }

  if(keyDown("space")&&gamestate=="start"){
     gamestate="play";
     }
  
  if(gamestate=="play") {
    trex.play();
    gameover.visible=false;
    reset.visible=false;
     //T-rex Jump when space is pressed & when trex is above the ground the space bar does not work.
  if(keyDown("space")&&trex.y>=302.1){
    trex.velocityY=-15;
    Jumpsound.play();
}
     //Gravity for T-rex 
  trex.velocityY=trex.velocityY+1;
    
    score=score+Math.round(frameRate()/60);
    
    
    
    //To make the T-rex collide with the ground
  trex.collide(invisible_ground);
    
    if(score>0&& score%100===0){
       CheckpointSound.play();
       }
    
    
   //The make the ground infinite 
    if(ground.x<0){
     ground.x=width/2;
     }
    
    
    ground.velocityX=-(8+score/500);
    spawnClouds();
  spawnObstacles();
     }
  
  if(obstacle_group.isTouching(trex)){
   Diesound.play();
    gamestate="End"; 
    //trex.velocityY=-10;
    //Jumpsound.play();
  }
  
  text("Score="+score,500,50);
  
  if(gamestate=="End"){
    gameover.visible=true;
    reset.visible=true;
     trex.pause();
    ground.velocityX=0;
    cloud_group.setVelocityXEach(0);
    obstacle_group.setVelocityXEach(0);
    trex.velocityX=0;
    trex.velocityY=0;                             
    obstacle_group.setLifetimeEach(-1);
    cloud_group.setLifetimeEach(-1);
    Diesound.stop();
     }
  
  if(mousePressedOver(reset)){
     reset.visible=false;
    gameover.visible=false;
    score=0;
    gamestate="start";
    obstacle_group.destroyEach();
    cloud_group.destroyEach();
     }
  
  
  
  
  //console.log("Riddhi "+ Math.round(random(1,100))+" Hande");
  
  //It draws the sprite in the canvas
  drawSprites();
}

function spawnClouds(){
if(frameCount%50==0) {
    cloud=createSprite(600,Math.round(random(1,250)));
  cloud.addImage("cloud_running",cloud_image);
  cloud.velocityX=-5;
  cloud.scale=0.5;
  trex.depth=cloud.depth+1;
  cloud.lifetime=120;
  cloud_group.add(cloud);
   }
}

function spawnObstacles(){
if(frameCount%60==0){
  obstacle=createSprite(600,300);
  obstacle.debug=false;
  obstacle.velocityX=-(10+score/500);
  obstacle.velocityY=0;
  obstacle.scale=0.7;
  obstacle_group.add(obstacle);
  switch(Math.round(random(1,6))){
    case 1:
      obstacle.addImage(obstacle1);
      break;
    case 2:
      obstacle.addImage(obstacle2);
      break;
    case 3:
      obstacle.addImage(obstacle3);
      break;
    case 4:
      obstacle.addImage(obstacle4);
      break;
    case 5:
      obstacle.addImage(obstacle5);
      break;
    case 6:
      obstacle.addImage(obstacle6); 
      break;    
  }  
  obstacle.lifetime=86;
  
}  
}