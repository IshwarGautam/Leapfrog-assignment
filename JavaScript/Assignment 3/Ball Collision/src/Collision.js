//=========================
// Main function (class)
//=========================

function CreateBall() {
  this.ball = document.createElement('div');
  this.ball.classList.add('ball');

  this.color = getRandomColor();
  this.ball.style.background = this.color;

  this.ball.style.borderRadius = '50%';
  
  this.radius = getRandomInt(10, 30);
  this.Width = 2 * this.radius;
  this.Height = 2 * this.radius;

  this.ball.style.width = this.Width + 'px';
  this.ball.style.height = this.Height + 'px';

  this.x = getRandomInt(0, boundaryWidth);
  this.y = getRandomInt(0, boundaryHeight);

  this.dx = getDirection();
  this.dy = getDirection();

  this.speed = getRandomInt(1,8);

  this.ball.style.top = this.y + 'px';
  this.ball.style.left = this.x + 'px';
  this.ball.style.position = 'absolute';

  // let's add each ball in the canvas
  this.draw = function () {
    canvas.appendChild(this.ball);
  };

  // Move that ball considering they may get collide with wall or with other ball later
  this.move = function () {
    setInterval(() => {
      this.x += this.speed * this.dx;
      this.y += this.speed * this.dy;
      this.ball.style.top = this.y + 'px';
      this.ball.style.left = this.x + 'px';

      // Collision Detection
      this.checkWallCollision();
      this.checkBallCollision();
    }, 1000 / fps);
  };

  //change the direction when ball get collide with wall
  this.checkWallCollision = function () {
    if (this.x + this.Width > boundaryWidth) {
      this.dx = -1;
    }

    if (this.y + this.Height > boundaryHeight) {
      this.dy = -1;
    }

    if (this.x < 0) {
      this.dx = 1;
    }

    if (this.y < 0) {
      this.dy = 1;
    }
  };

  // change the direction if the ball get collide with each other
  this.checkBallCollision = function () {
    ballArray.forEach((ball) => {
      
      for (let i = 0; i < ballArray.length; i++) {
        if (ball != ballArray[i]) {
            
          let b1x = ball.x;
          let b1y = ball.y;
          let b2x = ballArray[i].x;
          let b2y = ballArray[i].y;
          let radius1 = ball.radius;
          let radius2 = ballArray[i].radius;
          let dx = b1x - b2x;
          let dy = b1y - b2y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance <= radius1 + radius2) { //collision occur

            // change the direction by determining their new direction
            collision_angle = Math.atan2(dy,dx);

            magnitude_1 = Math.sqrt(ball.dx*ball.dx+ball.dy*ball.dy);
            magnitude_2 = Math.sqrt(ballArray[i].dx*ballArray[i].dx+ballArray[i].dy*ballArray[i].dy);

            direction_1 = Math.atan2(ball.dy, ball.dx);
            direction_2 = Math.atan2(ballArray[i].dy, ballArray[i].dx);

            new_dx1 = magnitude_1 * Math.cos(direction_1-collision_angle);
            new_dy1 = magnitude_1 * Math.sin(direction_1-collision_angle);
            new_dx2 = magnitude_2 * Math.cos(direction_2-collision_angle);
            new_dy2 = magnitude_1 * Math.sin(direction_2-collision_angle);

            ball.dx = new_dx1;
            ball.dy = new_dy1;
            ballArray[i].dx = new_dx2;
            ballArray[i].dy = new_dy2;

            //======================================================
            //Sometimes, two balls get stuck together for long time,
            //solveStuck function deals with this problem.
            //The implementation of this function is in util.js
            //======================================================
            solveStuck(ball, ballArray[i]);
          }
        }
      } 
    });
  };
}

//============================================================
// Insert the ball and its position in the canvas or viewport
//============================================================
canvas.innerHTML = '';
for (let i = 0; i < ballCount; i++) {
  const ball = new CreateBall();
  ballArray.push(ball);
  ball.draw();
  ball.move();
}
