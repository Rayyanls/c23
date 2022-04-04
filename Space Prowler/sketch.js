var space,rocket,star,diamond,meteor;
var spaceImg,rocketImg,starImg,diamondImg,meteorImg,gameOver,gameOverImg
var treasureCollection = 0;
var starG,diamondG,meteorGroup;

var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  spaceImg = loadImage("space.jpg");
  rocketImg = loadImage("rocket.png");
  starImg = loadImage("star.png");
  diamondImg = loadImage("diamond.png");
  meteorImg = loadImage("meteor.png");
  gameOverImg = loadImage("gameOver.png")
}

function setup(){
  
  createCanvas(400,600);
  
space=createSprite(219,700);
space.addImage(spaceImg);
space.velocityY = 4;
space.scale=0.3

rocket = createSprite(90,470,20,20);
rocket.addImage(rocketImg);
rocket.scale=0.26;
  


starG=new Group();
diamondG=new Group();
meteorGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  rocket.x = World.mouseX;
  
  edges= createEdgeSprites();
  rocket.collide(edges);
  
  if(space.y > 400 ){
    space.y = height/2;
  }
  
    createStar();
    createDiamond();
    createMeteor();

    if (starG.isTouching(rocket)) {
      starG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondG.isTouching(rocket)) {
      diamondG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }else{
      if(meteorGroup.isTouching(rocket)) {
        gameState=END;
       
        
        starG.destroyEach();
        diamondG.destroyEach();
        meteorGroup.destroyEach();
        
        starG.setVelocityYEach(0);
        diamondG.setVelocityYEach(0);
        meteorGroup.setVelocityYEach(0);

gameOver = createSprite(width/2,height/2- 50);
gameOver.addImage(gameOverImg)
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,10,30);
  }

}

function createStar() {
  if (World.frameCount % 200 == 0) {
  var star = createSprite(Math.round(random(50, 350),40, 10, 10));
  star.addImage(starImg);
  star.scale=0.12;
  star.velocityY = 3;
  star.lifetime = 150;
  starG.add(star);
  }
}

function createDiamond() {
  if (World.frameCount % 320 == 0) {
  var diamond = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamond.addImage(diamondImg);
  diamond.scale=0.03;
  diamond.velocityY = 3;
  diamond.lifetime = 150;
  diamondG.add(diamond);
}
}


function createMeteor(){
  if (World.frameCount % 530 == 0) {
  var meteor = createSprite(Math.round(random(50, 350),40, 10, 10));
  meteor.addImage(meteorImg);
  meteor.scale=0.2;
  meteor.velocityY = 3;
  meteor.lifetime = 150;
  meteorGroup.add(meteor);
  }
}
