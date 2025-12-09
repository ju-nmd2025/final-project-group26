// variables
let character; // hold character object
let platforms = []; // platform array - stores platform objects
let gap; // vertical space between platforms
let score = 0; // keeping track of how many platforms the character has passed

let gameState = "start"; // "start", "playing", "gameover"
let startButton;
let gameOverButton;

// character class //
class Character {
  constructor() {
    this.width = 45; // character width in pixels
    this.height = 45; // character height in pixels

    this.x = width / 2 - this.width / 2; // center horizontally
    this.y = height - this.height - 10; // 10 px margin from bottom

    this.velocity = 0; // fall , 0 imply start at ground, inital vert speed
    this.gravity = 0.2; // how much bounce on platform, lower number = weaker gravity, downward acceleration
    this.jumpStrength = 9; // how strong it jumps, upward jump speed

    this.started = false; // jump not start
    this.firstJumpEase = 0; // easing factor for smooth first jump, gradual increase
  }

  draw() {
    fill(139, 69, 19);
    rect(this.x, this.y, this.width, this.height, 10); // last number radius on corner
  }

  jump() {
    if (!this.started) {
      this.started = true; // first jump starts game
      this.firstJumpEase = 0; // reset easing factor
    } else {
      this.velocity = -this.jumpStrength; // jump upwards
    }
  }

  update(platforms) {
    // smooth first jump
    if (this.started && this.firstJumpEase < 1) {
      this.firstJumpEase += 0.03;
      this.velocity = -this.jumpStrength * this.firstJumpEase;
    } else if (this.started) {
      this.velocity += this.gravity; // normal gravity
    }

    this.y += this.velocity; // moves character vertically

    // left right move
    if (keyIsDown(LEFT_ARROW)) this.x -= 7;
    if (keyIsDown(RIGHT_ARROW)) this.x += 7;

    // screen wrap
    if (this.x + this.width < 0) this.x = width; // wrap left
    if (this.x > width) this.x = -this.width; // wrap right

    // platform collis. after jump starts
    if (this.started) {
      for (let platform of platforms) {
        if (platform.broken) continue; // skip broken platforms

        if (
          this.y + this.height >= platform.y &&
          this.y + this.height <= platform.y + platform.height &&
          this.velocity > 0
        ) {
          let minX = platform.x - this.width;
          let maxX = platform.x + platform.width;
          if (this.x >= minX && this.x <= maxX) {
            this.velocity = -this.jumpStrength;

            if (platform.type === "breakable") platform.break();
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
  constructor(x, y, type = "static") {
    this.x = x; // horizontal position
    this.y = y; // veritcal position
    this.width = 85;
    this.height = 20;
    this.type = type; // static platforms
    this.speed = 2;
    this.direction = 1;
    this.broken = false;
  }

  draw() {
    if (this.type === "static") fill(100, 205, 100);
    if (this.type === "moving") fill(190, 170, 0);
    if (this.type === "breakable") fill(210, 105, 100);

    if (!this.broken) rect(this.x, this.y, this.width, this.height, 10);
  }

  update() {
    if (this.type === "moving") {
      this.x += this.speed * this.direction;
      if (this.x <= 0 || this.x + this.width >= width) this.direction *= -1;
    }
  }

  break() {
    if (this.type === "breakable") this.broken = true;
  }
}

// SETUP canvas start //
function setup() {
  createCanvas(440, 600);
  setupStartScreen(); // shows start screen first
}

// initialise game //
function setupGame() {
  character = new Character(); // creates the character
  platforms = []; // resets platforms
  score = 0; // resets score
  gap = 100; // distance between the platforms

  // pre gen platforms for start //
  for (let i = 1; i < 6; i++) {
    let typeChance = random();
    let type = "static";
    if (typeChance < 0.2) type = "breakable";
    else if (typeChance < 0.4) type = "moving";

    platforms.push(new Platform(random(width - 60), height - i * gap, type));
  }
}

// drawing loop //
function draw() {
  background(135, 206, 235); // sky blue

  // draw score // pushpop isolates text style so other shapes arent affected
  push();
  fill(0);
  textSize(24);
  textAlign(CENTER);
  text(score, width / 2, 50); // fixed position, top-center
  pop();

  // Game states // return stops the rest of draw() from running
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

  // updates and draws, character and platforms //
  character.update(platforms);
  character.draw();

  for (let plat of platforms) {
    plat.update();
    plat.draw();
  }
  // new platforms as character goes up //
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

    // removing old plats and score go up //
    if (platforms[0].y > character.y + 400) {
      platforms.shift(); // remove off screen platforms
      score++; // increases the score
    }
  }

  pop(); // kamera pop
}

// platform preview on start screen //
function drawPlatformsPreview() {
  for (let p of platforms) p.draw();
}

// start screen // creates clickable start button and hides it when game starts
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
  // draws title text for start screen
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  textFont("comic sans ms");
  text("game title", width / 2, height / 3);
}

// game over screen // with final score, restart button resets game
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

// when pressing spacebar, character jumps, only during play state //
function keyPressed() {
  if (gameState === "playing" && key === " ") {
    character.jump();
  }
}
