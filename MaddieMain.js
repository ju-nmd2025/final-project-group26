// variables
let character;
let platforms = []; // empty platform array
let gap;
let score = 0;

let gameState = "start"; // "start", "playing", "gameover"
let startButton;
let gameOverButton;

// character class
class Platform {
  constructor(x, y, w = 100, h = 20) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.velocity = 1; // fall speed
    this.gravity = 0.1;
    this.jumpStrength = 7;
  }

  draw() {
    push();
    fill(139, 69, 19);
    rect(this.x, this.y, this.width, this.height, 6);
    pop();
  }
}

  jump() {
    this.velocity -= this.jumpStrength;
  }

  update(platforms) {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.velocity < -9) this.velocity = -9;

    if (keyIsDown(LEFT_ARROW)) this.x -= 4;
    if (keyIsDown(RIGHT_ARROW)) this.x += 4;

    if (this.x + this.width < 0) this.x = width;
    if (this.x > width) this.x = -this.width;

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

  let platformCount = 5;
  gap = height / platformCount;

  for (let i = 1; i < 5; i++) {
    platforms.push(new Platform(random(width), height - i * gap));
  }
}

// drawing loop //
function draw() {
 if (gameState === "start") {
    drawStartScreen();
    return;
  }

  if (gameState === "gameover") {
    drawGameOverScreen();
    return;
  }

  // PLay state //
  translate(0, width / 2 - character.y);
  character.update(platforms);
  character.draw();

  for (let plat of platforms);
    plat.draw();
  
    // new platforms as character goes up //
    if (character.y < platforms[platforms.length - 1].y + 200) {
      platforms.push(new Platform(random(width), platforms[platforms.length - 1].y - gap));
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
  }

  // start screen //
  function setupStartScreen() {
// creation of start button //
  startButton = createButton("START 😎");
  startButton.position(170, 270);
  startButton.size(150, 70);
  startButton.style("font", "bold 26px verdana");
  startButton.style("border-radius", "15px");
  button.mousePressed(() => {
    gameState = "playing";
    startButton.hide();
  });
}

function drawStartScreen() {
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  text("game title", width / 2, height / 3);
}


  // game over screen //
function drawGameOverScreen() {
  background(0);
  textAlign(CENTER, CENTER);
  textSize(28);
  fill(255);
  text("you just lost the game (✿◡‿◡)", width / 2, height / 2);
  textSize(16);
  text("SCORE:" + score, width / 2, height / 2 + 30);

  if (!gameOverButton) {
    gameOverButton = createButton("RESTART 🔄");
    gameOverButton.position(width / 2 - 75, height / 2 + 70);
    gameOverButton.size(150, 50);
    gameOverButton.style("font", "bold 20px verdana");
    gameOverButton.style("border-radius", "10px");
    gameOverButton.mousePressed(() => {
      setupGame();
      gameOverButton.remove();
      gameOverButton = null;
      gameState = "playing";
    });
  }
}

// jump input //

function keyPressed() { // if dead and space press, restart game
  if (gameState === "playing" && keyCode === "  "){
    character.jump();
  }
}