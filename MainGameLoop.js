//THE MAIN GAME LOOP (runs every frame)
  
function draw() {
  if (!gameStarted) return; //if game didnt start, ignore // Do nothing until Start is pressed

  background(100, 160, 200); //colored background - THIS draws the sky blue background every frame

  if (gameOverState) {      //If game is over, draw the game over screen which is already defined above...
    gameOver();
    return;
  }
  //pressing keys on keyboard for horizontal movement
  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) character.x -= moveSpeed; // A and left arrow key
  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) character.x += moveSpeed; // D and right arrow key
  character.x = constrain(character.x, 0, canvasWidth - character.w); //Keep inside screen

  // apply Gravity
  character.y += character.vy;
  character.vy += character.gravity;

   // Check collision with deadly floor
  if (character.y + character.h >= floor) {
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
  line(0, floor, canvasWidth, floor);
}