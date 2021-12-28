const lane = document.getElementById("lane");
car.style.visibility = "hidden";

const road = document.getElementById("road");
road.style.width = "300px";
road.style.display = "flex";
road.style.overflow = "hidden";
road.style.position = "fixed";
road.style.top = '50%';
road.style.left = '50%';
road.style.transform = 'translate(-50%, -50%)';
// road.style.backgroundImage = `url(./images/mobile.png)`;

let playButton = document.getElementById('play');
playButton.style.background = "green";
playButton.style.position = "absolute";
playButton.style.width = "100px";
playButton.style.height = "50px";
playButton.style.color = "ivory";
playButton.style.fontSize = "25px";
playButton.style.cursor = "pointer";
playButton.style.top = '50%';
playButton.style.left = '50%';
playButton.style.transform = 'translate(-50%, -50%)';
road.appendChild(playButton);

let replayButton = document.getElementById('replay');
replayButton.style.background = "green";
replayButton.style.position = "absolute";
replayButton.style.width = "100px";
replayButton.style.height = "50px";
replayButton.style.color = "ivory";
replayButton.style.fontSize = "25px";
replayButton.style.cursor = "pointer";
replayButton.style.top = '50%';
replayButton.style.left = '50%';
replayButton.style.transform = 'translate(-50%, -50%)';
replayButton.style.display = 'none';
replayButton.style.zIndex = '2';

let image = document.getElementById("Image");
image.style.top = '50%';
image.style.left = '50%';
image.style.transform = 'translate(-50%, -50%)';
image.style.position = 'absolute';
image.style.display = 'none';


