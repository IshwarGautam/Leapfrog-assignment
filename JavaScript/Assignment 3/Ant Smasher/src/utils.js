//Initializing some constant variable
const boundaryWidth = 1200;
const boundaryHeight = 650;
const fps = 60;
const antCount = 10;
const antArray = [];

//get the direction of ant
function getDirection() {
  return Math.random() > 0.5 ? 1 : -1;
}

//get random number between min and max
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

//get random color of ant
function getRandomColor(){
  return 'rgb('+getRandomInt(0, 255)+','+getRandomInt(0, 255)+','+getRandomInt(0, 255)+')';
}

//get the distance using Pythagoras theorem
function distance(a, b) {
  return Math.sqrt((a.x - b.x)**2 + (a.y - b.y)**2);
}

//this function solve the two ant being stuck together
//limitation: ant may go little bit outside of canvas
function solveStuck(ant1, ant2, isStuck=false){

  let overlap = ant1.radius + ant2.radius - distance(ant1, ant2);
  let smallAnt = ant1.radius < ant2.radius ? ant1 : ant2;
  let bigAnt = ant1.radius > ant2.radius ? ant1 : ant2;

  //if oneant get stuck and there is no place to move, 
  // we then try to move other ant that is also stucked with.
  // Below line doesn't get execute on first call,
  // if the ant get stucked, only it get execute. 
  if (isStuck) {
    smallAnt = bigAnt;
    bigAnt = smallAnt;
  }
  
  let theta = Math.atan2((bigAnt.y - smallAnt.y), (bigAnt.x - smallAnt.x));
  smallAnt.x -= overlap * Math.cos(theta);
  smallAnt.y -= overlap * Math.sin(theta); 

  if (distance(ant1, ant2) < ant1.radius + ant2.radius) {

      // run only when two ant get stuck
      if (!isStuck) solveStuck(ant1, ant2, true)
  }
}

