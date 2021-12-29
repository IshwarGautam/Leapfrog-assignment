// Initializing required variables
const fps = 60;
const START_X_REGION = -10;
const END_X_REGION = 100;
const PIPE_TOP_Y = 20;
const PIPE_BOTTOM_Y = 260;

const ENVT_TOP = -25;
const ENVT_BOTTOM = 328;

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    flyAudio.play();
    birdTop -=100;
    bird.style.transition = "0.3s";
  }
});

let flyAudio = new Audio('./audio/fly.wav');
let dieAudio = new Audio('./audio/die.wav');

//get random number between min and max provided
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}

const bird = document.createElement('div');
bird.style.backgroundImage = `url('./images/bird.gif')`;
bird.style.top = '100px';
bird.style.left = '21px';
bird.style.width = '200px';
bird.style.height = '188px';
bird.style.backgroundSize = '100px';
bird.style.backgroundRepeat = "no-repeat";
bird.style.position = 'absolute';
frame.appendChild(bird);


function gameover(){
  if (birdTop <= ENVT_TOP || birdTop >=ENVT_BOTTOM){
    dieAudio.play();
    clearInterval(interval1);
    clearInterval(interval2);
    replay();
  }
}

function replay(){
  setTimeout(() => {
    replayButton.style.display = 'block';
    bird.style.top = '100px';
    bird.style.transition = 'none';
  }, 2000);
}


function Obstacle(dx,speed, interval1, interval2){

  this.x = 300; // 300 is the distance between the each pipe generated
  this.y = getRandomInt(-200, 70);
  this.dx = dx;
  this.speed = speed;
  this.interval1 = interval1;
  this.interval2 = interval2;

  replayButton.style.display = 'none';

  this.pipeUp = function(){
    this.pipe1 = document.createElement('div');
    this.pipe1.style.backgroundImage = `url('./images/pipe.png')`;
    this.pipe1.style.bottom = this.y + 'px';
    this.pipe1.style.left =this.x + 'px';
    this.pipe1.style.position = 'absolute';
    this.pipe1.style.width = '52px';
    this.pipe1.style.height = '320px';
    this.pipe1.style.zIndex = '2';
  }

  this.pipeDown = function(){
    this.pipe2 = document.createElement('div');
    this.pipe2.style.backgroundImage = `url('./images/pipe.png')`;
    this.pipe2.style.top = -this.y - 250 + 'px'; //this generate exact gap between up and down pipe
    this.pipe2.style.left = this.x + 'px';
    this.pipe2.style.position = 'absolute';
    this.pipe2.style.width = '52px';
    this.pipe2.style.height = '320px';
    this.pipe2.style.transform = 'rotate(180deg)';
    this.pipe2.style.zIndex = '2';
  }
  

  this.draw = function(){
    frame.appendChild(this.pipe1);
    frame.appendChild(this.pipe2);
  }

  this.move = function(){
    setInterval(() => {
      this.x -= this.dx; 
      this.pipe1.style.left = this.x + 'px';
      this.pipe2.style.left = this.x + 'px'; 
    
      if (this.x < -52){ // out of frame
        this.pipe1.remove();
        this.pipe2.remove();
      }

      this.collision();

    }, 1000/fps);
  }

  this.collision = function(){
    if (this.x <= END_X_REGION && this.x >= START_X_REGION){
      if (birdTop <= PIPE_TOP_Y - this.y  || birdTop >= PIPE_BOTTOM_Y - this.y){
        //gameover
        dieAudio.play();
        clearInterval(this.interval1);
        clearInterval(this.interval2);
        this.pipe1.remove();
        this.pipe2.remove();
        replay();
      }
    } 
  }

}
let obsArray = [];
let dx;
let speed;
let interval1;
let interval2;
let birdTop;
let score;

// get highscore from our local storage
let highScore = localStorage.getItem("highScore") || 0;

function playGame(){

  playButton.style.display = "none";

  replayButton.style.display = "none";
  birdTop = 100; //initial bird position along y axis
  dx = 1;
  speed = 3;
  obsArray = [];

  
  interval1 = setInterval(() => {
    birdTop+=20;
    bird.style.top = birdTop + "px";
    gameover();
  }, 100);

  dx+=0.1;
  speed+=0.5;
  interval2 = setInterval(() => {
    const obs = new Obstacle(dx, speed, interval1, interval2);
    obsArray.push(obs);
    obs.pipeUp();
    obs.pipeDown();
    obs.draw();
    obs.move();
  }, 3000);
  maintainScore();
}

function maintainScore(){
  if (obsArray.length>1){
    score = obsArray.length - 1;
  }
  else{
    score = 0;
  }
  
  // update the highscore
  if (score>highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }

  
  document.getElementById("score").innerHTML = score;
  document.getElementById("highScore").innerHTML = highScore; 
}

playButton.addEventListener("click", playGame);
replayButton.addEventListener("click", playGame);
