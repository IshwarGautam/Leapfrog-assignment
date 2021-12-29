// Initializing required variables
const fps = 60;

// This is the start and end region of the area while collision may occur
//because bird left position is fixed and when pipe comes to this position,
// then only we check if bird collide or not
const START_X_REGION = -10;
const END_X_REGION = 100;

// This value helps in calculating tips of two up and down pipe
const PIPE_TOP_Y = 0;
const PIPE_BOTTOM_Y = 300;

// This is the environment or area where the birds can fly
// If it goes out of these two value, game over
const ENVT_TOP = -25;
const ENVT_BOTTOM = 348;

//===============================================================
//All these variables are initialized based on the size of container
// and the different styling that have applied.
//===============================================================

// When user press space, a bird can fly
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    flyAudio.play();
    birdTop -=100;
    bird.style.transition = "0.3s";
  }
});

//Get audio during fly and when the game is over
let flyAudio = new Audio('./audio/fly.wav');
let dieAudio = new Audio('./audio/die.wav');

//get random number between min and max provided
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}

// Check if the birds go out of frame
function gameover(){
  if (birdTop <= ENVT_TOP || birdTop >=ENVT_BOTTOM){
    dieAudio.play();
    clearInterval(interval1);
    clearInterval(interval2);
    replay();

    bird.style.top = ENVT_BOTTOM + 'px';
    bird.style.transition = '1s';
    bird.style.transform = 'rotate(50deg)';
  }
}

// replay button to play again after gameover
function replay(){
  setTimeout(() => {
    replayButton.style.display = 'block';
    bird.style.top = '100px';
    bird.style.transition = 'none';

    bird.style.transform = 'none';
  }, 2000);
}


// let's create obstacle
function Obstacle(dx,speed, interval1, interval2){

  this.x = 300; // 300 is the distance between the each pipe generated
  this.y = getRandomInt(-200, 70);
  this.dx = dx;
  this.speed = speed;
  this.interval1 = interval1;
  this.interval2 = interval2;

  replayButton.style.display = 'none';

  // this is the pipe at the top
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

  // this is the pipe at the bottom
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
  
  // append pipe to the frame
  this.draw = function(){
    frame.appendChild(this.pipe1);
    frame.appendChild(this.pipe2);
  }
  
  // the pipe have to be moved horizontally
  this.move = function(){
    setInterval(() => {
      this.x -= this.dx; 
      this.pipe1.style.left = this.x + 'px';
      this.pipe2.style.left = this.x + 'px'; 

      base.style.left = this.dx + 'px';
      base.style.width = '100% 100%';
    
      if (this.x < -52){ // out of frame
        this.pipe1.remove();
        this.pipe2.remove();
      }

      //while moving, we have to check whether it collide with the bird
      this.collision();

    }, 1000/fps);
  }

  // here is the implementation when bird collide with the pipe
  this.collision = function(){
    if (this.x <= END_X_REGION && this.x >= START_X_REGION){
      if (birdTop <= PIPE_TOP_Y - this.y  || birdTop >= PIPE_BOTTOM_Y - this.y){
        //gameover
        dieAudio.play();
        clearInterval(this.interval1);
        clearInterval(this.interval2);

        bird.style.top = ENVT_BOTTOM + 'px';
        bird.style.transition = '1s';
        bird.style.transform = 'rotate(50deg)';

        replay();
      }
    } 
  }
}

// let's declare array and some variable
let obsArray = [];
let dx;
let speed;
let interval1;
let interval2;
let birdTop;
let score;

// get highscore from our local storage
let highScore = localStorage.getItem("highScore") || 0;
document.getElementById("highScore").innerHTML = highScore; 

// This is the main function to play game
function playGame(){

  playButton.style.display = "none";
  thumbnail.style.display = "none";
  replayButton.style.display = "none";

  message.style.display = "block";
  message.style.transition = "1s";
  setTimeout(() => {
    message.style.display = "none";
  }, 4000);

  birdTop = 100; //initial bird position along y axis
  dx = 1;
  speed = 3;
  obsArray = [];
  x = 0;

  //GRAVITY always pull the bird
  interval1 = setInterval(() => {
    birdTop+=20;
    bird.style.top = birdTop + "px";
    gameover();
  }, 100);

  dx+=0.1;
  speed+=0.5;

  //create obstacle every 3 second
  interval2 = setInterval(() => {
    const obs = new Obstacle(dx, speed, interval1, interval2);
    obsArray.push(obs);
    obs.pipeUp();
    obs.pipeDown();
    obs.draw();
    obs.move();
    maintainScore();
  }, 3000);

  // Maintain current score and highest score
  function maintainScore(){
    if (obsArray.length>2){
      score = obsArray.length - 2;
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
}

// Add event listener to play and replay the game
playButton.addEventListener("click", playGame);
replayButton.addEventListener("click", playGame);
