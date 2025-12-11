export class Character {
  constructor(gravity, onGameOver) {
    this.onGameOver = onGameOver; // without this the end screen doesnt show, auto return
    this.width = 45;              //setting characters size
    this.height = 45;

    this.x = width / 2 - this.width / 2; //placing the character near the bottom-center of the screen
    this.y = height - this.height - 10;

    this.velocity = 0; //char. vertical speed (when put too high char. falls down off of screen)
    this.gravity = gravity; // lowercase //falling
    this.jumpStrength = 9; //pushes char. upward

    this.started = false;
    this.firstJumpEase = 1; //so the character doesnt go up too fast, before the first jump...

    //this.onGameOver = this.onGameOver; // callback to the main file(redundant part of code...)
  }

  draw() { 
    fill(153, 51, 0);
    rect(this.x, this.y, this.width, this.height, 10);
  }

  jump() {                      //if the game hasn't started, making first jump activate ease, after, applying upward velocity..
    if (!this.started) {
      this.started = true;
      this.firstJumpEase = 0;
    } else {
        this.jumpStrength;
        this.velocity;
        this.gravity;
      //this.velocity = this.jumpStrength; //makes the spacebar reusable during the game. when - goes up, when blanc goes down by pressing....
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

    this.y += this.velocity; //moving char. vertically

    // left/right movement
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) this.x -= 7;
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) this.x += 7;

    // screen wrap appearing from sides
    if (this.x + this.width < 0) this.x = width;
    if (this.x > width) this.x = -this.width;

    // platform collision
    if (this.started) {
      for (let platform of platforms) {
        if (platform.broken) continue;

        if (
          this.y + this.height >= platform.y &&
          this.y + this.height <= platform.y + platform.height &&
          this.velocity > 0
        ) {
          let minX = platform.x - this.width;
          let maxX = platform.x + platform.width;

          if (this.x >= minX && this.x <= maxX) {
            this.velocity = -this.jumpStrength;

            if (platform.type === "breakable") platform.break();
          }
        }
      }
    }

    // game over if fall too low
    if (this.y > height + 200 && this.onGameOver) {
      this.onGameOver();
    }
  }
}