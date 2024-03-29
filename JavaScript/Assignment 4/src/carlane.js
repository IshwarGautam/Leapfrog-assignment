// initialize required variable
let index = 1;
const laneCount = 3;
const laneLength = 600;
const carHeight = 100;

const laneMap = {
  0: "lane-left",
  1: "lane-middle",
  2: "lane-right"
};

//get random number between min and max provided
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}

// Add event listener to move the car
function playKey(){
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
      index--;
      if (index < 0) index = 0;
    } else if (event.code === "ArrowRight") {
      index++;
      if (index > laneCount - 1) index = laneCount - 1;
    }
    const laneMapValue = laneMap[index];
  
    car.setAttribute("class", `car ${laneMapValue}`);
  });
}
playKey();

// Create obstacle class
class Obstacle {
  constructor(speed, interval) {
    this.index = getRandomInt(0, 3);
    this.y = getRandomInt(-150, -200);
    this.speed = speed;
    this.passed = 0;
    this.interval = interval;
  }

  // draw an obstacle (other car)
  draw() {
    this.element = document.createElement("div");

    //By some reason, the replay button may sometime appear even after undisplay it
    //so here, I am again setting display it to none
    replayButton.style.display = 'none';
    const laneMapValue = laneMap[this.index];

    this.element.setAttribute("class", `car ${laneMapValue}`);
    this.element.style.bottom = "auto";
    this.element.style.top = this.y + "px";
    this.element.style.transition = "none";

    road.appendChild(this.element);
  }
  
  
  move() {

    //The image is of road.
    // here, I am providing some motion to the road so that it looks like the car is moving
    image.style.top = this.y + "px";
    
    image.style.position = 'absolute';
    // image.style.transition = '0.01s';
    image.style.overflow = 'hidden';

    // no need to increase y after collision for the same instance
    if (!this.passed){
      this.y += this.speed;
      this.element.style.top = this.y + "px";
    }

    //check for collision
    this.collide();
    
    //when an obstacle passed my car
    if (this.y >= laneLength) {
      this.element.remove();
      this.passed = true;
    }

    // obstacle that passed away is given negative index so that its index doesn't affect me further
    if (this.y > laneLength - carHeight){
      this.index = -1;
    }
    
  }

  // what if other car get collide with my car
  // carheight is multiplied by 2 that may include bottom pixel and other
  // so that if other car just touch mine one, it indicates the collision occur
  collide(){ 
    if (this.y>laneLength - 2 * carHeight  && index === this.index){
      
      // display score and highscore in the middle of the screen
      info.style.color = "yellow";
      info.style.transform = "translate(-50%,-50%)";
      info.style.left = "50%";
      info.style.top = "40%";
      info.style.position = "absolute";
      info.style.background = "#f52";


      //remove that obstacle
      this.element.remove();

      //don't need to generate new obstacle
      clearInterval(this.interval);  

      //hide the image of road
      image.style.display = 'none';

      //display gameover in mobile view
      road.style.backgroundImage = `url(./images/mobile.png)`;
      lane.style.backgroundImage = `url(./images/gameover.png)`;

      //set transition time
      lane.style.transition = '0.4s';

      //display restart button after 2 second
      setTimeout(() => {
        replayButton.style.display = 'block';
      }, 2000);

      speed = 5; //default value

      //also hide my car
      car.style.visibility = 'hidden';
    }
    
  }
}

// get highscore from our local storage
let highScore = localStorage.getItem("highScore") || 0;

let score = 0;
let speed = 5;
let obsArray = [];
// let scoreIncenter =  0;

function playGame(){
  obsArray = [];
  
  image.style.display = 'block';
  car.style.visibility = 'visible';
  playButton.style.display = "none";
  replayButton.style.display = "none";

  //remove some of the css property of score and highscore
  //like I don't want to display them in the screen while I am playing
  info.style.removeProperty('color');
  info.style.removeProperty('transform');
  info.style.removeProperty('left');
  info.style.removeProperty('top');
  info.style.removeProperty('background');

  //============================================================================================
  //Each obstacle is created at a gap of certain time so that the obstacles doesn't block my car from all side
  //===========================================================================================
  let interval = setInterval(() => {

    //increment the speed at each interval
    speed += 0.1;
    let obs = new Obstacle(speed, interval);
    obs.draw();
    obsArray.push(obs);
    
    //set score
    // suppose if obstacle collide with my car, there are two cars that is still to be passed
    // so to calculate score, I am just counting the length of the obstacle produced substract by 2
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
    
  }, 4000/speed); //as speed increase, time to generate obstacle decrease, that means obstacle create as fast as speed goes high
}

playButton.addEventListener("click", playGame);
replayButton.addEventListener("click", playGame);
  
function move() {
  obsArray.forEach((obs) => obs.move());
    requestAnimationFrame(move);
}
move();
