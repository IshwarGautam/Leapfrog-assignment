function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}


let index = 1;
const laneCount = 3;
const laneLength = 600;
const carHeight = 100;

const laneMap = {
  0: "lane-left",
  1: "lane-middle",
  2: "lane-right"
};

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


class Obstacle {
  constructor(speed, interval) {
    this.index = getRandomInt(0, 3);
    this.y = getRandomInt(-150, -200);
    this.speed = speed;
    this.passed = 0;
    this.interval = interval;
  }

  draw() {
    this.element = document.createElement("div");

    const laneMapValue = laneMap[this.index];

    this.element.setAttribute("class", `car ${laneMapValue}`);
    this.element.style.bottom = "auto";
    this.element.style.top = this.y + "px";
    this.element.style.transition = "none";

    road.appendChild(this.element);
  }

  move() {
    if (!this.passed){
      this.y += this.speed;
      this.element.style.top = this.y + "px";
    }

    this.collide();
    
    // console.log(this.y);
    if (this.y >= laneLength) {
      this.element.remove();
      // this.y = -150;
      this.passed = true;
    }

    if (this.y > laneLength-100){
      this.index = -1;
    }
    
  }

  collide(){ 
    if (this.y>laneLength - carHeight -100 && index === this.index){
      this.element.remove();
      // road.removeChild(this.element);
      clearInterval(this.interval);  
      // road.style.opacity = '0.2';
      lane.style.backgroundImage = `url(./images/gameover.png)`;
      road.style.transition = '0.3s';

      setTimeout(() => {
        replayButton.style.display = 'block';
      }, 2000);
      speed = 5;
      car.style.visibility = 'hidden';
    }
    
  }
}

playKey();
let highScore = localStorage.getItem("highScore") || 0;

let score = 0;
let speed = 5;
let obsArray = [];

function playGame(){
  obsArray = [];

  lane.style.backgroundImage = `url(./images/road.png)`;
  lane.style.transition = '0.4s';

  car.style.visibility = 'visible';
  playButton.style.display = "none";
  replayButton.style.display = "none";
  // playKey();

  let interval = setInterval(() => {
    speed += 0.1;

    let obs = new Obstacle(speed, interval);
    obs.draw();
    obsArray.push(obs);
  
    //set score
    if (obsArray.length>2){
      score = obsArray.length - 2;
    }
    else{
      score = 0;
    }
  
    if (score>highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
    }
  
    document.getElementById("score").innerHTML = score;
    document.getElementById("highScore").innerHTML = highScore; 
    
  }, 4000/speed);
}

playButton.addEventListener("click", playGame);
replayButton.addEventListener("click", playGame);
  

function move() {
  obsArray.forEach((obs) => obs.move());
    requestAnimationFrame(move);
}

move();
