// variables
let character;
let platforms = []; // empty platform array
let gap;
let score = 0;

let gameState = "start"; // "start", "playing", "gameover"

let startButton;
let gameOverButton;

// character class
class Character {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.width = 45;
    this.height = 45;

    this.velocity = 4; // fall speed
    this.gravity = 0.1; // how much boune on platform, lower number = weaker
    this.jumpStrength = 12;
  }

  draw() {
    fill(139, 69, 19);
    rect(this.x, this.y, this.width, this.height, 10);
  }

  jump() {
    this.velocity -= this.jumpStrength;
  }
  // gravity
  update(platforms) {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.velocity < -9) this.velocity = -9; // speed limit

    // left right move
    if (keyIsDown(LEFT_ARROW)) this.x -= 4;
    if (keyIsDown(RIGHT_ARROW)) this.x += 4;

    // screen wrap
    if (this.x + this.width < 0) this.x = width;
    if (this.x > width) this.x = -this.width;

    // platform landing
    for (let platform of platforms) {
      if (
        this.y + this.height >= platform.y &&
        this.y + this.height <= platform.y + platform.height &&
        this.velocity > 0
      ) {
        let minX = platform.x - this.width;
        let maxX = platform.x + platform.width;

        if (this.x >= minX && this.x <= maxX) {
          this.jump();
        }
      }
    }

    // game over if fall too low
    if (this.y > platforms[0].y + 600) {
      gameState = "gameover";
    }
  }
}

// platform class
class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 85;
    this.height = 20;
  }

  draw() {
    fill(100, 205, 100);
    rect(this.x, this.y, this.width, this.height, 10);
  }
}
// GAME SETUP //
function setup() {
  createCanvas(440, 600);
  setupStartScreen();
}

// initialise game //
function setupGame() {
  character = new Character(200, 300, 60, 60);
  platforms = [];
  score = 0;

  let platformCount = 6;
  gap = height / platformCount;

  for (let i = 1; i < platformCount; i++) {
    platforms.push(new Platform(random(width), height - i * gap));
  }
}

// drawing loop //
function draw() {
  background(135, 206, 235); // sky blue

  if (gameState === "start") {
    drawStartScreen();
    return;
  }

  if (gameState === "gameover") {
    drawGameOverScreen();
    return;
  }

  // play state //
  translate(0, height / 2 - character.y); // makes it so THAT canvas moves with character
  // update and draw character and platforms //
  character.update(platforms);
  character.draw();

  for (let plat of platforms) plat.draw();

  // new platforms as character goes up //
  if (character.y < platforms[platforms.length - 1].y + 200) {
    platforms.push(
      new Platform(random(width), platforms[platforms.length - 1].y - gap)
    );
  }

  // removing old plats and score go up //
  if (platforms[0].y > character.y + 400) {
    platforms.shift();
    score++;
  }

  // draw score //
  push();
  fill(0);
  textSize(24);
  textAlign(CENTER);
  text(score, width / 2, character.y - 150);
  pop();
}

// start screen //
function setupStartScreen() {
  startButton = createButton("START 😎");
  startButton.style("z-index", "1000"); // on yop of canvas
  startButton.position(170, 270);
  startButton.size(150, 70);
  startButton.style("font", "bold 26px verdana");
  startButton.style("border-radius", "15px");
  startButton.mousePressed(() => {
    gameState = "playing";
    startButton.hide();
    setupGame();
  });
}

function drawStartScreen() {
  push();
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  textFont("comic sans ms");
  text("game title", width / 2, height / 3);
  pop();
}

// game over screen //
function drawGameOverScreen() {
  background(50);
  push();
  textAlign(CENTER, CENTER);
  textFont("comic sans ms");
  textSize(25);
  fill(255);
  text("you just lost the game (✿◡‿◡)", width / 2, height / 3);

  textSize(24);
  text("Final Score: " + score, width / 2, height / 2);
  pop();

  // restart button //
  if (!gameOverButton) {
    gameOverButton = createButton("RESTART");
    gameOverButton.style("z-index", "1000"); // on top of canvas
    gameOverButton.position(180, 370);
    gameOverButton.size(140, 50);
    gameOverButton.style("font", "bold 22px verdana");
    gameOverButton.style("border-radius", "10px");
    gameOverButton.mousePressed(() => {
      setupGame();
      gameOverButton.remove();
      gameOverButton = null;
      gameState = "playing";
    });
  }
}

// ---------------- INPUT FOR JUMP ---------------- //
function keyPressed() {
  if (gameState === "playing" && key === " ") {
    character.jump();
  }
}
