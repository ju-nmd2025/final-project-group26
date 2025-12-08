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