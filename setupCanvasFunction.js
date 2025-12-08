//THE SETUP FUNCTION (creates canvas + background)
function setup() {
  createCanvas(canvasWidth, canvasHeight); //  Creates the canvas where the game is drawn
  character = new Character(175, 50, 50, 50);   //  Create the player character
  showStartScreen();   //  Display the start screen first
}