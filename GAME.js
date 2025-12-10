// variables
import { Character } from "./character.js";
import { Platform } from "./platform.js";

let character; // holds character object
let platforms = []; // platform array - stores platform objects
let gap; // vertical space between platforms
let score = 0; // keeping track of how many platforms the character has passed
let gameState = "start"; // "start", "playing", "gameover"
let startButton;
let gameOverButton;

const GRAVITY = 0.2; // as the gravity doesnt change, keep in main

// platform class // start of class plats

// SETUP canvas start //
function setup() {
  createCanvas(440, 600);
  setupStartScreen(); // shows start screen first
}

// initialise game //
function setupGame() {
  character = new Character(GRAVITY, () => {
    gameState = "gameover";
  });
  // creates the character
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
  // new platforms as character goes up // THIS IS NOT THE SAME
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

    // removing old plats and score go up THIS IS THE SAME //
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
  text("Welcome to SquareJump", width / 2, height / 3);
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