import platform from "platform";
import { Character } from "./character";

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

let canvasWidth = 400;
let canvasHeight = 600;
let floor = 530;
let character = new Character(175, 10, 50, 50);

function draw() {
  background(255, 150, 70);

  character.draw();
  platform.draw();

  platform.x -= 10;
  if (platform.x + platform.w < 0) {
    platform.x = 500;
  }

  if (
    character.y + character.h < 530 &&
    !character.isColliding(character, platform)
  ) {
    character.y += 10;
  }

  // Floor
  line(0, floor, canvasWidth, floor);
}

function keyPressed() {
  if (
    character.y + character.h === floor ||
    character.isColliding(character, platform)
  ) {
    character.y -= 120;
  }
}
