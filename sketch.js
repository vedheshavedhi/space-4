var Background,bgImg;
var spaceship,spaceshipImg;
var edges;
var moonImg,moonG;
var enemyImg,enemyG;
var bImg;
var gameoverIgm,resetImg;
var PLAY= 1;
var END= 0;
var gameState= PLAY;
var score;

function preload(){
  bgImg = loadImage("bg.jpg");
  spaceshipImg = loadImage("ss.png");
  moonImg = loadImage("moon.png");
  enemyImg = loadImage("enemy.png");
  bImg = loadImage("bullet.png");
  gameoverImg = loadImage("gameover.png");
  resetImg = loadImage("reset.png");
}
function setup() {
  createCanvas(1200,1400);
 
  Background=createSprite(600,400);
  Background.addImage(bgImg);
  Background.velocityY = 4;

  spaceship = createSprite(600,1200);
  spaceship.addAnimation("space",spaceshipImg);
  spaceship.scale = 0.1;

  gameover = createSprite(600,500);
  gameover.addImage(gameoverImg);
  
  reset = createSprite(600,700);
  reset.addImage(resetImg);
  
 
  gameover.scale = 0.7;
  reset.scale = 0.7;

  score =0;
  
  moonG = new Group();
  enemyG = new Group();
  bulletG = new Group();
}

function draw() {
  background(0);
  if(Background.y > 1200 ){
    Background.y = height/2;
  }
  
  if(gameState === PLAY){

    gameover.visible = false;
    reset.visible = false;

  
  if(keyDown("left")){
    spaceship.velocityX = -5;
  }
  if(keyDown("right")){
    spaceship.velocityX = 5;
  }
 
  if(bulletG.isTouching(enemyG)){
    enemyG.destroyEach();
    bulletG.destroyEach();
    score = score+5;

  }

  if(bulletG.isTouching(moonG)){
gameState=END;
moonG.destroyEach();
  }

  if(enemyG.isTouching(spaceship)){
    gameState=END;
  }
   
  if(moonG.isTouching(spaceship)){
    
score = score+10;
  }
  edges= createEdgeSprites();
  spaceship.collide(edges);
  createMoon();
  createEnemy();
  createBullet();
  
} else if(gameState === END) {
  gameover.visible = true;
  reset.visible = true; 
  spaceship.visible=false;
  background.visible=false;

  if(mousePressedOver(reset)) {
    restart();
  }
}

drawSprites();
textSize(50);
  fill("white"); 
text("Score: "+ score, 50,50);
}

function restart(){
  gameState=PLAY;
  reset.visible=false;
  gameover.visible=false;
  enemyG.destroyEach();
  moonG.destroyEach();
  spaceship.visible=true;
  score=0;
}

function createMoon() {
  if (World.frameCount % 500 == 0) {
  var moon = createSprite(Math.round(random(100, 1000)),100, 100, 100);
  moon.addImage(moonImg);
  moon.scale=0.3;
  moon.velocityY = 5;
  moon.lifetime = 350;
  moonG.add(moon);
  }
  }

  function createEnemy() {
    if (World.frameCount % 100 == 0) {
    var enemy = createSprite(Math.round(random(90, 1100)),100, 100, 100);
    enemy.addImage(enemyImg);
    enemy.scale=0.4;
    enemy.velocityY = 5;
    enemy.lifetime = 350;
    enemyG.add(enemy);
    }
    }
   
    function createBullet(){
      if(keyWentDown("space")){
        var bullet = createSprite(spaceship.x,spaceship.y);
        bullet.addAnimation("b1",bImg);
        bullet.velocityY = -15;
        bulletG.add(bullet);
        bullet.scale=0.1;
      }
    }