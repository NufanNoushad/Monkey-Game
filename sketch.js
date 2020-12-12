
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime=0

//Global variables
var ground,groundImage,invground,cloud,cloudImage
var trex ,trex_running,edges;
var PLAY=1; // constant variables
var END=0; // constant variables
var cactusGroup, cloudGroup;
var gameState=PLAY;
var trexCollided;
var gameoverImage;
var gameover;
var restartImage
var restart
var trexscore=0;
var jumpsound
var diesound
var checkpointsound

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup(){
  createCanvas(600,400)
  
  //create a trex sprite
  trex = createSprite(50,370,20,50);
  trex.addAnimation("running", monkey_running);
  //trex.addAnimation("collided",trexCollided);
  trex.scale=0.1;
  //shows the hidden sprite
  //trex.debug = true
  trex.setCollider('circle',0,0,50);
  
  ground=createSprite(300,390,600,20);
  trex.depth=ground.depth+1;
 // ground.addImage(groundImage);
  
  //Create invisible ground - to reduce the gap between t rex and ground
  //invground=createSprite(300,380,600,20);
  //invground.visible=false; // to make ground invisible
    
  //Create groups
  cactusGroup = new Group();
  cloudGroup= new Group();
  
}

function draw(){
  background(180);
  edges=createEdgeSprites();
  
  //collide with the edges
  trex.collide(ground);
  
if(gameState===PLAY) // checking if gameState is PLAY or END
  {
    //Making the trex jump
  if(keyDown('space') &&trex.y>300){
    
    trex.velocityY=-15;
    
    
  }
    //Move the ground
  //ground.velocityX=-(6+trexscore/100);
  
     //Add gravity
  trex.velocityY=trex.velocityY+1;
    
    //Score Calculation
  if(frameCount%5 === 0)
    {
  trexscore ++; // adding one point to trex score
    }
    
  //Infinite scrolling of the ground
  /*if(ground.x<0)
    {
      ground.x=800;
    }*/
    createClouds() ; //Create clouds
  createCactus() ; //Create cactus
  }
  else
    if(gameState===END)
      {
        //stop the ground and trex
        trex.velocityY=0;
        ground.velocityX=0;
        
        //change Animation to collided image
        //trex.changeAnimation("collided",trexCollided);
        
        //Stop the cactus and clouds from moving
        cactusGroup.setVelocityXEach(0); 
        cloudGroup.setVelocityXEach(0);
        
        //Make cactus and clouds stay when the game ends
        cloudGroup.setLifetimeEach(-1);
        cactusGroup.setLifetimeEach(-1);
        
 // gameover.visible=true;
   //     restart.visible=true;
      } 
  
  
//Adding two text or strings  - string concatenation
  //console.log("Nufan" + " is a good boy")
  
  
  
  if(trex.isTouching(cactusGroup)) // checking if trex is touching cactus
    {
      
      gameState=END; // assigning END value to gameState
    }
  
    if(trexscore>0 && trexscore%100===0){
    
  }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+trexscore,500,50);
  
  stroke("black");
  textSize(20)
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time:"+ survivalTime,100,50);
  
  
  drawSprites();

}
/*
5/2 --> division . 
ans : 2 --> quotient
1 ---> remainder
*/
//modulus ---> Operation which gives remainder of a divsion

/*
framecount = 60 ---> 1 cloud
framecount = 120 ---> 1+1 cloud
framecount = 180 ---> 1 + 1 + 1 cloud
*/
function createClouds()
{
  if(World.frameCount%60 === 0)
    {
  cloud=createSprite(600,Math.round(random(200,320)));
      cloudGroup.add(cloud); // add all clouds to one group
  cloud.addImage("cloud",bananaImage);
  cloud.velocityX=-6;
      cloud.scale=0.1
      trex.depth=cloud.depth+1
      
      // lifetime = length of the canvas / velocity (600/6)
      cloud.lifetime=100;
    }
  
}

function createCactus()
{
  if(World.frameCount%80 === 0)
    {
  obstacle=createSprite(600,370,20,20);
      cactusGroup.add(obstacle);// all the cactus are grouped together
  
     obstacle.addImage(obstacleImage);
  obstacle.velocityX=-(6+trexscore/100);
      obstacle.scale=0.1
            
      // lifetime = length of the canvas / velocity (600/6)
      obstacle.lifetime=100;
    }
  
}
