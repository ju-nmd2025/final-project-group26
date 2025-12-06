class Character {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.width = 60;
    this.height = 60;

    this.velocity = 0;
    this.gravity = 0.1;
    this.jumpStrength = 5;
  }
  // JUMP
   jump() {
    this.velocity -= this.jumpStrength;
  }
}
draw() {
    rect(this.x, this.y, this.width, this.height);
  }

class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 20;
  }
  draw() {
    fill (139, 69, 19);
    rect(this.x, this.y, this.width, this.height);
  }
}
  

  update() {
    if (this.x + this.width > 0) this.x = width;
   if (this.x > width) this.x = -this.width;
  }
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 3;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 3;
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


function keyPressed() {
  if (key == " ") {
    character.jump();
  }
}
