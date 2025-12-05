export class Character {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.width = 60;
    this.height = 60;
  }
  draw() {
    rect(this.x, this.y, this.width, this.height);
  }
}
