/**
 *
 * @param {Number} min
 * @param {Number} max
 * @returns a random number between min and max
 */
function randomizer(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

/**
 *
 * @returns the direction of the ball
 */
function getRandomDirection() {
  const random = Math.random() * 2;
  return random - 1;
}

/**
 *
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns distance between balls
 */
function distanceCalculator(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 *
 * @returns a random hex value of color
 */
function generateRandomHexColor() {
  const randomColor = Math.floor(Math.random() * 16777215);
  const hexColor = "#" + randomColor.toString(16).padStart(6, "0");

  return hexColor;
}
