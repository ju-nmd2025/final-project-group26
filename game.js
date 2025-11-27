import Platform from "./platform.js";
import Character from "./character.js";

let canvasWidth = 440;
let canvasHeight = 600;
let floor = 530;
let character = new Character(175, 50, 50, 50);

const moveSpeed = 5;
const jumpSpeed = -15;
const tolerance = 5;
const platformFallSpeed = 1;

let gameStarted = false; // Start screen
let button;

let platforms = [];
const platformCount = 5;
const platformWidthRange = [60, 120];
const platformVerticalSpacing = [80, 150];

function initPlatforms() {
  platforms = [];
  for (let i = 0; i < 5; i++) {
    let w = random(60, 120);
    let x = random(0, canvasWidth - w);
    let y = canvasHeight - (i * 100 + 80); // spacing
    platforms.push(new Platform(x, y, w, 20));
  }
}

// Draw all platforms
for (let plat of platforms) {
  plat.draw();
}
function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(255, 150, 70);

  character.draw();
  platform.draw();

  platform.x -= 0;
  if (platform.x + platform.w < 0) {
    platform.x = 500;
  }

  if (
    character.y + character.h < 530 &&
    !character.isColliding(character, platform)
  ) {
    character.y += 10;
  }

  // Floor
  line(0, floor, canvasWidth, floor);
}

function keyPressed() {
  if (
    character.y + character.h === floor ||
    character.isColliding(character, platform)
  ) {
    character.y -= 120;
  }
}
