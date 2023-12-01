let balls = [];

function getDirection() {
  return {
    dx: getRandomDirection(),
    dy: getRandomDirection(),
  };
}

for (let i = 0; i < 100; i++) {
  let radius = randomizer(5, 20);
  let diameter = radius * 2;
  let x = randomizer(0, VIEWBOX_WIDTH - diameter);
  let y = randomizer(0, VIEWBOX_HEIGHT - diameter);
  let color = generateRandomHexColor();
  let direction = getDirection();
  while (direction.dx === 0 && direction.dy === 0) {
    direction = getDirection();
  }
  let { dx } = direction;
  let { dy } = direction;
  console.log(dx, dy);
  let speed = randomizer(2, 4);
  while (speed === 0) {
    speed = randomizer(2, 5);
  }
  let ball = new Ball(x, y, dx, dy, radius, color, speed);
  balls.push(ball);
}

function renderer() {
  balls.forEach((ball) => {
    ball.collisionWithWall();
    balls.forEach((otherball) => {
      if (ball === otherball) return;
      else {
        const distance = distanceCalculator(
          ball.x,
          ball.y,
          otherball.x,
          otherball.y
        );
        const radiiSum = ball.radius + otherball.radius;
        if (distance < radiiSum) {
          ball.collisionWithBall(ball, otherball);
        }
      }
    });
    ball.renderBall();
  });
  requestAnimationFrame(renderer);
}

renderer();
