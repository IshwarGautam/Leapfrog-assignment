//Initializing some constant variable
const boundaryWidth = 1200;
const boundaryHeight = 650;
const fps = 60;
const ballCount = 50;
const ballArray = [];

//get the direction of ball
function getDirection() {
  return Math.random() > 0.5 ? 1 : -1;
}

//get random number between min and max
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

//get random color of ball
function getRandomColor(){
  return 'rgb('+getRandomInt(0, 255)+','+getRandomInt(0, 255)+','+getRandomInt(0, 255)+')';
}

//get the distance using Pythagoras theorem
function distance(a, b) {
  return Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2);
}

//this function solve the two ball being stuck together
//limitation: ball may go little bit outside of canvas if they stuck near boundary but comes back with no any delay
function solveStuck(ball1, ball2, isStuck=false){

  let overlap = ball1.radius + ball2.radius - distance(ball1, ball2);
  let smallBall = ball1.radius < ball2.radius ? ball1 : ball2;
  let bigBall = ball1.radius > ball2.radius ? ball1 : ball2;

  //if oneball get stuck and there is no place to move, 
  // we then try to move other ball that is also stucked with.
  // Below line doesn't get execute on first call,
  // if the ball get stucked, only it get execute. 
  if (isStuck) {
    smallBall = bigBall;
    bigBall = smallBall;
  }
  
  let theta = Math.atan2((bigBall.y - smallBall.y), (bigBall.x - smallBall.x));
  smallBall.x -= overlap * Math.cos(theta);
  smallBall.y -= overlap * Math.sin(theta); 

  if (distance(ball1, ball2) < ball1.radius + ball2.radius) {

      // run only when two ball get stuck
      if (!isStuck) solveStuck(ball1, ball2, true)
  }
}

