import { Platform } from "./MaddiePlats.js";
import { Character } from "./MaddieCharacter.js";

let platform = new Platform(150, 400);
platform.draw();

let character;
function setup() {
  createCanvas(440, 600);
  character = new Character();
}

function draw() {
  background(155, 203, 45);
  character.draw();
  character.update();
}

function keyPressed() {
  if (key == " ") {
    character.jump();
  }
}
