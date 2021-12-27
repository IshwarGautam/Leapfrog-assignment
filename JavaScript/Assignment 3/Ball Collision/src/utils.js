const boundaryWidth = 700;
const boundaryHeight = 450;
const fps = 60;
const ballCount = 10;
const ballArray = [];

function getDirection() {
  return Math.random() > 0.5 ? 1 : -1;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomColor(){
  return 'rgb('+getRandomInt(0, 255)+','+getRandomInt(0, 255)+','+getRandomInt(0, 255)+')';
}