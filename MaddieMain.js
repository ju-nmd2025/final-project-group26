class Character {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.width = 60;
    this.height = 60;

    this.velocity = 0;
    this.gravity = 0.1;
  }

  draw() {
    rect(this.x, this.y, this.width, this.height);
  }
  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
  }
}

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
