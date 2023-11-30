let viewbox;

try {
  viewbox = document.querySelector(".container");

  if (!viewbox) throw new Error("viewbox not found");
} catch (e) {
  viewbox = document.body;
}

class Ball {
  constructor(x, y, dx, dy, radius, color, speed) {
    this.x = x;
    this.y = y;
    this.ball = document.createElement("div");
    this.ball.classList.add("circle");
    this.radius = radius;
    this.diameter = radius * 2;

    this.speed = speed;
    this.color = color;

    this.dx = dx;
    this.dy = dy;
  }

  /**
   * render ball to the viewbox
   *
   */
  renderBall() {
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;
    this.ball.style.left = this.x + "px";
    this.ball.style.top = this.y + "px";
    this.ball.style.height = this.diameter + "px";
    this.ball.style.width = this.diameter + "px";
    this.ball.style.background = this.color;
    viewbox.appendChild(this.ball);
  }

  /**
   * checks if the ball collided with the wall/ boundary of the container
   */
  collisionWithWall() {
    if (this.x > VIEWBOX_WIDTH - this.diameter || this.x < 0) {
      this.dx = -this.dx;
    }
    if (this.y > VIEWBOX_HEIGHT - this.diameter || this.y < 0) {
      this.dy = -this.dy;
    }
  }

  /**
   * checks if the ball collided with another ball
   */
  collisionWithBall(ball, otherball) {
    const distance = distanceCalculator(
      ball.x,
      ball.y,
      otherball.x,
      otherball.y
    );
    const radiiSum = ball.radius + otherball.radius;
    if (distance <= radiiSum) {
      ball.dx = -ball.dx;
      ball.dx = -ball.dy;
      otherball.dx = -otherball.dx;
      otherball.dy = -otherball.dy;
    }
  }
}
