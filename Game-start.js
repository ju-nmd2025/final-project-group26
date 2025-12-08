function startGame() {
  gameStarted = true;
  gameOverState = false;
  platformsFalling = false;
  button.remove();
  character = new Character(175, 50, 50, 50); // reset
  initPlatforms();
  loop();
}