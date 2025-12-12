// variables
import { Character } from "./MaddieCharacter.js";
import { Platform } from "./MaddiePlats.js";

let character; // holds character object
let platforms = []; // platform array - stores platform objects, and it is so cause multiple platforms exist
let gap; // vertical space between platforms
let score = 0; // keeping track of how many platforms the character has passed
let gameState = "start"; // can be "start", "playing", "gameover" KEY for state mananagement
let startButton;
let gameOverButton;

const GRAVITY = 0.2; // as the gravity doesnt change, keep in main

// platform class // start of class plats

// SETUP canvas start // runs once
function setup() {
  // game loop, this and draw() // once
  createCanvas(440, 600); // guess what it creates the canvas! /p5js)
  setupStartScreen(); // shows start screen first  to display itself once
}

// initialise game fresh restart//
function setupGame() {
  // called later to initialise character and platforms, game logic! runs once
  //character expressed w grav & callback for go
  character = new Character(GRAVITY, () => {
    // calls back to character class file, character saysy yo i died dude do waht you gotta do when that happens
    gameState = "gameover";
  });
  // creates the character
  platforms = []; // resets platforms, ensure fresh start
  score = 0; // resets score
  gap = 100; // distance between the platforms

  // pre gen platforms for start // loop logik pregen plat, rando for variety
  for (let i = 1; i < 6; i++) {
    let typeChance = random();
    let type = "static";
    if (typeChance < 0.2) type = "breakable";
    else if (typeChance < 0.4) type = "moving";

    platforms.push(new Platform(random(width - 60), height - i * gap, type));
  }
}

// drawing loop isolated by pushpop! //
function draw() {
  //continuous
  background(135, 206, 235); // sky blue

  // draw score // pushpop isolates text style so other shapes arent affected
  push(); // isolate style start
  fill(0);
  textSize(24);
  textAlign(CENTER);
  text(score, width / 2, 50); // fixed position, top-center
  pop(); // isolate style end

  // Game state management // return stops the rest of draw() from running
  if (gameState === "start") {
    drawStartScreen(); //continuous
    drawPlatformsPreview(); //continuous
    return; // important, prevents gameplay from runnign
  }
  // Game over management //
  if (gameState === "gameover") {
    drawGameOverScreen(); //continuous
    return; // important, freeze gameplay
  }
  push();
  // canvas moves with character // smooth canvasa post move //
  if (character.started && character.y < height / 2) {
    translate(0, height / 2 - character.y);
  }

  // updates and draws, character and platforms //
  character.update(platforms); // function as behaviour, reusable class // decoupling = the end/removal or revesal of coupling(joining two tihngs)
  character.draw(); //continuous

  for (let plat of platforms) {
    plat.update();
    plat.draw(); //continuous
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

    // removing old plats that fall below canvas and score go up
    if (platforms[0].y > character.y + 400) {
      platforms.shift(); // remove off screen platforms
      score++; // increases the score, each platform counts as score
    }
  }

  pop(); // kamera pop
}
// platform preview on start screen //
function drawPlatformsPreview() {
  //continuous
  for (let p of platforms) p.draw();
}
// start screen // creates clickable start button and hides it when game starts
function setupStartScreen() {
  // once
  startButton = createButton("START 😎");
  startButton.position(170, 270);
  startButton.size(150, 70);
  startButton.style("font", "bold 26px verdana");
  startButton.style("border-radius", "15px");

  startButton.mousePressed(() => {
    startButton.hide();
    setupGame(); // once
    gameState = "playing"; // game state management //
  });
}

function drawStartScreen() {
  //continuous
  // draws title text for start screen
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  textFont("comic sans ms");
  text("game title", width / 2, height / 3);
}

// game over screen // with final score, restart button resets game
function drawGameOverScreen() {
  //continuous
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
      // => callback arrow,
      setupGame(); // once
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
// All your other code is above!
window.setup = setup;

window.draw = draw;

window.addEventListener("click", function (event) {
  mousePressed();
});

window.addEventListener("keydown", function (event) {
  keyPressed();
});

// setup initialise once = draw contin for animate. // pushpop isolate a style // translte implem cam system
//gamestate = flow - prevent update when not play
