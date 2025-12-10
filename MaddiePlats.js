export class Platform {
  constructor(x, y, type = "static") {
    this.x = x;
    this.y = y;
    this.width = 85;
    this.height = 20;
    this.type = type;

    this.speed = 2;
    this.direction = 1;
    this.broken = false;
  }

  draw() {
    if (this.type === "static") fill(100, 205, 100);
    else if (this.type === "moving") fill(190, 170, 0);
    else if (this.type === "breakable") fill(210, 105, 100);

    if (!this.broken) rect(this.x, this.y, this.width, this.height, 10);
  }

  update() {
    if (this.type === "moving") {
      this.x += this.speed * this.direction;
      if (this.x <= 0 || this.x + this.width >= width) this.direction *= -1;
    }
  }

  break() {
    if (this.type === "breakable") this.broken = true;
  }
}
