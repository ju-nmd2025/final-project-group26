function setup() {
  createCanvas(440, 590);
  background(100, 160, 200);
}
function draw() {
  button = createButton("CLICK HERE");
  button.position(150, 200);
  button.style("font", "italic bold 20px arial");
  button.mousePressed(repaint);
}
function repaint() {
  let r = random(255);
  let g = random(255);
  let b = random(255);
  background(r, g, b);
}
function mousePressed() {
  if (mouseX >= 130 && mouseX <= 266 && mouseY >= 182 && mouseY <= 208) {
    buttonPressed = true;
    console.log("you did it");
  } else {
    buttonPressed = false;
    console.log("no not here′");
  }
}
