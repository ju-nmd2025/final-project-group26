//Platform Initialization Function
function initPlatforms() {    // Reset the platform array (clear old ones)
  platforms = [];
  let firstW = random(platformWidthRange[0], platformWidthRange[1]);  // Create the FIRST platform

  platforms.push({                          // Place first platform near the character
    x: random(0, canvasWidth - firstW),
    y: floor - 80,
    w: firstW,
    h: 20,
  });

// Create ALL OTHER platforms above the previous one
  for (let i = 1; i < platformCount; i++) {
    let w = random(platformWidthRange[0], platformWidthRange[1]); //width 
    let x = random(0, canvasWidth - w);                           //random Horizontal
    let y =
      platforms[i - 1].y -                                        // Position above previous
      random(platformVerticalSpacing[0], platformVerticalSpacing[1]);
    platforms.push({ x, y, w, h: 20 });
  }
}