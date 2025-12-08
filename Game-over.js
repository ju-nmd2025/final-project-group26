// game over text + option to restart the game
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
