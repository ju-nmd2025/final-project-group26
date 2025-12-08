class Platform {
  constructor(x, y, w = 100, h = 20) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    push();
    fill(139, 69, 19);
    rect(this.x, this.y, this.width, this.height, 6);
    pop();
  }
}

class Character {
  constructor(x = 200, y = 300, w = 60, h = 60) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.velocity = 0; //movespeed
    this.gravity = 0.9;
    this.jumpStrength = 7;
  } 

  jump() {
    this.velocity -= this.jumpStrength;
  }

  draw() {
    push();
    fill(157, 73, 73);
    rect(this.x, this.y, this.width, this.height, 10);
    pop();
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (keyIsDown(LEFT_ARROW)) || keyIsDown(65) this.x -= this.velocity;
    if (keyIsDown(RIGHT_ARROW)) || keyIsDown(68) this.x += this.velocity;

    this.x = constrain(this.x, 0, 440 - this.w); // keep inside canvas
  }
}
// variables
let character;
let platforms = []; // empty platform array

function setup() {
  createCanvas(440, 600);
  character = new Character();

  let platformCount = 5;
  let gap = height / platformCount;
  for (let i = 1; i < 5; i++) {
    platforms.push(new Platform(random(width), height - i * gap));
  }
}
function initPlatforms() {
  platforms = [];
  let firstW = random(platformWidthRange[0], platformWidthRange[1]);
  platforms.push(
    neww Platform(random(0, canvasWidth, firstW), floor - 80, firstW,20
  ));
  for (let i = 1; i < platformCount; i++) {
    let w = random(platformWidthRange[0], platformWidthRange[1]);
    let x = random(0, canvasWidth - w);
    let y =
      platforms[i - 1].y - random(
        platformVerticalSpacing[0],
        platformVerticalSpacing[1]);
    platforms.push(new Platform(x, y, w, 20));
  }
}
function showStartScreen() {
   background(100, 160, 200);
  textSize(32);
  textStyle(BOLD);
  fill(255);
  text("hmm...", 40, 100);

  button = createButton("START 😎");
  button.position(170, 270);
  button.size(150, 70);
  button.style("font", "bold 26px verdana");
  button.style("border-radius", "15px");
  button.mousePressed(startGame);
}
function startGame() {
   gameStarted = true;
  gameOverState = false;
  platformsFalling = false;
  button.remove();
  character = new Character(200, 300, 60, 60);
  initPlatforms();
  loop();
}
function isOnAnyPlatform() {
   for (let plat of platforms) {
    const horizontallyAligned =
      character.x + character.w > plat.x && character.x < plat.x + plat.w;
    const verticallyAligned =
      character.y + character.h >= plat.y - tolerance &&
      character.y + character.h <= plat.y + tolerance;
    if (horizontallyAligned && verticallyAligned) return plat;
  }
  return null;
}
function gameOver() {
  gameOverState = true;
  noLoop();
  background(0);
  fill(255);
  textSize(28);
  textAlign(CENTER);
  text("you just lost the game (✿◡‿◡)", canvasWidth / 2, canvasHeight / 2);
  textSize(16);
  text("Press SPACE to restart", canvasWidth / 2, canvasHeight / 2 + 40);
}

function draw() {
  if (!gameStarted) return;
  background(155, 203, 45);

  if (gameOverState) {
    gameOver();
    return;
  }

  character.update(plaforms);
  for (let plat of platforms) {
    plat.draw();

  if (character.velocity < platforms[platforms.length - 1].y + 200) {
    platforms.push(new Platform(random(width), platforms[platforms-length - 1].y - gap));
  }

    let p = platforms[platforms.length - 1];
    platforms.push(new Platform(random(width), p.y - random(80, 120)));
  }
}

translate(0, width / 2 - doodler.y);

function keyPressed() {
  if (!gameStarted) return; // Ignore before game start, prevents restart

  if (gameOverState && keyCode === "32") { // game is over and spacebar restarts 
      startGame();
      return;
    }
  }

  //checking if floor deadly, y+h feet of character, tolerance few pixels of wiggle room
let onFloor = character.y + character.h >= floor - tolerance &&
character.y + character.h <= floor + tolerance;
let onPlatform = isOnAnyPlatform(); // cehcks platform collision

if (onFloor || onPlatform) {
  character.jump();
} // character on floor or platform jumpspeed, only jump trigger no mid air jump 
