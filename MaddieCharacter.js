export class Character {
  constructor(gravity, onGameOver) {
    // character properties, position size velocity //
    this.onGameOver = onGameOver; // without this the end screen doesnt show, auto return, thats the callback
    this.width = 45;
    this.height = 45;

    this.x = width / 2 - this.width / 2;
    this.y = height - this.height - 10;

    this.velocity = 0;
    this.gravity = gravity; // lowercase // physics, passed from main
    this.jumpStrength = 9;

    this.started = false;
    this.firstJumpEase = 0;

    this.onGameOver = this.onGameOver; // callback to the main file
  }

  draw() {
    fill(139, 69, 19);
    rect(this.x, this.y, this.width, this.height, 10);
  }

  jump() {
    // physics of character //
    if (!this.started) {
      this.started = true;
      this.firstJumpEase = 0;
    } else {
      this.velocity = -this.jumpStrength;
    }
  }

  update(platforms) {
    // smooth first jump
    if (this.started && this.firstJumpEase < 1) {
      this.firstJumpEase += 0.03;
      this.velocity = -this.jumpStrength * this.firstJumpEase;
    } else if (this.started) {
      this.velocity += this.gravity;
    }

    this.y += this.velocity;
    // physic integration velo first then position, modular structure

    // left/right movement
    if (keyIsDown(LEFT_ARROW)) this.x -= 7;
    if (keyIsDown(RIGHT_ARROW)) this.x += 7;

    // screen wrap
    if (this.x + this.width < 0) this.x = width;
    if (this.x > width) this.x = -this.width;

    // platform collision handle
    if (this.started) {
      for (let platform of platforms) {
        if (platform.broken) continue; // broken platform not visible

        if (
          // collosion detect // by limiting checks reduce unnecessary checks
          this.y + this.height >= platform.y &&
          this.y + this.height <= platform.y + platform.height &&
          this.velocity > 0 // prevents hitting platform when go up, without it game detects collusion even when character go up
          // up = no collis. down = collis. matters
        ) {
          let minX = platform.x - this.width;
          let maxX = platform.x + platform.width;

          if (this.x >= minX && this.x <= maxX) {
            this.velocity = -this.jumpStrength; // boucne up

            if (platform.type === "breakable") platform.break(); // polymorph w plats, breakable calls this
          }
        }
      }
    }

    // game over detection // if fall too low // she dont need to know game state, reusable
    if (this.y > height + 200 && this.onGameOver) {
      this.onGameOver();
    }
  }
}
// character handle movement och interal logik
