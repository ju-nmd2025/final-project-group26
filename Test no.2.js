// variables

let character; 
let platforms = [];
let gap;
let score = 0;

let gameState = "start";
let startButton;
let gameOverButton;

// -------------------------------------------------------------
// CHARACTER CLASS
// -------------------------------------------------------------
class Character {
  constructor() {
    this.width = 45;
    this.height = 45;

    this.x = width / 2 - this.width / 2;
    this.y = height - this.height - 10;

    this.velocity = 0;
    this.gravity = 0.3;
    this.jumpStrength = 9;

    this.started = false;
    this.firstJumpEase = 50;
  }

  draw() {
    fill(139, 69, 19);
    rect(this.x, this.y, this.width, this.height, 10);
  }

  jump() {
    if (!this.started) {
      this.started = true;
      this.firstJumpEase = 0;
    } else {
      this.velocity = -this.jumpStrength;
    }
  }

  update(platforms) {
    // Smooth first jump
    if (this.started && this.firstJumpEase < 1) {
      this.firstJumpEase += 0.03;
      this.velocity = -this.jumpStrength * this.firstJumpEase;
    } else if (this.started) {
      this.velocity += this.gravity;
    }

    this.y += this.velocity;

    // Left / Right
    if (keyIsDown(LEFT_ARROW)) this.x -= 7;
    if (keyIsDown(RIGHT_ARROW)) this.x += 7;

    // Wrap screen
    if (this.x + this.width < 0) this.x = width;
    if (this.x > width) this.x = -this.width;

    // Platform collisions
    if (this.started) {
      for (let platform of platforms) {
        if(platform.broken) continue; //skip broken platform
        if (
          this.y + this.height >= platform.y &&
          this.y + this.height <= platform.y + platform.height &&
          this.velocity > 0
        ) {
          let minX = platform.x - this.width;
          let maxX = platform.x + platform.width;

          if (this.x >= minX && this.x <= maxX) {
            this.velocity = -this.jumpStrength;

            if(platform.type === "breakable") platform.break();
          }
        }
      }
    }

    // Game over if fall too low
    if (this.y > height + 200) {
      gameState = "gameover";
    }
  }
}

// -------------------------------------------------------------
// MOVING PLATFORM CLASS
// -------------------------------------------------------------
class Platform {
  constructor(x, y, type = "static") {
    this.x = x;
    this.y = y;
    this.width = 85;
    this.height = 20;
    this.type = type;
    this.broken = false;
    this.speed = 2;
    this.direction = 1;
    // NEW — RANDOM MOVEMENT VALUES
    // this.speed = random(1, 3);   // speed of movement
    // this.direction = random([1, -1]); // left or right
    //this.isMoving = random() < 0.35;  // 35% chance to be a moving platform
  }

  draw() {
    if(this.type === "static") fill(100, 205, 100);
    if(this.type === "moving") fill(190, 170, 0);
    if(this.type === "breakable") fill(210, 105, 100);

    if (!this.broken) rect(this.x, this.y, this.width, this.height, 10);
    }
  

  update() {
    // Only move if flagged as moving
    if (this.type === "moving") {
      this.x += this.speed * this.direction;

      // Bounce off walls
      if (this.x <= 0 || this.x + this.width >= width) {
        this.direction *= -1; // reverse direction
      }
    }
  }

  break(){
    if(this.type === "breakable") this.broken = true;
  }
//   draw() {
//     fill(this.isMoving ? color(255, 180, 80) : color(100, 205, 100)); 
//     rect(this.x, this.y, this.width, this.height, 10);
//   }
}

// -------------------------------------------------------------
// SETUP
// -------------------------------------------------------------
function setup() {
  createCanvas(440, 600);
  setupStartScreen();
}

// -------------------------------------------------------------
// INITIALIZE GAME
// -------------------------------------------------------------
function setupGame() {
  character = new Character();
  platforms = [];
  score = 0;
  gap = 100;

//   // Generate initial platforms
//   for (let i = 1; i < 6; i++) {
//     platforms.push(new Platform(random(width - 60), height - i * gap));
//   }
// }

  // pre gen platforms for start //
  for (let i = 1; i < 6; i++) {
    let typeChance = random();
    let type = "static";
    if (typeChance < 0.2) type = "breakable";
    else if (typeChance < 0.4) type = "moving";

    platforms.push(new Platform(random(width - 60), height - i * gap, type));
  }
}

// -------------------------------------------------------------
// MAIN DRAW LOOP
// -------------------------------------------------------------
function draw() {
  background(135, 206, 235);

  // Score
  push();
  fill(0);
  textSize(24);
  textAlign(CENTER);
  text(score, width / 2, 50);
  pop();

  // Start screen
  if (gameState === "start") {
    drawStartScreen();
    drawPlatformsPreview();
    return;
  }

  // Game over screen
  if (gameState === "gameover") {
    drawGameOverScreen();
    return;
  }

  push();

  // Camera follow
  if (character.started && character.y < height / 2) {
    translate(0, height / 2 - character.y);
  }

  // Update + draw character and platforms
  character.update(platforms);
  character.draw();

  for (let plat of platforms) {
    plat.update();  // <-- MOVEMENT UPDATE
    plat.draw();
  }

//   // Spawn new platforms
//   if (character.started) {
//     if (character.y < platforms[platforms.length - 1].y + 200) {
//       platforms.push(
//         new Platform(
//           random(width - 60),
//           platforms[platforms.length - 1].y - gap
//         )
//       );
//     }
if (character.started) {
    if (character.y < platforms[platforms.length - 1].y + 200) {
      let typeChance = random();
      let type = "static";
      if (typeChance < 0.2) type = "breakable";
      else if (typeChance < 0.4) type = "moving";

      platforms.push(
        new Platform(
          random(width - 60),
          platforms[platforms.length - 1].y - gap,
          type
        )
      );
    }




    // Remove old platforms + increase score
    if (platforms[0].y > character.y + 400) {
      platforms.shift();
      score++;
    }
  }

  pop();
}

// -------------------------------------------------------------
// START SCREEN
// -------------------------------------------------------------
function drawPlatformsPreview() {
  for (let p of platforms) p.draw();
}

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

// -------------------------------------------------------------
// GAME OVER
// -------------------------------------------------------------
function drawGameOverScreen() {
  background(50);
  textAlign(CENTER, CENTER);
  textFont("comic sans ms");
  textSize(25);
  fill(255);
  text("you just lost the game (✿◡‿◡)", width / 2, height / 3);
  textSize(24);
  text("Final Score: " + score, width / 2, height / 2);

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

// -------------------------------------------------------------
// INPUT
// -------------------------------------------------------------
function keyPressed() {
  if (gameState === "playing" && key === " ") {
    character.jump();
  }
}
