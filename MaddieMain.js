class Platform {
  constructor(x, y, w = 100, h = 20) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 20;
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
    this.x = x:
    this.y = y;
    this.width = w;
    this.height = h;
    this.velocity = 0;
    this.gravity = 0.9;
    this.jumpStrength = 7;

  } // JUMP
  jump() {
    this.velocity -= this.jumpStrength;
  }

  draw() {
    push();
    fill(157, 73, 73);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (keyIsDown(LEFT_ARROW)) this.x -= 3;
    if (keyIsDown(RIGHT_ARROW)) this.x += 3;
  }
}
// variables
let character;
let platforms = [];
let platformCount = 5;
let platformWidthRange = [60, 120];
let platformVerticalSpacing = [80, 150];
let canvasWidth = 440;
let canvasHeight = 600;
let floor = 530;
let gameStarted = false;
let gameOver = false;
let platformsFalling = false;
let button;
let tolerance = 5;

function setup() {
  createCanvas(440, 600);
  character = new Character();

  let platformCount = 5;
  let gap = height / platformCount;

  for (let i = 1; i < 5; i++) {
    platforms.push(new Platform(random(width), height - i * gap));
  }
}

function draw() {
  background(155, 203, 45);

  for (let plat of platforms) {
    plat.draw();
  }

  character.draw();
  character.update();
}

function keyPressed() {
  if (key === " ") {
    character.jump();
  }
}
