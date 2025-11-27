export default class Platform {
  constructor(x, y, w = 60, h = 20) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    push();
    fill("blue");
    rect(this.x, this.y, this.w, this.h, 6);
    pop();
  }
}
