var PLAY = 1;
var GAMEOVER = 0;
var gameState = 1;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var ground;
var forestbk;
var groundnon;
var gameOver

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  forestbkImage = loadImage("forestback.png");
  groundnonImage = loadImage("assest-1.png");
  gameOverImage = loadImage("game Over.png");
}



function setup() {
  createCanvas(600,300);
  monkey = createSprite(50,260,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(100,270,600,10);
  ground.x = ground.width/2;
  ground.visible = false;
  
  forestbk = createSprite(100,240,600,10);
  forestbk.x = forestbk.width/2;
  forestbk.addImage(forestbkImage);
  forestbk.depth = monkey.depth - 1;
  forestbk.velocityX = -4;
  forestbk.scale = 1.6;
  groundnon = createSprite(100,280,600,10);
  groundnon.x = groundnon.width/2;
  groundnon.addImage(groundnonImage);
  groundnon.depth = monkey.depth - 1;
  groundnon.velocityX = -4;
  groundnon.scale = 2.8;
  
  gameOver = createSprite(290,130);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.3;
  gameOver.visible = false;
  
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
}


function draw() {
  background("white");
  
  if(gameState === 1)
    {
       monkey.collide(ground);
      if(ground.x < 0)
        {
          ground.x = ground.width/2;
        }
      if(forestbk.x < 0)
        {
          forestbk.x = forestbk.width/2;
        }
      if(groundnon.x < 0)
        {
          groundnon.x = groundnon.width/2;
        }
      if(keyDown("space"))
        {
          monkey.velocityY = -12;
        }
      if(monkey.isTouching(FoodGroup))
        {
          FoodGroup.destroyEach();
          score = score + 2;
          monkey.scale = monkey.scale + 0.004;
        }
      if(monkey.isTouching(obstacleGroup))
        {
          if(frameCount%20 === 0)
            {
              monkey.scale = monkey.scale - 0.008;
            }
        }
  
      monkey.velocityY = monkey.velocityY + 1;
      spawnbanana();
      spawnobstacle();
      if(monkey.scale < 0.076)
        {
          gameState = 0;
        }
    }
  else if(gameState === 0)
    {
      monkey.velocityY = 0;
      FoodGroup.destroyEach();
      obstacleGroup.setLifetimeEach(-1);
      obstacleGroup.setVelocityXEach(0);
      forestbk.velocityX = 0;
      groundnon.velocityX = 0; 
      gameOver.visible = true;
      if(keyDown("space"))
        {
          reset();
        }
      
    }
  
  
  drawSprites();
  textSize(14);
  stroke("brown");
  fill("brown");
  text("Score : " + score,250,20);
}

function spawnbanana()
{
  if(frameCount%150 === 0)
    {
      banana = createSprite(600,Math.round(random(50,200)),20,20);
      banana.addImage(bananaImage);
      banana.scale = 0.1;
      banana.velocityX = -4;
      banana.lifetime = 150;
      
      FoodGroup.add(banana); 
    }
  
}

function spawnobstacle()
{
  if(frameCount%200 === 0)
    {
      obstacle = createSprite(600,250,20,20);
      obstacle.addImage("obstacle",obstacleImage);
      obstacle.scale = 0.13;
      obstacle.velocityX = -4;
      obstacle.lifetime = 150;
      
      obstacleGroup.add(obstacle);
    }
  
}

function reset()
{
  obstacleGroup.destroyEach();
  gameState = PLAY;
  obstacleGroup.setVelocityXEach(-4);
  FoodGroup.setVelocityXEach(-4);
  monkey.scale = 0.1;
  forestbk.velocityX = -4;
  groundnon.velocityX = -4;
  score = 0;
  gameOver.visible = false;
}


