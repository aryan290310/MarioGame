var background_image;
var mario_image;
var mario_sprite;
var ground_sprite;
var game_state = "play";
var coin_sprite;
var coin_image;
var ob1_image;
var ob2_image;
var ob3_image;
var ob_group;
var cloud_group;
var score = 0;

function preload() {
  background_image = loadImage("backg.jpg");
  mario_image = loadAnimation("Capture1.png", "Capture3.png", "Capture4.png");
  coin_image = loadImage("coin.png");
  ob1_image = loadImage("obstacle1.png");
  ob2_image = loadImage("obstacle2.png");
  ob3_image = loadImage("obstacle3.png");
}

function setup() {
  createCanvas(600, 200);
  mario_sprite = createSprite(60, 140);
  mario_sprite.addAnimation("imageofmario", mario_image);
  mario_sprite.scale = 0.5;
  ground_sprite = createSprite(300, 170, 600, 10);
  ground_sprite.visible = false;
  ob_group = createGroup();
  coin_group = createGroup();
}

function draw() {
  background(background_image);
  textSize(25);
  text("Score=" + score, 500, 20);
  mario_sprite.collide(ground_sprite);
  if (game_state == "play") {
    spawn_coin();
    spawn_obstacles();
    if (keyDown("space") && mario_sprite.y > 100) {
      mario_sprite.velocityY = -12;
    }
    mario_sprite.velocityY = mario_sprite.velocityY + 1;
    if (mario_sprite.isTouching(ob_group)) {
      game_state = "end";
    }
    if (mario_sprite.isTouching(coin_group)) {
      score = score + 1;
      coin_group.destroyEach();
    }
  }
  if (game_state == "end") {
    coin_group.setVelocityXEach(0);
    ob_group.setVelocityXEach(0);
  }
  drawSprites();
}
function spawn_coin() {
  if (frameCount % 60 == 0) {
    coin_sprite = createSprite(570, 55);
    coin_sprite.addAnimation("imagecoin", coin_image);
    coin_sprite.scale = 0.2;
    coin_sprite.velocityX = -5;
    coin_group.add(coin_sprite);
  }
}

function spawn_obstacles() {
  if (frameCount % 60 == 0) {
    obstacle_sprite = createSprite(550, 150);
    obstacle_sprite.velocityX = -5;
    obstacle_sprite.scale = 0.15;
    ob_group.add(obstacle_sprite);

    var n = Math.round(random(1, 3));
    switch (n) {
      case 1:
        obstacle_sprite.addImage("obstacleimages", ob1_image);
        break;
      case 2:
        obstacle_sprite.addImage("obstacleimages", ob2_image);
        break;
      case 3:
        obstacle_sprite.addImage("obstacleimages", ob3_image);
        break;
    }
  }
}
