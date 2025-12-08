//Platform Collision Detection
function isOnAnyPlatform() {
  for (let plat of platforms) {
     // Check horizontal overlap
    const horizontallyAligned =
      character.x + character.w > plat.x && character.x < plat.x + plat.w;

      // Check if character's feet touch the top of the platform
    const verticallyAligned =
      character.y + character.h >= plat.y - tolerance &&
      character.y + character.h <= plat.y + tolerance;

     // If BOTH conditions are true, the character stands on this platform
    if (horizontallyAligned && verticallyAligned) return plat;
  }
  return null;  // Not on any platform
}
