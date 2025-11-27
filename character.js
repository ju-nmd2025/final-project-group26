export default class Character {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.vy = 0;
    this.gravity = 1;
  }

  draw() {
    push();
    fill(157, 73, 73);
    rect(this.x, this.y, this.w, this.h, 10);
    pop();
  }
}
