// export default class Character {
//   constructor(x, y, w, h) {
//     this.x = x;
//     this.y = y;
//     this.w = w;
//     this.h = h;

//     this.vy = 0;
//     this.gravity = 1;
//   }

//   draw() {
//     push();
//     fill(157, 73, 73);
//     rect(this.x, this.y, this.w, this.h, 10);
//     pop();
//   }
// }

// export class Character {
//   constructor() {
//     this.width = 45; // character side
//     this.height = 45; // character side

//     this.x = width / 2 - this.width / 2;
//     this.y = height - this.height - 10; // 10 px margin from bottom

//     this.velocity = 0; // fall speed
//     this.gravity = 0.05; // how much boune on platform, lower number = weaker
//     this.jumpStrength = 4;

//     this.started = false; // jump not start
//     this.firstJumpEase = 500; // easing factor for smooth first jump
//   }

//   draw() {
//     fill(139, 69, 19);
//     rect(this.x, this.y, this.width, this.height, 10); // last number radius on corner
//   }

//   jump() {
//     if (!this.started) {
//       this.started = true;
//       this.firstJumpEase = 0; // starting ease jump
//     } else {
//       this.velocity = -this.jumpStrength;
//     }
//   }

//   update(platforms) {
//     // smooth first jump
//     if (this.started && this.firstJumpEase < 1) {
//       this.firstJumpEase += 0.03;
//       this.velocity = -this.jumpStrength * this.firstJumpEase;
//     } else if (this.started) {
//       this.velocity += this.gravity;
//     }

//     this.y += this.velocity;

//     // left right move
//     if (keyIsDown(LEFT_ARROW)) this.x -= 4;
//     if (keyIsDown(RIGHT_ARROW)) this.x += 4;

//     // screen wrap
//     if (this.x + this.width < 0) this.x = width;
//     if (this.x > width) this.x = -this.width;

//     // platform collis. after jump starts
//     if (this.started) {
//       for (let platform of platforms) {
//         if (
//           this.y + this.height >= platform.y &&
//           this.y + this.height <= platform.y + platform.height &&
//           this.velocity > 0
//         ) {
//           let minX = platform.x - this.width;
//           let maxX = platform.x + platform.width;
//           if (this.x >= minX && this.x <= maxX) {
//             this.velocity = -this.jumpStrength;
//           }
//         }
//       }
//     }

//     // game over if fall too low
//     if (this.y > height + 200) {
//       gameState = "gameover";
//     }
//   }
// }


export class Character {
  constructor() {
    this.width = 45;
    this.height = 45;

    this.x = width / 2 - this.width / 2;
    this.y = height - this.height - 10;

    this.velocity = 0;
    this.gravity = 0.3;
    this.jumpStrength = 9;

    this.started = false;
    this.firstJumpEase = 50;
  }

  draw() {
    fill(139, 69, 19);
    rect(this.x, this.y, this.width, this.height, 10);
  }

  jump() {
    if (!this.started) {
      this.started = true;
      this.firstJumpEase = 0;
    } else {
      this.velocity = -this.jumpStrength;
    }
  }

  update(platforms) {
    // Smooth first jump
    if (this.started && this.firstJumpEase < 1) {
      this.firstJumpEase += 0.03;
      this.velocity = -this.jumpStrength * this.firstJumpEase;
    } else if (this.started) {
      this.velocity += this.gravity;
    }

    this.y += this.velocity;

    // Left / Right
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) this.x -= 7;
    if (keyIsDown(RIGHT_ARROW)|| keyIsDown(68)) this.x += 7;

    // Wrap screen
    if (this.x + this.width < 0) this.x = width;
    if (this.x > width) this.x = -this.width;

    // Platform collisions
    if (this.started) {
      for (let platform of platforms) {
        if(platform.broken) continue; //skip broken platform
        if (
          this.y + this.height >= platform.y &&
          this.y + this.height <= platform.y + platform.height &&
          this.velocity > 0
        ) {
          let minX = platform.x - this.width;
          let maxX = platform.x + platform.width;

          if (this.x >= minX && this.x <= maxX) {
            this.velocity = -this.jumpStrength;

            if(platform.type === "breakable") platform.break();
          }
        }
      }
    }

    // Game over if fall too low
    if (this.y > height + 200) {
      gameState = "gameover";
    }
  }
}