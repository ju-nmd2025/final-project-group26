class Character {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.vy = 0;
    this.gravity = 1;
  }

  draw() {
    push();
    fill(157, 73, 73);
    rect(this.x, this.y, this.w, this.h, 10);
    pop();
  }
}

let canvasWidth = 440;
let canvasHeight = 600;
let floor = 530;
let character = new Character(175, 50, 50, 50);

const moveSpeed = 5;
const jumpSpeed = -15;
const tolerance = 5;
const platformFallSpeed = 1;

let gameStarted = false;
let button;

let platforms = [];
const platformCount = 5;
const platformWidthRange = [60, 120];
const platformVerticalSpacing = [80, 150];

function initPlatforms() {
  platforms = [];
  // First platform near floor
  let firstW = random(platformWidthRange[0], platformWidthRange[1]);
  platforms.push({
    x: random(0, canvasWidth - firstW),
    y: floor - 80,
    w: firstW,
    h: 20,
  });

  for (let i = 1; i < platformCount; i++) {
    let w = random(platformWidthRange[0], platformWidthRange[1]);
    let x = random(0, canvasWidth - w);
    let y =
      platforms[i - 1].y -
      random(platformVerticalSpacing[0], platformVerticalSpacing[1]);
    platforms.push({ x, y, w, h: 20 });
  }
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

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  showStartScreen();
}

function showStartScreen() {
  background(100, 160, 200);
  textSize(32);
  textStyle(BOLD);
  fill(255);
  text("hmm...", 40, 100);

  button = createButton("START😎");
  button.position(170, 270);
  button.size(150, 70);
  button.style("font", "bold 26px verdana");
  button.style("border-radius", 10);
  button.mousePressed(startGame);
}

function startGame() {
  gameStarted = true;
  button.remove();
  initPlatforms();
}

let platformsFalling = false;

function draw() {
  if (!gameStarted) return;

  background(100, 160, 200);

  // Horizontal movement
  if (keyIsDown(65)) character.x -= moveSpeed;
  if (keyIsDown(68)) character.x += moveSpeed;
  character.x = constrain(character.x, 0, canvasWidth - character.w);

  character.y += character.vy;
  character.vy += character.gravity;

  if (character.y + character.h > floor) {
    character.y = floor - character.h;
    character.vy = 0;
  }

  let standingPlat = isOnAnyPlatform();
  if (character.vy > 0 && standingPlat) {
    character.y = standingPlat.y - character.h;
    character.vy = 0;
    platformsFalling = true;
  }

  if (platformsFalling) {
    for (let plat of platforms) {
      plat.y += platformFallSpeed;

      if (plat.y > canvasHeight) {
        plat.w = random(platformWidthRange[0], platformWidthRange[1]);
        plat.x = random(0, canvasWidth - plat.w);
        plat.y = -random(
          platformVerticalSpacing[0],
          platformVerticalSpacing[1]
        );
      }
    }
  }

  for (let plat of platforms) {
    push();
    fill(105, 70, 30);
    rect(plat.x, plat.y, plat.w, plat.h, 6);
    pop();
  }

  character.draw();

  stroke(0);
  line(0, floor, canvasWidth, floor);

  // Game over if fall
  if (character.y > canvasHeight) {
    background(0);
    fill(255);
    textSize(32);
    textAlign(CENTER);
    text("you just lost the game (✿◡‿◡)", canvasWidth / 2, canvasHeight / 2);
    noLoop();
  }
}

function keyPressed() {
  if (!gameStarted) return;

  let onFloor =
    character.y + character.h >= floor - tolerance &&
    character.y + character.h <= floor + tolerance;

  let onPlatform = isOnAnyPlatform();

  if (onFloor || onPlatform) {
    character.vy = jumpSpeed;

    // Diagonal adjustment
    if (keyIsDown(65)) character.x -= 10;
    else if (keyIsDown(68)) character.x += 10;
  }
}
