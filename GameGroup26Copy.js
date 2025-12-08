class Character {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.vy = 0;
    this.gravity = 0.8;
  }

  draw() {
    push();
    fill(157, 73, 73);
    rect(this.x, this.y, this.w, this.h, 10);
    pop();
  }
}

// -------------------------------------------------------
// GAME VARIABLES & CONFIGURATION
// -------------------------------------------------------
let canvasWidth = 440;          // Width of the game window
let canvasHeight = 600;         // Height of the game window
let floorY = 530; // you'll die. // Y position of the deadly floor line
let character;                  // Will store the Character object
const moveSpeed = 5;            // How fast the character moves left/right
const jumpSpeed = -18;          // Upward jump velocity (negative goes up)
const tolerance = 5;            // Collision leniency for platform landing
const platformFallSpeed = 1;    // How fast platforms move downward

let gameStarted = false;        // True only after clicking START
let gameOverState = false;      // True when player dies
let button;                     // The START button element

let platforms = [];             // Holds all platform objects
const platformCount = 5;        // How many platforms exist
const platformWidthRange = [60, 120];   // Min/max platform width
const platformVerticalSpacing = [80, 150]; // Min/max vertical distance

let score = 0;       // player's score
let scoreRate = 0.016;   // how fast score increases

let platformsFalling = false;   // When true, platforms begin to fall

//Platform Initialization Function
function initPlatforms() {    // Reset the platform array (clear old ones)
  platforms = [];
  let firstW = random(platformWidthRange[0], platformWidthRange[1]);  // Create the FIRST platform

  platforms.push({                          // Place first platform near the character
    x: random(0, canvasWidth - firstW),
    y: floorY - 80,
    w: firstW,
    h: 20,
  });

// Create ALL OTHER platforms above the previous one
  for (let i = 1; i < platformCount; i++) {
    let w = random(platformWidthRange[0], platformWidthRange[1]); //width 
    let x = random(0, canvasWidth - w);                           //random Horizontal
    let y =
      platforms[i - 1].y -                                        // Position above previous
      random(platformVerticalSpacing[0], platformVerticalSpacing[1]);
    platforms.push({ x, y, w, h: 20 });
  }
}

//Platform Collision Detection
function isOnAnyPlatform() {
  for (let plat of platforms) {
     // Check horizontal overlap
    const horizontallyAligned =
      character.x + character.w > plat.x && character.x < plat.x + plat.w;

      // Check if character's feet touch the top of the platform
    const verticallyAligned =
      character.y + character.h >= plat.y - tolerance &&
      character.y + character.h <= plat.y + tolerance;

     // If BOTH conditions are true, the character stands on this platform
    if (horizontallyAligned && verticallyAligned) return plat;
  }
  return null;  // Not on any platform
}

//THE SETUP FUNCTION (creates canvas + background)
function setup() {
  createCanvas(canvasWidth, canvasHeight); //  Creates the canvas where the game is drawn
  character = new Character(175, 50, 50, 50);   //  Create the player character
  showStartScreen();   //  Display the start screen first
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
  button.style("border-radius", "15px");
  button.mousePressed(startGame);
}

function startGame() {
  gameStarted = true;
  gameOverState = false;
  platformsFalling = false;
  button.remove();
  character = new Character(175, 50, 50, 50); // reset
  initPlatforms();
  score = 0;  // reset score
  loop();
}

// game over
function gameOver() {
  gameOverState = true;
  noLoop();
  background(0);
  fill(255);
  textSize(28);
  textAlign(CENTER);
  text("you just lost the game (✿◡‿◡)", canvasWidth / 2, canvasHeight / 2);
  textSize(16);
  text("Press SPACE to restart", canvasWidth / 2, canvasHeight / 2 + 40);
}

  //THE MAIN GAME LOOP (runs every frame)
function draw() {
  if (!gameStarted) return; //if game didnt start, ignore // Do nothing until Start is pressed

  background(100, 160, 200); //colored background - THIS draws the sky blue background every frame
    
  if (gameOverState) {      //If game is over, draw the game over screen which is already defined above...
    gameOver();
    return;
  }

 //score count
  score += scoreRate;  // increases every frame
  //drawing score on the screen
    fill(255);
    textSize(24);
    textAlign(LEFT, TOP);
    text("Score: " + floor(score), 10, 10);


  //pressing keys on keyboard for horizontal movement
  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) character.x -= moveSpeed; // A and left arrow key
  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) character.x += moveSpeed; // D and right arrow key
  character.x = constrain(character.x, 0, canvasWidth - character.w); //Keep inside screen


  // apply Gravity
  character.y += character.vy;
  character.vy += character.gravity;

   // Check collision with deadly floor
  if (character.y + character.h >= floorY) {
    gameOver();
  }

  // See if standing on platform
  let standingPlat = isOnAnyPlatform();
  if (character.vy > 0 && standingPlat) {
    character.y = standingPlat.y - character.h; // Snap on top
    character.vy = 0;                           // Stop falling
    platformsFalling = true;                    // Start platforms falling
  }

    //Moving platforms downward
  if (platformsFalling) {
    for (let plat of platforms) {
      plat.y += platformFallSpeed;

      // respawn platform at top after it leaves bottom
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

  // Draw all platforms
  for (let plat of platforms) {
    push();
    fill(105, 70, 30);
    rect(plat.x, plat.y, plat.w, plat.h, 6);
    pop();
  }

  character.draw(); // Draw the character ?

  // // da floor is deadly - defined line of the floor
  stroke(0);
  line(0, floorY, canvasWidth, floorY);
}

function keyPressed() {
  if (!gameStarted) return;

  if (gameOverState && keyCode === 32) {
    // space
    startGame();
    return;
  }

  // Check if on floor
  let onFloorY =
    character.y + character.h >= floorY - tolerance &&
    character.y + character.h <= floorY + tolerance;

  // Or on a platform
  let onPlatform = isOnAnyPlatform();

  // If allowed to jump
  if (onFloorY || onPlatform) {
    character.vy = jumpSpeed;

    // Diagonal adjustment
    if (keyIsDown(65)) character.x -= 10;
    else if (keyIsDown(68)) character.x += 10;
  }
}
