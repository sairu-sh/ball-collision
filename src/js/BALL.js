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
    //prevents the ball from going out of box and pulls it in if it has gone out
    if (this.x > VIEWBOX_WIDTH - this.diameter) {
      this.x = VIEWBOX_WIDTH - this.diameter;
      this.dx = -this.dx;
    }
    //same but for when ball goes beyond left boundary
    if (this.x < 0) {
      this.x = 0;
      this.dx = -this.dx;
    }
    //same but for max height
    if (this.y > VIEWBOX_HEIGHT - this.diameter) {
      this.y = VIEWBOX_HEIGHT - this.diameter;
      this.dy = -this.dy;
    }

    //same but for when ball goes beyond upper boundary
    if (this.y < 0) {
      this.y = 0;
      this.dy = -this.dy;
    }
  }

  /**
   * Checks if two balls overlap and resolves the overlap
   */
  resolveOverlap(ball, otherball) {
    const distance = distanceCalculator(
      ball.x,
      ball.y,
      otherball.x,
      otherball.y
    );
    const overlap = ball.radius + otherball.radius - distance + 1;

    if (overlap > 0) {
      const angle = Math.atan2(otherball.y - ball.y, otherball.x - ball.x);
      const overlapX = overlap * Math.cos(angle);
      const overlapY = overlap * Math.sin(angle);

      ball.x -= overlapX;
      ball.y -= overlapY;
    }
  }

  /**
   * checks if the ball collided with another ball
   */
  collisionWithBall(ball, otherball) {
    this.resolveOverlap(ball, otherball);
    ball.dx = -ball.dx;
    ball.dx = -ball.dy;
    otherball.dx = -otherball.dx;
    otherball.dy = -otherball.dy;
  }
}
