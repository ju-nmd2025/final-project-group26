function keyPressed() {
  if (!gameStarted) return;

  if (gameOverState && keyCode === 32) {
    // space
    startGame();
    return;
  }
  let onFloor =
    character.y + character.h >= floor - tolerance &&
    character.y + character.h <= floor + tolerance;

  let onPlatform = isOnAnyPlatform();

  if (onFloor || onPlatform) {
    character.vy = jumpSpeed;

    // Diagonal adjustment
    if (keyIsDown(65)) character.x -= 10;
    else if (keyIsDown(68)) character.x += 10;
  }
}