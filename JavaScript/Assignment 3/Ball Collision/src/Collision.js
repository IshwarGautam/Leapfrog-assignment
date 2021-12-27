const canvas = document.getElementById("canvas");

function CreateBall() {
  this.ball = document.createElement("div");
  this.ball.classList.add("ball");

  this.color = getRandomColor();
  this.ball.style.background = this.color;

  this.ball.style.borderRadius = "50%";
  
  this.radius = getRandomInt(15, 30);
  this.Width = 2 * this.radius;
  this.Height = 2 * this.radius;

  this.ball.style.width = this.Width + "px";
  this.ball.style.height = this.Height + "px";

  this.x = getRandomInt(0, boundaryWidth);
  this.y = getRandomInt(0, boundaryHeight);

  this.dx = getDirection();
  this.dy = getDirection();

  this.angle = function(){
    return Math.atan2(this.dy, this.dx);
  }

  this.speed = getRandomInt(3,8);

  this.ball.style.top = this.y + "px";
  this.ball.style.left = this.x + "px";
  this.ball.style.position = "absolute";

  this.draw = function () {
    viewport.appendChild(this.ball);
  };

  this.move = function () {
    setInterval(() => {
      this.x += this.speed * this.dx;
      this.y += this.speed * this.dy;
      this.ball.style.top = this.y + "px";
      this.ball.style.left = this.x + "px";

      // Collision Detection
      this.checkWallCollision();
      this.checkBallCollision();
    }, 1000 / fps);
  };

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

  this.checkBallCollision = function () {
    ballArray.forEach((ball) => {
      
      for (let i = 0; i < ballArray.length; i++) {
        if (ball !== ballArray[i]) {
            
          var b1x = ball.x;
          var b1y = ball.y;
          var b2x = ballArray[i].x;
          var b2y = ballArray[i].y;
          var radius1 = ball.radius;
          var radius2 = ballArray[i].radius;
          var dx = b1x - b2x;
          var dy = b1y - b2y;
          var distance = Math.sqrt(dx * dx + dy * dy);

          if (distance <= (radius1 + radius2)) {

              // change the direction
              ball.dx = -ball.dx;
              ball.dy = -ball.dy;
          }
        }
      } 
    });
  };
}

viewport.innerHTML = "";
for (let i = 0; i < ballCount; i++) {
  const ball = new CreateBall();
  ballArray.push(ball);
  ball.draw();
  ball.move();
}
