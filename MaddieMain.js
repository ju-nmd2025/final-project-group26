// variables
let character;
let platforms = []; // empty platform array
let gap;
let score = 0;

let gameState = "start"; // "start", "playing", "gameover"
let startButton;
let gameOverButton;

// character class //
class Character {
  constructor() {
    this.width = 45; // character side
    this.height = 45; // character side

    this.x = width / 2 - this.width / 2;
    this.y = height - this.height - 10; // 10 px margin from bottom

    this.velocity = 4; // fall speed
    this.gravity = 0.1; // how much boune on platform, lower number = weaker
    this.jumpStrength = 12;

    this.started = false; // jump not start
    this.firstJumpEase = 0; // easing factor for smooth first jump
  }

  draw() {
    fill(139, 69, 19);
    rect(this.x, this.y, this.width, this.height, 10); // last number radius on corner
  }

  jump() {
    if (!this.started) {
      this.started = true;
      this.firstJumpEase = 0; // starting ease jump
    } else {
      this.velocity = -this.jumpStrength;
    }
  }

  update(platforms) {
    // smooth first jump
    if (this.started && this.firstJumpEase < 1) {
      this.firstJumpEase += 0.03;
      this.velocity = -this.jumpStrength * this.firstJumpEase;
    } else if (this.started) {
      this.velocity += this.gravity;
    }

    this.y += this.velocity;

    // left right move
    if (keyIsDown(LEFT_ARROW)) this.x -= 4;
    if (keyIsDown(RIGHT_ARROW)) this.x += 4;

    // screen wrap
    if (this.x + this.width < 0) this.x = width;
    if (this.x > width) this.x = -this.width;

    // platform collis. after jump starts
    if (this.started) {
      for (let platform of platforms) {
        if (
          this.y + this.height >= platform.y &&
          this.y + this.height <= platform.y + platform.height &&
          this.velocity > 0
        ) {
          let minX = platform.x - this.width;
          let maxX = platform.x + platform.width;
          if (this.x >= minX && this.x <= maxX) {
            this.velocity = -this.jumpStrength;
          }
        }
      }
    }

    // game over if fall too low
    if (this.y > height + 200) {
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
  character = new Character();
  platforms = [];
  score = 0;
  gap = 100;

  // pre gen platforms for start //
  for (let i = 1; i < 6; i++) {
    platforms.push(new Platform(random(width - 60), height - i * gap));
  }
}

// drawing loop //
function draw() {
  background(135, 206, 235); // sky blue

  // draw score //
  push();
  fill(0);
  textSize(24);
  textAlign(CENTER);
  text(score, width / 2, 50); // fixed position
  pop();

  // Game states //
  if (gameState === "start") {
    drawStartScreen();
    drawPlatformsPreview();
    return; // important
  }
  // Game over //
  if (gameState === "gameover") {
    drawGameOverScreen();
    return; // important
  }
  push();

  // canvas moves with character // smooth canvasa post move //
  if (character.started && character.y < height / 2) {
    translate(0, height / 2 - character.y);
  }

  // update and draw character and platforms //
  character.update(platforms);
  character.draw();

  for (let plat of platforms) plat.draw();

  if (character.started) {
    // new platforms as character goes up //
    if (character.y < platforms[platforms.length - 1].y + 200) {
      platforms.push(
        new Platform(
          random(width - 60),
          platforms[platforms.length - 1].y - gap
        )
      );
    }

    // removing old plats and score go up //
    if (platforms[0].y > character.y + 400) {
      platforms.shift();
      score++;
    }
  }
  pop(); // kamera pop
}

// platform preview on start screen //
function drawPlatformsPreview() {
  for (let p of platforms) p.draw();
}

// start screen //
function setupStartScreen() {
  startButton = createButton("START 😎");
  startButton.position(170, 270);
  startButton.size(150, 70);
  startButton.style("font", "bold 26px verdana");
  startButton.style("border-radius", "15px");

  startButton.mousePressed(() => {
    startButton.hide();
    setupGame();
    gameState = "playing";
  });
}

function drawStartScreen() {
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  textFont("comic sans ms");
  text("game title", width / 2, height / 3);
}

// game over screen //
function drawGameOverScreen() {
  background(50);
  textAlign(CENTER, CENTER);
  textFont("comic sans ms");
  textSize(25);
  fill(255);
  text("you just lost the game (✿◡‿◡)", width / 2, height / 3);
  textSize(24);
  text("Final Score: " + score, width / 2, height / 2);

  // restart button //
  if (!gameOverButton) {
    gameOverButton = createButton("RESTART");
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
