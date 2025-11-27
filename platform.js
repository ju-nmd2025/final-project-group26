export let platforms = [];

export const platformCount = 5;
export const platformWidthRange = [60, 120];
export const platformVerticalSpacing = [80, 150];
export const platformFallSpeed = 1;
export const tolerance = 5;

let canvasWidth, canvasHeight, floor;

export function setupPlatformSystem(cWidth, cHeight, floorY) {
  canvasWidth = cWidth;
  canvasHeight = cHeight;
  floor = floorY;
}

export function initPlatforms() {
  platforms.length = 0;

  let firstW = random(platformWidthRange[0], platformWidthRange[1]);
  platforms.push({
    x: random(0, canvasWidth - firstW),
    y: floor - 80,
    w: firstW,
    h: 20,
  });

  for (let i = 1; i < platformCount; i++) {
    let w = random(platformWidthRange[0], platformWidthRange[1]);
    let x = random(0, canvasWidth - w);
    let y =
      platforms[i - 1].y -
      random(platformVerticalSpacing[0], platformVerticalSpacing[1]);
    platforms.push({ x, y, w, h: 20 });
  }
}
export function isOnAnyPlatform(character) {
  for (let plat of platforms) {
    const horizontallyAligned =
      character.x + character.w > plat.x && character.x < plat.x + plat.w;

    const verticallyAligned =
      character.y + character.h >= plat.y - tolerance &&
      character.y + character.h <= plat.y + tolerance;

    if (horizontallyAligned && verticallyAligned) {
      return plat;
    }
  }
  return null;
}

export function updatePlatforms(platformsFalling) {
  if (!platformsFalling) return;

  for (let plat of platforms) {
    plat.y += platformFallSpeed;

    if (plat.y > canvasHeight) {
      plat.w = random(platformWidthRange[0], platformWidthRange[1]);
      plat.x = random(0, canvasWidth - plat.w);
      plat.y = -random(platformVerticalSpacing[0], platformVerticalSpacing[1]);
    }
  }
}
export function drawPlatforms() {
  for (let plat of platforms) {
    push();
    fill(205, 80, 80);
    rect(plat.x, plat.y, plat.w, plat.h, 6);
    pop();
  }
}
