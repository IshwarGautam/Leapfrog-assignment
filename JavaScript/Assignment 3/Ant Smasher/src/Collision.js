//=========================
// Main function (class)
//=========================

function CreateAnt() {
  this.ant = document.createElement('div');

  //Trying with gif of first ant
  this.ant.style.backgroundImage = `url('./image/ant1.gif')`;

  //Trying with gif of second ant
  // this.ant.style.backgroundImage = `url('./image/ant2.gif')`;
  // Conclusion: the size is big and changing its size doesn't seem real ant
  
  this.Width = 68;
  this.Height = 93;

  //just assuming the radius to be one-forth of ant width
  this.radius = this.Width/4;

  this.ant.style.width = this.Width + 'px';
  this.ant.style.height = this.Height + 'px';

  this.x = getRandomInt(0, boundaryWidth);
  this.y = getRandomInt(0, boundaryHeight);

  this.dx = getDirection();
  this.dy = getDirection();

  this.speed = getRandomInt(1,5);

  this.ant.style.top = this.y + 'px';
  this.ant.style.left = this.x + 'px';
  this.ant.style.position = 'absolute';

  // Add each of ant in the canvas
  this.draw = function () {
    canvas.appendChild(this.ant);
  };
  
  //==============================
  // Remove an ant on mouse click
  //==============================
  this.delete = ()=> {
    canvas.removeChild(this.ant);
  };

  this.ant.addEventListener('click', this.delete);
  this.ant.style.cursor = 'no-drop';

  // Ant moves in any direction considering they may get collide with wall or with each other later
  this.move = function () {
    setInterval(() => {
      this.x += this.speed * this.dx;
      this.y += this.speed * this.dy;
      this.ant.style.top = this.y + 'px';
      this.ant.style.left = this.x + 'px';

      // Collision Detection
      this.checkWallCollision();
      this.checkAntCollision();

    }, 1000 / fps);
  };

  // Ant may get collide with wall
  this.checkWallCollision = function () {
    if (this.x + this.Width > boundaryWidth) {
      this.dx = -1;
      this.ant.style.transform = 'rotate(-50deg)';
    }

    if (this.y + this.Height > boundaryHeight) {
      this.dy = -1;
      this.ant.style.transform = 'rotate(20deg)';
    }

    if (this.x < 0) {
      this.dx = 1;
      this.ant.style.transform = 'rotate(50deg)';
    }

    if (this.y < 0) {
      this.dy = 1;
      this.ant.style.transform = 'rotate(180deg)';
    }
  };

  // Ant may get collide with each other
  this.checkAntCollision = function () {
    antArray.forEach((ant) => {
      
      for (let i = 0; i < antArray.length; i++) {
        if (ant != antArray[i]) {          
          let b1x = ant.x;
          let b1y = ant.y;
          let b2x = antArray[i].x;
          let b2y = antArray[i].y;
          let radius1 = ant.radius; // assuming the radius of ant to be one-forth of its width
          let radius2 = antArray[i].radius;
          let dx = b1x - b2x;
          let dy = b1y - b2y;
          let distance = Math.sqrt(dx * dx + dy * dy);

          if (distance <= radius1 + radius2) { //collision occur

            //change the direction
            collision_angle = Math.atan2(dy,dx);

            magnitude_1 = Math.sqrt(ant.dx*ant.dx+ant.dy*ant.dy);
            magnitude_2 = Math.sqrt(antArray[i].dx*antArray[i].dx+antArray[i].dy*antArray[i].dy);

            direction_1 = Math.atan2(ant.dy, ant.dx);
            direction_2 = Math.atan2(antArray[i].dy, antArray[i].dx);

            new_dx1 = magnitude_1 * Math.cos(direction_1-collision_angle);
            new_dy1 = magnitude_1 * Math.sin(direction_1-collision_angle);
            new_dx2 = magnitude_2 * Math.cos(direction_2-collision_angle);
            new_dy2 = magnitude_1 * Math.sin(direction_2-collision_angle);

            ant.dx = new_dx1;
            ant.dy = new_dy1;
            antArray[i].dx = new_dx2;
            antArray[i].dy = new_dy2;

            //======================================================
            //Sometimes, two ants get stuck together for long time,
            //solveStuck function deals with this problem.
            //The implementation of this function is in util.js
            //======================================================
            solveStuck(ant, antArray[i]);
          }
        }
      } 
    });
  };
}

//============================================================
// Insert the ant and its position in the canvas or viewport
//============================================================
canvas.innerHTML = '';
for (let i = 0; i < antCount; i++) {
  const ant = new CreateAnt();
  antArray.push(ant);
  ant.draw();
  ant.move();
  // ant.delete();
}
