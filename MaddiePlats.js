export class Platform {
  constructor(x, y, type = "static") {
    // platform properties, positioin size, veolcity
    this.x = x;
    this.y = y;
    this.width = 85;
    this.height = 20;
    this.type = type;

    this.speed = 2; // only moving
    this.direction = 1;
    this.broken = false; // for da breakable ones
  }

  draw() {
    // handles rendering accoridng to type
    if (this.type === "static") fill(100, 205, 100);
    else if (this.type === "moving") fill(190, 170, 0); // movement  handle
    else if (this.type === "breakable") fill(210, 105, 100); // movement 2 //

    if (!this.broken) rect(this.x, this.y, this.width, this.height, 10);
  }

  update() {
    // handles movement lelft to right
    if (this.type === "moving") {
      this.x += this.speed * this.direction;
      // when hit canvas border, reverse direction
      if (this.x <= 0 || this.x + this.width >= width) this.direction *= -1;
    }
  }
  // you guessed it, marks platform as brokeN
  break() {
    if (this.type === "breakable") this.broken = true;
  }
}
// platform class drawing, position
