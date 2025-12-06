class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 20;
  }
  draw() {
    fill(139, 69, 19);
    rect(this.x, this.y, this.width, this.height);
  }
}
