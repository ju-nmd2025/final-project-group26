// -------------------------------------------------------
// GAME VARIABLES & CONFIGURATION
// -------------------------------------------------------
let canvasWidth = 440;          // Width of the game window
let canvasHeight = 600;         // Height of the game window
let floor = 530; // you'll die. // Y position of the deadly floor line
let character;                  // Will store the Character object
const moveSpeed = 5;            // How fast the character moves left/right
const jumpSpeed = -15;          // Upward jump velocity (negative goes up)
const tolerance = 5;            // Collision leniency for platform landing
const platformFallSpeed = 1;    // How fast platforms move downward

let gameStarted = false;        // True only after clicking START
let gameOverState = false;      // True when player dies
let button;                     // The START button element

let platforms = [];             // Holds all platform objects
const platformCount = 5;        // How many platforms exist
const platformWidthRange = [60, 120];   // Min/max platform width
const platformVerticalSpacing = [80, 150]; // Min/max vertical distance

let platformsFalling = false;   // When true, platforms begin to fall